import React from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import {KeyPad} from '../components/key-pad';
import {AppDebugLog} from '../utils/AppDebug';
import {inject, observer} from 'mobx-react';
import HomeStore from '../stores/home-store';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Lock'>;

const LockScreen = inject('homeStore')(observer((props: { componentId: string; homeStore: HomeStore, back: any }) => {
  AppDebugLog('display> lock-screen');

  const navigation = useNavigation<ScreenProp>();

  const navigateToMain = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  };

  return (
          <KeyPad onPressHandler={() => {
            console.log('remsss', props.back);
            navigateToMain();
          }}/>
  );
}));

export default LockScreen;
