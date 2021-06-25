import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {STYLES, COLORS} from './styles';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  // ImagePickerResponse,
  Asset,
  ImageLibraryOptions,
} from 'react-native-image-picker';

export default function SimpleImagePicker() {
  // const [imageSource, setImageSource] = useState(null);
  const createFormData = (photo: Asset) => {
    const data = new FormData();

    data.append('image', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri?.replace('file://', ''),
    });
    return data;
  };

  const handleUpload = (photo: Asset) => {
    console.log('formdata', createFormData(photo));
    fetch('http://192.168.43.158:8000/prediction/', {
      method: 'POST',
      body: createFormData(photo),
    })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => {
        console.error('error');
        console.log(err.response);
      });
  };

  const launchCameraHandler = () => {
    let options: CameraOptions = {
      mediaType: 'photo',
    };
    launchCamera(options, response => {
      // Same code as in above section!
      console.log(response);
      if (response.assets?.length > 0) {
        console.log('handle upload');
        handleUpload(response.assets[0]);
      }
    });
  };

  const selectImageHandler = () => {
    console.log('clickerd');
    let options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      console.log(response);
      if (response.assets?.length > 0) {
        console.log('handle upload');
        handleUpload(response.assets[0]);
      }
    });
  };

  return (
    <View
      style={[
        STYLES.flex,
        STYLES.centerContainer,
        {backgroundColor: COLORS.primaryDark},
      ]}>
      <Text style={[STYLES.title, {color: COLORS.primaryLight}]}>
        Jewellery Predictor
      </Text>
      <TouchableOpacity
        onPress={launchCameraHandler}
        style={[
          STYLES.selectButtonContainer,
          {backgroundColor: COLORS.primaryLight},
        ]}>
        <Text style={STYLES.selectButtonTitle}>Launch Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={selectImageHandler}
        style={[
          STYLES.selectButtonContainer,
          {backgroundColor: COLORS.primaryLight},
        ]}>
        <Text style={STYLES.selectButtonTitle}>Pick an Image</Text>
      </TouchableOpacity>
    </View>
  );
}
