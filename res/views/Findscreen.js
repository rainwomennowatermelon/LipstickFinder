import React, {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../style/Styles';
import {Icon, ListItem} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import {COLORS} from '../style/Colors';
import Collapsible from 'react-native-collapsible';
import {Surface} from 'gl-react-native';
import ImageFilters from 'react-native-gl-image-filters';
import Filter from '../style/Filter';
import Toast from 'react-native-simple-toast';
import ImageResizer from 'react-native-image-resizer';

const FILTER_SETTINGS = [
  {key: 'temperature', name: 'Temperature 色温', initValue: 6500.0, minValue: 2000.0, maxValue: 20000.0},
  {key: 'brightness', name: 'Brightness 亮度', initValue: 1.0, maxValue: 2.0},
  {key: 'contrast', name: 'Contrast 对比度', initValue: 1.0, maxValue: 2.0},
  {key: 'saturation', name: 'Saturation 饱和度', initValue: 1.0, maxValue: 2.0},
];

const PREDICT_URL = 'http://124.156.143.125:5000/predict';
const IMAGE_SIZE = 513; // server requires 512 x 512 image (need extra 1 pixel to workaround)
const INITIAL_STATE = {
  lipsticks: [],
  photoPath: null,
  photoMime: null,
  hue: 0.0,
  contrast: 1.0,
  saturation: 1.0,
  brightness: 1.0,
  temperature: 6500.0,
  collapsed: true,
};

export default class Findscreen extends Component {
  constructor(props) {
    super(props);
    let copy = {};
    Object.assign(copy, INITIAL_STATE);
    this.state = copy;
    this.image = null;
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
        photoPath: image.path,
        photoMime: image.mime,
      });
    });
  };

  processImage = async () => {
    if (this.image) {
      const result = await this.image.glView.capture();
      ImageResizer.createResizedImage(result.uri, IMAGE_SIZE, IMAGE_SIZE, 'JPEG', 100)
        .then(response => {
          const photoPath = response.uri;
          RNFetchBlob.fetch('POST', PREDICT_URL,
            {
              Authorization: 'Bearer access-token',
              'Content-Type': 'application/octet-stream',
            }, [
              {name: 'file', filename: 'filename', type: 'image/jpeg', data: RNFetchBlob.wrap(photoPath)},
            ]).then(res => {
            this.setState({lipsticks: res.json()});
          }).catch(err => {
            alert(err);
          });
        })
        .catch(err => {
          alert(err);
        });
    } else {
      const photoPath = this.state.photoPath;
      RNFetchBlob.fetch('POST', PREDICT_URL,
        {
          Authorization: 'Bearer access-token',
          'Content-Type': 'application/octet-stream',
        }, [
          {name: 'file', filename: 'filename', type: 'image/jpeg', data: RNFetchBlob.wrap(photoPath)},
        ]).then(res => {
        this.setState({lipsticks: res.json()});
      }).catch(err => {
        alert(err);
      });
    }
  };

  renderImage = () => {
    if (this.state.photoPath) {
      const width = styles.imgWindow.width;
      return (
        <View style={styles.upperContainer}>
          <TouchableOpacity onPress={this.chooseImage} style={{alignItems: 'center'}}>
            <Surface style={styles.imgWindow} ref={ref => this.image = ref}>
              <ImageFilters {...this.state} width={width} height={width}>
                {{uri: this.state.photoPath}}
              </ImageFilters>
            </Surface>
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.setState({collapsed: !this.state.collapsed})}
                              style={[styles.btnProcess, {width: 90, borderTopRightRadius: 0, borderBottomRightRadius: 0}]}>
              <Text style={styles.btnText}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.processImage}
                              style={[styles.btnProcess, {width: 120, borderRadius: 0, marginHorizontal: 3}]}>
              {this.state.loading
                ? <ActivityIndicator size='large' color='white'/>
                : <Text style={styles.btnText}>PROCESS</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={this.saveImage}
                              disabled={!this.image}
                              style={[styles.btnProcess, {width: 90, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: !this.image ? COLORS.DARK_GREY : 'black'}]}>
              <Text style={styles.btnText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.centerContainer}>
          <TouchableOpacity onPress={this.chooseImage} style={styles.btnCircle}>
            <Icon type={'font-awesome-5'} name={'camera-retro'} size={100} color={'white'}/>
          </TouchableOpacity>
        </View>
      );
    }
  };

  saveImage = async () => {
    if (this.image) {
      const result = await this.image.glView.capture();
      ImageResizer.createResizedImage(result.uri, IMAGE_SIZE, IMAGE_SIZE, 'JPEG', 100)
        .then(response => {
          const editedPath = response.uri;
          const d = new Date();
          const path = RNFetchBlob.fs.dirs.DCIMDir + `/Images/LipstickFinder${d.getHours()}${d.getMinutes()}${d.getSeconds()}.jpg`;
          RNFetchBlob.fs.writeFile(path, editedPath, 'uri').then(res => {
            if (res > 0) {
              Toast.showWithGravity('Saved', Toast.SHORT, Toast.CENTER);
            } else {
              Toast.showWithGravity('Error', Toast.SHORT, Toast.CENTER);
            }
          });
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  chooseLipstick = async (lipstick) => {
    this.props.navigation.navigate('Makeup', {
      color: lipstick.color,
      lipstick: lipstick.name,
    });
  };

  componentDidMount = () => {
    this.props.navigation.addListener('blur', () => {
      this.setState(INITIAL_STATE);
    });
  };

  render() {
    return (
      <LinearGradient colors={[COLORS.PRIMARY_START, COLORS.PRIMARY_END]} start={{x: 0, y: 0}} end={{x: 0.8, y: 0.8}} style={styles.Container}>
        <View style={styles.ScrollViewContainer}>
          <ScrollView>
            {this.renderImage()}
            <Collapsible collapsed={this.state.collapsed} align="center" style={styles.slider}>
              {FILTER_SETTINGS.map(filter => (
                <Filter key={filter.key} name={filter.name} minimum={filter.minValue} maximum={filter.maxValue}
                        initValue={filter.initValue} onChange={value => this.setState({[filter.key]: value})}/>
              ))}
            </Collapsible>
            <View style={styles.lipstickList}>
              {this.state.lipsticks.map((l, index) => (
                <ListItem key={index} chevron title={l.brand} subtitle={l.series + l.name} bottomDivider
                          leftIcon={{name: 'square-full', type: 'font-awesome-5', color: l.color}}
                          onPress={() => this.chooseLipstick(l)}/>
              ))}
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}
