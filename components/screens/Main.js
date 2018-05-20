import React from 'react'
import { StyleSheet, Platform } from 'react-native'
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
  Tab,
  Icon,
  Button,
  Toast,
  View
} from 'native-base'
import { connect } from 'react-redux'
import { getFoodLogIntervalThunker } from '../redux/foodLog'
import { logout } from '../redux/auth'
import { StackedBarChart } from 'react-native-svg-charts'
import style from '../../Styles'
import ProgressBarClassic from 'react-native-progress-bar-classic'
import Axios from 'axios'
import IP from '../../IP'
import { PieChart } from 'react-native-svg-charts'
import Weekly from './Weekly'
import Monthly from './Monthly'


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
      dailyCarb: 250,
      timeFrame: ''
    }
  }

  componentWillMount() {
    this.changeViewandFactorDay()
  }

  changeViewandFactorDay() {
    this.props.day(this.props.user.id)
    reccoCal = this.state.dailyCal
    reccoPro = this.state.dailyPro
    reccoFat = this.state.dailyFat
    reccoCarb = this.state.dailyCarb
    this.setState({ timeFrame: 'daily' })
    time = StyleSheet.create({
      daily: {borderBottomWidth: 6, borderBottomColor: '#ffdb4d'},
      weekly: null,
      monthly: null
  })
  }

  changeViewandFactorWeek() {
    this.props.week(this.props.user.id)
    reccoCal = this.state.dailyCal * 7
    reccoPro = this.state.dailyPro * 7
    reccoFat = this.state.dailyFat * 7
    reccoCarb = this.state.dailyCarb * 7
    this.setState({ timeFrame: 'weekly' })
    time = StyleSheet.create({
      daily: null,
      weekly: {borderBottomWidth: 6, borderBottomColor: '#ffdb4d'},
      monthly: null
  })
  }

  changeViewandFactorMonth() {
    this.props.month(this.props.user.id)
    reccoCal = this.state.dailyCal * 30
    reccoPro = this.state.dailyPro * 30
    reccoFat = this.state.dailyFat * 30
    reccoCarb = this.state.dailyCarb * 30
    this.setState({ timeFrame: 'monthly' })
    time = StyleSheet.create({
      daily: null,
      weekly: null,
      monthly: {borderBottomWidth: 6, borderBottomColor: '#ffdb4d'}
  })
  }

  async handleDeleteFoodItem(id, name) {
    await Axios.delete(`${IP}/api/foodLogs/${id}`)
      .then(result => console.log(result))
      .catch(error => console.log(error))

    await this.changeViewandFactorDay()
    Toast.show({
      text: `Removed ${name}`,
      buttonText: 'Okay',
      duration: 1500
    })
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
      {
        cals: calories
      },
      {
        reccoCal: reccoCal
      }
    ]
    const dataPro = [
      {
        protein: protein
      },
      {
        reccoPro: reccoPro
      }
    ]
    const dataCarb = [
      {
        carbs: carbs
      },
      {
        reccoCarb: reccoCarb
      }
    ]
    const dataFat = [
      {
        fat: fat
      },
      {
        reccoFat: reccoFat
      }
    ]
    const defaultData = [
      {
        default: 100
      },
      {
        default2: 200
      }
    ]

    const colorsCal = ['#ff6666', '#c61717']
    const colorsCarb = ['#9084ff', '#1f1291']
    const colorsPro = ['#7fef77', '#44873f']
    const colorsFat = ['#dca0ff', '#581d7a']
    const keysCal = ['cals', 'reccoCal']
    const keysFat = ['fat', 'reccoFat']
    const keysPro = ['protein', 'reccoPro']
    const keysCarb = ['carbs', 'reccoCarb']
    return (
      <Container>
        <Content>
          <Card>
            <CardItem
              header
              style={{backgroundColor: '#0099FF'}}
              >
              <Left>
                <Thumbnail
                  square
                  large

                  source={{ uri: this.props.user.profileImgUri }}
                />
              </Left>
              <Right>
                <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white', marginRight: 15}}>{this.props.user.userName}</Text>
              </Right>
            </CardItem>
            <CardItem footer style={{alignSelf: 'flex-end'}}>
              <Button
                warning
                style={{borderRadius: 10}}
                buttonStyle={styles.button}
                onPress={() => this.props.logout(this.props.navigation)}
              >
                <Text>Logout</Text>
              </Button>
            </CardItem>
          </Card>
          <Card>
            <CardItem style={{justifyContent: 'space-around', marginLeft: -10}}>
              <Button
                style={{borderRadius: 10, margin: 2}}
                style={time.daily}
                onPress={() => this.changeViewandFactorDay()}>
                <Text>Today</Text>
              </Button>
              <Button
                style={{borderRadius: 10, margin: 2}}
                style={time.weekly}
                onPress={() => this.changeViewandFactorWeek()}>
                <Text>Week</Text>
              </Button>
              <Button
                style={{borderRadius: 10, margin: 2}}
                style={time.monthly}
                onPress={() => this.changeViewandFactorMonth()}>
                <Text>Month</Text>
              </Button>
            </CardItem>
          </Card>
          {this.state.timeFrame === 'weekly' ? <Weekly /> : null}
          {this.state.timeFrame === 'monthly' ? <Monthly /> : null}

          {Platform.OS === 'ios' ? (
            <View>
              <Text style={{ marginLeft: 10 }}>
                Calories: {calories} / {reccoCal}{' '}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                {Math.floor(calories / reccoCal * 100)}%
              </Text>
              <StackedBarChart
                style={{ height: 100 }}
                keys={keysCal}
                colors={colorsCal}
                data={dataCal}
                showGrid={false}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
              />
              <Text style={{ marginLeft: 10 }}>
                Fat: {fat} / {reccoFat}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                {Math.floor(fat / reccoFat * 100)}%
              </Text>
              <StackedBarChart
                style={{ height: 100 }}
                keys={keysFat}
                colors={colorsFat}
                data={dataFat}
                showGrid={false}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
              />
              <Text style={{ marginLeft: 10 }}>
                Protein: {protein} / {reccoPro}{' '}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                {Math.floor(protein / reccoPro * 100)}%
              </Text>
              <StackedBarChart
                style={{ height: 100 }}
                keys={keysPro}
                colors={colorsPro}
                data={dataPro}
                showGrid={false}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
              />
              <Text style={{ marginLeft: 10 }}>
                Carbs: {carbs} / {reccoCarb}{' '}
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                {Math.floor(carbs / reccoCarb * 100)}%
              </Text>
              <StackedBarChart
                style={{ height: 100 }}
                keys={keysCarb}
                colors={colorsCarb}
                data={dataCarb}
                showGrid={false}
                contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                horizontal={true}
                animate={true}
              />
            </View>
          ) : (
            <Content>
              <Text style={{ marginLeft: 10 }}>
                Calories: {calories} / {reccoCal}
              </Text>
              <ProgressBarClassic
                progress={Math.floor(calories / reccoCal * 100)}
                valueStyle={'balloon'}
              />
              <Text style={{ marginLeft: 10 }}>
                Fat: {fat} / {reccoFat} {Math.floor(fat / reccoFat * 100)}%
              </Text>
              <ProgressBarClassic
                progress={Math.floor(fat / reccoFat * 100)}
                valueStyle={'balloon'}
              />
              <Text style={{ marginLeft: 10 }}>
                Protein: {protein} / {reccoPro}
              </Text>
              <ProgressBarClassic
                progress={Math.floor(protein / reccoPro * 100)}
                valueStyle={'balloon'}
              />
              <Text style={{ marginLeft: 10 }}>
                Carbs: {carbs} / {reccoCarb}
                {Math.floor(carbs / reccoCarb * 100)}%
              </Text>
              <ProgressBarClassic
                progress={Math.floor(carbs / reccoCarb * 100)}
                valueStyle={'balloon'}
              />
            </Content>
          )}
          <Card sticky>
            <CardItem style={{alignSelf: 'center', marginLeft: -15}}>
              <CardItem header style={{alignSelf: 'center'}}>
                <Text>PieChart Keys:</Text>
              </CardItem>
              <Button
                style={{backgroundColor: '#0099FF'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Protein</Text>
              </Button>
              <Button
                style={{backgroundColor: '#ffdb4d'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Carbs</Text>
              </Button>
              <Button
                style={{backgroundColor: 'green'}}>
                <Text style={{color: 'black', fontWeight: 'bold'}}>Fat</Text>
              </Button>
            </CardItem>
          </Card>
          {this.props.food.map((item, index) => {
            return (
              <Card key={index}>
                <CardItem header>
                  <Left>
                    <Text style={{fontWeight: 'bold', fontSize: 25, marginBottom: -18}}>{item.name.slice(0,1).toUpperCase() + item.name.slice(1)}</Text>
              </Left>
              <Right>
                <Text style={{fontWeight: 'bold', fontSize: 15, marginBottom: -20}}>{item.calories} : Calories</Text>
              </Right>
              </CardItem>
              <CardItem>
                  <PieChart
                    style={{ height: 90, width: 90, marginBottom: -20, marginTop: -15 }}
                    outerRadius={'70%'}
                    innerRadius={10}
                    data={[
                      {
                        key: 1,
                        value: item.protein,
                        svg: { fill: '#0099FF' }


                      },
                      {
                        key: 2,
                        value: item.carbs,
                        svg: { fill: '#ffdb4d' }
                      },
                      {
                        key: 3,
                        value: item.totalFat,
                        svg: { fill: 'green' }
                      }
                    ]}
                  />
                  <Right>
                    <Button
                      style={{marginRight: -15}}
                      transparent
                      onPress={() => {
                        this.handleDeleteFoodItem(item.id, item.name)
                      }}
                    >
                      <Icon
                        style={{fontSize: 50, color: 'red', marginTop: -10}}
                        large
                        name="trash" />
                    </Button>
                  </Right>
                </CardItem>
                <CardItem style={{alignSelf: 'center'}}>
                    <Text style={{color: 'black', fontWeight: 'bold', marginTop: -17}}
                      >{item.quantity} Eaten on {item.date.slice(5,10) + '-' + item.date.slice(0,4)}</Text>
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
