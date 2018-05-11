import React, { Component } from 'react'
import { TextInput } from 'react-native'
import axios from 'axios'
import { Text, Container, Picker, List, ListItem, Content, Button, Badge, Title, Header } from 'native-base'
import styles from '../../Styles'
import IP from '../../IP'



export default class ManualEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            nutrition: [],
            error: ''
        }
        this.onSubmitFood = this.onSubmitFood.bind(this)
        this.clearAll = this.clearAll.bind(this)
        this.clearOne = this.clearOne.bind(this)
      }

  onSubmitFood() {
    this.setState({ error: '', nutrition: [] })
    let result = axios
      .get(
        `${IP}api/nutri/search/${encodeURI(
          this.state.text
        )}`
      )
      .then(result => {
        if (result.data === 'Item was not found! Try again') {
          this.setState({ error: result.data })
        } else {
          this.setState({
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

      clearAll () {
          this.setState({nutrition: []})
      }

      clearOne () {
        console.log('this.state.nutrition>>>',this.state.nutrition)
        console.log('this.props', this.props)
        this.setState(this.state.nutrition.splice(this.index, 1))
      }
    render () {
        return (
            <Container>
            <Header style={styles.header}><Title> NutriYum </Title></Header>
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
                {
                    this.state.nutrition.map((food, index) => {
                        return (
                            <List key={food.name}>
                            <ListItem itemDivider>
                                <Text>{food.quantity}  {food.name}</Text>
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
                </Content>
                </Container>
            </Container>
            </Container>
        )
    }
}

