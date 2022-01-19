import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import assets from '../../assets';
import {Colors, TextInput} from 'react-native-paper';
import React from 'react';

export const TextInputWithIcon=(props: { iconName?: string, label: string, text: string }) => {
  return <View style={{flexDirection: 'row'}}>
    {props.iconName && <Icon name={props.iconName} color={assets.colors.gray} size={48} style={{
      marginRight: 8,
    }}/>}
    <TextInput
            style={{...style.textField, flex: 4}}
            multiline={false}
            label={props.label}
            value={props.text}
            editable={false}/>
  </View>;
}

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
