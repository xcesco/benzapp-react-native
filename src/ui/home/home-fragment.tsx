import {FlatList, StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Refueling} from '../../repositories/model/refueling';
import {Appbar, Button, Card, Colors, Dialog, Divider, List, Paragraph, Portal} from 'react-native-paper';
import VehicleItem from '../vehicles/vehicle-item';
import {Tessera} from '../../repositories/network/models';
import assets from '../../../assets';
import RefuelingItem from '../refuelings/refueling-item';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import {Vehicle} from '../../repositories/model/vehicle';
import * as Progress from 'react-native-progress';

type ScreenProps = StackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeFragment(props: { componentId?: string; vechicles: Vehicle[], refuelings: Refueling[] }) {
  const navigation = useNavigation<ScreenProps>();

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

// @ts-ignore
  const _renderVehicleItem = (renderItem: { item: Vehicle }) => {
    return (
            <VehicleItem item={renderItem.item} onSelectDetailHandler={(item) => {
              if (item.delega === 1) {
                showDialog();
              } else {
                navigation.navigate('VehicleDetail', {id: item.id!})
              }
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
      <FlatList data={props.vechicles.slice(0, 2)} renderItem={_renderVehicleItem}/>
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

    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Informazione</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Sulle deleghe non è possibile effettuare tale operazione.</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
