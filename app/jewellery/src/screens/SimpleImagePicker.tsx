import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform, Image} from 'react-native';
import {STYLES, COLORS} from './styles';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  // ImagePickerResponse,
  Asset,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import {dummyData} from '../data';

export default function SimpleImagePicker() {
  const [predictionData, setPredictionData] = useState<{
    name: string;
    rate: number;
    barcode: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    fetch('http://192.168.43.158:8000/prediction/', {
      method: 'POST',
      body: createFormData(photo),
    })
      .then(response => response.json())
      .then(response => {
        const prediction = dummyData[response.prediction];
        console.log(prediction, 'prediction');
        setPredictionData(prediction);
        setLoading(false);
      })
      .catch(err => {
        console.error('error');
        console.log(err.response);
      });
  };

  const launchCameraHandler = () => {
    setPredictionData(null);
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
    setPredictionData(null);
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
      <Image source={require('../../assets/logo.png')} style={STYLES.image} />
      <Text style={[STYLES.title, {color: COLORS.primaryLight}]}>
        Ornament Predictor
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
      <View>
        {predictionData && (
          <View style={[STYLES.selectButtonTitle, {backgroundColor: 'white'}]}>
            <Text>Name: {predictionData.name}</Text>
            <Text>Price: {predictionData.rate}</Text>
            <Text>barcode: {predictionData.barcode}</Text>
          </View>
        )}
        {loading && <Text style={[STYLES.selectButtonTitle, {backgroundColor: 'grey'}]}>Loading...</Text>}
      </View>
    </View>
  );
}
