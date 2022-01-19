import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';
import RefuelingItem from './refueling-item';
import {Refueling} from '../../repositories/model/refueling';
import {inject, observer} from 'mobx-react';
import RefuelingStore from './refueling-store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root-stack-param-list';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RefuelingList'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'RefuelingList'>;

export const RefuelingListScreen = inject('refuelingStore')(observer((props: { componentId: string; refuelingStore: RefuelingStore, back: any }) => {
  const [initializiated, setInitializiated] = useState(false);
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();


  // @ts-ignore
  const _renderItem = (renderItem: { item: Refueling }) => {
    return (
            <RefuelingItem item={renderItem.item} onSelectDetailHandler={(item) => {
              navigation.navigate('RefuelingDetail', {id: item.id})
            }}/>
    )
  }

  useEffect(() => {
    if (!initializiated) {
      setInitializiated(true);
      console.log(`refueling-screen > initialize`);

      if ((route.params!==null && route.params!==undefined)) {
        props.refuelingStore.findAllByTarga(route.params.targa);
      } else {
        props.refuelingStore.findAll();
      }

    } else {
      console.log(`refueling-screen > ALREADY initialized`);
    }
  }, [initializiated, props.refuelingStore, route.params]);

  return (<View style={style.container}>
    <FlatList data={props.refuelingStore.rifornimenti} renderItem={_renderItem}/>
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
