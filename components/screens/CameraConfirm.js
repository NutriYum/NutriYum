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

confirm = async () => {
  props.navigation.navigate('Food', {
    photo: confirmPhoto,
    photoName: confirmPhotoName
  })
}

export default (CameraConfirm = props => {
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
              source={{ uri: props.photo }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                onPress={() =>
                  props.navigation.navigate('Food', {
                    photo: props.photo,
                    photoName: props.photoName
                  })
                }
              >
                <Icon active name="thumbs-up" />
                <Text>Looks good!</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent onPress={props.clearPhoto}>
                <Icon active name="reverse-camera" />
                <Text>Take a new picture</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
})
