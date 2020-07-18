import React, { Component } from 'react';
import {
  Button,
  View,
  Text,
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ListView,
  Keyboard,
  TextInput
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles, accountStyles } from '../../style/Styles.js';
import { Header } from './AccountHeader.js';
import {getData, storeData} from '../../utils/asyncstorage';
import {encrypt} from '../../utils/security.js';

const URLS = {
  RESETPWD: 'http://124.156.143.125:5000/resetPwd',
};

export default class Changepwdscreen extends Component {

  static defaultProps = {
        placeHolderCurrentPassword:"Current Password",
        placeHolderNewPassword:"New Password",
        placeHolderConfirmPassword:"Confirm Password"
  };

  //inital
  constructor(props) {
      super(props);
      this.state = {
        userID: null,
        pwd: null,
        email: null,
        newPassword: "",
        currentPassword: "",
        confirmPassword: ""
      };
  }

  //check whether the input password is more than 8 digits
  validate_password = (password) => {
    const passwordValid = password.length >= 8;
    return passwordValid;
  }

  // reset password
  changePassword = async() => {

      let userID = await getData("uid");
      let pwd = await getData("password");
      let email = await getData("email");
      this.setState({userID: userID, pwd: pwd, email: email});
      // const userID = this.state.userID;
      // const pwd = this.state.pwd;
      const currentPassword = this.state.currentPassword;
      const newPassword = this.state.newPassword;
      // const email = this.state.email;

      const encryptCurrentPassword = encrypt(email, currentPassword);
      const encryptNewPassword = encrypt(email, newPassword);

      console.log("=============");
      console.log(userID, pwd, encryptCurrentPassword, encryptNewPassword, newPassword);

      if (pwd == encryptCurrentPassword){ //validate user
        fetch(URLS.RESETPWD, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID: userID,
            pwd: encryptCurrentPassword,
            newPwd: encryptNewPassword,
          })
        });
        alert('Reset Success!')
        storeData("password", encryptNewPassword);
        this.setState({currentPassword: '', newPassword: '', confirmPassword: ''});

      }else{
        alert('False Current Password');
      }
  }

  onbtnSavePress() {
      const passwordValid = this.validate_password(this.state.newPassword);
      // console.log(passwordValid);
      if (this.state.currentPassword.trim().length == 0) {
          alert('Please enter current password');
      } else if (this.state.newPassword.trim().length == 0) {
          alert('Please enter new password.');
      } else if (this.state.newPassword != this.state.confirmPassword) {
          alert('Password dose not match');
      } else {
          // Keyboard.dismiss();
          if (passwordValid){
             this.changePassword();
          }else{
              alert('New password should be more than 8 digits');
          }
      }
  }

  render() {
    return (
      <>
        <Header title="Reset Password"/>
        <View style={accountStyles.container}>
            <View style={accountStyles.bottomView}>
                <View style={accountStyles.inputView}>
                    <TextInput
                      style={accountStyles.inputText}
                      placeholder={this.props.placeHolderCurrentPassword}
                      multiline={false}
                      placeholderTextColor={"#3c3c3c"}
                      autoCorrect={false}
                      underlineColorAndroid={'transparent'}
                      secureTextEntry={true}
                      onChangeText={(currentPassword) => this.setState({currentPassword})}
                      value={this.state.currentPassword}>
                    </TextInput>
                </View>
                <View style={accountStyles.inputView}>
                    <TextInput
                      style={accountStyles.inputText}
                      placeholder={this.props.placeHolderNewPassword}
                      multiline={false}
                      placeholderTextColor={"#3c3c3c"}
                      autoCorrect={false}
                      underlineColorAndroid={'transparent'}
                      secureTextEntry={true}
                      onChangeText={(newPassword) => this.setState({newPassword})}
                      value={this.state.newPassword}>
                    </TextInput>
                </View>
                <View style={accountStyles.inputView}>
                    <TextInput
                      style={accountStyles.inputText}
                      placeholder={this.props.placeHolderConfirmPassword}
                      multiline={false}
                      placeholderTextColor={"#3c3c3c"}
                      autoCorrect={false}
                      underlineColorAndroid={'transparent'}
                      secureTextEntry={true}
                      onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                      value={this.state.confirmPassword}>
                    </TextInput>
                </View>
                <TouchableOpacity
                    style={accountStyles.btnSave}
                    activeOpacity={0.6}
                    onPress={() => this.onbtnSavePress()}>
                    <Text style={accountStyles.textSave} numberOfLines={1}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>

      </>
    );
  }
}
