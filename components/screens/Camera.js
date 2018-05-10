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

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    whiteBalance: 'auto',
    autoFocus: 'on',
    photo: null,
    photoName: ''
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  clearPhoto = async () => {
    await this.setState({ photo: null, photoName: '' })
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
      let indexURI = photo.uri.toString().indexOf('Camera/') + 7
      this.setState({
        photo: photo.uri.toString(),
        photoName: photo.uri.toString().slice(indexURI)
      })
    }
    let manipResult = await ImageManipulator.manipulate(
      this.state.photo,
      [
        { resize: { height: 1000 } },
        { crop: { originX: 100, originY: 200, width: 500, height: 500 } }
      ],
      { format: 'png', compress: 1 }
    )
    this.setState({ photo: manipResult.uri })
  }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return <Container />
    } else if (hasCameraPermission === false) {
      return <Container> No access to camera</Container>
    } else if (this.state.photo === null) {
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
    } else if (this.state.photo) {
      const { photoName, photo } = this.state
      return (
        <CameraConfirm
          navigation={this.props.navigation}
          photoName={photoName}
          photo={photo}
          clearPhoto={this.clearPhoto}
        />
      )
    }
  }
}

class MyCameraScreen extends Component {
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

// const mapDispatchToProps = (dispatch) => ({
//   logout: (navigation) => dispatch(logout(navigation))
// });

export default MyCameraScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
