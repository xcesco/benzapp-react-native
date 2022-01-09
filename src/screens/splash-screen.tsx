import React from 'react';
import {StyleSheet, View} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import assets from '../../assets';
import * as Progress from 'react-native-progress';
import {inject, observer} from 'mobx-react';
import {RootStore} from '../stores/root-store';
import {AppDebugLog} from '../utils/AppDebug';

type ScreenProps = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = inject('rootStore')
        (observer((props: { componentId: string; rootStore: RootStore, back: any }) => {
                  const navigation = useNavigation<ScreenProps>();

                  const navigateToLogin = (): void => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Login'}],
                    });
                  };

                  const initAsyncApplication = async (): Promise<void> => {
                    await props.rootStore.accountStore.updateRemote();
                    await setTimeout(() => {
                    }, 2000);
                    AppDebugLog('remote config caricato');
                  };

                  initAsyncApplication().then(_ => {
                    AppDebugLog('goto next', props.back);
                    navigateToLogin();
                  });

                  return (
                          <View style={style.container}>
                            <Progress.CircleSnail size={50} indeterminate={true} color={assets.colors.accentColor}/>
                          </View>
                  )

                }
        ))
;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
