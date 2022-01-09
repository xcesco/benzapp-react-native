import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Colors, Text, TextInput} from 'react-native-paper';
import assets from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Progress from 'react-native-progress';
// import NoteListPage from '../../stores/NoteListPage';
// import AccountStore from '../../stores/AccountStore';
// import {NavigationInjectedProps} from 'react-navigation';

// interface LoginScreenProperties {
//   accountStore?: AccountStore;
// }

// type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

// type Props = NavigationInjectedProps<LoginScreenProperties>;
//
// interface State {
//   username: string | null;
//   password: string | null;
// }

const LoginScreen = () => {
  console.log('fatto');
  const [username, setUsername] = useState('pippo');
  const [password, setPassword] = useState('password');

  const _handleUsernameChange = (text: string): void => {
    setUsername(_ => text);
  };

  const _handlePasswordChange = (text: string): void => {
    setPassword(_ => text);
  };

  const _navigateToLock = (): void => {
    console.log(`${username} ${password}`);
    //Navigation.push('Lock');
  };

  return (
    <View style={style.container}>
      {/*<NoteListPage />*/}
      <ImageBackground
        resizeMode={'cover'}
        style={{
          width: '100%',
          height: '100%',
        }}
        source={assets.image.image_background}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 24,
            flexDirection: 'column',
          }}>
          <Icon name="lock-outline" size={128} color={Colors.white} />
          <Text style={{fontSize: 48, color: Colors.white}}>Login</Text>
          <TextInput
            style={{width: '80%', marginTop: 24}}
            label="Username"
            mode={'flat'}
            value={username!}
            onChangeText={_handleUsernameChange}
          />

          <TextInput
            style={{width: '80%', marginTop: 24}}
            label="Password"
            mode={'flat'}
            value={password!}
            onChangeText={() => {
              _handlePasswordChange;
            }}
          />

          <Button style={{width: '80%', marginTop: 48}} mode="contained" onPress={_navigateToLock}>
            <Text style={{color: Colors.white}}>Login</Text>
          </Button>

          <Progress.CircleSnail size={50} indeterminate={true} color={assets.colors.accentColor} />
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
