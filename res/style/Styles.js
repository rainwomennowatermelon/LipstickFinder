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
  scrollView: {
    backgroundColor: 'red',
  },
  body: {
    // backgroundColor: 'white',
    // justifyContent: 'center',
    // height: Dimensions.get('screen').height,
    // width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center'
  },
  images: {
    width: Dimensions.get('screen').width * 0.68,
    height: Dimensions.get('screen').width * 0.68,
    borderColor: 'black',
    borderWidth: 1,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  btnSection: {
    width: Dimensions.get('screen').width * 0.68,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  }
});
