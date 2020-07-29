import React, {Component} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style/Styles';
import {Icon} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-community/picker';
import {getData, removeData, storeData} from '../utils/asyncstorage';
import {COLORS} from '../style/Colors';
import Toast from 'react-native-simple-toast';

const URLS = {
  MAKEUP: 'http://124.156.143.125:5000/makeup?',
  BRANDS: 'http://124.156.143.125:5000/lipstick-brand',
  SERIES: 'http://124.156.143.125:5000/lipstick-series?',
  LIPSTICKS: 'http://124.156.143.125:5000/lipsticks?',
  // CHECK: 'http://124.156.143.125:5000/checkLipstickUpdate',
  // LIPSTICKSDB: 'http://124.156.143.125:5000/getLipsticksDB',
};

const PICKER_MODE = 'dropdown';

export default class Makeupscreen extends Component {
  constructor(props) {
    console.debug('constructor');
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
      selectedBrandID: null,
      selectedSeriesID: null,
      selectedLipstick: null,
      selectedLipstickID: null,
      useSelection: true,
      loading: false,
      // lipsticksDB: [],
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
    const color = this.state.useSelection ? this.state.selectedColor : this.props.route.params.color;
    this.setState({loading: true});
    const photoData = this.state.photoData;
    const photoMime = this.state.photoMime;
    RNFetchBlob.fetch('POST', URLS.MAKEUP, {
      Authorization: 'Bearer access-token',
      'Content-Type': 'application/octet-stream',
    }, [
      {name: 'file', type: photoMime, filename: 'filename.jpg', data: photoData},
      {name: 'color', data: color},
    ]).then(res => {
      this.setState({
        photoUpdateData: res['data'],
        photoUpdateMime: res['Content-Type'],
        changePhoto: false,
        loading: false,
      });
    }).catch(err => {
      alert(err);
    });
  };

  clearImage = () => {
    removeData(['photoData', 'photoPath', 'photoMime']);
    this.setState({
      photoData: null,
      photoPath: null,
      photoMime: null,
      changePhoto: false,
    });
  };

  saveImage = () => {
    if (this.state.photoUpdateData) {
      const d = new Date();
      const path = RNFetchBlob.fs.dirs.DCIMDir + `/Images/LipstickFinder${d.getHours()}${d.getMinutes()}${d.getSeconds()}.jpg`;
      RNFetchBlob.fs.writeFile(path, this.state.photoUpdateData, 'base64').then(res => {
        if (res > 0) {
          Toast.showWithGravity('Saved', Toast.SHORT, Toast.CENTER);
        } else {
          Toast.showWithGravity('Error', Toast.SHORT, Toast.CENTER);
        }
      });
    }
  };

