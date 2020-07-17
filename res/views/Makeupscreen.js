import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style/Styles';
import {Icon} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-community/picker';
import {getData, removeData, storeData} from '../utils/asyncstorage';

const URLS = {
  MAKEUP: 'http://124.156.143.125:5000/makeup?',
  BRANDS: 'http://124.156.143.125:5000/lipstick-brand',
  SERIES: 'http://124.156.143.125:5000/lipstick-series?',
  LIPSTICKS: 'http://124.156.143.125:5000/lipsticks?',
};

const PICKER_MODE = 'dropdown';

export default class Makeupscreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoData: null,
      photoPath: null,
      photoMime: null,
      photoUpdateData: null,
      photoUpdateMime: null,
      changePhoto: false,
      brands: [],
      series: [],
      lipsticks: [],
      selectedColor: null,
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
        changePhoto: true,
      });
      storeData('photoData', image.data);
      storeData('photoPath', image.path);
      storeData('photoMime', image.mime);
    });
  };

  processImage = () => {
    const color = this.state.selectedColor.replace('#', '');
    console.log(color);
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
        changePhoto: false,
      });
    }).catch(err => {
      alert(err);
    });
  };

  clearImage = () => {
    removeData('photoData');
    removeData('photoPath');
    removeData('photoMime');
    this.setState({
      photoData: null,
      photoPath: null,
      photoMime: null,
      changePhoto: false,
    });
  };

  renderImage = () => {
    if (this.state.photoPath && this.state.selectedLipstick) {
      console.log('renderImage:', this.state.photoPath, this.state.selectedLipstick);
      return (
        <View style={styles.Container}>
          <TouchableOpacity onPress={this.chooseImage}>
            {this.state.photoUpdateData && !this.state.changePhoto
              ? <Image source={{uri: `data:${this.state.photoUpdateMime};base64,${this.state.photoUpdateData}`}} style={styles.imgWindow}/>
              : <Image source={{uri: `data:${this.state.photoMime};base64,${this.state.photoData}`}} style={styles.imgWindow}/>
            }
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.clearImage} style={[styles.btnProcess, {width: 90, borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
              <Text style={styles.btnText}>CLEAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.processImage} style={[styles.btnProcess, {width: 120, borderRadius: 0, marginHorizontal: 3}]}>
              <Text style={styles.btnText}>PROCESS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnProcess, {width: 90, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}]}>
              <Text style={styles.btnText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.Container}>
          <TouchableOpacity onPress={this.chooseImage} style={styles.btnChoose}>
            <Icon type={'font-awesome-5'} name={'camera-retro'} size={100} color={'white'}/>
          </TouchableOpacity>
        </View>
      );
    }
  };

  componentDidMount = async () => {
    console.log('componentDidMount');
    this.setState({
      photoData: await getData('photoData'),
      photoPath: await getData('photoPath'),
      photoMime: await getData('photoMime'),
    });
    fetch(URLS.BRANDS).then((response) => response.json()).then(responseJson => {
      this.setState({brands: responseJson});
    }).catch(error => {
      alert(error);
    });
  };

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

  onLipstickSelected = (lipstick_id, itemIndex) => {
    console.log('onLipstickSelected:', lipstick_id);
    if (lipstick_id) {
      this.setState({
        selectedColor: this.state.lipsticks[itemIndex]['color'],
        selectedLipstick: lipstick_id,
      });
      console.log('onLipstickSelected:', this.state.selectedLipstick);
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
      <LinearGradient colors={['#7028e4', '#e5b2ca']} start={{x: 0, y: 0}} end={{x: 0.8, y: 0.8}} style={styles.MakeupContainer}>

        <View style={styles.PickerContainer}>
          <View style={styles.PickerLabel}>
            <Text style={styles.PickerLabelText}>BRAND</Text>
          </View>
          <Picker mode={PICKER_MODE} selectedValue={this.state.selectedBrand} style={styles.Picker}
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
          <Picker mode={PICKER_MODE} selectedValue={this.state.selectedSeries} style={styles.Picker}
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
          <Picker mode={PICKER_MODE} selectedValue={this.state.selectedLipstick} style={styles.Picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.onLipstickSelected(itemValue, itemIndex)
                  }>
            {this.state.lipsticks.map((lipstick, index) => (
              <Picker.Item key={index} label={lipstick.name} value={lipstick.lipstick_id}/>
            ))}
          </Picker>
        </View>

        {this.renderImage()}
      </LinearGradient>
    );
  }
}
