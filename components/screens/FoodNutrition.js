import React, { Component } from 'react'
import { Image, Picker, View, TouchableHighlight } from 'react-native'
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
import { removeCurrentMatch } from '../redux/foodmatch'
import { removeNutrition } from '../redux/nutrition'
import { PieChart } from 'react-native-svg-charts'
import { StackActions, NavigationActions } from 'react-navigation';


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

  async clearFoodState() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyCameraScreen' })],
    });
    this.props.navigation.dispatch(resetAction);
    this.props.navigation.navigate('MyCameraScreen')
    this.props.removeCurrentMatch();
    this.props.removeNutrition();
  }

componentDidMount(){
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
          <View>
        <Card
          style={{alignItems: 'center', padding: 10}}
        >
        <CardItem
        header
        style={{alignSelf: 'center'}}
        >
            <Text
              style={{fontWeight: 'bold', fontSize: 20}}> {nutrition[0].name.toUpperCase()}</Text>
            </CardItem>
            <CardItem
            style={{alignSelf: 'center'}}>
              <Text
                style={{fontWeight: 'bold', fontSize: 15}}>{nutrition[0].calories} calories </Text>
            </CardItem>
            <CardItem
            style={{alignSelf: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>  Serving: {nutrition[0].quantity} {nutrition[0].servingUnit} </Text>
            </CardItem>
            <CardItem
              style={{alignSelf: 'center'}}>
            <Button
              style={{alignSelf: 'center', borderRadius: 10}}
              primary
              onPress={this.addToFood}>

              <Text> Add to Food Log </Text>
            </Button>
            </CardItem>
            <CardItem>
          <PieChart
          style={{ height: 200, width: 200 }}
          outerRadius={'70%'}
          innerRadius={10}
          data={[
            {
              key: 1,
              value: this.state.proteinSum,
              svg: { fill: '#0099FF' },
              arc: { cornerRadius: 5 }
            },
            {
              key: 2,
              value: this.state.carbsSum,
              svg: { fill: '#ffdb4d' },
              arc: { cornerRadius: 5 }
            },
            {
              key: 3,
              value: this.state.fatSum,
              svg: { fill: 'green' },
              arc: { cornerRadius: 5 }
            }
          ]}
          />
                      </CardItem>
            <CardItem
              // style={{alignItems: 'center', alignContent: 'center'}}>
              style={{flex: 1}}>
              <Button
                style={{backgroundColor: '#0099FF'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Protein {this.state.proteinSum.toFixed(2)}g</Text>
              </Button>
              <Button
                style={{backgroundColor: '#ffdb4d'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Carbs {this.state.carbsSum.toFixed(2)}g</Text>
              </Button>
              <Button
                style={{backgroundColor: 'green'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Fat {this.state.fatSum.toFixed(2)}g</Text>
              </Button>
            </CardItem>
        </Card>
          </View>
        <Card>
          {nutrition.length ?
          (
            <List key={nutrition[0].id}>
            <ListItem itemDivider>
              <Text>
                {nutrition[0].quantity} {nutrition[0].servingUnit} {nutrition[0].name.toUpperCase()}
                {nutrition[0].calories > 500 ? (
                  <Text>That's a lot of calories 😳 </Text>
                ) : null}
              </Text>
            </ListItem>
            <ListItem>
              <Text>Calories: {nutrition[0].calories}kcal</Text>
            </ListItem>
            <ListItem>
              <Text>Total Fat: {nutrition[0].totalFat}g</Text>
            </ListItem>
            <ListItem>
              <Text>Carbs: {nutrition[0].carbs}g</Text>
            </ListItem>
            <ListItem>
              <Text>Sugar: {nutrition[0].sugar}g</Text>
            </ListItem>
            <ListItem>
              <Text>Sodium: {nutrition[0].sodium}g</Text>
            </ListItem>
            <ListItem>
              <Text>Protein: {nutrition[0].protein}g</Text>
            </ListItem>
          </List>
        )
          : null}
          <CardItem footer>
            <Button
              transparent
              onPress={() => this.clearFoodState()}
              >
              <Icon active name="thumbs-down" />
              <Text>Return to Camera and Start Over</Text>
            </Button>
          </CardItem>
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

const mapDispatch = { addToFoodLogThunker, removeCurrentMatch, removeNutrition }

export default connect(mapState, mapDispatch)(FoodNutrition)
