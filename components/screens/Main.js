import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import {
  Thumbnail,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  List,
  ListItem,
  Form,
  Text,
  Tabs,
  Tab
} from 'native-base'
import { connect } from 'react-redux'
import { getFoodLogIntervalThunker } from '../redux/foodLog'
import { logout } from '../redux/auth'
import { BarChart } from 'react-native-svg-charts'

let reccoCal = 2200
let reccoPro = 50
let reccoFat = 70
let reccoCarb = 250

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyCal: 2200,
      dailyPro: 50,
      dailyFat: 70,
      dailyCarb: 250
    }
  }

  componentWillMount() {
    this.props.day(this.props.user.id)
  }

  changeViewandFactorDay() {
    this.props.day(this.props.user.id)
    reccoCal = this.state.dailyCal
    reccoPro = this.state.dailyPro
    reccoFat = this.state.dailyFat
    reccoCarb = this.state.dailyCarb
  }

  changeViewandFactorWeek() {
    this.props.week(this.props.user.id)
    reccoCal = this.state.dailyCal * 7
    reccoPro = this.state.dailyPro * 7
    reccoFat = this.state.dailyFat * 7
    reccoCarb = this.state.dailyCarb * 7
  }

  changeViewandFactorMonth() {
    this.props.month(this.props.user.id)
    reccoCal = this.state.dailyCal * 30
    reccoPro = this.state.dailyPro * 30
    reccoFat = this.state.dailyFat * 30
    reccoCarb = this.state.dailyCarb * 30
  }

  render() {
    let calories = 0
    let protein = 0
    let fat = 0
    let carbs = 0

    this.props.food.forEach(item => {
      calories += item.calories
      protein += item.protein
      fat += item.totalFat
      carbs += item.carbs
    })
    const dataCal = [
      calories, reccoCal
    ]
    const dataPro = [
      protein, reccoPro
    ]
    const dataFat = [
      fat, reccoFat
    ]
    const dataCarb = [
      carbs
      , reccoCarb
    ]

    let fill = 'rgb(220, 160, 255)'
    let fill2 = 'rgb(127, 239, 119)'
    let fill3 = 'rgb(144, 132, 255)'
    let fill4 = 'rgb(255, 102, 102)'
    // const colorsCal = ['#ff6666', '#c61717']
    // const colorsCarb = ['#9084ff', '#1f1291']
    // const colorsPro = ['#7fef77', '#44873f']
    // const colorsFat = ['#dca0ff', '#581d7a']
    // const keysCal = ['cals', 'reccoCal']
    // const keysFat = ['fat', 'reccoFat']
    // const keysPro = ['protein', 'reccoPro']
    // const keysCarb = ['carbs', 'reccoCarb']
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
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
            <CardItem />
            <CardItem footer>
              <Button
                buttonStyle={styles.button}
                title="Logout"
                onPress={() => this.props.logout(this.props.navigation)}
              />
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Button
                onPress={() => this.changeViewandFactorDay()}
                title="Today"
              />
              <Button
                onPress={() => this.changeViewandFactorWeek()}
                title="Week"
              />
              <Button
                onPress={() => this.changeViewandFactorMonth()}
                title="Month"
              />
            </CardItem>
          </Card>

    {/* // const colorsCal = ['#ff6666', '#c61717']
    // const colorsCarb = ['#9084ff', '#1f1291']
    // const colorsPro = ['#7fef77', '#44873f']
    // const colorsFat = ['#dca0ff', '#581d7a'] */}

            <Content>
            <Text style={{marginLeft: 10}}>Calories: {calories} / {reccoCal} {Math.floor((calories / reccoCal) * 100)}%</Text>
              <BarChart
                style={{ height: 100 }}
                data={dataCal}
                contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
                svg={{fill4}}
              />
              <Text style={{marginLeft: 10}}>Fat: {fat} / {reccoFat} {Math.floor((fat / reccoFat * 100))}%</Text>
              <BarChart
                style={{ height: 100 }}
                data={dataFat}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
                svg={{fill3}}
              />
              <Text style={{marginLeft: 10}}>Protein: {protein} / {reccoPro} {Math.floor((protein / reccoPro * 100))}%</Text>
              <BarChart
                style={{ height: 100 }}
                data={dataPro}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
                svg={{fill2}}
              />
              <Text style={{marginLeft: 10}}>Carbs: {carbs} / {reccoCarb} {Math.floor((carbs / reccoCarb * 100))}%</Text>
              <BarChart
                style={{ height: 100 }}
                data={dataCarb}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
                svg={{fill}}
              />
            </Content>

          {this.props.food.map((item, index) => {
            return (
              <Card key={index}>
                <CardItem header>
                  <Text>{item.name}</Text>
                </CardItem>
                <CardItem body>
                  <Text>
                    Calories {item.calories} Protein {item.protein}
                  </Text>
                </CardItem>
              </Card>
            )
          })}
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    food: state.foodLog
  }
}

const mapDispatchToProps = dispatch => ({
  logout: navigation => dispatch(logout(navigation)),
  day: user => dispatch(getFoodLogIntervalThunker(user, 'day')),
  week: user => dispatch(getFoodLogIntervalThunker(user, 'week')),
  month: user => dispatch(getFoodLogIntervalThunker(user, 'month'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
