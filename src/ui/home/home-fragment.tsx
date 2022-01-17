import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Refueling} from '../../repositories/model/refueling';
import {Card} from 'react-native-paper';
import VehicleItem from '../vehicles/vehicle-item';
import {Tessera} from '../../repositories/network/models';
import assets from '../../../assets';
import RefuelingItem from '../refuelings/refueling-item';

export default function HomeFragment(props: { componentId?: string; vechicles: Tessera[], refuelings: Refueling[] }) {
  // @ts-ignore
  const _renderTesseraItem = (renderItem: { item: Tessera }) => {
    return (
            <VehicleItem item={renderItem.item}/>
    )
  }

  // @ts-ignore
  const _renderRefuelingItem = (renderItem: { item: Refueling }) => {
    return (
            <RefuelingItem item={renderItem.item}/>
    )
  }

  return (<View style={style.container}>
    <Card style={{marginHorizontal: 12}}>
      <FlatList data={props.vechicles.slice(0, 2)} renderItem={_renderTesseraItem}/>
    </Card>

    <Card style={{marginTop: 64,marginHorizontal: 12}}>
      <FlatList data={props.refuelings.slice(0, 3)} renderItem={_renderRefuelingItem}/>
    </Card>
  </View>);
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: assets.colors.primaryColor
  },
  item: {
    fontSize: 14,
  },
});
