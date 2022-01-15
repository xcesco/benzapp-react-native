import * as React from 'react';
import {BottomNavigation, Button, Text} from 'react-native-paper';
import {View} from 'react-native';
import AppTab2 from './app-tab2';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import I18n from 'react-native-i18n';
import StationListFragment from '../ui/stations/station-list-fragment';



type screenProp = StackNavigationProp<RootStackParamList, 'Main'>;



const AppMainContent = () => {

};

export default AppMainContent;
