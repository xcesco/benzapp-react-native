import * as React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, Provider as PaperProvider, Text} from 'react-native-paper';
import assets from './assets';
import {LockScreen} from './src/screens/lock-screen';
import {RefuelingListScreen} from './src/screens/RefuelingListScreen';
import {SplashScreen} from './src/screens/SplashScreen';
import {RefuelingDetailScreen} from './src/screens/RefuelingDetailScreen';
import {MainScreen} from './src/screens/main-screen';
import {VehicleDetailScreen} from './src/screens/VehicleDetailScreen';
import {VehicleQRCodeDetailScreen} from './src/screens/VehicleQRCodeDetailScreen';
import AppHeader from './src/components/app-header';
import LoginScreen from './src/screens/login-screen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: assets.colors.primaryColor,
    accent: assets.colors.accentColor,
  },
};

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  // @ts-ignore
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            header: props => <AppHeader {...props} />,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Lock" component={LockScreen} />
          <Stack.Screen name="Main" component={MainScreen} options={{title: 'Main'}} />
          <Stack.Screen name="VehicleList" component={VehicleDetailScreen} />
          <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
          <Stack.Screen name="VehicleQRCodeDetail" component={VehicleQRCodeDetailScreen} />
          <Stack.Screen name="RefuelingList" component={RefuelingListScreen} />
          <Stack.Screen name="RefuelingDetail" component={RefuelingDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
