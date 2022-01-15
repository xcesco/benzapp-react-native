import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {Station} from '../../repositories/model/station';

export default function StationListFragment(props: { componentId?: string; list: Station[] }) {
  return (<View>
    <Text>station list fragmetn: {props.list.length}</Text>
  </View>);
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
