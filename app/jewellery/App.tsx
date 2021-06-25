import React from 'react';
import {
  // ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {
  // DebugInstructions,
  // Header,
  // LearnMoreLinks,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SimpleImagePicker from './src/screens/SimpleImagePicker';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SimpleImagePicker />
    </>
  );
};


export default App;
