import React, {Component} from 'react';
import {KeyboardAvoidingView, Text, TouchableOpacity, View} from 'react-native';
// import Picker from 'react-native-picker';
import {accountStyles, styles} from '../../style/Styles.js';
import {Header} from './AccountHeader.js';
import {Avatar, ListItem} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {getData} from '../../utils/asyncstorage';

const URLS = {
  UPPROFILEINFO: 'http://124.156.143.125:5000/updateProfileInfo',
  UPPROFILEIMAGE: 'http://124.156.143.125:5000/updateProfileImage',
  USERINFO: 'http://124.156.143.125:5000/getUserInfo?',
  PROFILEIMAGE: 'http://124.156.143.125:5000/getUserProfileImage?',
};

const PROFILE_PATH = 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';

export default class Accounteditscreen extends Component {

  //inital
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      userID: null,
      pwd: null,
      gender: null,
      profilePath: null,
      profileData: null,
      profileMime: null,
      selectedIndex: null,
      ifPickImage: false, //check if the ImagePicker is used
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  // update index of gender button and save state
  updateIndex = (index) => {
    this.setState({selectedIndex: index});
    if (index == 0) {
      this.state.gender = 'male';
    } else if (index == 1) {
      this.state.gender = 'female';
    } else {
      this.state.gender = 'others';
    }
  };

  //change profiel image
  clickHead() {
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
        ifPickImage: true,
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
    const pwd = this.state.pwd;
    const gender = this.state.gender;
    const name = this.state.name;
    // console.log("upload:", typeof profileMime, typeof userID, typeof profileData);
    // console.log(this.state.ifPickImage);
    console.log(userID);

    if (this.state.ifPickImage) {
      RNFetchBlob.fetch('POST', URLS.UPPROFILEIMAGE, {
        Authorization: 'Bearer access-token',
        'Content-Type': 'application/octet-stream',
      }, [
        {name: 'file', type: profileMime, filename: 'userID.jpg', data: profileData},
        {name: 'userID', data: String(userID)},
        {name: 'pwd', data: pwd},
      ]).then(res => {
        this.setState({
          profileData: res['data'],
          profileMime: res['Content-Type'],
        });
      }).catch(err => {
        alert(err);
      });
      this.setState({ifPickImage: false});
    }

    fetch(URLS.UPPROFILEINFO, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        gender: gender,
        userID: userID,
        pwd: pwd,
      }),
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
          avatarStyle={{borderRadius: 145 / 2}}
          overlayContainerStyle={{backgroundColor: 'transparent'}}
          showAccessory
          onAccessoryPress={() => this.clickHead()}
          // onPress={() => console.log('edit button pressed')}
        />
      </View>
    );
  };


  async componentDidMount() {
    const userID = await getData('uid');
    const pwd = await getData('password');

    this.setState({userID: userID, pwd: pwd});

    // const userID = this.state.userID;
    // const pwd = this.state.pwd;
    // console.log("const", userID, pwd);
    // console.log("state", this.state.userID, this.state.pwd);

    fetch(URLS.USERINFO + `userID=${userID}&pwd=${pwd}`).then(response => response.json()).then(responseJ => {
      this.setState({
        name: responseJ['name'],
        userID: responseJ['ID'],
        gender: responseJ['gender'],
      });
      const gender = this.state.gender;
      if (gender == 'male') {
        this.setState({selectedIndex: 0});
      } else if (gender == 'female') {
        this.setState({selectedIndex: 1});
      } else {
        this.setState({selectedIndex: 2});
      }
    }).catch(error => {
      console.error(error);
    });


    RNFetchBlob.fetch('GET', URLS.PROFILEIMAGE + `userID=${userID}&pwd=${pwd}`, {
      Authorization: 'Bearer access-token',
      'Content-Type': 'application/octet-stream',
    }).then(response => {
      this.setState({
        profileData: response['data'],
        profileMime: response['Content-Type'],
      });
      // console.log(response.text());
      if (response.text() == 'No image') {
        this.setState({profilePath: PROFILE_PATH});
      } else { //display the image in DB
        this.setState({profilePath: `data:${this.state.profileMime};base64,${this.state.profileData}`});
      }

    }).catch(err => {
      alert(err);
    });
  }

  render() {
    return (
      <>
        <Header title="Profile"/>
        <KeyboardAvoidingView
          style={{marginTop: 15, backgroundColor: 'rgba(241,240,241,1)'}}
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
                onChangeText: text => this.setState({name: text}),
              }}

            />
            <ListItem
              title="Gender"
              buttonGroup={{
                buttons: ['Male', 'Female', 'others'],
                containerStyle: {height: 40},
                selectedButtonStyle: {backgroundColor: 'black'},
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
