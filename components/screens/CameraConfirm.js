import React from 'react'
import { Image } from 'react-native'
import {
  Icon,
  Button,
  Container,
  Content,
  Header,
  Text,
  Card,
  CardItem,
  Body,
  Left
} from 'native-base'
import { connect } from 'react-redux'
import { setCurrentPhoto, removeCurrentPhoto } from '../redux/photo' 
import { StackActions, NavigationActions } from 'react-navigation';


// confirm = async () => {
//   props.navigation.navigate('Food', {
//     photo: confirmPhoto,
//     photoName: confirmPhotoName
//   })
// }

class CameraConfirm extends React.Component {
  constructor(props){
    super(props)

    this.looksGood = this.looksGood.bind(this)
    this.looksBad = this.looksBad.bind(this)
  }

  async looksGood(){
    await this.props.navigation.navigate('Food', {
      // photo: this.props.photo,
    })
    // this.props.removeCurrentPhoto();
  }

  async looksBad(){
    // await this.props.navigation.navigate('MyCameraScreen')
    // this.props.removeCurrentPhoto();
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyCameraScreen' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
    
  render(){
    console.log(StackActions)
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
              style={{ flex: 1, height: 200, width: null }}
              source={{ uri:  this.props.photo.photo.uri}}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                onPress={this.looksGood}>
                <Icon active name="thumbs-up" />
                <Text>Looks good!</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent onPress={()=> {this.looksBad()}}>
                <Icon active name="reverse-camera" />
                <Text>Take a new picture</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
      </Container>)
}
}

const mapState = state => {
  return {
    photo: state.currentPhoto,
    // photo: state.photo, 
  }
}

const mapDispatch = { setCurrentPhoto, removeCurrentPhoto }

export default connect(mapState, mapDispatch)(CameraConfirm)