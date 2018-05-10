import React, { Component } from 'react'
import {
  Button,
  Container,
  Icon,
  Header,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  List,
  ListItem,
  Form,
  Separator,
  View
} from 'native-base'
import styles from '../../Styles'
import { Image } from 'react-native'

class MyFoodLog extends React.Component {
  state = {
    foodItems: [
      {
        foodId: 1,
        foodName: 'Apple',
        calories: 94.64,
        carbs: 25.13,
        protein: 0.47,
        sodium: 1.82,
        sugar: 18.91,
        totalFat: 0.31,
        timeEaten: '12:00 PM',
        dateEaten: '5/9/2018',
        url:
          'https://s3.amazonaws.com/nutriyum/0217ead6-ba6a-4fc1-8359-7b1b5927d7b6.jpg'
      },
      {
        foodId: 2,
        foodName: 'Orange',
        calories: 160.64,
        carbs: 12.13,
        protein: 0.47,
        sodium: 3.1,
        sugar: 30.43,
        totalFat: 0.54,
        timeEaten: '1:00 PM',
        dateEaten: '5/10/2018',
        url:
          'https://s3.amazonaws.com/nutriyum/0217ead6-ba6a-4fc1-8359-7b1b5927d7b6.jpg'
      }
    ]
  }

  render() {
    const { foodItems } = this.state
    return (
      <View>
        {foodItems.map((item, index) => {
          return (
            <Card key={index}>
              <CardItem>
                <Left>
                  <Body>
                    <Text>{item.foodName}</Text>
                    <Text note>{item.timeEaten}</Text>
                    <Text note>{item.dateEaten}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image
                  source={{ uri: item.url }}
                  style={{ height: 200, width: null, flex: 1 }}
                />
              </CardItem>
              <CardItem>
                <Body>
                  <Text>calories: {item.calories}</Text>
                  <Text>carb: {item.carbs}</Text>
                  <Text>protein: {item.protein}</Text>
                  <Text>sodium: {item.sodium}</Text>
                  <Text>sugar: {item.sugar}</Text>
                  <Text>totalFat: {item.totalFat}</Text>
                </Body>
              </CardItem>
            </Card>
          )
        })}
      </View>
    )
  }
}

export default MyFoodLog