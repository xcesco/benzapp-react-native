import DefaultPreference from 'react-native-default-preference';
import {AdminUserDTO} from '../network/models';

export class AppPreferences {
  async setJWToken(token: string): Promise<void> {
    await DefaultPreference.set('JWTToken', token);
  }

  async getJWToken(): Promise<string> {
    const value = await DefaultPreference.get('JWTToken');

    return value;
  }

  async getAccount(): Promise<AdminUserDTO> {
    return (JSON.parse(await DefaultPreference.get('AdminUserDTO')));
  }

  async setAccount(account: AdminUserDTO): Promise<void> {
    await DefaultPreference.set('AdminUserDTO', JSON.stringify(account));
  }

  async removeAccount(): Promise<void> {
    await DefaultPreference.clear('AdminUserDTO');
  }

  async setPrimoAccesso(value: boolean): Promise<void> {
    await DefaultPreference.set('PrimoAccesso', String(value));
  }

  async isPrimoAccesso(): Promise<boolean> {
    const value = await DefaultPreference.get('PrimoAccesso');

    if (value === undefined || value === null || value === 'true') {
      return false;
    } else {
      return true;
    }
  }
}


const AppPreferencesInstance = new AppPreferences();
export default AppPreferencesInstance;

