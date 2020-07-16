import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style/Styles';
import {Icon} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-community/picker';

const URLS = {
  MAKEUP: 'http://124.156.143.125:5000/makeup?',
  BRANDS: 'http://124.156.143.125:5000/lipstick-brand',
  SERIES: 'http://124.156.143.125:5000/lipstick-series?',
  LIPSTICKS: 'http://124.156.143.125:5000/lipsticks?',
};

const PICKER_MODE = 'dropdown';

const storeData = async (key, value) => {
  let storeValue = value;
  if (typeof value !== 'string' || !(value instanceof String)) {
    storeValue = JSON.stringify(value);
  }
  try {
    await AsyncStorage.setItem(key, storeValue);
    console.log('store data:', key);
  } catch (e) {
    console.log('saving error:', e);
  }
};

const getData = async (key, isObject) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('read data:', key);
    if (isObject) {
      return value != null ? JSON.parse(value) : null;
    }
    return value;
  } catch (e) {
    console.log('reading error:', e);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('removing error:', e);
  }
  console.log('removing done:', key);
};

export default class Makeupscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: null,
      photoPath: null,
      photoMime: null,
      photoUpdateData: null,
      photoUpdateMime: null,
      // photoPath: 'file:///storage/emulated/0/Android/data/com.lipstickfinder/files/Pictures/bab61e2c-ff42-43f1-b3db-7ccca431123c.jpg',
      brands: [],
      series: [],
      lipsticks: [],
      selectedBrand: null,
      selectedSeries: null,
      selectedLipstick: null,
    };
  }

  chooseImage = () => {
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
        photoData: image.data,
        photoPath: image.path,
        photoMime: image.mime,
      });
      storeData('photoData', image.data);
      storeData('photoPath', image.path);
      storeData('photoMime', image.mime);
    });
  };

  processImage = () => {
    const color = this.state.selectedLipstick['color'];
    const photoData = this.state.photoData;
    const photoMime = this.state.photoMime;
    RNFetchBlob.fetch('POST', URLS.MAKEUP, {
      Authorization: 'Bearer access-token',
      'Content-Type': 'application/octet-stream',
    }, [
      {name: 'file', type: photoMime, filename: 'filename.jpg', data: photoData},
      {name: 'color', data: color},
    ]).progress((received, total) => {
      // listen to download progress event
      console.log('progress:', received / total);
    }).then(res => {
      this.setState({
        photoUpdateData: res['data'],
        photoUpdateMime: res['Content-Type'],
      });
    }).catch(err => {
      alert(err);
    });
  };

  renderImage = () => {
    if (this.state.photoPath && this.state.selectedLipstick) {
      console.log('renderImage:', this.state.photoPath, this.state.selectedLipstick);
      return (
        <View style={styles.Container}>
          <TouchableOpacity onPress={this.chooseImage}>
            <Image
              source={{uri: `data:${this.state.photoMime};base64,${this.state.photoData}`}}
              style={styles.imgWindow}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.processImage}
            style={styles.btnProcess}>
            <Text style={styles.btnText}>PROCESS</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.Container}>
          <TouchableOpacity onPress={this.chooseImage} style={styles.btnChoose}>
            <Icon
              type={'font-awesome-5'}
              name={'camera-retro'}
              size={100}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  componentDidMount() {
    console.log('componentDidMount');

    AsyncStorage.getItem('photoData').then(value => {
      console.log('componentDidMount read photoData');
      this.setState({photoData: value});
    });
    AsyncStorage.getItem('photoPath').then(value => {
      console.log('componentDidMount read photoPath:', value);
      this.setState({photoPath: value});
    });
    AsyncStorage.getItem('photoMime').then(value => {
      console.log('componentDidMount read photoMime:', value);
      this.setState({photoMime: value});
    });

    fetch(URLS.BRANDS).then((response) => response.json()).then(responseJson => {
      this.setState({brands: responseJson});
      console.log('Brands:', this.state.brands);
    }).catch(error => {
      console.error(error);
    });
  }

  onBrandSelected = (brand_id) => {
    console.log('onBrandSelected:', brand_id);
    this.setState({selectedBrand: brand_id});
    fetch(
      URLS.SERIES + `brand_id=${brand_id}`,
    ).then((response) => response.json()).then(responseJson => {
      this.setState({series: responseJson});
    }).catch(error => {
      console.error(error);
    });
  };

  onSeriesSelected = (series_id) => {
    console.log('onSeriesSelected:', series_id);
    if (series_id) {
      this.setState({selectedSeries: series_id});
      const brand_id = this.state.selectedBrand;
      fetch(
        URLS.LIPSTICKS + `brand_id=${brand_id}&series_id=${series_id}`,
      ).then((response) => response.json()).then(responseJson => {
        this.setState({lipsticks: responseJson});
      }).catch(error => {
        console.error(error);
      });
    }
  };

  onLipstickSelected = (itemValue, itemIndex) => {
    if (itemValue) {
      this.setState({selectedLipstick: this.state.lipsticks[itemIndex]});
      console.log('onLipstickSelected:', itemIndex, this.state.selectedLipstick);
    }
  };

  render() {
    /***
     * blue-pink: {['#E0C3FC', '#A9C9FF']}, {['#d492fe', '#95b5ff']}
     * blue-orange: {['#a6c0fe', '#f68084']}
     * purple-pink: {['#7028e4', '#e5b2ca']}, {['#654ea3', '#eaafc8']}, {['#8929ad', '#e5b2ca']}
     * purple-green: {['#8360c3', '#2ebf91']}
     */
    return (
      <LinearGradient
        colors={['#7028e4', '#e5b2ca']}
        start={{x: 0, y: 0}}
        end={{x: 0.8, y: 0.8}}
        style={styles.MakeupContainer}>

        <View style={styles.PickerContainer}>
          <View style={styles.PickerLabel}>
            <Text style={styles.PickerLabelText}>BRAND</Text>
          </View>
          <Picker
            mode={PICKER_MODE}
            selectedValue={this.state.selectedBrand}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) =>
              this.onBrandSelected(itemValue)
            }>
            {this.state.brands.map((brand, index) => (
              <Picker.Item key={index} label={brand.name} value={brand.id}/>
            ))}
          </Picker>
        </View>

        <View style={styles.PickerContainer}>
          <View style={styles.PickerLabel}>
            <Text style={styles.PickerLabelText}>SERIES</Text>
          </View>
          <Picker
            mode={PICKER_MODE}
            selectedValue={this.state.selectedSeries}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) =>
              this.onSeriesSelected(itemValue)
            }>
            {this.state.series.map((series, index) => (
              <Picker.Item key={index} label={series.name} value={series.id}/>
            ))}
          </Picker>
        </View>

        <View style={styles.PickerContainer}>
          <View style={styles.PickerLabel}>
            <Text style={styles.PickerLabelText}>LIPSTICK</Text>
          </View>
          <Picker
            mode={PICKER_MODE}
            selectedValue={this.state.selectedLipstick}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) =>
              this.onLipstickSelected(itemValue, itemIndex)
            }>
            {this.state.lipsticks.map((lipstick, index) => (
              <Picker.Item key={index} label={lipstick.name} value={lipstick.color}/>
            ))}
          </Picker>
        </View>

        {this.renderImage()}
      </LinearGradient>
    );
  }
}
