import React, { Component } from 'react'
import { Image, Picker } from 'react-native'
import {Button,Container,Icon,Header,Content,Text,Card,CardItem,Body,Left,Right,List,ListItem,Form,Separator,View} from 'native-base'
import { RNS3 } from 'react-native-aws3'
import {
  AMAZON_ACCESSKEY,
  AMAZON_SECRETKEY,
  WATSON_KEY
} from 'react-native-dotenv'
import axios from 'axios'
import styles from '../../Styles'
import FoodLog from './FoodLog'
import { addToFoodLogThunker } from '../redux/foodLog';
import { setCurrentPhoto, removeCurrentPhoto } from '../redux/photo'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation';

accesskey = AMAZON_ACCESSKEY
secretkey = AMAZON_SECRETKEY
watsonKey = WATSON_KEY

const options = {
  // keyPrefix: "uploads/",
  bucket: 'nutriyum2',
  region: 'us-east-1',
  accessKey: accesskey,
  secretKey: secretkey,
  successActionStatus: 201
}

class MyFoodScreen extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static navigationOptions = {
    tabBarLabel: 'Food'
  }
  state = {
    bucketLocale: '',
    watsonFood: [],
    watsonPicker: '',
    nutrition: {},
  }
  handleSubmit(){
    this.props.addToFoodLogThunker(this.state.nutrition)
  }


  async clearFoodState() {
    await this.setState({
      bucketLocale: '',
      watsonFood: [],
      watsonPicker: '',
      nutrition: {},
    })
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyCameraScreen' })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.removeCurrentPhoto();
  }

  send = async (photo, photoName) => {
    const file = {
      uri: this.props.photo.photo.uri,
      name: this.props.photo.photoName,
      type: 'image/png'
    }
    if (!this.state.bucketLocale) {
      await RNS3.put(file, options).then(response => {
        if (response.status !== 201)
          throw new Error('Failed to upload image to S3')
        this.setState({
          bucketLocale: response.body.postResponse.location
        })
        console.log('from amazon', this.state.bucketLocale)
      })
      const response = await axios.get(
        `https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=${watsonKey}&url=${
          this.state.bucketLocale
        }&version=2018-03-19&classifier_ids=food`
      )
      let result = response.data.images[0].classifiers[0].classes
      await this.setState({ watsonFood: result })
      console.log('from watson', this.state)
      // this.setState({ bucketLocale: '', watsonPicker: '', nutrition: {} })
    }
  }

  render() {
    const { navigation } = this.props
    let {photo, photoName} = this.props.photo

    return (
      <Container>
        <Header />
        <Content>
          {photo ? (
            <Card>
              <CardItem>
                <Body>
                  <Text>My Pic</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image
                  style={{ flex: 1, height: 200, width: null }}
                  source={{ uri: photo.uri }}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent onPress={() => this.send(photo.uri, photoName)}
                  >
                    <Icon active name="thumbs-up" />
                    <Text>Send to Watson</Text>
                  </Button>
                </Left>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.clearFoodState()}
                  >
                    <Icon active name="thumbs-down" />
                    <Text>Clear</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          ) : (
            null
          )}

          {this.state.watsonFood.length > 0 ? (
            <View>
              <Form>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.watsonPicker}
                  onValueChange={async itemValue => {
                    try {
                      await this.setState({ watsonPicker: itemValue })
                      if (itemValue !== 'non-food') {
                        let result = await axios.get(
                          `https://nutri-yum.herokuapp.com/api/nutri/${
                            this.state.watsonPicker
                          }`
                        )
                        this.setState({ nutrition: result.data })
                      }
                    } catch (error) {
                      console.error(error)
                      return <Text>{error.message}</Text>
                    }
                  }}
                >
                {/* need to be able to clear this picker */}
                {/* need to be able to warn on non-food item */}
                  {this.state.watsonFood.map((item, index) => {
                    return (
                      <Picker.Item
                        style={styles.pickerListText}
                        key={index}
                        label={`Food ${item.class}  ||  Likelihood ${
                          item.score
                        }`}
                        value={item.class}
                      />
                    )
                  })}
                </Picker>
              </Form>

              <List>
                {Object.keys(this.state.nutrition).map((item, index) => {
                  return (
                    <ListItem style={styles.centerItems} key={index}>
                      <Text style={styles.foodListText}>
                        {item} : {this.state.nutrition[item]}
                      </Text>
                    </ListItem>
                  )
                })}
              </List>
            </View>
          ) : null}
          {Object.keys(this.state.nutrition).length ? (
            <Button
              onPress={this.handleSubmit}
              >
              <Text>Add to Daily Food Log</Text>
            </Button>
          ) : null}
        </Content>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.currentUser,
    photo: state.currentPhoto
  }
}

const mapDispatch = { setCurrentPhoto, removeCurrentPhoto, addToFoodLogThunker }

export default connect(mapState, mapDispatch)(MyFoodScreen)
