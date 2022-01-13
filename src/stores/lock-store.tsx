import {SecureRepository} from '../repositories/secure-repository';
import AppPreferencesInstance from '../repositories/persistence/app-preferences';
import {action, makeObservable, observable} from 'mobx';

export default class LockStore {
  // observable
  pin: string;
  // observable
  primoAccesso: boolean;
  private _secureRepository: SecureRepository;

  constructor(secureRepository: SecureRepository) {
    this._secureRepository = secureRepository;

    this.pin = '';
    this.primoAccesso = true;

    makeObservable(this, {
      pin: observable,
      primoAccesso: observable,

      //remoteUrlRead: computed,

      actionGetCurrentPIN: action,
      actionSavePin: action,
      actionPrimoAccesso: action
    });
  }

  // action
  async actionGetCurrentPIN(): Promise<string> {
    this.pin = await this._secureRepository.readPin() ?? '';

    return this.pin;
  }

  //action
  async actionSavePin(pin: string): Promise<void> {
    this.primoAccesso=false;
    this.pin=pin;

    await AppPreferencesInstance.setPrimoAccesso(this.primoAccesso);
    await this._secureRepository.writePin(this.pin);
  }

  //action
  async actionPrimoAccesso(): Promise<boolean> {
    this.primoAccesso = await AppPreferencesInstance.isPrimoAccesso();

    return this.primoAccesso;
  }
}
