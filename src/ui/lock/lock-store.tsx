import {SecureRepository} from '../../repositories/secure-repository';
import AppPreferencesInstance from '../../repositories/persistence/app-preferences';
import {action, makeObservable, observable} from 'mobx';

export default class LockStore {
  // observable
  pin: string | null;
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

      init:action,
      actionGetCurrentPIN: action,
      actionSavePin: action,
      readPrimoAccesso: action,
      updatePrimoAccesso:action
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
  async actionSavePin(pin: string): Promise<string> {
    console.log(`lock-store > actionSavePin: primoAccesso: ${pin}`);
    this.pin = pin;
    await this._secureRepository.writePin(this.pin);

    return pin;
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
