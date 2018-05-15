import React, { Component } from 'react'
import { Image, Picker } from 'react-native'
import {
  Thumbnail,
  Toast,
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
  Separator
} from 'native-base'
import { connect } from 'react-redux'
import styles from '../../Styles'
import { addToFoodLogThunker } from '../redux/foodLog'

class FoodNutrition extends Component {
  constructor(props) {
    super(props)
    this.addToFood = this.addToFood.bind(this)
  }

  addToFood() {
    let { nutrition, amazonUrl } = this.props
    this.props.addToFoodLogThunker(nutrition, amazonUrl)

    Toast.show({
      text: `Added ${nutrition[0].name} to Food Log`,
      buttonText: 'Okay',
      duration: 1500
    })
  }

  render() {
    let { nutrition } = this.props
    return (
      <Container>
        <Card>
          {Object.keys(nutrition[0]).map((nutritionFact, index) => {
            let nutriValue =
              nutrition[0][nutritionFact] === null
                ? '0'
                : nutrition[0][nutritionFact]
            return (
              <CardItem style={styles.centerItems} key={index}>
                <Text style={styles.foodListText}>
                  {nutritionFact} : {nutriValue}
                </Text>
              </CardItem>
            )
          })}
          <Button primary onPress={this.addToFood}>
            <Text> Add to Food Log </Text>
          </Button>
        </Card>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    nutrition: state.currentNutrition,
    amazonUrl: state.amazonUrl
  }
}

const mapDispatch = { addToFoodLogThunker }

export default connect(mapState, mapDispatch)(FoodNutrition)
