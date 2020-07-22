import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from './Colors';

var devwidth = Dimensions.get('window').width;
const PICKER_BORDER_RADIUS = 5;

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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: Dimensions.get('screen').width * 0.68,
    minWidth: 200,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    marginBottom: 13,
  },
  AccountButtonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  RegisterReminder: {
    width: devwidth - 100,
    height: 20,
    fontSize: 15,
    borderColor: 'gray',
  },
  // FindScreen
  upperContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  ScrollViewContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgWindow: {
    width: devwidth * 0.68,
    height: devwidth * 0.68,
    minWidth: 200,
    minHeight: 200,
  },
  btnProcess: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: devwidth * 0.68,
    minWidth: 90,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    elevation: 10, // Android Shadow
    shadowColor: 'rgba(0,0,0, 0.5)', // IOS
    shadowOffset: {height: 5, width: 5}, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 10, //IOS
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btnChoose: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: devwidth * 0.68,
    height: devwidth * 0.68,
    minWidth: 200,
    minHeight: 200,
    borderRadius: devwidth * 0.34,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  slider: {
    backgroundColor: COLORS.SLIDER_BACKGROUND,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  lipstickList: {
    marginTop: 10,
  },
  // makeup
  MakeupContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  PickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    backgroundColor: 'white',
    borderRadius: PICKER_BORDER_RADIUS,
    margin: 5,
  },
  PickerLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    backgroundColor: 'black',
    borderTopLeftRadius: PICKER_BORDER_RADIUS,
    borderBottomLeftRadius: PICKER_BORDER_RADIUS,
  },
  PickerLabelText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  Picker: {
    flex: 3,
  },
  QuestionaireContainer: {
    flex: 1,
    width: '100%',
  },
  Questionlabel: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    shadowColor: '#2b5876', //only ios
    shadowOffset: {
    	width: 5,
    	height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation:1.5, //only android >=android 5.0
    textAlign: 'center',
    marginBottom: 5
  },
  checkboxContainer: {
    width: (devwidth - 50) / 2,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  title: {
    margin: 8,
    fontSize: 32,
  },
  choices: {
    width: devwidth - 30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
    marginBottom: 5,
  },
  questions: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
  },
  questioncontainer: {
    flex: 1,
    width: devwidth * 0.75,
    marginTop: 10,
    marginBottom: 10,
  },
  selection: {
    marginTop: 10,
    marginBottom: 10,
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
    height: 500,
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
    borderRadius: 10,
    justifyContent: 'flex-start',
    borderWidth: 1,
    marginHorizontal: 30,
    marginVertical: 10,
    borderColor: '#3c3c3c',
    overflow: 'hidden',
  },
  btnSave: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    height: 30,
    justifyContent: 'center',
    borderRadius: 15,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 45,
  },
  textSave: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 5,
  },
});
