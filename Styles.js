import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
  snapIconContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center'
  },
  snapIcon: {
    color: '#fff',
    fontSize: 50
  },
  centerItems: {
    justifyContent: 'center'
  },
  foodListText: {
    fontSize: 24
  },
  pickerListText: {
    fontSize: 24
  },
  header: {
    backgroundColor: '#d3d3d3', 
    paddingTop: 25,
    borderBottomColor: '#ffdb4d',
    borderBottomWidth: 3
  },
  manualTextInput: {
    height: 40, borderColor: 'gray', borderWidth: 1
  },
  container: {
    margin: 20,
    marginTop: 50
},
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
    opacity: .5,
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
})