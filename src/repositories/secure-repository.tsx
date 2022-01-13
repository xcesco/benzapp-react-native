import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage'

export class SecureRepository {
  async write(key: string, value: string): Promise<string | null> {
    // {accessible: ACCESSIBLE.WHEN_UNLOCKED} -> This for IOS
    return await RNSecureStorage.set(key, value, {accessible: ACCESSIBLE.WHEN_UNLOCKED});
  }

  async containsKey(key: string): Promise<boolean | null> {
    // {accessible: ACCESSIBLE.WHEN_UNLOCKED} -> This for IOS
    return await RNSecureStorage.exists(key);
  }

  async read(key: string): Promise<string | null> {
    // {accessible: ACCESSIBLE.WHEN_UNLOCKED} -> This for IOS
    return await RNSecureStorage.get(key);
  }

  async readPin(): Promise<string | null> {
    return await this.read('pin');
  }

  async writePin(value: string): Promise<string | null> {
    return await this.write('pin', value);
  }
}

