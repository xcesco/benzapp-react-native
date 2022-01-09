import remoteConfig from '@react-native-firebase/remote-config';
import {AppDebugLog} from '../utils/AppDebug';

const BACKEND_URL_PARAMETER_NAME = 'backend_base_url';
const MAINTENANCE_MODE = 'maintenance_mode';

export default class AccountRepository {
  private _backendBaseUrl!: string;

  async refreshRemoteConfig(): Promise<string> {
    await remoteConfig()
      .setDefaults({
        BACKEND_URL_PARAMETER_NAME: '10.0.0.2',
        MAINTENANCE_MODE: '8',
      });

    await remoteConfig().setConfigSettings({
      fetchTimeMillis: 60000,
      minimumFetchIntervalMillis: 30000,
    });

    try {
      await remoteConfig().fetch();
    } catch (e) {
      console.error(e);
    }

    try {
      await remoteConfig().activate();

      AppDebugLog(
        'Last fetch status: ' + remoteConfig().lastFetchStatus.toString());
      AppDebugLog('Last fetch time: ' + remoteConfig().fetchTimeMillis.toString());

      this._backendBaseUrl = await remoteConfig().getValue(BACKEND_URL_PARAMETER_NAME).asString();
    } catch (e) {
      console.error(e);
    }

    AppDebugLog(`baseUrl: ${this._backendBaseUrl}`);
    return this._backendBaseUrl;
  }
}
