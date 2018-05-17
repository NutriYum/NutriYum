import React, { Component } from 'react'
import { TextInput, Image, View, Keyboard } from 'react-native'
import axios from 'axios'
import {
  Text,
  Toast,
  Container,
  List,
  ListItem,
  Content,
  Button,
  Title,
  Header,
  Card,
  CardItem
} from 'native-base'
import IP from '../../IP'
import { connect } from 'react-redux'
import { addToFoodLogThunker, getFoodLogThunker } from '../redux/foodLog'
import styles from '../../Styles'
import { PieChart } from 'react-native-svg-charts'

class ManualEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      nutrition: [],
      proteinSum: 0,
      carbsSum: 0,
      fatSum: 0,
      calSum: 0,
      error: '',
      showToast: false
    }
    this.onSubmitFood = this.onSubmitFood.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.addToFood = this.addToFood.bind(this)
  }

  onSubmitFood() {
    this.setState({ nutrition: [] })
    axios
      .get(`${IP}/api/nutri/search/${encodeURI(this.state.text)}`)
      .then(async result => {
        if (result.data === 'Item was not found! Try again') {
          this.setState({ error: result.data })
        } else {
          await this.setState({
            nutrition: result.data
          })
          this.setState({ error:'' })
          let pro = 0
          let car = 0
          let fat = 0
          let cal = 0
          let totals = this.state.nutrition.map(food => {
            pro += food.protein
            car += food.carbs
            fat += food.totalFat
            cal += food.calories
          })
          this.setState({ proteinSum: pro })
          this.setState({ carbsSum: car })
          this.setState({ fatSum: fat })
          this.setState({ calSum: cal })
          Keyboard.dismiss()
        }
      })
      .catch(error => {
        console.error(error)
        return <Text>ERRROR >>>> {error}</Text>
      })
    this.setState({ text: '' })
  }

  clearAll() {
    this.setState({ nutrition: [] })
  }
  async addToFood() {
    await this.props.addToFoodLogThunker(this.state.nutrition)

    Toast.show({
      text: `Added ${
        this.state.nutrition.length === 1
          ? this.state.nutrition[0].name
          : 'items'
      } to Food Log`,
      buttonText: 'Okay',
      duration: 1500
    })
  }

  render() {
    return (
      <Container>
          <Content keyboardShouldPersistTaps="handled">
            <Text
              style={{ alignSelf: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 20 }}
            >
              WhatCha Eating?
            </Text>
            <TextInput
              style={styles.manualTextInput}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              placeholder={'ENTER FOOD HERE'}
              onSubmitEditing={this.onSubmitFood}
              name="food"
            />
            <View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignSelf: 'center'
                }}
              >
                <Button danger onPress={this.clearAll} style={{ margin: 10, borderRadius: 10 }}>
                  <Text>Clear All</Text>
                </Button>
                <Button primary onPress={this.addToFood} style={{ margin: 10, borderRadius: 10 }}>
                  <Text>Add to Log</Text>
                </Button>
                <Button
                  success
                  onPress={this.onSubmitFood}
                  style={{ margin: 10, borderRadius: 10 }}
                >
                  <Text>Search</Text>
                </Button>
              </View>
                <Content>
                {this.state.nutrition.length ? (
                  <View>
                  <Card style={{alignItems: 'center', padding: 10}}>
                  <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  Total Calories: {this.state.calSum.toFixed(2)} kcals
                  </Text>
                  <CardItem>
                  <PieChart
                  style={{ height: 200, width: 200}}
                  outerRadius={'70%'}
                  innerRadius={10}
                  data={[
                    {
                      key: 1,
                      value: this.state.proteinSum,
                      svg: { fill: '#0099FF' }, 
                      arc: { cornerRadius: 5, }
                    },
                    {
                      key: 2,
                      value: this.state.carbsSum,
                      svg: { fill: '#ffdb4d' }, 
                      arc: { cornerRadius: 5, }
                    },
                    {
                      key: 3,
                      value: this.state.fatSum,
                      svg: { fill: 'green' }, 
                      arc: { cornerRadius: 5, }
                    }
                  ]}
                  />
                </CardItem>
            <CardItem style={{flex: 1}}>
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
                ) : null}
                {this.state.error === 'Item was not found! Try again' ? (
                  <Text style={{ marginLeft: 20 }}>
                    Item was not found! Please try again
                  </Text>
                ) : (
                  this.state.nutrition.map((food, index) => {
                    return (
                        <List key={food.id}>
                        <ListItem itemDivider>
                          <Text style={{fontWeight: 'bold'}}>{food.name}
                            {food.calories > 500 ? (
                              <Text>     That's a lot of calories 😳 </Text>
                            ) : null}
                          </Text>
                        </ListItem>
                        <ListItem>
                          <Text>Calories: {food.calories}kcal</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Serving: {food.quantity} {food.servingUnit}</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Total Fat: {food.totalFat}g</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Carbs: {food.carbs}g</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Sugar: {food.sugar}g</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Sodium: {food.sodium}g</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Protein: {food.protein}g</Text>
                        </ListItem>
                      </List>
                    )
                  })
                )}
                </Content>

            </View>
          </Content>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    user: state.currentUser,
    nutrition: state.nutrition
  }
}

const mapDispatch = { addToFoodLogThunker, getFoodLogThunker }

export default connect(mapState, mapDispatch)(ManualEntry)
