import {SecureRepository} from '../../repositories/secure-repository';
import AppPreferencesInstance from '../../repositories/persistence/app-preferences';
import {action, makeObservable, observable} from 'mobx';
import ApiClient from '../../repositories/network/api-client';
import {Device} from '../../repositories/network/models';
import messaging from '@react-native-firebase/messaging';

export default class LockStore {
  // observable
  pin: string | null;
  // observable
  primoAccesso: boolean;
  private _secureRepository: SecureRepository;
  private _apiClient: ApiClient;

  constructor(secureRepository: SecureRepository, apiClient: ApiClient) {
    this._secureRepository = secureRepository;
    this._apiClient = apiClient;
    this.pin = '';
    this.primoAccesso = true;

    makeObservable(this, {
      pin: observable,
      primoAccesso: observable,

      init: action,
      actionGetCurrentPIN: action,
      savePin: action,
      readPrimoAccesso: action,
      updatePrimoAccesso: action,
      unlock: action
    });
  }

  async init(): Promise<void> {
    await this.readPrimoAccesso();
    await this.actionGetCurrentPIN();
  }

  // action
  async actionGetCurrentPIN(): Promise<string | null> {
    this.pin = await this._secureRepository.readPin();

    return this.pin;
  }

  //action
  async savePin(pin: string): Promise<string> {
    console.log(`lock-store > actionSavePin: primoAccesso: ${pin}`);
    this.pin = pin;
    await this._secureRepository.writePin(this.pin);

    return pin;
  }

  // action
  async unlock(): Promise<void> {
    const deviceResourceApi = this._apiClient.deviceResourceApi;
    const account = await AppPreferencesInstance.getAccount();
    const deviceId = await messaging().getToken();
    const device: Device = {owner: account?.login, deviceId: deviceId};

    console.log(
            `register FMC device , owner: ${device.owner}, deviceId: ${device.deviceId}, baseUrl: ${this._apiClient.baseUrl}`);

    await deviceResourceApi.createDeviceUsingPOST(device);
  }

  //action
  async updatePrimoAccesso(): Promise<void> {
    this.primoAccesso = false;
    await AppPreferencesInstance.setPrimoAccesso(this.primoAccesso);
  }

  //action
  async readPrimoAccesso(): Promise<boolean> {
    this.primoAccesso = await AppPreferencesInstance.isPrimoAccesso();

    return this.primoAccesso;
  }
}
