import React from 'react';
import {Avatar, Chip, Colors, IconButton, List} from 'react-native-paper';
import assets from '../../../assets';
import {View} from 'react-native';
import {Vehicle} from '../../repositories/model/vehicle';

export default function VehicleItem(props: {
  componentId?: string; item: Vehicle, displaySeparator?: boolean,
  onSelectQRCodeHandler(item: Vehicle): void,
  onSelectDetailHandler(item: Vehicle): void
}) {
  return (<List.Item style={{
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  }} title={props.item.targa} titleEllipsizeMode={'tail'} titleStyle={{
    color: Colors.indigo500,
    fontWeight: '600'
  }}
                     descriptionEllipsizeMode={'tail'}
                     left={_ => <Avatar.Image style={{
                       width: 64,
                       height: 64,
                       marginRight: 8
                     }} source={{uri: `data:${props.item.immagineContentType};base64,${props.item.immagine}`}}/>}
                     right={_ =>
                             <View style={{
                               flexDirection: 'row',
                               alignItems: 'center',
                               justifyContent: 'flex-start',
                               marginVertical: 16
                             }}>
                               {props.item.delega===1 &&
                                       <Chip style={{
                                         backgroundColor: assets.colors.primaryColor,
                                         marginRight: 8
                                       }} textStyle={{color: Colors.white}}>Delega</Chip>}
                               <IconButton
                                       icon="qrcode"
                                       color={Colors.indigo500}
                                       size={20}
                                       onPress={() => props.onSelectQRCodeHandler(props.item)}/>
                               <IconButton
                                       icon="arrow-right-bold"
                                       color={Colors.indigo500}
                                       size={20}
                                       onPress={() => props.onSelectDetailHandler(props.item)}/>
                             </View>

                     }/>);
}

