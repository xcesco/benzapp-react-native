import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Station} from '../../repositories/model/station';
import MapView from 'react-native-map-clustering';
import {Callout, Marker} from 'react-native-maps';
import StationItem from './station-item';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {openGoogleMaps} from '../../utils/helper';

const INITIAL_REGION = {
  latitude: 45.796044,
  longitude: 13.512454,
  latitudeDelta: 1.5,
  longitudeDelta: 1.5,
};

export default function StationMapFragment(props: { componentId?: string; list: Station[] }) {
  const [showInfo, setShowInfo] = useState(-1);
  const [isMapReady, setIsMapReady] = useState(false);

  const onMapLayout = () => {
    setIsMapReady(true);
  };

  return (<View style={styles.container}>
    <MapView initialRegion={INITIAL_REGION} style={styles.map} onLayout={onMapLayout}>
      {isMapReady && props.list.map((item) => <Marker key={item.id} coordinate={{
        latitude: item.latitudine,
        longitude: item.longitudine
      }}>
        <Callout onPress={() => {
          openGoogleMaps(item.latitudine, item.longitudine);
        }}>
         <TouchableHighlight onPress={() => {
            openGoogleMaps(item.latitudine, item.longitudine);}}>
            <View>
              <StationItem item={item} displaySeparator={false}/>
            </View>
          </TouchableHighlight>
        </Callout>
      </Marker>)}
    </MapView>
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
    minHeight: Dimensions.get('window').height,
    minWidth: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
