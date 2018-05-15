import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Thumbnail, Container, Header, Content, Card, CardItem, Body, Left, Right, List, ListItem, Form, Text, Tabs, Tab } from 'native-base'
import { connect } from 'react-redux';
import { getFoodLogIntervalThunker } from '../redux/foodLog'
import { logout } from '../redux/auth';


class DailyFood extends Component {
    constructor(props){
        super(props)
    }

    // componentWillMount(){
    //     this.props.day(this.props.user.id)
    // }

    render(){
        // console.log(this.props)
        return(
        
        <Container>
            <Content>
                {this.props.food.map((item, index)=>{
                    return (
                        <Card key={index}>
                        <CardItem header>
                        <Text>{item.name}</Text>
                        </CardItem>
                        <CardItem body>
                        <Text>Calories {item.calories}</Text>
                        </CardItem>
                        </Card>
                    )
                })}
            </Content>
        </Container>
    )}
}

const mapStateToProps = state => {
    return {
      user: state.currentUser,
      food: state.foodLog
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    // logout: (navigation) => dispatch(logout(navigation)),
    day: (user) => dispatch(getFoodLogIntervalThunker(user, 'day')),
    // week: (user) => dispatch(getFoodLogIntervalThunker(user, 'week')),
    // month: (user) => dispatch(getFoodLogIntervalThunker(user, 'month'))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DailyFood);
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });