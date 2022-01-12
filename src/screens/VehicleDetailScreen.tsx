import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/root-stack-param-list';

type ScreenProp = StackNavigationProp<RootStackParamList, 'VehicleDetail'>;

export function VehicleDetailScreen() {
  const navigation = useNavigation<ScreenProp>();

  return (
          <View style={style.container}>
            <Text>Home Screen</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}><Text>Ciao</Text></Button>
          </View>
  )
          ;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
