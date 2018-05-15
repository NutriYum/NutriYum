import React, { Component } from 'react'
import { Image, Picker } from 'react-native'
import {Thumbnail, Button, Container, Icon, Header, Content, Text, Card, CardItem, Body, Left, Right, List, ListItem, Form, Separator} from 'native-base'
import { connect } from 'react-redux'
import styles from '../../Styles'

class FoodNutrition extends Component {
    constructor(props){
        super(props)
    }

    render(){
      let {nutrition} = this.props
        return(
          <Container>
          <Card>
            {

        Object.keys(nutrition[0]).map((nutiritionFact, index) => {
          let nutriValue = nutrition[0][nutiritionFact] === null ? '0' : nutrition[0][nutiritionFact] 
          return (
            <CardItem style={styles.centerItems} key={index}>
              <Text style={styles.foodListText}>
                {nutiritionFact} : {nutriValue}
              </Text>
            </CardItem>
          )
        })
        
        }
          </Card>
          </Container>
        )
    }
}


const mapState = state => {
  return {
    nutrition: state.currentNutrition,
  }
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(FoodNutrition)