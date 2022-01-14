import React from 'react';
import {StyleSheet} from 'react-native';

import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import AppMainContent from '../components/app-main-content';

type screenProp = StackNavigationProp<RootStackParamList, 'Main'>;

export function MainScreen() {
  const navigation = useNavigation<screenProp>();

  const navigateToLogin = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  /**
   {/*<AppPage title="ciao">*/

// {/*  <View style={{width: '80%', alignItems: 'center', alignContent: 'center'}}>*/}
// {/*    <Text>Home Screen</Text>*/}
// {/*    <Button mode="contained" onPress={navigateToLogin}>*/}
// {/*      <Text>Goto login</Text>*/}
// {/*    </Button>*/}
// {/*    <Button mode="contained" onPress={() => navigation.navigate('VehicleList')}>*/}
// {/*      <Text>Goto VehicleList</Text>*/}
// {/*    </Button>*/}
// {/*    <Button mode="contained" onPress={() => navigation.navigate('VehicleDetail')}>*/}
// {/*      <Text>Goto VehicleDetail</Text>*/}
// {/*    </Button>*/}
// {/*    <Button mode="contained" onPress={() => navigation.navigate('VehicleQRCodeDetail')}>*/}
// {/*      <Text>Goto VehicleQRCodeDetail</Text>*/}
// {/*    </Button>*/}
// {/*    <Button mode="contained" onPress={() => navigation.navigate('RefuelingList')}>*/}
// {/*      <Text>Goto RefuelingList</Text>*/}
// {/*    </Button>*/}
// {/*    <Button mode="contained" onPress={() => navigation.navigate('RefuelingDetail')}>*/}
// {/*      <Text>Goto RefuelingDetail</Text>*/}
// {/*    </Button>*/}
// {/*  </View>*/}
// {/*</AppPage>*/}
// {/*</View>*/}


  return (<AppMainContent/>);
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
