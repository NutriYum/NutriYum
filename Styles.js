import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
  snapIconContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 60
  },
  snapIcon: {
    color: '#fff',
    fontSize: 50,
    margin: -10
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
  targetContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  targetPrompt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 25,
    opacity: .8,
    borderRadius: 3,
  },
  altTarget: {
    borderColor: '#fff',
    marginTop: 72,
    borderWidth: 5,
    padding: 115,
    borderRadius: 10,
    borderStyle: 'dashed',
    opacity: .5,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    flex: 1,
    margin: 20
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
  },
  header: {
    backgroundColor: '#0099FF',
    paddingTop: 25,
    borderBottomColor: '#ffdb4d',
    borderBottomWidth: 3
  },
  manualTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 20
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
    opacity: .5,
    marginBottom: 60,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  loginButton: {
    backgroundColor: '#0099FF',
    width: 350,
    height: 50,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 15,
    borderColor: '#ffdb4d',
    borderBottomWidth: 3
  },
  logo: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  }
})
