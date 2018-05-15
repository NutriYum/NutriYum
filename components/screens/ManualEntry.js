import React, { Component } from 'react'
import { TextInput } from 'react-native'
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
  Header
} from 'native-base'
import IP from '../../IP'
import { connect } from 'react-redux'
import { addToFoodLogThunker, getFoodLogThunker } from '../redux/foodLog'
import styles from '../../Styles'

class ManualEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      nutrition: [],
      error: '',
      showToast: false
    }
    this.onSubmitFood = this.onSubmitFood.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.addToFood = this.addToFood.bind(this)
  }

  onSubmitFood() {
    this.setState({ error: '' })
    axios
      .get(`${IP}/api/nutri/search/${encodeURI(this.state.text)}`)
      .then(async result => {
        if (result.data === 'Item was not found! Try again') {
          this.setState({ error: result.data })
        } else {
          await this.setState({
            nutrition: result.data
          })
        }
      })
      .catch(error => {
        console.error(error)
        return <Text>{error.message}</Text>
      })

    this.setState({ text: '' })
  }

  clearAll() {
    this.setState({ nutrition: [] })
  }

  async addToFood() {
    // console.log(this.state.nutrition)
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
        <Header style={styles.header}>
          <Title> NutriYum </Title>
        </Header>
        <Container style={styles.container}>
          <Text>What did you put in your face hole?</Text>
          <TextInput
            style={styles.manualTextInput}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            placeholder={'ENTER FOOD HERE'}
            onSubmitEditing={this.onSubmitFood}
            name="food"
          />
          <Container>
            <Content>
              <Button danger onPress={this.clearAll}>
                <Text> Clear All </Text>
              </Button>
              <Button primary onPress={this.addToFood}>
                <Text> Add to Food Log </Text>
              </Button>
              {this.state.error ? <Text>{this.state.error}</Text> : null}

              {this.state.nutrition.map(food => {
                return (
                  <List key={food.name}>
                    <ListItem itemDivider>
                      <Text>
                        {food.quantity} {food.name}{' '}
                        {food.calories > 50 ? (
                          <Text>Thats a lot of calories 😳 </Text>
                        ) : (
                          ''
                        )}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text>Calories: {food.calories}kcal</Text>
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
              })}
            </Content>
          </Container>
        </Container>
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
