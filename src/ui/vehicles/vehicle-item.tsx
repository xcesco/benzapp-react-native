import React from 'react';
import {Avatar, Chip, Colors, IconButton, List} from 'react-native-paper';
import {Tessera} from '../../repositories/network/models';
import assets from '../../../assets';
import {View} from 'react-native';

export default function VehicleItem(props: {
  componentId?: string; item: Tessera, displaySeparator?: boolean,
  onSelectQRCodeHandler(item: Tessera): void,
  onSelectDetailHandler(item: Tessera): void
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
                               <Chip style={{
                                 backgroundColor: assets.colors.primaryColor,
                                 marginRight: 8
                               }} textStyle={{color: Colors.white}}>Delega</Chip>
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

