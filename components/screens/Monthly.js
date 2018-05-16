import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getFoodLogIntervalThunker } from '../redux/foodLog'
import {
  VictoryChart,
  VictoryLine,
  VictoryBar,
  VictoryTheme,
  VictoryLabel
} from 'victory-native'
import Axios from 'axios'
import IP from '../../IP'

class Monthly extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dailyCal: 2200,
      dailyPro: 50,
      dailyFat: 70,
      dailyCarb: 250
    }
  }

  render() {
    let dailyData = {}
    let dataY = []
    this.props.food.forEach((item, index) => {
      let day = item.date.slice(8, 10)
      console.log(day)
      if (dailyData[day]){
        let cals = dailyData[day]
        dailyData[day] = (item.calories + cals)
      } else {
        dailyData[day] = item.calories
      }
    })
    console.log(dailyData)
    return (
      <ScrollView>
        <VictoryChart domain={{ y: [0, 3500] }}>
          <VictoryLabel x={165} y={25} text="Calories" />
          <VictoryLabel x={160} y={285} text="Days" />
          <VictoryBar
            style={{
              data: { fill: '#c43a31' }
            }}
            data={[
              { y: 2000 },
              { y: 2200 },
              { y: 2500 },
              { y: 1800 },
              { y: 3000 },
              { y: 2600 },
              { y: 2300 },
              { y: 2250 },
              { y: 1800 },
              { y: 2600 },
              { y: 1950 },
              { y: 2005 },
              { y: 2654 },
              { y: 2390 },
              { y: 2189 },
              { y: 2290 },
              { y: 2017 },
              { y: 2729 },
              { y: 2389 },
              { y: 2902 },
              { y: 3154 },
              { y: 2450 },
              { y: 2890 },
              { y: 2302 },
              { y: 1909 },
              { y: 1803 },
              { y: 2224 },
              { y: 2109 },
              { y: 2670 },
              { y: 2783 },
              { y: 2783 },
            ]}
          />
        </VictoryChart>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Monthly)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
