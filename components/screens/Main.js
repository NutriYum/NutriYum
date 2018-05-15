import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import {Thumbnail, Container, Header, Content, Card, CardItem, Body, Left, Right, List, ListItem, Form, Text, Tabs, Tab } from 'native-base'
import { connect } from 'react-redux';
import { getFoodLogIntervalThunker } from '../redux/foodLog'
import { logout } from '../redux/auth';
// import DailyFood from './DailyFood'
// import WeeklyFood from './WeeklyFood'
// import MonthlyFood from './MonthlyFood'

class Main extends React.Component {
  componentWillMount(){
    this.props.day(this.props.user.id)
  }
  render() {
    console.log(this.props)
    // let { user } = this.props
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem 
              header>
              <Left>                     
                <Thumbnail
                  large
                  source={{ uri: this.props.user.profileImgUri }}
                /> 
              </Left>
              <Right> 
                <Text>{this.props.user.email}</Text>
              </Right>
            </CardItem>
            <CardItem></CardItem>
            <CardItem
              footer>
            <Button
              buttonStyle={styles.button}
              title="Logout"
              onPress={() => this.props.logout(this.props.navigation)}
            />
            </CardItem>
          </Card>

          {/* <Card> */}

            {/* <Tabs initialPage={0}>
              <Tab heading ="Daily"
                onPress={()=>{console.log('ello derr')}}>
                <DailyFood />
              </Tab>
              <Tab heading="Weekly">
                <WeeklyFood />
              </Tab>
              <Tab heading="Monthly">
                <MonthlyFood />
              </Tab>
            </Tabs> */}

          <Card>
            <CardItem>
              <Button
                onPress={()=> this.props.day(this.props.user.id)}
                title="Today" />
              <Button 
                onPress={()=> this.props.week(this.props.user.id)}
                title="Week"/>
              <Button 
                onPress={()=> this.props.month(this.props.user.id)}
                title="Month"/>
            </CardItem>
          </Card>

          {this.props.food.map((item, index)=>{
            return (
              <Card key={index}>
                <CardItem header>
                  <Text>{item.name}</Text>
                </CardItem>
                <CardItem body>
                  <Text>Calories {item.calories} Protein {item.protein}</Text>
                </CardItem>
              </Card>
              )
          })}
          {/* <CardItem
            header
            button
            onPress= {()=> this.props.day(this.props.user.id)}
            >
            <Text> View Today's Food Log </Text>
          </CardItem>
          </Card>

          <Card>
          <CardItem
            header
            button
            onPress= {()=> this.props.week(this.props.user.id)}>
            <Text> View Week's Food Log </Text>
          </CardItem>
          </Card>

          <Card>
          <CardItem
            header
            button
            onPress= {()=> this.props.month(this.props.user.id)} >
            <Text> View Month's Food Log </Text>
          </CardItem>
          </Card> */}

        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    food: state.foodLog
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: (navigation) => dispatch(logout(navigation)),
  day: (user) => dispatch(getFoodLogIntervalThunker(user, 'day')),
  week: (user) => dispatch(getFoodLogIntervalThunker(user, 'week')),
  month: (user) => dispatch(getFoodLogIntervalThunker(user, 'month'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});