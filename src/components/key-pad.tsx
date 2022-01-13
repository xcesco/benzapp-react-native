import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Colors, Text} from 'react-native-paper';
import assets from '../../assets';
import {observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const KeyPad = observer((props: { onPressHandler(): void }) => {

  const [currentPin, setCurrentPin] = useState('');

  function onPressHandler(key: string): void {
    console.log(key);
    setCurrentPin(value => limitPinSize(value + key));
  }

  function onPressBackHandler(): void {
    if (currentPin.length > 0) {
      setCurrentPin(value => value.slice(0, -1));
    }
  }

  function limitPinSize(value: string): string {
    return value.slice(0, 6);
  }

  return (
          <View style={style.container}>
            <View style={style.panelHeader}>
              <Text style={style.pinLabel}> React Native Benzapp</Text>
            </View>
            <View style={style.panelTop}>
              <Avatar.Icon icon="lock" size={64} style={style.icon} color={assets.colors.primaryColor}/>
              <Text style={style.pinLabel}>Inserisci il PIN</Text>
              <Text style={style.pinText}>{currentPin.split('').map(_ => (
                      <Icon name="circle" color={Colors.white} size={14}/>))}</Text>
              {/*<Text style={style.pinLabel}>PIN VALIDO</Text>*/}
            </View>
            <View style={style.panelBottom}>
              <View style={style.keyRow}>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('1')
                }}>
                  <Text style={style.key}>1</Text>
                </Button>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('2')
                }}>
                  <Text style={style.key}>2</Text>
                </Button>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('3')
                }}>
                  <Text style={style.key}>3</Text>
                </Button>
              </View>
              <View style={style.keyRow}>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('4')
                }}>
                  <Text style={style.key}>4</Text>
                </Button>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('5')
                }}>
                  <Text style={style.key}>5</Text>
                </Button>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('6')
                }}>
                  <Text style={style.key}>6</Text>
                </Button>
              </View>
              <View style={style.keyRow}>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('7')
                }}>
                  <Text style={style.key}>7</Text>
                </Button>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('8')
                }}>
                  <Text style={style.key}>8</Text>
                </Button>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('9')
                }}>
                  <Text style={style.key}>9</Text>
                </Button>
              </View>
              <View style={style.keyRow}>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressBackHandler()
                }}>
                  <Icon name="backspace" color={Colors.black} size={36}/>
                </Button>
                <Button mode="outlined" style={style.keyButton} onPress={() => {
                  onPressHandler('0')
                }}>
                  <Text style={style.key}>0</Text>
                </Button>
                <Button mode="outlined" style={style.keyButton}>
                  <Text style={style.key}>
                    <Icon name="check" color={Colors.black} size={36}/>
                  </Text>
                </Button>
              </View>
              <Button mode="outlined" onPress={props.onPressHandler}>
                <Text>Goto Main</Text>
              </Button>
            </View>
          </View>
  );
});

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
