import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import assets from './assets';
import {Provider} from 'mobx-react';
import LockScreen from './src/ui/lock/lock-screen';
import {MainScreen} from './src/ui/main/main-screen';
import LoginScreen from './src/ui/login/login-screen';
import {AppDebugLog} from './src/utils/AppDebug';
import AccountRepository from './src/repositories/account-repository';
import SplashScreen from './src/ui/splash/splash-screen';
import {configure} from 'mobx';
import {ApiClient} from './src/repositories/network';
import {
  dbConnection,
  initAndPopulateDb,
  notificationDao,
  refuelingDao,
  stationDao,
  vehicleDao
} from './src/repositories/persistence/db';
import HomeStore from './src/ui/home/home-store';
import {VehicleRepository} from './src/repositories/vehicle-repository';
import RefuelingRepository from './src/repositories/refueling-repository';
import {NotificationRepository} from './src/repositories/notification-repository';
import {SecureRepository} from './src/repositories/secure-repository';
import LockStore from './src/ui/lock/lock-store';
import {StationRepository} from './src/repositories/station-repository';
import StationListStore from './src/ui/stations/station-list-store';
import RefuelingStore from './src/ui/refuelings/refueling-store';
import {RefuelingListScreen} from './src/ui/refuelings/refueling-list-screen';
import VehicleStore from './src/ui/vehicles/vehicle-store';
import {VehicleListScreen} from './src/ui/vehicles/vehicle-list-screen';
import {RefuelingDetailScreen} from './src/ui/refuelings/refueling-detail-screen';
import {VehicleDetailScreen} from './src/ui/vehicles/vehicle-detail-screen';
import {QRCodeScreen} from './src/ui/qrcode/qrcode-screen';
import {Platform} from 'react-native';

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

const apiClient = new ApiClient();

const secureRepository = new SecureRepository();
const accountRepository = new AccountRepository(apiClient);
const vehicleRepository = new VehicleRepository(apiClient, dbConnection, vehicleDao, refuelingDao);
const refuelingRepository = new RefuelingRepository(apiClient, dbConnection, refuelingDao);
const notificationRepository = new NotificationRepository(apiClient, dbConnection, notificationDao);
const stationRepository = new StationRepository(dbConnection, stationDao);

const lockStore = new LockStore(secureRepository, apiClient);
const homeStore = new HomeStore(accountRepository, vehicleRepository, refuelingRepository, notificationRepository);
const refuelingStore = new RefuelingStore(refuelingRepository);
const vehicleStore = new VehicleStore(vehicleRepository);
const stationListStore = new StationListStore(stationRepository);

export async function applicationInit(): Promise<boolean> {
  AppDebugLog('app initialization - start');
  await initAndPopulateDb();

  await accountRepository.refreshRemoteConfig();

  await lockStore.init();
  await homeStore.init()
  await refuelingStore.init();
  await vehicleStore.init();
  const hasAccount = await homeStore.initAccountAndJWTToken();

  AppDebugLog(`app initialization - end (hasAccount: ${hasAccount})`);

  return hasAccount;
}

function App() {
  const Stack = createNativeStackNavigator();

  // @ts-ignore
  return (
          <PaperProvider theme={theme}>
            <Provider
                    stationListStore={stationListStore}
                    homeStore={homeStore}
                    lockStore={lockStore}
                    vehicleStore={vehicleStore}
                    refuelingStore={refuelingStore}
            >
              <NavigationContainer>
                <Stack.Navigator
                        initialRouteName="Splash"
                        screenOptions={{
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: assets.colors.primaryColor,
                            ...Platform.select({
                              android: {
                                marginTop: 0
                              }
                            })
                          },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                            fontWeight: 'bold',
                          }
                        }}>
                  <Stack.Screen name="Splash" component={SplashScreen} options={{
                    headerShown: false,
                  }}/>
                  <Stack.Screen name="Login" component={LoginScreen} options={{
                    headerShown: false,
                  }}/>
                  <Stack.Screen name="Lock" component={LockScreen} options={{
                    headerShown: false,
                  }}/>
                  <Stack.Screen name="Main" component={MainScreen} options={{title: 'React Native Benzapp'}}/>
                  <Stack.Screen name="VehicleList" component={VehicleListScreen} options={{
                    title: 'Lista tessere',
                  }}/>
                  <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} options={{
                    title: 'Dettaglio tessera',
                  }}/>
                  <Stack.Screen name="VehicleQRCodeDetail" component={QRCodeScreen} options={{
                    title: 'QRCode', headerRight: () => (
                            <Button
                                    onPress={() => alert('This is a button!')}
                                    color="#fff"
                            >ss</Button>
                    )
                  }}/>
                  <Stack.Screen name="RefuelingList" component={RefuelingListScreen} options={{
                    title: 'Lista rifornimenti',
                  }}/>
                  <Stack.Screen name="RefuelingDetail" component={RefuelingDetailScreen} options={{
                    title: 'Dettaglio rifornimento',
                  }}/>
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
          </PaperProvider>
  );
}

export default App;

function alert(arg0: string): void {
  throw new Error('Function not implemented.');
}

