import React, { Component } from 'react'
import { TextInput, Image } from 'react-native'
import axios from 'axios'
import { Text, Container, Picker, List, ListItem, Content, Button, Title, Header } from 'native-base'
import IP from '../../IP'
import { connect } from 'react-redux'
import { addToFoodLogThunker, getFoodLogThunker } from '../redux/foodLog';
import styles from '../../Styles'

class ManualEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      nutrition: [],
    }
    this.onSubmitFood = this.onSubmitFood.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }

  onSubmitFood() {
    this.setState({ nutrition: [] })
    let result = axios.get(
        `${IP}/api/nutri/search/${encodeURI(
          this.state.text
        )}`
      )
      .then(result => {
          this.setState({
            nutrition: result.data
          })
          console.log(this.state.nutrition)
      })
      .catch(error => {
        console.error(error)
        return <Text>ERRROR >>>>  {error}</Text>//0099FF
      })

    this.setState({ text: '' })
  }

      clearAll () {
          this.setState({nutrition: []})
      }
    render () {
        return (
            <Container>
            <Header style={styles.header}><Title style={styles.loginText}> NutriYum </Title></Header>
            <Container style={styles.container}>
            <Text>What did you put in your face hole?</Text>
            <TextInput style={styles.manualTextInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder={'ENTER FOOD HERE'}
            onSubmitEditing={this.onSubmitFood}
            name='food'
            />
            <Container>
               <Button danger onPress={this.clearAll}><Text> Clear All </Text></Button>
                <Content>
                {this.state.nutrition === 'Item was not found! Try again' ? <Text>Item was not found! Please try again</Text> :
                    this.state.nutrition.map((food, index) => {
                        return (
                            <List key={food.name}>
                            <ListItem itemDivider>
                                <Text>{food.quantity}  {food.name}       {food.calories > 150 ? <Text>That's a lot of calories 😳 </Text> : ''}</Text>
                            </ListItem>
                                <ListItem><Text>calories:  {food.calories}kcal</Text></ListItem>
                                <ListItem><Text>total fat:  {food.totalFat}g</Text></ListItem>
                                <ListItem><Text>carbs:  {food.carbs}g</Text></ListItem>
                                <ListItem><Text>sugar:  {food.sugar}g</Text></ListItem>
                                <ListItem><Text>sodium:  {food.sodium}g</Text></ListItem>
                                <ListItem><Text>protein:  {food.protein}g</Text></ListItem>
                           </List>
                            )
                        })
             }
             {this.state.nutrition ? <Image source={require('../../NYLogo.png')} style={styles.logo} /> : ''}
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

const mapDispatch = { addToFoodLogThunker }

export default connect(mapState, mapDispatch)(ManualEntry)
