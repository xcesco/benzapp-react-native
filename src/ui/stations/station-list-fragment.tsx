import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Colors, Text} from 'react-native-paper';
import {Station} from '../../repositories/model/station';
import {getMarchioImage} from '../../repositories/model/marchio';

export default function StationListFragment(props: { componentId?: string; list: Station[] }) {
  // @ts-ignore
  const _renderItem = (renderItem: { item: Station }) => {
    return (
            <View>
              <Image style={{width:48, height:48}} source={getMarchioImage(renderItem.item.marchio)}/>
              <Text style={style.item}>{renderItem.item.marchio}</Text>
            </View>
    );
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
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
