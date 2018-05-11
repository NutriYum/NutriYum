// import React, { Component } from 'react'
// import { Image, Picker } from 'react-native'
// import {Thumbnail, Button, Container, Icon, Header, Content, Text, Card, CardItem, Body, Left, Right, List, ListItem, Form, Separator, View} from 'native-base'
// import { RNS3 } from 'react-native-aws3'
// import {
//   AMAZON_ACCESSKEY,
//   AMAZON_SECRETKEY,
//   WATSON_KEY
// } from 'react-native-dotenv'
// import axios from 'axios'
// import styles from '../../Styles'
// import FoodLog from './FoodLog'
// import { addToFoodLogThunker } from '../redux/foodLog';
// import { setCurrentPhoto, removeCurrentPhoto } from '../redux/photo'
// import { setCurrentMatch, removeCurrentMatch } from '../redux/foodmatch'
// import { setNutrition, removeNutrition } from '../redux/nutrition'
// import { connect } from 'react-redux'
// import { StackActions, NavigationActions } from 'react-navigation';

// accesskey = AMAZON_ACCESSKEY
// secretkey = AMAZON_SECRETKEY
// watsonKey = WATSON_KEY

// const options = {
//   bucket: 'nutriyum2',
//   region: 'us-east-1',
//   accessKey: accesskey,
//   secretKey: secretkey,
//   successActionStatus: 201
// }

// class MyFoodScreen extends React.Component {
//   constructor(props) {
//     super(props)
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   static navigationOptions = {
//     tabBarLabel: 'Food'
//   }
//   state = {
//     bucketLocale: '',
//     watsonFood: [],
//     watsonPicker: '',
//     nutrition: {},
//   }

//   handleSubmit(){
//     this.props.addToFoodLogThunker(this.state.nutrition)
//   }

//   async nutrionixCall(itemValue){
//     try {
//       await this.setState({ watsonPicker: itemValue })
//       if (itemValue !== 'non-food') {
//         let result = await axios.get(
//           `https://nutri-yum.herokuapp.com/api/nutri/${
//             this.state.watsonPicker
//           }`
//         )
//         this.setState({ nutrition: result.data })
//         this.props.setNutrition([result.data])
//         this.props.navigation.navigate('NutritionInfo')
//       }
//     } catch (error) {
//       console.error(error)
//       return <Text>{error.message}</Text>
//     }
//   }

//   async clearFoodState() {
//     await this.setState({
//       bucketLocale: '',
//       watsonFood: [],
//       watsonPicker: '',
//       nutrition: {},
//     })
//     const resetAction = StackActions.reset({
//       index: 0,
//       actions: [NavigationActions.navigate({ routeName: 'MyCameraScreen' })],
//     });
//     this.props.navigation.dispatch(resetAction);
//     this.props.removeCurrentPhoto();
//     this.props.removeCurrentMatch();
//     this.props.removeNutrition();
//   }

//   send = async (photo, photoName) => {
//     const file = {
//       uri: this.props.photo.photo.uri,
//       name: this.props.photo.photoName,
//       type: 'image/png'
//     }
//     //call amazon
//     if (!this.state.bucketLocale) {
//       await RNS3.put(file, options).then(response => {
//         if (response.status !== 201)
//           throw new Error('Failed to upload image to S3')
//         this.setState({
//           bucketLocale: response.body.postResponse.location
//         })
//         console.log('from amazon', this.state.bucketLocale)
//       })
//       //call watson
//       const response = await axios.get(
//         `https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=${watsonKey}&url=${
//           this.state.bucketLocale}&version=2018-03-19&classifier_ids=food`
//       )
//       let result = response.data.images[0].classifiers[0].classes
//       await this.setState({ watsonFood: result })
//       await this.props.setCurrentMatch(result);
//       console.log('from watson', this.state, this.props)
//       //clear out state
//       // this.setState({ bucketLocale: '', watsonPicker: '', nutrition: {} })
//     }
//   }

//   componentWillMount(){
//     let {photo, photoName} = this.props.photo
//     send(photo.uri, photoName)
//   }

//   render() {
//     const { navigation } = this.props
//     let {photo, photoName} = this.props.photo

//     return (
//       <Container>
//         {/* <Header />
//         <Content>
//           {photo ? (
//             <Card>
//               <CardItem>
//                 <Left>
//                     <Thumbnail
//                     large
//                     source={{ uri: photo.uri }}
//                   />
//                 </Left>
//                 <Body>
//                   {this.state.watsonPicker}
//                 </Body>
//                 <Right>
//                 <Right>
//                   <Button
//                     transparent
//                     onPress={() => this.clearFoodState()}
//                     >
//                     <Icon active name="thumbs-down" />
//                     <Text>Clear Picture</Text>
//                   </Button>
//                 </Right>
//                 </Right>
//               </CardItem>
//             </Card>
//           ) : (
//             <View>
//               <Text>Go to camera or manual entry to enter a food item</Text>
//             </View>  
//           )} */}

//           {/* {this.state.watsonFood.length > 0 ? (
//             <View>
//                   {this.state.watsonFood.map((item, index) => {
//                     return (
//                       <Card>
//                       <CardItem button 
//                       onPress={()=> this.nutrionixCall(item.class)}>
//                         <Left>
//                           {item.class}
//                         </Left>

//                         <Right>{item.score}</Right>
//                         </CardItem>
//                         </Card>
//                     )})
//                   }
//             </View>
//           ) : null} */}


//         {/* </Content> */}
//       </Container>
//     )
//   }
// }
// const mapState = state => {
//   return {
//     user: state.currentUser,
//     photo: state.currentPhoto,
//     foodMatch: state.currentMatch
//   }
// }

// const mapDispatch = { setCurrentPhoto, removeCurrentPhoto, addToFoodLogThunker, setCurrentMatch }

// export default connect(mapState, mapDispatch)(MyFoodScreen)

