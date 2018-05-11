import React, { Component } from 'react'
import { Image, Picker } from 'react-native'
import {Thumbnail, Button, Container, Icon, Header, Content, Text, Card, CardItem, Body, Left, Right, List, ListItem, Form, Separator, View} from 'native-base'
import axios from 'axios'
import styles from '../../Styles'
import FoodLog from './FoodLog'
import { addToFoodLogThunker } from '../redux/foodLog';
import { setCurrentPhoto, removeCurrentPhoto } from '../redux/photo'
import { setCurrentMatch, removeCurrentMatch } from '../redux/foodmatch'
import { setNutrition, removeNutrition } from '../redux/nutrition'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation';

class MyFoodScreen extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.send = this.send.bind(this);
  }
  static navigationOptions = {
    tabBarLabel: 'Food'
  }

  handleSubmit(){
    this.props.addToFoodLogThunker(this.state.nutrition)
  }

  async nutrionixCall(itemValue){
    try {
      await this.setState({ watsonPicker: itemValue })
      if (itemValue !== 'non-food') {
        let result = await axios.get(
          `https://nutri-yum.herokuapp.com/api/nutri/${
            this.state.watsonPicker
          }`
        )
        this.setState({ nutrition: result.data })
        this.props.setNutrition([result.data])
        this.props.navigation.navigate('NutritionInfo')
      }
    } catch (error) {
      console.error(error)
      return <Text>{error.message}</Text>
    }
  }

  async clearFoodState() {
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'MyCameraScreen' })],
    // });
    // this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('MyCameraScreen')
    // this.props.removeCurrentPhoto();
    this.props.removeCurrentMatch();
    this.props.removeNutrition();
  }


  render() {
    const { navigation, foodMatch } = this.props
    let {photo, photoName} = this.props.photo

    return (
      <Container>
        <Header />
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
                  <Text> Smelly, Smelly Ass, HEY! </Text>
                </Body>
                <Right>
                <Right>
                  <Button
                    transparent
                    onPress={() => this.clearFoodState()}
                    >
                    <Icon active name="thumbs-down" />
                    <Text>Clear Picture</Text>
                  </Button>
                </Right>
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
                  {foodMatch.map((item, index) => {
                    return (
                      <Card key={index}>
                      <CardItem button 
                      onPress={()=> this.nutrionixCall(item.class)}>
                        <Left>
                          {item.class}
                        </Left>

                        <Right>{item.score}</Right>
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

const mapDispatch = { setCurrentPhoto, removeCurrentPhoto, addToFoodLogThunker, setCurrentMatch, removeCurrentMatch, removeNutrition }

export default connect(mapState, mapDispatch)(MyFoodScreen)

