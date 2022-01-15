import React from 'react';
import {StyleSheet} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import AppMainContent from '../components/app-main-content';

type screenProp = StackNavigationProp<RootStackParamList, 'Main'>;

export function MainScreen() {
  const navigation = useNavigation<screenProp>();

  return (<AppMainContent/>);
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
