import EncryptedStorage from 'react-native-encrypted-storage';

import {AppDebugLog} from '../utils/AppDebug';

export class SecureRepository {
  async write(key: string, value: string): Promise<void> {
    AppDebugLog(`SecureRepository > write (${key}, ${value})`);
    return await EncryptedStorage.setItem(key, value);
  }

  async containsKey(key: string): Promise<boolean> {
    const value = await EncryptedStorage.getItem(key);

    return value === undefined || value === null;
  }

  async read(key: string): Promise<string | null> {
    const value = await EncryptedStorage.getItem(key);
    AppDebugLog(`SecureRepository > write (${key}, ${value})`);

    return value;
  }

  async readPin(): Promise<string | null> {
    return await this.read('pin');
  }

  async writePin(value: string): Promise<void> {
    return await this.write('pin', value);
  }
}

