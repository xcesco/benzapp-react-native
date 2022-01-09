import * as React from 'react';
import {Appbar, Colors, Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// @ts-ignore
export default function AppHeader({navigation, back}) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header style={{zIndex: 0, elevation: 0}}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : <Icon name="menu" color={Colors.white} size={24} />}

      <Appbar.Content title="Main page">
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed');
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      </Appbar.Content>
      <Appbar.Action icon="magnify" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
}

// const styles = StyleSheet.create({
//   top: {
//     flexDirection: 'row',
//     marginTop: 48,
//   },
//   bottom: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });
