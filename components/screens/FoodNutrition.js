import react, {Component} from 'react'
import { connect } from 'react-redux'
import styles from '../../Styles'

class FoodNutrition extends Component {
    constructor(props){
        super(props)
    }

    render(){
      let {nutrition} = this.props
        return(
          <View>
          { nutrition ? 
            Object.keys(this.state.nutrition).map((item, index) => {
            return (
              <ListItem style={styles.centerItems} key={index}>
              <Text style={styles.foodListText}>
                  {item} : {this.state.nutrition[item]}
              </Text>
              </ListItem>
            )
            })
           : null}
          </View>
        )
    }
}

const mapState = state => {
  return {
    nutrition:state.currentNutrition,
  }
}

const mapDispatch = {}

export default connect(mapState,null)(FoodNutrition)