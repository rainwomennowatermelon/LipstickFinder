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
  }
});
