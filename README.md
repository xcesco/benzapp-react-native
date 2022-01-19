# React Native Benzapp

# Icone
https://materialdesignicons.com/

## Installazione
i18n
react-navigation
paper

# Per attivare debugger
Controllare che la porta coincida. Avviare React Native Debugger (8081).
command + M su android
command + D su ios

Avviare debugger

# Navigation + State management
- https://www.digitalocean.com/community/tutorials/react-mobx-react-native-simplified

# Rinominare package progetto
Rinominare il package in `it.insiel.innovazione.benzapp.reactnative` seguendo le indicazioni

```
https://medium.com/automating-react-native-app-release-to-google-play/rename-react-native-apps-bundle-id-and-package-name-fabd74db66ca
```

# Installazione api client servizi firebase

# Axios
Libreria per http
Come logger (developer tool non visualizza log chiamate applicative)
https://www.npmjs.com/package/axios-logger
- npm i axios-logger
-
## Axios per network
per logger
https://www.npmjs.com/package/axios-logger


## Fix per problemi di rete
Con Axios si sono verificati dei problemi con URL.search (in realta' e' un problema di react native).
Risolto facendo

```text
 npm install react-native-url-polyfill
```

Ed inserendo nel file index.js

```typescript
import 'react-native-url-polyfill/auto';
```

https://wix.github.io/react-native-navigation/docs/installing
https://rnfirebase.io/

## Shared preference
- https://github.com/kevinresol/react-native-default-preference
-
## Internalization
https://github.com/zoontek/react-native-localize

## SQLite
expo-sqlite
expo install expo-sqlite
- https://github.com/andpor/react-native-sqlite-storage (2.4k)
- https://github.com/craftzdog/react-native-sqlite-2 (2.7.1)

Per eseguire la build su Android, nel file `package.json` inserire la configurazione

```json
 "expo": {
    "autolinking": {
      "exclude": [
        "expo-file-system"
      ]
    }
  },
```

Nel caso di build su iOS, togliere la configurazione (o rinominarla in expo-android)

## IOs
pinch out & in

45.65969545095563, 13.79476925592051
45,65969545095563, 13,79476925592051

You can move the two gray circles that represent your fingers around the screen by holding <kbd>Option</kbd> and <kbd>Shift</kbd> and moving the mouse.

https://stackoverflow.com/questions/11622579/how-to-pinch-out-in-ios-simulator-when-map-view-is-only-a-portion-of-the-screen

## FCM
- https://rnfirebase.io/messaging/notifications#handling-interaction
- https://betterprogramming.pub/how-to-set-up-firebase-push-notifications-in-a-react-native-app-a9405af32093


## Build IOS
https://stackoverflow.com/questions/42110496/how-to-build-ipa-application-for-react-native-ios

react-native run-ios --configuration=release
Build/Products/Release/"<Your_Filename>.app"


## Google maps
navigazione
- https://www.npmjs.com/package/react-native-google-maps-directions
-
https://www.freecodecamp.org/news/how-to-integrate-maps-in-react-native-using-react-native-maps-5745490fe055/
https://developers.google.com/maps/documentation/javascript/react-map
https://developers.google.com/maps/documentation/javascript/overview

come impostare le coordinate da emulatore (ios)
https://medium.com/@oleary.audio/xcode-simulating-gps-coordinates-b4ab51f0119c

Clustering
https://www.npmjs.com/package/react-native-map-clustering

react-native-maps
https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md
https://stackoverflow.com/questions/39654594/marker-click-event-on-react-native-maps-not-working-in-react-ios

bug
https://stackoverflow.com/questions/51915353/react-native-maps-markers-image-doesnt-show-using-custom-marker-in-react-nativ
https://github.com/react-native-maps/react-native-maps/issues/1870

## Toolbar
- https://aboutreact.com/custom-header-using-navigation-options-in-react-native/#Left-and-Right-Header-Customization-using

### Share
https://github.com/react-native-share/react-native-share
https://stackoverflow.com/questions/51269475/how-to-share-generated-qr-code-in-react-native
