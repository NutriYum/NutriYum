import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux';

import { signup } from '../redux/auth';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName:'',
      email: '',
      password1: '',
      password2: '',
      error: ''
    };
    // this.warning = this.warning.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    setInterval(()=>{console.log(this.state)}, 1000)
  }

  async handleSubmit() {
    if (this.state.email && this.state.password1 && this.state.password1 === this.state.password2) {
      const email = this.state.email;
      const password = this.state.password1;
      this.props.signup({
        email,
        password
      }, this.props.navigation);
      // clear the state after signup for security
      this.setState({
        userName:'',
        email: '',
        password1: '',
        password2: '',
        error: ''
      });
    } else {
      this.setState({
        password1: '',
        password2: '',
        error: 'Email and password cannot be empty.  Passwords must also match.'
      });
    }
  }

warning(){
    if (this.props.error){
      return <Text style={{fontWeight: 'bold',color: 'red', textShadowColor: 'black', fontSize: 16}}> {this.props.error.response.data} </Text>
  }
}

  render() {
   return (
    <KeyboardAvoidingView behavior="padding" enabled>

        <Form name='signup'>
        <ScrollView>
        <Item stackedLabel>
          <Label>Username</Label>
            <Input 
                name="userName"
                autoCapitalize='none'
                value={this.state.userName}
                onChangeText={(text)=> this.setState({userName: text})}
            />
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
            <Input 
                name="email"
                autoCapitalize='none'
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(text)=> this.setState({email: text})}
            />
        </Item>

        <Item stackedLabel>
          <Label>Password</Label>
            <Input 
                name="password"
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(text)=> this.setState({password1: text})}
            />
        </Item>

                
        <Item stackedLabel last
        // style={{marginBottom: 40}}
        >
          <Label>Confirm Password</Label>
            <Input 
                name="confirm password"
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(text)=> this.setState({password2: text})}
            />
        </Item>
        </ScrollView>
        <Button
          style={{marginBottom: 40}}
          title="signup!"
          type="submit"
          onPress={this.handleSubmit}
        />
                
              <Item style={{marginTop: 20}}>
              {this.warning()}
              </Item>
              </Form>

    </KeyboardAvoidingView>
  );
 }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    error: state.currentUser.error
  }
 }

const mapDispatchToProps = (dispatch) => ({
  signup: (credentials, navigation) => dispatch(signup(credentials, navigation))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    flex: 1
  },
  textLabel: {
    fontSize: 20,
    marginTop: 10,
    padding: 10
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    color: 'tomato',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5
  },
  button: {
    backgroundColor: 'gray',
    width: 150,
    height: 40,
    borderRadius: 5,
    alignSelf: 'center'
  },
  error: {
    fontSize: 15,
    color: 'blue',
    marginVertical: 0,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
});
