import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Colors, Text, TextInput} from 'react-native-paper';
import assets from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import {inject, observer} from 'mobx-react';
import NoteStore from '../stores/note-store';
import AccountStore from '../stores/account-store';
import * as Progress from 'react-native-progress';
// import NoteListPage from '../../stores/NoteListPage';
// import AccountStore from '../../stores/AccountStore';
// import {NavigationInjectedProps} from 'react-navigation';

// interface LoginScreenProperties {
//   accountStore?: AccountStore;
// }

type ScreenProps = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = inject('noteStore', 'accountStore')(observer((props: { componentId: string; noteStore: NoteStore, accountStore: AccountStore, back: any }) => {
  const navigation = useNavigation<ScreenProps>();

  console.log('LoginScreen LOAD', props.accountStore);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // props.accountStore.accountRepository.refreshRemoteConfig().then(value => {
  //   console.log('remote', value);
  //
  // });

  const _handleUsernameChange = (text: string): void => {
    setUsername(_ => text);
  };

  const _handlePasswordChange = (text: string): void => {
    setPassword(_ => text);
  };

  const _navigateToLock = (): void => {
    console.log(`${username} ${password}`);
    navigation.reset({
      index: 0,
      routes: [{name: 'Lock'}],
    });
  };

  return (
          <SafeAreaView style={style.container}>
            <View>
              {/*<NoteListPage />*/}
              <ImageBackground
                      resizeMode={'cover'}
                      style={{
                        width: '100%',
                        height: '110%',
                      }}
                      source={assets.image.image_background}>
                <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          paddingVertical: 24,
                          flexDirection: 'column',
                        }}>
                  <Icon name="lock-outline" size={128} color={Colors.white}/>
                  <Text style={{fontSize: 48, color: Colors.white}}>Login</Text>

                  <View style={{
                    marginTop: 24,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      color: Colors.white,
                    }}>{props.accountStore.remoteUrlRead}</Text>
                    <Button icon="sync" mode="contained" onPress={() => {
                      setLoading(true)
                      setTimeout(() => {
                        props.accountStore.updateRemote();
                        setLoading(false);
                      }, 5000);

                    }}><Text>ss</Text></Button>
                  </View>

                  <TextInput style={{width: '80%', marginTop: 24}} label="Username" mode={'flat'} value={username}
                             onChangeText={_handleUsernameChange}/>

                  <TextInput
                          style={{width: '80%', marginTop: 24}} label="Password" mode={'flat'} value={password}
                          onChangeText={_handlePasswordChange}/>


                  {loading ?
                          <Progress.CircleSnail size={50} style={{marginTop: 128}} indeterminate={true} color={assets.colors.accentColor}/> :
                          <Button style={{width: '80%', marginTop: 128}} mode="contained" onPress={_navigateToLock}>
                            <Text style={{color: Colors.white}}>Login</Text>
                          </Button>}

                </View>
              </ImageBackground>
            </View>
          </SafeAreaView>
  );
}));

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
