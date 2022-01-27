import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import I18n from 'react-native-i18n';
import StationListFragment from '../stations/station-list-fragment';
import {Appbar, BottomNavigation, Colors} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import HomeStore from '../home/home-store';
import StationListStore from '../stations/station-list-store';
import assets from '../../../assets';
import StationMapFragment from '../stations/station-map-fragment';
import HomeFragment from '../home/home-fragment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showSnackbar} from '../../utils/helper';

type screenProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const MainScreen = inject('homeStore', 'stationListStore')(observer((props: { componentId: string; homeStore: HomeStore, stationListStore: StationListStore, back: any }) => {
  const navigation = useNavigation<screenProp>();
  const [initializiated, setInitializiated] = useState(false);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: I18n.t('tabHome'), icon: 'home'},
    {key: 'map', title: I18n.t('tabMap'), icon: 'map'},
    {key: 'stations', title: I18n.t('tabStations'), icon: 'format-list-bulleted'},
  ]);

  const navigateToLogin = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  useEffect(() => {
    console.log('loading', props.homeStore.loading);

    if (!initializiated) {
      props.homeStore.notificationSubject.subscribe(data => {
        console.log('ricevo ', data);
        props.homeStore.updateData(true);

        showSnackbar(data);
      });
      setInitializiated(true);
      props.stationListStore.selectAll();
    }
  }, [initializiated, props.homeStore.loading, props.stationListStore]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (_) => (<Icon name="menu" color={Colors.white} size={35} onPress={() => console.log('menu')}/>),
      headerRight: () => (<View style={{flexDirection: 'row'}}>
        <Appbar.Action color={Colors.white} icon="refresh" onPress={() => {
          props.homeStore.updateData(true);

          showSnackbar('Effettuo update dati');
        }}/>
        <Appbar.Action color={Colors.white} icon="logout" onPress={() => {
          props.homeStore.logout().then(_ => {
            showSnackbar('Effettuo logout');
            setTimeout(() =>
                    navigateToLogin(), 2000);
          });
        }}/>
      </View>),
    });
  })

  const HomeRoute = () => {
    return (
            <HomeFragment refuelings={props.homeStore.rifornimenti} vechicles={props.homeStore.tessere}/>
    );
  };

  const StationListRoute = () => {
    return (
            <StationListFragment list={props.stationListStore.stations}/>
    );
  };

  const StationMapRoute = () => {
    return (
            <StationMapFragment list={props.stationListStore.stations}/>
    );
  };

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    map: StationMapRoute,
    stations: StationListRoute
  });

  return (
          <BottomNavigation navigationState={{index, routes}} onIndexChange={setIndex}
                            renderScene={renderScene} barStyle={{backgroundColor: Colors.white}}
                            activeColor={assets.colors.primaryColor}
          />);
}));

const style = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', alignContent: 'center', backgroundColor: assets.colors.primaryColor
  },
  bottom: {}
});

