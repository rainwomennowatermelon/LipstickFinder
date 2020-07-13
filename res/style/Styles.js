import React, { Component } from 'react';
import { StyleSheet, Dimensions} from 'react-native';

var devwidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  Container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  ViewForHeader:{
    width:devwidth-30,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },
  Header:{
    fontSize:25
  },
  ViewForAccountInput:{
    width:devwidth-100,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    margin:5
  },
  AccountInput:{
    width:devwidth-90,
    height:40,
    borderColor:'gray',
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center'
  },
  AccountButton:{     
    width:devwidth - 150,
    height:35,
    borderRadius:5,
    alignSelf:'center',
    backgroundColor:'black',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  AccountButtonText:{
    fontSize:20,
    color:'white',
    fontWeight:'bold'
  },
  RegisterReminder:{
    width:devwidth-100,
    height:20,
    fontSize:15,
    borderColor:'gray',
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
    height: '100%'
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
    fontWeight:'bold'
  },
  btnChoose: {
    alignItems:'center',
    justifyContent:'center',
    width: Dimensions.get('screen').width * 0.68,
    height: Dimensions.get('screen').width * 0.68,
    minWidth: 200,
    minHeight: 200,
    borderRadius: Dimensions.get('screen').width * 0.34,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
