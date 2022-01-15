import * as React from 'react';
import {BottomNavigation, Button, Card, Paragraph, Title} from 'react-native-paper';
import {Text, View} from 'react-native';
import AppTab2 from './app-tab2';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/root-stack-param-list';

const MusicRoute = () => {
  return (
          <Card>
            <Card.Content>
              <Title>susa</Title>
              <Paragraph>ss</Paragraph>
            </Card.Content>
          </Card>
  );
};

const AlbumsRoute = () => (
        <AppTab2
                name="ciao"
                baseCounter={1}
                onPress={() => {
                  console.log('suca');
                }}
        />
);

type screenProp = StackNavigationProp<RootStackParamList, 'Main'>;

const RecentsRoute = () => {
  const navigation = useNavigation<screenProp>();

  const navigateToLogin = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
          <View style={{width: '80%', alignItems: 'center', alignContent: 'center'}}>
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

const AppMainContent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'music', title: 'Music', icon: 'music'},
    {key: 'albums', title: 'Albums', icon: 'album'},
    {key: 'recents', title: 'Recents', icon: 'history'},
    // {key: 'svg', title: 'Svg', icon: 'history'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    // svg: BackgroundScreen,
  });

  return <BottomNavigation navigationState={{index, routes}} onIndexChange={setIndex} renderScene={renderScene}/>;
};

export default AppMainContent;
