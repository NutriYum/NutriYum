import React, { Component } from 'react'
import { Image, Picker } from 'react-native'
import {Thumbnail, Button, Container, Icon, Header, Content, Text, Card, CardItem, Body, Left, Right, List, ListItem, Form, Separator, View, Title} from 'native-base'
import axios from 'axios'
import styles from '../../Styles'
import FoodLog from './FoodLog'
import { addToFoodLogThunker, getFoodLogThunker } from '../redux/foodLog';
import { setCurrentPhoto, removeCurrentPhoto } from '../redux/photo'
import { setCurrentMatch, removeCurrentMatch } from '../redux/foodmatch'
import { setNutrition, removeNutrition } from '../redux/nutrition'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation';

class MyFoodScreen extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static navigationOptions = {
    tabBarLabel: 'Food'
  }

  handleSubmit(){
    this.props.addToFoodLogThunker(this.state.nutrition)
  }

  async nutrionixCall(itemValue){
    try {
      if (itemValue !== 'non-food') {
        let result = await axios.get(
          `https://nutri-yum.herokuapp.com/api/nutri/${itemValue}`
        )
        this.props.setNutrition([result.data])
        this.props.navigation.navigate('FoodNutrition')
      }
    } catch (error) {
      console.error(error)
      return <Text>{error.message}</Text>
    }
  }

  async clearFoodState() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyFoodScreen' })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('MyCameraScreen')
    // this.props.removeCurrentPhoto();
    this.props.removeCurrentMatch();
    this.props.removeNutrition();
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
        // console.log('from amazon', this.state.bucketLocale)
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
    const { navigation, foodMatch } = this.props
    let {photo, photoName} = this.props.photo

    return (
      <Container>
      <Header style={styles.header}><Title> NutriYum </Title></Header>
        <Content>
          {foodMatch && photo ? (
            <Card>
              <CardItem>
                <Left>
                    <Thumbnail
                    large
                    source={{ uri: photo.uri }}
                  />
                </Left>
                <Body>
                  <Text>  </Text>
                </Body>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.clearFoodState()}
                    >
                    <Icon active name="thumbs-down" />
                    <Text>Clear Picture</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          ) : (
            <View>
              <Text>Go to camera or manual entry to enter a food item</Text>
            </View>
          )}

          {foodMatch.length > 0 ? (
            <View>
              <Text>Click the food that best matches your picture</Text>
                  {foodMatch.map((item, index) => {
                    return (
                      <Card key={index}>
                      <CardItem
                        header
                        button
                        onPress={()=> this.nutrionixCall(item.class)}>
                        <Text> {item.class.toUpperCase()} </Text>
                      </CardItem>
                      <CardItem>
                        <Body><Text>{item.score}% Match</Text></Body>
                      </CardItem>
                        </Card>
                    )})
                  }
            </View>
          ) : null}


        </Content>
      </Container>
    )
  }
}
const mapState = state => {
  return {
    user: state.currentUser,
    photo: state.currentPhoto,
    foodMatch: state.currentMatch
  }
}

const mapDispatch = {
  getFoodLogThunker,
  setCurrentPhoto,
  removeCurrentPhoto,
  addToFoodLogThunker,
  setCurrentMatch,
  removeCurrentMatch,
  setNutrition,
  removeNutrition }

export default connect(mapState, mapDispatch)(MyFoodScreen)
