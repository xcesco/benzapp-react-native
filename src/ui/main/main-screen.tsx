import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/root-stack-param-list';
import I18n from 'react-native-i18n';
import StationListFragment from '../stations/station-list-fragment';
import {BottomNavigation, Button, Colors, Text} from 'react-native-paper';
import {inject, observer} from 'mobx-react';
import HomeStore from '../home/home-store';
import StationListStore from '../stations/station-list-store';
import assets from '../../../assets';
import StationMapFragment from '../stations/station-map-fragment';
import HomeFragment from '../home/home-fragment';
import {action} from 'mobx';

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

  const HomeRouteOld = () => {
    const navigation = useNavigation<screenProp>();

    const navigateToLogin = (): void => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    };

    return (
            <View style={style.container}>
              <Text>Home Screen</Text>
              <Button mode="contained" onPress={navigateToLogin}>
                <Text>Goto login</Text>
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate('VehicleList')}>
                <Text>Goto VehicleList</Text>
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate('VehicleDetail')}>
                <Text>Goto VehicleDetail</Text>
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate('VehicleQRCodeDetail')}>
                <Text>Goto VehicleQRCodeDetail</Text>
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate('RefuelingList')}>
                <Text>Goto RefuelingList</Text>
              </Button>
              <Button mode="contained" onPress={() => navigation.navigate('RefuelingDetail')}>
                <Text>Goto RefuelingDetail</Text>
              </Button>
            </View>)
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
