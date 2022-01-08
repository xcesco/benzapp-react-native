import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import assets from '../../assets';

export type Props = {
  name: string;
  baseCounter: number;
};

export default function BackgroundScreen() {
  return (
    <ImageBackground
      resizeMode={'cover'}
      style={{width: '100%', height: '100%', justifyContent: 'center'}}
      source={assets.image.image_background}>
      <Text style={styles.text}>Ciao</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
