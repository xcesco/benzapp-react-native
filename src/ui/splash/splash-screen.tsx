import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import assets from '../../../assets';
import * as Progress from 'react-native-progress';
import {inject, observer} from 'mobx-react';
import HomeStore from '../home/home-store';
import {applicationInit} from '../../../App';
import {registryMessageHandler} from '../../fcm/messaging';

type ScreenProps = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = inject('homeStore')
(observer((props: { componentId: string; homeStore: HomeStore, back: any }) => {
          const navigation = useNavigation<ScreenProps>();
          console.log('display> splash-screen');

          useEffect(() => {
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

            async function startup() {
              const hasAccount = await applicationInit();
              const fcmRegistered = await registryMessageHandler();

              console.log(`display> splash-screen: fcmRegistered ${fcmRegistered}`);


              console.log(`display> splash-screen: hasAccount ${hasAccount}`);
              if (hasAccount) {
                navigateToLock();
              } else {
                navigateToLogin();
              }
            }

            startup();
          }, [navigation, props.back]);

          return (
                  <View style={style.container}>
                    <Progress.CircleSnail size={50} indeterminate={true} color={assets.colors.accentColor}/>
                  </View>
          )

        }
));

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
