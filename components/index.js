import React from 'react'
import { Provider } from 'react-redux'
import { createRootNavigator } from './router'
import { isSignedIn } from './auth'
import { AppLoading, Font } from 'expo'
import { Root } from 'native-base'
import store from './store'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      checkedSignIn: false,
      loading: true
    }
  }

  async componentWillMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(error => console.error(error))

    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    })
    this.setState({ loading: false })
  }

  render() {
    const { checkedSignIn, signedIn } = this.state

    if (!checkedSignIn) {
      return null
    }

    const Layout = createRootNavigator(signedIn)

    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <Root>
        <Provider store={store}>
          <Layout />
        </Provider>
      </Root>
    )
  }
}
