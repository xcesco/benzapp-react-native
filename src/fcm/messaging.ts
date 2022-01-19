import messaging from '@react-native-firebase/messaging';
import HomeStore from '../ui/home/home-store';

export async function registryMessageHandler(homeStore: HomeStore): Promise<boolean> {
  console.log(
    'fcm > notification handler registered');

  await messaging().setAutoInitEnabled(true);
  // const token = await messaging().getToken();
  // console.log(`fcm > ${token}`)

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'fcm > notification caused app to open from background state:',
      remoteMessage.notification,
    );
    //navigation.navigate(remoteMessage.data.type);
  });

  messaging().onMessage((remoteMessage) => {
    console.log('eccomi');
    console.log('fcm > Message Data:', remoteMessage.notification?.body);

    homeStore.publishNotification(remoteMessage.notification?.body!);


    // Update a users messages list using AsyncStorage
    //const currentMessages = await AsyncStorage.getItem('messages');
    //const messageArray = JSON.parse(currentMessages);
    //messageArray.push(remoteMessage.data);
    //await AsyncStorage.setItem('messages', JSON.stringify(messageArray));
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('fcm > message handled in the background!', remoteMessage);
  });

// Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'fcm > notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //setLoading(false);
    });

  return true;
}


