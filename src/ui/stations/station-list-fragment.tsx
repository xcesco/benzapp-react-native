import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {Station} from '../../repositories/model/station';
import StationItem from './station-item';

export default function StationListFragment(props: { componentId?: string; list: Station[] }) {
  // @ts-ignore
  const _renderItem = (renderItem: { item: Station }) => {
    return (
            <StationItem item={renderItem.item}/>
    )
  }

  return (<View style={style.container}>
    <FlatList data={props.list} renderItem={_renderItem}/>
  </View>);
};

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 22
  },
  item: {
    fontSize: 14,
  },
});
