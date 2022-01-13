import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Colors, IconButton, Snackbar, Text, TextInput} from 'react-native-paper';
import assets from '../../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/root-stack-param-list';
import {inject, observer} from 'mobx-react';
import * as Progress from 'react-native-progress';
import I18n from 'react-native-i18n';
import HomeStore from '../stores/home-store';
import {AppDebugLog} from '../utils/AppDebug';
// import NoteListPage from '../../stores/NoteListPage';
// import AccountStore from '../../stores/AccountStore';
// import {NavigationInjectedProps} from 'react-navigation';

// interface LoginScreenProperties {
//   accountStore?: AccountStore;
// }

type ScreenProps = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = inject('homeStore')(observer((props: { componentId: string; homeStore: HomeStore, back: any }) => {
  const navigation = useNavigation<ScreenProps>();

  AppDebugLog('display> login-screen');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  // const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  // props.accountStore.accountRepository.refreshRemoteConfig().then(value => {
  //   console.log('remote', value);
  //
  // });

  const usernameChangeHandler = (text: string): void => {
    setUsername(_ => text);
  };

  const passwordChangeHandler = (text: string): void => {
    setPassword(_ => text);
  };

  const _navigateToLock = (): void => {
    console.log(`${username} ${password}`);
    setMessage(I18n.t('loginStart'))
    setVisible(true);
    setLoading(true)

    props.homeStore.login(username, password).then((value) => {
      if (value === true) {
        setMessage(I18n.t('loginError'))
      } else {
        setMessage(I18n.t('loginSuccess'))
        navigation.reset({
          index: 0,
          routes: [{name: 'Lock'}],
        });
      }
      setLoading(false);

    }, (reason => {
      console.log(reason)
    }));

  };

  return (
          <SafeAreaView style={style.container}>
            <View>
              {/*<NoteListPage />*/}
              <ImageBackground
                      resizeMode={'cover'}
                      style={{width: '100%', height: '110%',}} source={assets.image.image_background}>
                <View
                        style={{flex: 1, alignItems: 'center', paddingVertical: 24, flexDirection: 'column',}}>
                  <Icon name="lock-outline" size={128} color={Colors.white}/>
                  <Text style={{fontSize: 48, color: Colors.white}}>{I18n.t('login')}</Text>

                  <View style={{
                    marginTop: 24, flexDirection: 'row', justifyContent: 'center', alignContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      color: Colors.white,
                    }}>{props.homeStore.remoteUrl}</Text>
                    <IconButton icon="sync" color={Colors.white} size={24} onPress={() => {
                      setLoading(true)
                      setTimeout(() => {
                        props.homeStore.updateRemote();
                        setLoading(false);
                      }, 2000);

                    }}><Text>ss</Text></IconButton>
                  </View>

                  <TextInput autoCapitalize={'none'} style={{
                    width: '80%',
                    marginTop: 24
                  }} label="Username" mode={'flat'} value={username}
                             onChangeText={usernameChangeHandler}/>

                  <TextInput autoCapitalize={'none'} secureTextEntry={true}
                             style={{width: '80%', marginTop: 24}} label="Password" mode={'flat'} value={password}
                             onChangeText={passwordChangeHandler}/>


                  {loading ?
                          <Progress.CircleSnail size={50} style={{marginTop: 128}} indeterminate={true} color={assets.colors.accentColor}/> :
                          <Button style={{width: '80%', marginTop: 128}} mode="contained" onPress={_navigateToLock}>
                            <Text style={{color: Colors.white}}>{I18n.t('login')}</Text>
                          </Button>}
                </View>

              </ImageBackground>

            </View>
            <Snackbar visible={visible} onDismiss={onDismissSnackBar}> {message} </Snackbar>
          </SafeAreaView>
  );
}));

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
