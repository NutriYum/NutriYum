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

class CameraComponent extends Component {
  constructor(props){
    super(props)
  }
  
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    whiteBalance: 'auto',
    autoFocus: 'off',
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
      let photo = await this.camera.takePictureAsync()
      let indexURI = await photo.uri.toString().indexOf('Camera/') + 7
      let tempPhoto = await photo.uri.toString()
      let tempPhotoName = await photo.uri.toString().slice(indexURI)
      let manipResult = await ImageManipulator.manipulate(
        tempPhoto,
        [
            { resize: { height: 1000 } },
            { crop: { originX: 100, originY: 200, width: 500, height: 500 } }
        ],
        { format: 'png', compress: 1 }
        )
        await manipResult.uri
        await this.props.setCurrentPhoto({photo: manipResult, photoName: tempPhotoName})
        this.props.navigation.navigate('CameraConfirm');
    }
  }

  render() {

  console.log(this.props)
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <Container />
    } else if (hasCameraPermission === false) {
      return <Container> No access to camera</Container>
    } else if (hasCameraPermission === true) {
      return (
        <Container>
          <Header />
          <Camera
            ratio={'16:10'}
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref
            }}
          >
            <Container style={styles.snapIconContainer}>
              <Button
                style={{ marginBottom: 60 }}
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