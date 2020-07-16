import React, { Component} from 'react';
import { ScrollView, View, Text, List, Picker, TextInput, KeyboardAvoidingView, TouchableHighlight, TouchableOpacity } from 'react-native';
// import Picker from 'react-native-picker';
import { styles, accountStyles } from '../../style/Styles.js';
import { Header } from './AccountHeader.js';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

const URLS = {
  PROFILE: 'http://124.156.143.125:5000/updateProfile',
  USERINFO: 'http://124.156.143.125:5000/getUserInfo?',
  PROFILEIMAGE: 'http://124.156.143.125:5000/getUserProfileImage?'
};
const PROFILE_PATH = 'res/images/logo1.png';

export default class Accounteditscreen extends Component{

  //inital
  constructor(props) {
    super(props);
    this.state = {
      name: 'Paul Allen',
      userID: 1,
      gender: null,
      profilePath: PROFILE_PATH,
      profileData: null,
      profileMime: null,
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  // update index of gender button and save state
  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
    if (selectedIndex == 0){
      this.state.gender='Male';
    }else if (selectedIndex == 1){
      this.state.gender='Female';
    }else{
      this.state.gender='others';
    }
  }

  //change profiel image
  clickHead(){
      ImagePicker.openPicker({
        width: 512,
        height: 512,
        cropping: true,
        mediaType: 'photo',
        includeBase64: true,
        compressImageMaxWidth: 512,
        compressImageMaxHeight: 512,
        compressImageQuality: 1,
        cropperCircleOverlay: true,
        avoidEmptySpaceAroundImage: true, // ios
      }).then(image => {
        this.setState({
          profilePath: image.path,
          profileData: image.data,
          profileMime: image.mime,
        });
        // console.log('received image', this.state.profileData);
      })
      .catch((e) => {
        alert(e);
      });
  }

  //update user profile image, name, gender when press "save" button
  uploadProfile = () => {
    const profileData = this.state.profileData;
    const profileMime = this.state.profileMime;
    const userID = this.state.userID;
    const gender = this.state.gender;
    const name = this.state.name;
    // console.log("upload:", typeof profileMime, typeof userID, typeof profileData);
    RNFetchBlob.fetch('POST', URLS.PROFILE, {
      Authorization: 'Bearer access-token',
      'Content-Type': 'application/octet-stream',
    }, [
      {name: 'file', type: profileMime, filename: 'userID.jpg', data: profileData},
      {name: 'userID', data: String(userID)},
      {name: 'gender', data: gender},
      {name: 'name', data: name},
    ]).then(res => {
      this.setState({
        profileData: res['data'],
        profileMime: res['Content-Type'],
      });
    }).catch(err => {
      alert(err);
    });
  };

  renderAvatar = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 90,
          marginBottom: 90,
        }}
      >
      <Avatar
        size={135}
        source={{uri: this.state.profilePath}}
        activeOpacity={0.7}
        avatarStyle={{ borderRadius: 145 / 2 }}
        overlayContainerStyle={{ backgroundColor: 'transparent' }}
        showAccessory
        onAccessoryPress={()=> this.clickHead()}
        // onPress={() => console.log('edit button pressed')}
      />
      </View>
    )
  }

  renderName = () =>{
    return(
      <Picker
        selectedValue={this.state.gender}
        style={{ height: 60}}
        onValueChange={this.updateGender}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Others" value="Others" />
      </Picker>
    );
  }

  componentDidMount(){
    fetch(URLS.USERINFO + `userID=${this.state.userID}`).then(response => response.json()).then(responseJ => {
      this.setState({
        name: responseJ['name'],
        userID: responseJ['ID'],
        gender: responseJ['gender'],
      });
      if (this.state.gender == 'Male'){
        this.state.selectedIndex = 0;
      }else if (this.state.gender == 'Female'){
        this.state.selectedIndex = 1;
      }else{
        this.state.selectedIndex = 2;
      }
    }).catch(error => {
      console.error(error);
    });

    RNFetchBlob.fetch('GET', URLS.PROFILEIMAGE + `userID=${this.state.userID}`, {
      Authorization: 'Bearer access-token',
      'Content-Type': 'application/octet-stream',
    }).then(response => {
      this.setState({
          profileData: response['data'],
          profileMime: response['Content-Type'],
        });
        // console.log(this.state.profileData);
        this.setState({profilePath: `data:${this.state.profileMime};base64,${this.state.profileData}`});
    }).catch(err => {
      alert(err);
    });
  }
  render(){
    return (
      <>
        <Header title="Settings"/>
        <KeyboardAvoidingView
          style={{marginTop: 15, backgroundColor: 'rgba(241,240,241,1)' }}
        >

            {this.renderAvatar()}

            <View style={styles.list}>
              <ListItem
                title="Name"
                chevron
                bottomDivider
                input={{
                  placeholder: this.state.name,
                  input: this.state.name,
                  onChangeText: text => this.setState({name: text})
                }}

              />
              <ListItem
                title="Gender"
                buttonGroup={{
                  buttons: ['Male', 'Female', 'others'],
                  containerStyle: {height: 40},
                  selectedButtonStyle: {backgroundColor: '#CA7476'},
                  selectedIndex: this.state.selectedIndex,
                  onPress: (index) => this.updateIndex(index),
                }}
                bottomDivider
              />
              <TouchableOpacity
                style={accountStyles.btnSave}
                activeOpacity={0.6}
                onPress={() => this.uploadProfile()}
              >
                  <Text style={accountStyles.textSave} numberOfLines={1}>Save</Text>
              </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>

      </>


    );
  }

}
