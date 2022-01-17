import React from 'react';
import {Avatar, Caption, Colors, Divider, IconButton, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {Refueling} from '../../repositories/model/refueling';
import {RifornimentoTipoCarburanteEnum} from '../../repositories/network/models';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';


export default function RefuelingItem(props: { componentId?: string; item: Refueling, displaySeparator?: boolean, onSelectDetailHandler(item: Refueling): void }) {
  return (<View style={{flexDirection: 'column'}}>
    <View style={{flexDirection: 'row', alignItems: 'center', margin: 8, marginLeft: 12}}>
      <Avatar.Text style={{
        width: 64,
        height: 64,
        marginRight: 8,
        backgroundColor: props.item.tipoCarburante === RifornimentoTipoCarburanteEnum.BENZINA ? Colors.green200 : Colors.black
      }} labelStyle={{fontSize: 12}} label={props.item.tipoCarburante}/>
      <View style={{flex: 4, flexDirection: 'column'}}>
        <View style={{flex: 4, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.item} numberOfLines={1} ellipsizeMode="tail">{props.item.targa}</Text>
          <Text>{(moment(props.item.data)).format('DD MMM YYYY HH:mm')}</Text>
        </View>
        <Caption style={style.item} numberOfLines={1}>{props.item.gestore.indirizzo} - {props.item.gestore.comune}</Caption>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Icon color={'#9E9E9E'} name="currency-eur" size={24}/>
            <Text style={{color: '#9E9E9E'}}>{((props.item.prezzoAlLitro - props.item.sconto) * props.item.litriErogati).toFixed(2)} €</Text>
          </View>

          <View style={{flexDirection: 'row', marginLeft: 8}}>
            <Icon color={'#9E9E9E'} name="gas-station" size={24}/>
            <Text style={{color: '#9E9E9E'}}>{props.item.litriErogati.toFixed(2)} L.</Text>
          </View>

        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <IconButton
                icon="arrow-right-bold"
                color={Colors.indigo500}
                size={20}
                onPress={() => props.onSelectDetailHandler(props.item)}/>
      </View>
    </View>
    {(props.displaySeparator === undefined || props.displaySeparator) && (<Divider/>)}
  </View>);
}

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

