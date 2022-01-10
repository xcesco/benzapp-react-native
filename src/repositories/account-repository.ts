import remoteConfig from '@react-native-firebase/remote-config';
import {AppDebugLog} from '../utils/AppDebug';
import {ApiClient} from './network';
import DefaultPreference from 'react-native-default-preference';
import {AdminUserDTO} from './network/models';
import AppPreferencesInstance from './persistence/app-preferences';

const BACKEND_URL_PARAMETER_NAME = 'backend_base_url';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MAINTENANCE_MODE = 'maintenance_mode';

export default class AccountRepository {

  constructor(apiClient: ApiClient) {
    this._apiClient = apiClient;
  }

  private _backendBaseUrl!: string;

  private _apiClient: ApiClient;

  async login(username: string, password: string): Promise<string> {
    try {
      let response = await this._apiClient.userJwtControllerApi.authorizeUsingPOST({
        username: username,
        password: password
      });

      console.log(response.data.id_token);

      this.updateClientJWTToken(response.data.id_token);

      const accountResourceApi = this._apiClient.accountResourceApi;
      const account = (await accountResourceApi.getAccountUsingGET()).data;

      console.log(account);

      await AppPreferencesInstance.setAccount(account);
      await AppPreferencesInstance.setJWToken(response.data.id_token);

      return response.data.id_token;
    } catch (e) {
      console.error(e);
    }
    return 'INVALID';
  }

  public updateBaseUrl(baseUrl: string): void {
    this._apiClient.updateBaseUrl(baseUrl);
  }

  public updateClientJWTToken(jwtToken: string): void {
    this._apiClient.updateJWTToken(jwtToken);
  }

  async refreshRemoteConfig(): Promise<string> {
    await remoteConfig()
      .setDefaults({
        BACKEND_URL_PARAMETER_NAME: '10.0.0.2',
        MAINTENANCE_MODE: '8',
      });

    await remoteConfig().setConfigSettings({
      fetchTimeMillis: 60000,
      minimumFetchIntervalMillis: 3000000,
    });

    try {
      await remoteConfig().fetch(300);
    } catch (e) {
      console.error(e);
    }

    try {
      await remoteConfig().activate();

      AppDebugLog(
        'Last fetch status: ' + remoteConfig().lastFetchStatus.toString());
      AppDebugLog('Last fetch time: ' + remoteConfig().fetchTimeMillis.toString());

      this._backendBaseUrl = await remoteConfig().getValue(BACKEND_URL_PARAMETER_NAME).asString();
      this.updateBaseUrl(this._backendBaseUrl);

      AppDebugLog(`>>>>>   backendBaseUrl: ${this._backendBaseUrl}`);
    } catch (e) {
      console.error(e);
    }

    AppDebugLog(`baseUrl: ${this._backendBaseUrl}`);
    return this._backendBaseUrl;
  }
}
