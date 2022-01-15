import {StyleSheet, View} from 'react-native';
import {Button, Colors, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import assets from '../../assets';

export const KeyPad = (props: { onPressHandler(key: string): void, onPressBackHandler(): void, onPressSubmitHandler(): void }) => {

  return (<View style={style.panelBottom}>
    <View style={style.keyRow}>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('1')
      }}>
        <Text style={style.key}>1</Text>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('2')
      }}>
        <Text style={style.key}>2</Text>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('3')
      }}>
        <Text style={style.key}>3</Text>
      </Button>
    </View>
    <View style={style.keyRow}>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('4')
      }}>
        <Text style={style.key}>4</Text>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('5')
      }}>
        <Text style={style.key}>5</Text>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('6')
      }}>
        <Text style={style.key}>6</Text>
      </Button>
    </View>
    <View style={style.keyRow}>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('7')
      }}>
        <Text style={style.key}>7</Text>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('8')
      }}>
        <Text style={style.key}>8</Text>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('9')
      }}>
        <Text style={style.key}>9</Text>
      </Button>
    </View>
    <View style={style.keyRow}>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressBackHandler()
      }}>
        <Icon name="backspace" color={Colors.black} size={36}/>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressHandler('0')
      }}>
        <Text style={style.key}>0</Text>
      </Button>
      <Button mode="outlined" style={style.keyButton} onPress={() => {
        props.onPressSubmitHandler()
      }}>
        <Text style={style.key}>
          <Icon name="check" color={Colors.black} size={36}/>
        </Text>
      </Button>
    </View>
  </View>)
};


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  panelHeader: {
    backgroundColor: assets.colors.primaryColor,
    flex: 0.4,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  panelTop: {
    backgroundColor: assets.colors.primaryColor,
    flex: 2,
    paddingVertical: 24,
    flexDirection: 'column',
    alignItems: 'center',
  },

  panelBottom: {
    flex: 3,
    alignItems: 'center',
    paddingVertical: 24,
    flexDirection: 'column',
  },

  icon: {backgroundColor: Colors.white},

  pinLabel: {
    marginTop: 24,
    color: Colors.white,
    fontSize: 24,
  },

  pinText: {
    marginTop: 24,
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  keyRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },

  keyButton: {
    borderColor: Colors.white,
    height: 76,
    flex: 1,
    justifyContent: 'center',
  },

  key: {
    fontSize: 36,
  },
});
