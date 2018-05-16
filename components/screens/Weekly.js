import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { getFoodLogIntervalThunker } from '../redux/foodLog'
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryArea,
  VictoryLabel
} from 'victory-native'
import Axios from 'axios'
import IP from '../../IP'

class Weekly extends React.Component {
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
    return (
      <ScrollView>
        <VictoryChart domain={{ y: [1200, 3500] }}>
          <VictoryLabel x={165} y={25} text="Calories" />
          <VictoryArea
            style={{
              data: { fill: '#c43a31' }
            }}
            data={[
              { x: 'Mon', y: 2000 },
              { x: 'Tue', y: 2200 },
              { x: 'Wed', y: 2500 },
              { x: 'Thur', y: 1800 },
              { x: 'Fri', y: 3000 },
              { x: 'Sat', y: 2600 },
              { x: 'Sun', y: 2200 }
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

export default connect(mapStateToProps, mapDispatchToProps)(Weekly)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
