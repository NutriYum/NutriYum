import React from 'react';
import { createStackNavigator, StackNavigator, TabNavigator, createTabNavigator, TabBarBottom, createMaterialTopTabNavigator } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Main from './screens/Main';
import MyCameraScreen from './screens/Camera'
import MyFoodScreen from './screens/Food'
import ProfileScreen from './screens/Profile'
import ManualEntry from './screens/ManualEntry'
import CameraConfirm from './screens/CameraConfirm'
import FoodNutrition from './screens/FoodNutrition'

export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      title: 'Sign Up'
    }
  }
});

export const CameraStack = createStackNavigator({
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
  {headerMode: 'none',
    initialRouteName: 'MyCameraScreen'}
);

export const FoodStack = createStackNavigator({
  MyFoodScreen: {
    screen: MyFoodScreen,
    navigationOptions: {
      title: 'MyFoodScreen'
    }
  },
  FoodNutrition: {
    screen: FoodNutrition,
    navigationOptions: {
      title: 'FoodNutrition'
    }
  }
},
  {
    // headerMode: 'none',
    initialRouteName: 'MyFoodScreen'}
);

const SignedIn = createMaterialTopTabNavigator(
  {
    Main: {
      screen: Main,
      path: 'Main'
    },
    Camera: {
      screen: CameraStack,
      path: 'Camera'
    },
    Food: {
      screen: FoodStack,
      path: 'Food'
    },
    Manual: {
      screen: ManualEntry,
      path: 'Manual'
    },
  },
  {
    tabBarPosition: 'bottom',
    initialRouteName: 'Camera',
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
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};
