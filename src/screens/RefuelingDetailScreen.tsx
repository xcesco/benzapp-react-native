import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackParamList';

type ScreenProp = StackNavigationProp<RootStackParamList, 'RefuelingDetail'>;

export function RefuelingDetailScreen() {
  const navigation = useNavigation<ScreenProp>();

  return (
          <View style={style.container}>
            <Text>Home Screen</Text>
            {/*<Button mode="contained" onPress={() => navigation.navigate('Login')}><Text>Ciao</Text></Button>*/}
          </View>
  )
          ;
}

export function DetailsScreen() {
  return (
          <View style={style.container}>
            <Text>Details Screen</Text>
          </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
