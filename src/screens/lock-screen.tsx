import React from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import {KeyPad} from '../components/key-pad';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Lock'>;

export function LockScreen() {
  const navigation = useNavigation<ScreenProp>();

  const navigateToMain = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
    <KeyPad
      onPressHandler={() => {
        console.log('remsss');
        navigateToMain();
      }}
    />
  );
}
