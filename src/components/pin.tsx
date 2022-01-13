import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Colors, Text} from 'react-native-paper';
import assets from '../../assets';
import {observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'react-native-i18n';
import {KeyPad} from './key-pad';

export const Pin = observer((props: { primoAccesso: boolean, initialPin: string, onSubmitPinHandler(pin: string): void, onGeneratedPinHandler(pin: string): void }) => {
  const [currentPin, setCurrentPin] = useState('');
  const [previousPin, setPreviousPin] = useState('');
  const [currentStatus, setCurrentStatus] = useState(props.primoAccesso ? TypePasscodeStatus.typeSetPasscode : TypePasscodeStatus.typeCheckPassword);

  function defineLabelByStatus(value: TypePasscodeStatus) {
    let message = '';
    switch (value) {
      case TypePasscodeStatus.typeCheckPassword:
        message = I18n.t('lockLabelCheckPin');
        break;
      case TypePasscodeStatus.typeSetPasscode:
        message = I18n.t('lockLabelSetPin');
        break;
      case TypePasscodeStatus.typeSetSecondPasscode:
        message = I18n.t('lockLabelSetSecondPin');
        break;
    }

    return message;
  }

  const [message, setMessage] = useState('');
  const [label, setLabel] = useState(defineLabelByStatus(currentStatus));

  function onPressHandler(key: string): void {
    console.log(key);
    setCurrentPin(value => limitPinSize(value + key));
  }

  function onPressBackHandler(): void {
    if (currentPin.length > 0) {
      setCurrentPin(value => value.slice(0, -1));
    }
  }

  function onPressSubmitHandler(): void {
    switch (currentStatus) {
      case TypePasscodeStatus.typeSetPasscode:
        setPreviousPin(currentPin);
        setCurrentPin('');
        setCurrentStatus(TypePasscodeStatus.typeSetSecondPasscode);
        setLabel(I18n.t('lockLabelSetSecondPin'));
        break;
      case TypePasscodeStatus.typeSetSecondPasscode:
        if (currentPin === previousPin) {
          setMessage(I18n.t('lockMessageOk'));
          props.onGeneratedPinHandler(currentPin);

          setTimeout(() => {
            props.onSubmitPinHandler(currentPin);
          }, 2000);
        } else {
          setMessage(I18n.t('lockMessageSecondError'));
          setTimeout(() => {
            setCurrentStatus(TypePasscodeStatus.typeSetPasscode);
            setCurrentPin('');
            setMessage('');
          }, 3000);
        }
        break;
      case TypePasscodeStatus.typeCheckPassword:
        if (currentPin === props.initialPin) {
          setMessage(I18n.t('lockMessageOk'));
          props.onSubmitPinHandler(currentPin);
        } else {
          setMessage(I18n.t('lockMessageError'));
        }
        break;
      case TypePasscodeStatus.unknown:
        break;
    }
  }

  function limitPinSize(value: string | null): string {
    if (value === null) return '';
    return value.slice(0, 6);
  }

  return (
          <View style={style.container}>
            <View style={style.panelHeader}>
              <Text style={style.pinLabel}> React Native Benzapp</Text>
            </View>
            <View style={style.panelTop}>
              <Avatar.Icon icon="lock" size={64} style={style.icon} color={assets.colors.primaryColor}/>
              <Text style={style.pinLabel}>{label}</Text>
              <Text style={style.pinText}>{currentPin.split('').map((_, index) => (
                      <Icon key={index} name="circle" color={Colors.white} size={14}/>))}</Text>
              <Text style={style.pinLabel}>{message}</Text>
            </View>
            <KeyPad onPressHandler={onPressHandler} onPressBackHandler={onPressBackHandler} onPressSubmitHandler={onPressSubmitHandler}/>
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

enum TypePasscodeStatus {
  typeSetPasscode,
  typeSetSecondPasscode,
  typeCheckPassword,
  unknown
}
