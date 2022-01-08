import * as React from 'react';
import {BottomNavigation, Card, Paragraph, Title} from 'react-native-paper';
import {Text} from 'react-native';
import AppTab2 from './app-tab2';
import BackgroundScreen from './background-screen';

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

const RecentsRoute = () => <Text>Recents</Text>;

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

  return <BottomNavigation navigationState={{index, routes}} onIndexChange={setIndex} renderScene={renderScene} />;
};

export default AppMainContent;
