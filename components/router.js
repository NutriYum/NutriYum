import React from 'react'
import {
  createStackNavigator,
  StackNavigator,
  TabNavigator,
  createTabNavigator,
  TabBarBottom,
  createMaterialTopTabNavigator
} from 'react-navigation'
import { FontAwesome } from 'react-native-vector-icons'

import Login from './screens/Login'
import Signup from './screens/Signup'
import Main from './screens/Main'
import MyCameraScreen from './screens/Camera'
import MyFoodScreen from './screens/Food'
import ProfileScreen from './screens/Profile'
import ManualEntry from './screens/ManualEntry'
import CameraConfirm from './screens/CameraConfirm'
import FoodNutrition from './screens/FoodNutrition'
import styles from '../Styles'

export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'NutriYum',
      headerStyle: styles.header,
      headerTitleStyle: styles.loginText
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Sign Up',
      headerStyle: styles.header,
      headerTitleStyle: styles.loginText
    }
  }
})

export const CameraStack = createStackNavigator(
  {
    MyCameraScreen: {
      screen: MyCameraScreen,
      navigationOptions: {
        title: 'MyCameraScreen'
      }
    },
    CameraConfirm: {
      screen: CameraConfirm,
      navigationOptions: {
        title: 'CameraConfirm'
      }
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'MyCameraScreen'
  }
)

export const FoodStack = createStackNavigator(
  {
    MyFoodScreen: {
      screen: MyFoodScreen,
      navigationOptions: {
        title: 'Select Your Chow',
        headerStyle: styles.header,
        headerTitleStyle: styles.loginText
      }
    },
    FoodNutrition: {
      screen: FoodNutrition,
      navigationOptions: {
        title: 'Food Nutrition',
        headerStyle: styles.header,
        headerTitleStyle: styles.loginText
      }
    }
  },
  {
    initialRouteName: 'MyFoodScreen'
  }
)

const SignedIn = createMaterialTopTabNavigator(
  {
    Profile: {
      screen: Main,
      path: 'Profile'
    },
    Camera: {
      screen: CameraStack,
      path: 'Camera'
    },
    Food: {
      screen: FoodStack,
      path: 'Food'
    },
    Search: {
      screen: ManualEntry,
      path: 'Search'
    }
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: 'Camera'
  },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63'
    }
  },
  {
    style: {
      fontSize: 20
    }
  }
)

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  )
}
