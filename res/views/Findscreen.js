import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Header,
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


const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


export default class Findscreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filepath: {
        data: '',
        uri: ''
      },
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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert("ImagePicker Error: " + response.error);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response.path,
          fileData: response.data,
          fileUri: response.uri
        });
      }
    });
  }

  // launchCamera = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchCamera(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //       alert("ImagePicker Error: " + response.error);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response.path: ', response.path);
  //       this.setState({
  //         filePath: response.path,
  //         fileData: response.data,
  //         fileUri: response.uri
  //       });
  //     }
  //   });
  // }

  // launchImageLibrary = () => {
  //   let options = {
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   ImagePicker.launchImageLibrary(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //       alert("ImagePicker Error: " + response.error);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response', JSON.stringify(response));
  //       this.setState({
  //         filePath: response,
  //         fileData: response.data,
  //         fileUri: response.uri
  //       });
  //     }
  //   });
  // }

  // renderFileData() {
  //   if (this.state.fileData) {
  //     return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }} style={styles.images} />
  //   } else {
  //     return <Image source={require('../images/test1.jpg')} style={styles.images} />
  //   }
  // }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{ uri: this.state.fileUri }} style={styles.images} />
    } else {
    	return <FontAwesomeIcon name={'image'} size={200} color={'#999'} />
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
              <Text style={styles.btnText}>Choose File</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}