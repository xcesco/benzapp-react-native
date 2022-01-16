import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Station} from '../../repositories/model/station';
import MapView from 'react-native-maps';

export default function StationMapFragment(props: { componentId?: string; list: Station[] }) {
  return (<View style={styles.container}>
    <MapView style={styles.map}/>
  </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
