import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import VehicleStore from './vehicle-store';
import {Vehicle} from '../../repositories/model/vehicle';
import VehicleItem from './vehicle-item';

type ScreenProp = StackNavigationProp<RootStackParamList, 'VehicleList'>;

export const VehicleListScreen = inject('vehicleStore')(observer((props: { componentId: string; vehicleStore: VehicleStore, back: any }) => {
  const [initializiated, setInitializiated] = useState(false);
  const navigation = useNavigation<ScreenProp>();

  // @ts-ignore
  const _renderItem = (renderItem: { item: Vehicle }) => {
    return (
            <VehicleItem item={renderItem.item}/>
    )
  }

  useEffect(() => {
    if (!initializiated) {
      setInitializiated(true);
      console.log(`refueling-screen > initialize`);

      props.vehicleStore.findAll();
    } else {
      console.log(`refueling-screen > ALREADY initialized`);
    }
  }, [initializiated, props.vehicleStore]);

  return (<View style={style.container}>
    <FlatList data={props.vehicleStore.vehicles} renderItem={_renderItem}/>
  </View>);
}));

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1
  },
  item: {
    fontSize: 14,
  },
});
