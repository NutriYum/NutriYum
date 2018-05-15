import React, { Component } from 'react'
import { TextInput, Image, View } from 'react-native'
import axios from 'axios'
import {
  Text,
  Container,
  Picker,
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
import { PieChart } from 'react-native-svg-charts'

class ManualEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      nutrition: [],
      proteinSum: 0,
      carbsSum: 0,
      fatSum: 0 
    }
    this.onSubmitFood = this.onSubmitFood.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.addToFood = this.addToFood.bind(this)
    this.getFoodLog = this.getFoodLog.bind(this)
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
        let pro = 0
        let car = 0
        let fat = 0
        let totals = this.state.nutrition.map((food) => {
          pro += food.protein
          car += food.carbs
          fat += food.totalFat
      })
          this.setState({ proteinSum: pro })
          this.setState({ carbsSum: car })
          this.setState({ fatSum: fat })
      })
      .catch(error => {
        console.error(error)
        return <Text>ERRROR >>>> {error}</Text>
      })
    this.setState({ text: '' })
  }

      clearAll () {
          this.setState({nutrition: []})
      }
      addToFood() {
        this.props.addToFoodLogThunker(this.state.nutrition)
      }
    
      getFoodLog() {
        const userId = this.props.user.id
        this.props.getFoodLogThunker(userId)
      }

    render () {
        console.log(this.state.nutrition)
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
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <Button danger onPress={this.clearAll}><Text>Clear All</Text></Button>
            <Button primary onPress={this.addToFood}><Text>Add to Log</Text></Button>
            <Button primary onPress={this.getFoodLog}><Text>Get Food Log</Text></Button>
            </View>
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
            <Container style={{alignItems: 'center'}}>
             <Text style={{backgroundColor: '#0099FF'}}>Protein {this.state.proteinSum.toFixed(2)}</Text>
             <Text style={{backgroundColor: '#ffdb4d'}}>Carbs {this.state.carbsSum.toFixed(2)}</Text>
             <Text style={{backgroundColor: '#808080'}}>Total Fat {this.state.fatSum.toFixed(2)}</Text>
            </Container>
             <Image source={require('../../NYLogo.png')} style={styles.logo} />
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
