import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, Provider as PaperProvider, Text} from 'react-native-paper';
import assets from './assets';
import {Provider} from 'mobx-react';
import {LockScreen} from './src/screens/lock-screen';
import {RefuelingListScreen} from './src/screens/RefuelingListScreen';
import {RefuelingDetailScreen} from './src/screens/RefuelingDetailScreen';
import {MainScreen} from './src/screens/main-screen';
import {VehicleDetailScreen} from './src/screens/VehicleDetailScreen';
import {VehicleQRCodeDetailScreen} from './src/screens/VehicleQRCodeDetailScreen';
import AppHeader from './src/components/app-header';
import LoginScreen from './src/screens/login-screen';
import {RootStore} from './src/stores/root-store';
import {AppDebugLog} from './src/utils/AppDebug';
import AccountRepository from './src/repositories/account-repository';
import SplashScreen from './src/screens/splash-screen';
import {configure} from 'mobx';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: assets.colors.primaryColor,
    accent: assets.colors.accentColor,
  },
};

configure({
  //enforceActions: 'never',
  enforceActions: 'observed',
})

function HomeScreen() {
  return (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
          </View>
  );
}

const rootStore = new RootStore();

export async function applicationInit(): Promise<void> {
  AppDebugLog('app initialization - start');
  const accountRepository = new AccountRepository();
  await accountRepository.refreshRemoteConfig();

  AppDebugLog('app initialization - done');
}


function App() {
  const Stack = createNativeStackNavigator();

  applicationInit();

  // @ts-ignore
  return (
          <PaperProvider theme={theme}>
            <Provider rootStore={rootStore} noteStore={rootStore.noteStore}
                      accountStore={rootStore.accountStore}>
              <NavigationContainer>
                <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                          header: props => <AppHeader {...props} />,
                        }}>
                  <Stack.Screen name="Splash" component={SplashScreen} options={{
                    title: 'Home',
                    headerShown: false,
                  }}/>
                  <Stack.Screen name="Login" component={LoginScreen} options={{
                    title: 'Login',
                    headerShown: false,
                  }}/>
                  <Stack.Screen name="Lock" component={LockScreen} options={{
                    title: 'Home',
                    headerShown: false,
                  }}/>
                  <Stack.Screen name="Main" component={MainScreen} options={{title: 'Main'}}/>
                  <Stack.Screen name="VehicleList" component={VehicleDetailScreen}/>
                  <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen}/>
                  <Stack.Screen name="VehicleQRCodeDetail" component={VehicleQRCodeDetailScreen}/>
                  <Stack.Screen name="RefuelingList" component={RefuelingListScreen}/>
                  <Stack.Screen name="RefuelingDetail" component={RefuelingDetailScreen}/>
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
          </PaperProvider>
  );
}

export default App;
