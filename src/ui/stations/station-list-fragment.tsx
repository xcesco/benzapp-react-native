import React from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Caption, Colors, Divider, IconButton, Text} from 'react-native-paper';
import {Station} from '../../repositories/model/station';
import {getMarchioImage} from '../../repositories/model/marchio';
import assets from '../../../assets';
import {openGoogleMaps} from '../../utils/navigation-helper';

export default function StationListFragment(props: { componentId?: string; list: Station[] }) {
  // @ts-ignore
  const _renderItem = (renderItem: { item: Station }) => {
    return (
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4, marginLeft: 12}}>
                <Image style={{
                  flex: 1,
                  width: 64,
                  height: 64,
                  marginRight: 8
                }} source={getMarchioImage(renderItem.item.marchio)}/>
                <View style={{flex: 4, flexDirection: 'column'}}>
                  <Text style={style.item} numberOfLines={1} ellipsizeMode="tail">{renderItem.item.indirizzo}</Text>
                  <Caption style={style.item} numberOfLines={1}>{renderItem.item.comune}</Caption>
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
                          onPress={() => openGoogleMaps(renderItem.item.latitudine, renderItem.item.longitudine)}/>
                </View>
              </View>
              <Divider/>
            </View>
    )
  }

  return (<View style={style.container}>
    <FlatList data={props.list} renderItem={_renderItem}/>
  </View>);
};

// <List.Item title={renderItem.item.indirizzo} titleEllipsizeMode={'tail'} description={renderItem.item.comune}
//            descriptionEllipsizeMode={'tail'}
//            left={_ => <Image style={{
//              width: 64,
//              height: 64,
//              marginRight: 8
//            }} source={getMarchioImage(renderItem.item.marchio)}/>}
//            right={_ =>
//                    <View style={{flexDirection: 'column'}}>
//                      <IconButton
//                              icon="directions"
//                              color={assets.colors.primaryColor}
//                              size={20}
//                              onPress={() => console.log('press ', renderItem.item.indirizzo)}/>
//                      <View style={{flexDirection: 'row'}}>
//                        <View style={{flexDirection: 'column'}}>
//                          <Text>Benzina</Text>
//                        </View>
//                        <View style={{flexDirection: 'column'}}>
//                          <Text>Gasolio</Text>
//                        </View>
//                      </View>
//                    </View>}/>

// <View style={{flexDirection: 'row', width: '100%', marginVertical: 4, marginLeft: 12}}>
//   <Image style={{width:64, height:64, marginRight: 8}} source={getMarchioImage(renderItem.item.marchio)}/>
//   <View style={{flexDirection: 'column'}}>
//     <Text style={style.item} numberOfLines = { 1 } ellipsizeMode='tail'>{renderItem.item.indirizzo}</Text>
//     <Caption style={style.item} numberOfLines = { 1 }>{renderItem.item.comune}</Caption>
//     <View style={{flexDirection: 'row'}}>
//     </View>
//   </View>
//   <Button icon="camera" mode="contained">
//     <Text>v</Text>
//   </Button>
//
// </View>

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
