import React, { Component } from 'react'
import { Image, Picker, View } from 'react-native'
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
import { PieChart } from 'react-native-svg-charts'


class FoodNutrition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proteinSum: 0,
      carbsSum: 0,
      fatSum: 0,
      calSum: 0,
    }
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

  pie() {
    let pro = 0
    let car = 0
    let fat = 0
    let cal = 0
    let totals = this.props.nutrition.map(food => {
      pro += food.protein
      car += food.carbs
      fat += food.totalFat
      cal += food.calories
    })
    this.setState({ proteinSum: pro })
    this.setState({ carbsSum: car })
    this.setState({ fatSum: fat })
    this.setState({ calSum: cal })
  }

  render() {
    let { nutrition } = this.props
    return (
      <Container>
      <Content>
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
          <View>
          <PieChart
          style={{ height: 200 }}
          outerRadius={'70%'}
          innerRadius={10}
          data={[
            {
              key: 1,
              value: this.state.proteinSum,
              svg: { fill: '#0099FF' }
            },
            {
              key: 2,
              value: this.state.carbsSum,
              svg: { fill: '#ffdb4d' }
            },
            {
              key: 3,
              value: this.state.fatSum,
              svg: { fill: '#808080' }
            }
          ]}
        />
        </View>
          <Button primary onPress={this.addToFood}>
            <Text> Add to Food Log </Text>
          </Button>
        </Card>
        </Content>
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
