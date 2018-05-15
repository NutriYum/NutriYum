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
  Left,
  Title
} from 'native-base'
import { Camera, Permissions, ImageManipulator } from 'expo'
import styles from '../../Styles'
import CameraConfirm from './CameraConfirm'
import { connect } from 'react-redux'
import { setCurrentPhoto, removeCurrentPhoto } from '../redux/photo'
import Loader from './Loading'

class CameraComponent extends Component {
  constructor(props){
    super(props)
  }

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    whiteBalance: 'auto',
    autoFocus: 'off',
    loading: false,
    // photo: null,
    // photoName: ''
  }
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  clearPhoto = async () => {
    await this.props.removeCurrentPhoto()
    // this.setState({ photo: null, photoName: '' })
  }

  snap = async () => {
    if (this.camera) {
      this.setState({loading: true})
      let photo = await this.camera.takePictureAsync()
      let indexURI = await photo.uri.toString().indexOf('Camera/') + 7
      let tempPhoto = await photo.uri.toString()
      let tempPhotoName = await photo.uri.toString().slice(indexURI)
      let manipResult = await ImageManipulator.manipulate(
        tempPhoto,
        [
            { resize: { height: 1000 } },
            { crop: { originX: 120, originY: 200, width: 500, height: 500 } }
        ],
        { format: 'png', compress: 1 }
        )
        await manipResult.uri
        await this.props.setCurrentPhoto({photo: manipResult, photoName: tempPhotoName})
        this.props.navigation.navigate('CameraConfirm');
        this.setState({loading: false})
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <Container />
    } else if (hasCameraPermission === false) {
      return <Container><Text> No access to camera  </Text></Container>
    } else if (hasCameraPermission === true) {
      return (
        <Container>
          <Header style={styles.header}><Title style={styles.loginText}> NutriYum </Title></Header>
          <Loader loading={this.state.loading} />
          <Camera
            ratio={'16:10'}
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref
            }}
          >
          <Container style={styles.targetContainer}>
            <Text style={styles.targetPrompt}> Make sure to center your chow! </Text>
            <Container style={styles.altTarget}  />
          </Container>
            <Container style={styles.snapIconContainer}>
              <Button

                style={{ marginBottom: 40 }}
                transparent
                primary
                onPress={this.snap.bind(this)}
              >
                <Icon style={styles.snapIcon} name="camera" />
              </Button>
            </Container>
          </Camera>
        </Container>
      )
    }
  }
}

const mapState = state => {
    return {
      user: state.currentUser,
      photo: state.currentPhoto}
  }

const mapDispatch = { setCurrentPhoto, removeCurrentPhoto }

export default connect(mapState, mapDispatch)(CameraComponent)
