import React, { Component } from 'react'
import { Image } from 'react-native'
import {
  Button,
  Container,
  Icon,
  Header,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Left
} from 'native-base'
import { Camera, Permissions, ImageManipulator } from 'expo'
import styles from '../../Styles'
import CameraConfirm from './CameraConfirm'
import { connect } from 'react-redux'
import { setCurrentPhoto, removeCurrentPhoto } from '../redux/photo' 
import CameraComponent from './CameraComponent'


export default class MyCameraScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Camera'
  }
  render() {
    const { navigation } = this.props
    return (
      <Container>
        <CameraComponent navigation={navigation} />
      </Container>
    )
  }
}
