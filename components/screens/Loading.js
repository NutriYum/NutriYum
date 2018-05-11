import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';
class Loader extends Component {
  constructor(props){
    super(props)
  }
  render()  { 
    const { loading } = this.props;
    console.log(loading)
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
            </View> 
          </View>
        </Modal>
      )}
}
// const styles = StyleSheet.create({

// });

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader;