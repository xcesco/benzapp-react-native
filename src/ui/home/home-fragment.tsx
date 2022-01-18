import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Refueling} from '../../repositories/model/refueling';
import {Button, Card, Colors, Divider, List} from 'react-native-paper';
import VehicleItem from '../vehicles/vehicle-item';
import {Tessera} from '../../repositories/network/models';
import assets from '../../../assets';
import RefuelingItem from '../refuelings/refueling-item';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root-stack-param-list';

type ScreenProps = StackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeFragment(props: { componentId?: string; vechicles: Tessera[], refuelings: Refueling[] }) {
  const navigation = useNavigation<ScreenProps>();

// @ts-ignore
  const _renderTesseraItem = (renderItem: { item: Tessera }) => {
    return (
            <VehicleItem item={renderItem.item} onSelectDetailHandler={(item) => {
              navigation.navigate('VehicleDetail',{id: item.id})
            }} onSelectQRCodeHandler={(item: Tessera) => {
              navigation.navigate('VehicleQRCodeDetail', {id: item.id})
            }}/>
    )
  }

// @ts-ignore
  const _renderRefuelingItem = (renderItem: { item: Refueling }) => {
    return (
            <RefuelingItem item={renderItem.item} onSelectDetailHandler={(item) => {
              navigation.navigate('RefuelingDetail', {id: item.id})
            }}/>
    )
  }

  return (<View style={style.container}>
    <Card style={{marginHorizontal: 12, marginRight: 8, elevation: 4, zIndex: 4}}>
      <List.Item title={'Tessere'} titleStyle={{color: Colors.indigo500, fontWeight: '800'}}
                 left={_ => (<Icon name="car" color={Colors.indigo500} size={64} style={{
                   marginRight: 8,
                 }}/>)}
                 right={_ => (<Button style={{margin: 8}} mode="outlined" onPress={() => {
                   navigation.navigate('VehicleList')
                 }}>Vedi tutte ({props.vechicles.length})</Button>)}/>
      <Divider/>
      <FlatList data={props.vechicles.slice(0, 2)} renderItem={_renderTesseraItem}/>
    </Card>

    <Card style={{marginTop: 48, marginHorizontal: 12, elevation: 4, zIndex: 4}}>
      <List.Item title={'Rifornimenti'} titleStyle={{color: Colors.indigo500, fontWeight: '800'}}
                 left={_ => (<Icon name="gas-station" color={Colors.indigo500} size={64} style={{
                   marginRight: 8, marginLeft: 12
                 }}/>)}
                 right={_ => (<Button style={{margin: 8}} mode="outlined"
                                      onPress={() => {
                                        navigation.navigate('RefuelingList')
                                      }}>Vedi tutti ({props.refuelings.length})</Button>)}/>
      <Divider/>
      <FlatList data={props.refuelings.slice(0, 2)} renderItem={_renderRefuelingItem}/>
    </Card>
  </View>);
}

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
