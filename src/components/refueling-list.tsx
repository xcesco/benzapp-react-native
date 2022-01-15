import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import {inject, observer} from 'mobx-react';
import HomeStore from '../stores/home-store';
import {View} from 'react-native';

type ScreenProps = StackNavigationProp<RootStackParamList, 'Main'>;

const RefuelingList = inject('rootStore', 'homeStore')
(observer((props: { componentId: string; homeStore: HomeStore, back: any }) => {
  return (<View>

  </View>);
}));
