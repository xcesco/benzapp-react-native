import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import RefuelingStore from './refueling-store';
import {inject, observer} from 'mobx-react';
import {Avatar, Colors, TextInput} from 'react-native-paper';
import moment from 'moment';
import {RifornimentoTipoCarburanteEnum} from '../../repositories/network/models';
import {TextInputWithIcon} from '../../components/text-input-with-icon';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RefuelingDetail'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'RefuelingDetail'>;

export const RefuelingDetailScreen = inject('refuelingStore')(observer((props: { componentId: string; refuelingStore: RefuelingStore, back: any }) => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<ScreenRouteProp>();
  const [initializiated, setInitializiated] = useState(false);

  useEffect(() => {
    if (!initializiated) {
      setInitializiated(true);
      console.log(`refueling-screen > initialize`);

      props.refuelingStore.findById(route.params.id)
    } else {
      console.log(`refueling-screen > ALREADY initialized`);
    }
  }, [initializiated, props.refuelingStore]);

  return (
          <View style={style.container}>
            <View style={style.avatarField}>
              <Avatar.Text style={{
                width: 64,
                height: 64,
                marginTop: 16,
                marginRight: 8,
                backgroundColor: props.refuelingStore.rifornimento.tipoCarburante === RifornimentoTipoCarburanteEnum.BENZINA ? Colors.green200 : Colors.black
              }} labelStyle={{fontSize: 12}} label={props.refuelingStore.rifornimento.tipoCarburante}/>
            </View>
            <View>
              <TextInput
                      style={style.textField}
                      multiline={false}
                      label="Data"
                      value={(moment(props.refuelingStore.rifornimento.data)).format('DD MMM YYYY, HH:mm')}
                      editable={false}/>
              <TextInput
                      style={style.textField}
                      multiline={false}
                      label="Targa"
                      value={props.refuelingStore.rifornimento.targa}
                      editable={false}/>
              <TextInput
                      style={style.textField}
                      multiline={false}
                      label="Indirizzo"
                      value={props.refuelingStore.rifornimento.gestore.indirizzo + ', ' + props.refuelingStore.rifornimento.gestore.comune}
                      editable={false}/>

              <TextInputWithIcon iconName="currency-eur" label="Importo" text={(props.refuelingStore.rifornimento.litriErogati * (props.refuelingStore.rifornimento.prezzoAlLitro - props.refuelingStore.rifornimento.sconto)).toFixed(2) + ' €'}/>
              <TextInputWithIcon iconName="gas-station" label="Litri erogati" text={(props.refuelingStore.rifornimento.litriErogati).toFixed(2) + ' L.'}/>
              <TextInputWithIcon iconName="piggy-bank" label="Sconto" text={(props.refuelingStore.rifornimento.litriErogati * props.refuelingStore.rifornimento.sconto).toFixed(2) + ' €'}/>
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
