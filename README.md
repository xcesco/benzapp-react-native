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

## FCM
- https://rnfirebase.io/messaging/notifications#handling-interaction
- https://betterprogramming.pub/how-to-set-up-firebase-push-notifications-in-a-react-native-app-a9405af32093


## Build IOS
https://stackoverflow.com/questions/42110496/how-to-build-ipa-application-for-react-native-ios

react-native run-ios --configuration=release
Build/Products/Release/"<Your_Filename>.app"
