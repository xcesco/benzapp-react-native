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

  async getAccount(): Promise<AdminUserDTO | null> {
    const valueJSON = await DefaultPreference.get('AdminUserDTO');
    console.log(`app-preference > read account ${valueJSON}`);

    if (valueJSON === null || valueJSON === '') {
      return JSON.parse(valueJSON);
    } else {
      return null;
    }
  }

  async setAccount(account: AdminUserDTO): Promise<void> {
    console.log(`app-preference > read account ${JSON.stringify(account)}`);
    await DefaultPreference.set('AdminUserDTO', JSON.stringify(account));
  }

  async removeAccount(): Promise<void> {
    await DefaultPreference.clear('AdminUserDTO');
  }

  async setPrimoAccesso(value: boolean): Promise<void> {
    console.log(`app-preference > write isPrimoAccesso ${value}`);
    await DefaultPreference.set('PrimoAccesso', String(value));
  }

  async isPrimoAccesso(): Promise<boolean> {
    const value = await DefaultPreference.get('PrimoAccesso');
    console.log(`app-preference > read isPrimoAccesso ${value}`);

    if (value === undefined || value === null || value === 'true') {
      return true;
    } else {
      return false;
    }
  }
}


const AppPreferencesInstance = new AppPreferences();
export default AppPreferencesInstance;

