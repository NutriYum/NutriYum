import React, { Component } from 'react'
import { Platform, Image, StyleSheet } from 'react-native'
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
import { connect } from 'react-redux'

class CameraComponent extends Component {
  constructor(props) {
    super(props)
  }
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

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync()
      let indexURI = photo.uri.toString().indexOf('Camera/') + 7 // this is to set the photoName
      this.setState({
        photo: photo.uri.toString(),
        photoName: photo.uri.toString().slice(indexURI)
      })
    }
    let manipResult = await ImageManipulator.manipulate(
      this.state.photo,
      [
        { resize: { height: 1000 } },
        { crop: { originX: 10, originY: 120, width: 500, height: 500 } }
      ],
      { format: 'png', compress: 1 }
    )
    this.setState({ photo: manipResult.uri })
  }

  confirm = async () => {
    let confirmPhoto = await this.state.photo
    let confirmPhotoName = await this.state.photoName
    this.setState({ photo: null, photoName: '' })
    this.props.navigation.navigate('Food', {
      photo: confirmPhoto,
      photoName: confirmPhotoName
    })
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
          <Content>
            <Camera
              ratio={'16:9'}
              style={{ flex: 1 }}
              type={this.state.type}
              ref={ref => {
                this.camera = ref
              }}
            >
              <Container style={styles.snapIconContainer}>
                <Button
                  style={{ marginBottom: 100 }}
                  transparent
                  primary
                  onPress={this.snap.bind(this)}
                >
                  <Icon style={styles.snapIcon} name="camera" />
                </Button>
              </Container>
            </Camera>
          </Content>
        </Container>
      )
    } else if (this.state.photo) {
      return (
        <Container>
          <Header />
          <Content>
            <Card>
              <CardItem>
                <Body>
                  <Text>My Pic</Text>
                </Body>
              </CardItem>
              <CardItem cardBody>
                <Image
                  style={{ flex: 1, height: 400, width: null }}
                  source={{ uri: this.state.photo }}
                />
              </CardItem>
              <CardItem>
                <Left>
                  <Button transparent onPress={this.confirm.bind(this)}>
                    <Icon active name="thumbs-up" />
                    <Text>Looks good!</Text>
                  </Button>
                </Left>
                <Body>
                  <Button
                    transparent
                    onPress={async () => await this.setState({ photo: null })}
                  >
                    <Icon active name="reverse-camera" />
                    <Text>Take a new picture</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
      )
    }
  }
}

class MyCameraScreen extends React.Component {
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

export default connect(null, null)(MyCameraScreen);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