  renderImage = () => {
    console.debug('from FindScreen:', this.state.foundBrand, this.state.foundSeries, this.state.foundLipstick);
    if (this.state.photoPath && this.state.selectedLipstickID) {
      console.debug('renderImage:', this.state.photoPath, this.state.selectedLipstickID);
      return (
        <View style={styles.Container}>
          <TouchableOpacity onPress={this.chooseImage}>
            {this.state.photoUpdateData && !this.state.changePhoto
              ? <Image source={{uri: `data:${this.state.photoUpdateMime};base64,${this.state.photoUpdateData}`}} style={styles.imgWindow}/>
              : <Image source={{uri: `data:${this.state.photoMime};base64,${this.state.photoData}`}} style={styles.imgWindow}/>}
          </TouchableOpacity>

          <View style={styles.ColorPickerContainer}>
            {this.props.route.params && this.props.route.params.lipstick &&
            <TouchableOpacity
              onPress={() => this.setState({useSelection: false})}
              style={{flex: 1, borderWidth: this.state.useSelection ? 0 : 3, backgroundColor: this.props.route.params.color}}>
              <Text style={styles.ColorBtnText}>{this.props.route.params.lipstick}</Text>
            </TouchableOpacity>}
            {this.state.selectedLipstick &&
            <TouchableOpacity
              onPress={() => this.setState({useSelection: true})}
              style={{flex: 1, borderWidth: this.state.useSelection ? 3 : 0, backgroundColor: this.state.selectedColor}}>
              <Text style={styles.ColorBtnText}>{this.state.selectedLipstick['name']}</Text>
            </TouchableOpacity>}
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.clearImage}
                              style={[styles.btnProcess, {width: 90, borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
              <Text style={styles.btnText}>CLEAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.processImage}
                              style={[styles.btnProcess, {width: 120, borderRadius: 0, marginHorizontal: 3}]}>
              {this.state.loading
                ? <ActivityIndicator size='large' color='white'/>
                : <Text style={styles.btnText}>PROCESS</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.saveImage}
                              disabled={this.state.photoUpdateData == null}
                              style={[styles.btnProcess, {
                                width: 90,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                backgroundColor: this.state.photoUpdateData == null ? COLORS.DARK_GREY : 'black',
                              }]}>
              <Text style={styles.btnText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={[styles.Container, {marginTop: 50}]}>
          <TouchableOpacity onPress={this.chooseImage} style={styles.btnCircle}>
            <Icon type={'font-awesome-5'} name={'camera-retro'} size={100} color={'white'}/>
          </TouchableOpacity>
        </View>
      );
    }
  };

  componentDidMount = async () => {
    console.debug('componentDidMount');
    this.setState({
      photoData: await getData('photoData'),
      photoPath: await getData('photoPath'),
      photoMime: await getData('photoMime'),
      // lipsticksDB: await getData('lipsticksDB'),
    });
    fetch(URLS.BRANDS).then((response) => response.json()).then(responseJson => {
      this.setState({brands: responseJson});
    }).catch(error => {
      alert(error);
    });
    // // compare last id, if different, update local lipsticks data
    // let dbVersion = await getData('databaseVersion');
    // fetch(URLS.CHECK).then((response) => response.json()).then(newVersion => {
    //   if (dbVersion !== newVersion) {
    //     fetch(URLS.LIPSTICKSDB).then((response) => response.json()).then(responseJson => {
    //       storeData('lipsticksDB', responseJson);
    //       storeData('databaseVersion', newVersion);
    //       this.setState({lipsticksDB: responseJson});
    //     }).catch(error => {
    //       alert(error);
    //     });
    //   }
    // }).catch(error => {
    //   alert(error);
    // });
  };

  onBrandSelected = (brand_id) => {
    console.debug('onBrandSelected:', brand_id);
    this.setState({selectedBrandID: brand_id});
    fetch(
      URLS.SERIES + `brand_id=${brand_id}`,
    ).then((response) => response.json()).then(responseJson => {
      this.setState({series: responseJson});
    }).catch(error => {
      console.error(error);
    });
  };

  onSeriesSelected = (series_id) => {
    console.debug('onSeriesSelected:', series_id);
    if (series_id) {
      this.setState({selectedSeriesID: series_id});
      const brand_id = this.state.selectedBrandID;
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
    console.debug('onLipstickSelected:', lipstick_id);
    if (lipstick_id) {
      const lipstick = this.state.lipsticks[itemIndex];
      this.setState({
        selectedColor: lipstick['color'],
        selectedLipstick: lipstick,
        selectedLipstickID: lipstick_id,
        useSelection: true,
      });
      console.debug('onLipstickSelected:', this.state.selectedLipstickID, this.state.selectedLipstick);
    }
  };

  render() {
    return (
      <LinearGradient colors={[COLORS.PRIMARY_START, COLORS.PRIMARY_END]} start={{x: 0, y: 0}} end={{x: 0.8, y: 0.8}} style={styles.MakeupContainer}>
        <View style={styles.ScrollViewContainer}>
          <ScrollView>

            <View style={styles.PickerContainer}>
              <View style={styles.PickerLabel}>
                <Text style={styles.PickerLabelText}>BRAND</Text>
              </View>
              <Picker mode={PICKER_MODE} selectedValue={this.state.selectedBrandID} style={styles.Picker}
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
              <Picker mode={PICKER_MODE} selectedValue={this.state.selectedSeriesID} style={styles.Picker}
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
              <Picker mode={PICKER_MODE} selectedValue={this.state.selectedLipstickID} style={styles.Picker}
                      onValueChange={(itemValue, itemIndex) =>
                        this.onLipstickSelected(itemValue, itemIndex)
                      }>
                {this.state.lipsticks.map((lipstick, index) => (
                  <Picker.Item key={index} label={lipstick.name} value={lipstick.lipstick_id}/>
                ))}
              </Picker>
            </View>

            {this.renderImage()}

          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
