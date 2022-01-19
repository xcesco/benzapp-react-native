import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import {inject, observer} from 'mobx-react';
import {Appbar, Avatar, Colors} from 'react-native-paper';
import moment from 'moment';
import {TesseraCarburanteEnum} from '../../repositories/network/models';
import {TextInputWithIcon} from '../../components/text-input-with-icon';
import VehicleStore from './vehicle-store';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RefuelingDetail'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'RefuelingDetail'>;

export const VehicleDetailScreen = inject('vehicleStore')(observer((props: { componentId: string; vehicleStore: VehicleStore, back: any }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const [initializiated, setInitializiated] = useState(false);

  useEffect(() => {
    if (!initializiated) {
      console.log(`refueling-screen > initialize`);

      props.vehicleStore.findById(route.params.id);
      setInitializiated(true);
    } else {
      console.log(`refueling-screen > ALREADY initialized`);
    }
  }, [initializiated, props.vehicleStore, route.params.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<View style={{flexDirection: 'row'}}>
        <Appbar.Action color={Colors.white} icon="gas-station" onPress={() => {
        }}/>
      </View>),
    });
  });

  return (
          <View style={style.container}>
            <View style={{flexDirection: 'row', paddingTop: 8, justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{
                width: 128,
                height: 128,
                marginRight: 8
              }} source={{uri: `data:${props.vehicleStore.vehicle.immagineContentType};base64,${props.vehicleStore.vehicle.immagine}`}}/>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 12, alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <TextInputWithIcon label="Codice" text={props.vehicleStore.vehicle.codice}/>
              </View>
              <View style={{flex: 1, marginLeft: 12}}>
                <TextInputWithIcon label="Data emissione" text={(moment(props.vehicleStore.vehicle.dataEmissione)).format('DD MMM YYYY')}/>
              </View>
            </View>

            <TextInputWithIcon label="Targa" text={props.vehicleStore.vehicle.targa}/>
            <TextInputWithIcon label="Proprietario" text={props.vehicleStore.vehicle.cittadino.cognome + ' ' + props.vehicleStore.vehicle.cittadino.nome + ' (' + props.vehicleStore.vehicle.cittadino.codiceFiscale + ')'}/>
            <View style={{flexDirection: 'row', paddingTop: 12, alignItems: 'center'}}>
              <View style={{flex: 1}}><View style={style.avatarField}>
                <Avatar.Text style={{
                  width: 64,
                  height: 64,
                  marginTop: 16,
                  marginRight: 8,
                  backgroundColor: props.vehicleStore.vehicle.carburante === TesseraCarburanteEnum.BENZINA ? Colors.green200 : Colors.black
                }} labelStyle={{fontSize: 12}} label={props.vehicleStore.vehicle.carburante}/>
              </View></View>
              <View style={{flex: 2}}>
                <TextInputWithIcon iconName="currency-eur" label="Pagato" text={props.vehicleStore.vehicleSummary.spesa.toFixed(2) + ' €'}/>
                <TextInputWithIcon iconName="piggy-bank" label="Contributo regionale" text={props.vehicleStore.vehicleSummary.risparmio.toFixed(2) + ' €'}/>
                <TextInputWithIcon iconName="gas-station" label="Litri erogati" text={props.vehicleStore.vehicleSummary.litriErogati.toFixed(2) + ' L.'}/>
              </View>
            </View>

          </View>
  )

}));

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    paddingHorizontal: 24,
    alignItem: 'stretch',
    justifyContent: 'flex-start',
  },
  avatarField: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
  },
  textField: {
    backgroundColor: Colors.white,
  }
});
