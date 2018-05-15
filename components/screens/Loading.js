import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
} from 'react-native';
import styles from '../../Styles'


class Loader extends Component {
  constructor(props){
    super(props)
  }
  render()  {
    const { loading } = this.props;
    // console.log(loading)
    return (
        <Modal
          visible={loading}
          transparent={true}
          animationType='none'
          onRequestClose={()=>{
            // return loading = false
          }}
          >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={true}
                size="large"
                color="#0000ff"
                />
              <Text>Watson's on it!</Text>
            </View>
          </View>
        </Modal>
      )}
}

export default Loader;
