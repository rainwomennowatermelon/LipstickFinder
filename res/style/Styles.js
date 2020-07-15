import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

var devwidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewForHeader: {
    width: devwidth - 30,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  Header: {
    fontSize: 25,
  },
  ViewForAccountInput: {
    width: devwidth - 100,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  AccountInput: {
    width: devwidth - 90,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  AccountButton: {
    width: devwidth - 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'black',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AccountButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  RegisterReminder: {
    width: devwidth - 100,
    height: 20,
    fontSize: 15,
    borderColor: 'gray',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // FindScreen
  upperContainer: {
    // flex: 1,
    marginTop: 20,
  },
  centerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgWindow: {
    width: Dimensions.get('screen').width * 0.68,
    height: Dimensions.get('screen').width * 0.68,
    minWidth: 200,
    minHeight: 200,
  },
  btnProcess: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: Dimensions.get('screen').width * 0.68,
    minWidth: 200,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    marginBottom: 10,
    // elevation: 10, // Android Shadow
    // shadowColor: 'rgba(0,0,0, 0.5)', // IOS
    // shadowOffset: {height: 5, width: 5}, // IOS
    // shadowOpacity: 0.2, // IOS
    // shadowRadius: 10, //IOS
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnChoose: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width * 0.68,
    height: Dimensions.get('screen').width * 0.68,
    minWidth: 200,
    minHeight: 200,
    borderRadius: Dimensions.get('screen').width * 0.34,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});

export const accountStyles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
  Gtext: {
    fontSize: 20,
    color: 'gray',
    marginLeft: 7,
  },
  Ninput: {
    fontSize: 16,
    marginLeft: 5,
    color: '#101010',
  },
  container: {
    justifyContent: 'center',
  },
  bottomView: {
    backgroundColor: 'white',
    marginTop: 15,
    height: 100,
  },
  inputText: {
    paddingVertical: 5,
    color: '#3c3c3c',
    marginLeft: 10,
    fontSize: 14,
    textAlign: 'left',
  },
  inputView: {
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'flex-start',
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: '#3c3c3c',
    overflow: 'hidden',
  },
  btnSave: {
    backgroundColor: '#00ACC1',
    paddingHorizontal: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 15,
  },
  textSave: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});
