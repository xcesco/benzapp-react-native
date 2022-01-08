import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootStackParamList';

type authScreenProp = StackNavigationProp<RootStackParamList, 'Splash'>;

export function SplashScreen() {
  const navigation = useNavigation<authScreenProp>();

  const navigateToLogin = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
          <View style={style.container}>
            <Text>Home Screen</Text>
            <Button mode="contained" onPress={navigateToLogin}><Text>Goto Login</Text></Button>
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
