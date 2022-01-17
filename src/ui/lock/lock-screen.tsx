import React, {useEffect, useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import {AppDebugLog} from '../../utils/AppDebug';
import {inject, observer} from 'mobx-react';
import {Pin} from '../../components/pin';
import LockStore from './lock-store';
import {action} from 'mobx';
import HomeStore from '../home/home-store';

type ScreenProp = StackNavigationProp<RootStackParamList, 'Lock'>;

const LockScreen = inject('lockStore', 'homeStore')(observer((props: { componentId: string; lockStore: LockStore, homeStore: HomeStore, back: any }) => {
  AppDebugLog(`display> lock-screen: primoAccesso: ${props.lockStore.primoAccesso} pin: ${props.lockStore.pin}`);

  const [initializiated, setInitializiated] = useState(false);
  const navigation = useNavigation<ScreenProp>();

  const navigateToMain = (): void => {
    async function update() {
      await props.homeStore.updateData();
    }

    update().then(_ => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    })

  };

  useEffect(() => {
    if (!initializiated) {
      console.log(`display> lock-screen: initialize`);
      action(() => props.lockStore.actionGetCurrentPIN());
      action(() => props.lockStore.actionPrimoAccesso());

      setInitializiated(true);
    } else {
      console.log(`display> lock-screen: ALREADY initialized`);
    }
  }, [initializiated, props.lockStore]);

  return (
          <Pin
                  primoAccesso={props.lockStore.primoAccesso}
                  initialPin={props.lockStore.pin ?? ''}
                  onSubmitPinHandler={() => {
                    navigateToMain();
                  }}
                  onGeneratedPinHandler={(pin) => {
                    console.log('action > actionSavePin');
                    props.lockStore.actionSavePin(pin).then(value => {
                      console.log(`action > actionSavePin saved ${value}`);
                    });
                  }}/>
  );
}));

export default LockScreen;