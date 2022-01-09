import remoteConfig from '@react-native-firebase/remote-config';

const BACKEND_URL_PARAMETER_NAME = 'backend_base_url';
const MAINTENANCE_MODE = 'maintenance_mode';

export default class AccountRepository {
  async refreshRemoteConfig(): Promise<string> {
    await remoteConfig()
      .setDefaults({
        BACKEND_URL_PARAMETER_NAME: '10.0.0.2',
        MAINTENANCE_MODE: '8',
      });
    return remoteConfig().fetchAndActivate().then((_: any) => remoteConfig().getValue(BACKEND_URL_PARAMETER_NAME).asString());
  }
}
