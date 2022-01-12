import React from 'react';
import {StyleSheet, View} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import assets from '../../assets';
import * as Progress from 'react-native-progress';
import {inject, observer} from 'mobx-react';
import {AppDebugLog} from '../utils/AppDebug';
import HomeStore from '../stores/home-store';

type ScreenProps = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = inject('rootStore', 'homeStore')
        (observer((props: { componentId: string; homeStore: HomeStore, back: any }) => {
                  AppDebugLog('display> splash-screen');
                  const navigation = useNavigation<ScreenProps>();

                  const navigateToLogin = (): void => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Login'}],
                    });
                  };

                  const navigateToLock = (): void => {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Lock'}],
                    });
                  };

                  const initAsyncApplication = async (): Promise<void> => {
                    await props.homeStore.updateRemote();

                    const hasAccount = await props.homeStore.checkAccountAndSetNavigation();
                    if (hasAccount) {
                      navigateToLock();
                    } else {
                      navigateToLogin();
                    }
                    setTimeout(() => {
                    }, 2000);
                    AppDebugLog('remote config caricato');
                  };

                  initAsyncApplication().then(_ => {
                    AppDebugLog('goto next', props.back);

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
