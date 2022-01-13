/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import globalAxios from 'axios';
import * as AxiosLogger from 'axios-logger';
import {setGlobalConfig} from 'axios-logger';
import 'react-native-url-polyfill/auto';
import I18n from './src/i18n/I18n';

I18n.locale = 'it';

// react-native 0.59 add own global URLSearchParams without implementation
// https://github.com/facebook/react-native/blob/e6057095adfdc77ccbbff1c97b1e86b06dae340b/Libraries/Blob/URL.js#L66
// global.Buffer = Buffer;
// global.URL = URL;
// global.URLSearchParams = URLSearchParams;

setGlobalConfig({
  status: true,
  headers: true,
});

globalAxios.interceptors.request.use(AxiosLogger.requestLogger, AxiosLogger.errorLogger);
globalAxios.interceptors.response.use(AxiosLogger.responseLogger, AxiosLogger.errorLogger);

AppRegistry.registerComponent(appName, () => App);
