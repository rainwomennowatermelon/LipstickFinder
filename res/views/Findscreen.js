import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style/Styles';
import {Icon, ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import {COLORS} from '../style/Colors';

const PREDICT_URL = 'http://124.156.143.125:5000/predict';

export default class Findscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      fileUri: null,
      lipsticks: [],
    };
  }

  chooseImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {skipBackup: true, path: 'images'},
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        console.log('ImagePicker Success:', response.path);
        this.setState({
          photo: response,
          fileUri: response.uri,
        });
        console.log(response.uri);
      }
    });
  };

  processImage = () => {
    const photo = this.state.photo;
    RNFetchBlob.fetch(
      'POST',
      PREDICT_URL,
      {
        Authorization: 'Bearer access-token',
        'Content-Type': 'application/octet-stream',
      }, [{
        name: 'file',
        filename: photo.fileName,
        type: photo.type,
        data: RNFetchBlob.wrap(photo.uri),
      }]).then(res => {
      this.setState({
        lipsticks: res.json(),
      });
    }).catch(err => {
      alert(err);
    });
  };

  renderImage = () => {
    if (this.state.fileUri) {
      return (
        <View style={styles.upperContainer}>
          <TouchableOpacity onPress={this.chooseImage}>
            <Image source={{uri: this.state.fileUri}} style={styles.imgWindow}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.processImage} style={styles.btnProcess}>
            <Text style={styles.btnText}>PROCESS</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={this.chooseImage} style={styles.btnChoose}>
            <Icon type={'font-awesome-5'} name={'camera-retro'} size={100} color={'white'}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <LinearGradient colors={[COLORS.PRIMARY_START, COLORS.PRIMARY_END]} start={{x: 0, y: 0}} end={{x: 0.8, y: 0.8}} style={styles.Container}>

        {this.renderImage()}

        <View style={styles.bottomContainer}>
          <ScrollView>
            {this.state.lipsticks.map((l, index) => (
              <ListItem key={index} chevron title={l.brand} subtitle={l.seriesName + l.lipStickName} bottomDivider
                        leftIcon={{name: 'square-full', type: 'font-awesome-5', color: l.lipStickColor}}/>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
