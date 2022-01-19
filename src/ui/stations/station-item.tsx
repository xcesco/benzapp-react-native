import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Station} from '../../repositories/model/station';
import {Caption, Colors, Divider, IconButton, Text} from 'react-native-paper';
import {getMarchioImage} from '../../repositories/model/marchio';
import assets from '../../../assets';
import {openGoogleMaps} from '../../utils/helper';

export default function StationItem(props: { componentId?: string; item: Station, displaySeparator?: boolean }) {
  return (<View style={{flexDirection: 'column'}}>
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginLeft: 12}}>
      <Image style={{
        flex: 1,
        width: 48,
        height: 48,
        marginRight: 8
      }} source={getMarchioImage(props.item.marchio)}/>
      <View style={{flex: 4, flexDirection: 'column'}}>
        <Text style={style.item} numberOfLines={1} ellipsizeMode="tail">{props.item.indirizzo}</Text>
        <Caption style={style.item} numberOfLines={1}>{props.item.comune}</Caption>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>

          <View style={{flexDirection: 'column'}}>
            <Text>Benzina</Text>
            <Text>1.34 €</Text>
          </View>

          <View style={{flexDirection: 'column', marginLeft: 8}}>
            <Text>Gasolio</Text>
            <Text>1.56 €</Text>
          </View>

        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <IconButton
                icon="directions"
                color={assets.colors.primaryColor}
                size={20}
                onPress={() => openGoogleMaps(props.item.latitudine, props.item.longitudine)}/>
      </View>
    </View>
    {(props.displaySeparator === undefined || props.displaySeparator===true) && (<Divider/>)}
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
