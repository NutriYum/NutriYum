import React from 'react';
import { createStackNavigator, StackNavigator, TabNavigator, createTabNavigator, TabBarBottom, createMaterialTopTabNavigator } from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Main from './screens/Main';

// import LoginScreen from './Login'
// import LobbyScreen from './Lobby'
// import SignUpScreen from './Signup'
// import HomeButtons from './HomeButtons'
import MyCameraScreen from './screens/Camera'
import MyFoodScreen from './screens/Food'
import ProfileScreen from './screens/Profile'
import ManualEntry from './screens/ManualEntry'

export const SignedOut = StackNavigator({
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

const SignedIn = TabNavigator(
  {
    Main: {
      screen: Main,
      path: 'Main'
    },
    Camera: {
      screen: MyCameraScreen,
      path: 'Camera'
    },
    Food: {
      screen: MyFoodScreen,
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
  return StackNavigator(
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
