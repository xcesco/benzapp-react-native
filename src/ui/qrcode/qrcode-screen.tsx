import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import {inject, observer} from 'mobx-react';
import {Appbar, Colors} from 'react-native-paper';
import {TextInputWithIcon} from '../../components/text-input-with-icon';
import VehicleStore from '../vehicles/vehicle-store';
import assets from '../../../assets';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RefuelingDetail'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'RefuelingDetail'>;

export const QRCodeScreen = inject('vehicleStore')(observer((props: { componentId: string; vehicleStore: VehicleStore, back: any }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const [initializiated, setInitializiated] = useState(false);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'Second Page', //Set Header Title
  //     headerTitleStyle: {
  //       fontWeight: 'bold', //Set Header text style
  //     },
  //     headerRight: () => (
  //             <TouchableOpacity
  //                     onPress={() => console.log('Right Menu Clicked')}
  //                     style={{marginRight: 10}}>
  //               <Text style={{color: 'white'}}>Right Menu</Text>
  //             </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation]);
// headerRight: () => (<Appbar.Action color={Colors.white} icon="dots-vertical" onPress={()=> {console.log(route.params.id);}}/>),

  useEffect(() => {
    if (!initializiated) {
      console.log(`refueling-screen > initialize`);

      props.vehicleStore.findQRCodeById(route.params.id);
      navigation.setOptions({
        headerRight: () => (<Appbar.Action color={Colors.white} icon="share-variant" onPress={()=> {console.log(route.params.id);}}/>),
      });
      setInitializiated(true);
    } else {
      console.log(`refueling-screen > ALREADY initialized`);
    }
  }, [initializiated, navigation, props.vehicleStore, route.params.id]);

  return (
          <View style={style.container}>
            <QRCode size={280}
                    value={JSON.stringify(props.vehicleStore.qrCodeInfo)}
            />
            <Text></Text>
            <TextInputWithIcon label="Numero tessera" text={props.vehicleStore.qrCodeInfo.tesseraNumero}/>
            <TextInputWithIcon label="Targa" text={props.vehicleStore.qrCodeInfo.targa}/>
          </View>
  )

}));

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  avatarField: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  textField: {
    backgroundColor: Colors.white,
  }
});
