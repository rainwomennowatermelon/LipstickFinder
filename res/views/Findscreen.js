import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { styles } from '../style/Styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


export default class Findscreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filePath: '',
      fileData: '',
      fileUri: ''
    }
  }

  chooseImage = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert("ImagePicker Error: " + response.error);
      } else {
        console.log('response.path: ', JSON.stringify(response.path));
        this.setState({
          filePath: response.path,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  renderFileUri() {
  	console.log("renderFileUri: " + this.state.fileUri)
    if (this.state.fileUri) {
      return <Image source={{ uri: this.state.fileUri }} style={styles.images} />
    } else {
    	return <FontAwesomeIcon name={'image'} size={200} color={'#999'}/>
      // return <Image source={require('../images/test2.png')} style={styles.images} />
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.ImageSections}>
            {this.renderFileUri()}
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
              <Text style={styles.btnText}>Choose Profile Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}