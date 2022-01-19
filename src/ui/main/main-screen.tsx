import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import I18n from 'react-native-i18n';
import StationListFragment from '../stations/station-list-fragment';
import {BottomNavigation, Colors} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import HomeStore from '../home/home-store';
import StationListStore from '../stations/station-list-store';
import assets from '../../../assets';
import StationMapFragment from '../stations/station-map-fragment';
import HomeFragment from '../home/home-fragment';

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

  useEffect(() => {
    if (!initializiated) {
      setInitializiated(true);
      props.stationListStore.selectAll();
    }

  }, [initializiated, props.stationListStore, props.homeStore]);

  const navigateToLogin = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

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

  return <BottomNavigation navigationState={{index, routes}} onIndexChange={setIndex} renderScene={renderScene}
                           barStyle={{backgroundColor: Colors.white}} activeColor={assets.colors.primaryColor}/>;
}));

const style = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', alignContent: 'center', backgroundColor: assets.colors.primaryColor
  },
  bottom: {}
});
