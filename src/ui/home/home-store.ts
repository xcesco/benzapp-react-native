import {action, makeObservable, observable} from 'mobx';
import AccountRepository from '../../repositories/account-repository';
import AppPreferencesInstance from '../../repositories/persistence/app-preferences';
import RefuelingRepository from '../../repositories/refueling-repository';
import {VehicleRepository} from '../../repositories/vehicle-repository';
import {NotificationRepository} from '../../repositories/notification_repository';
import {Notification} from '../../repositories/model/notification';
import {Tessera} from '../../repositories/network/models';
import {Refueling} from '../../repositories/model/refueling';
import {Vehicle} from '../../repositories/model/vehicle';

export default class HomeStore {
  // observable
  loading: boolean = false;
  // observable
  remoteUrl = '';
  // observable
  notifiche: Notification[] = [];
  // observable
  tessere: Vehicle[] = [];
  // observable
  rifornimenti: Refueling[] = [];

  private _accountRepository: AccountRepository;
  private _vehicleRepository: VehicleRepository;
  private _refuelingRepository: RefuelingRepository;
  private _notificationRepository: NotificationRepository;

  constructor(accountRepository: AccountRepository, vehicleRepository: VehicleRepository, refuelingRepository: RefuelingRepository, notificationRepository: NotificationRepository) {
    this._accountRepository = accountRepository;
    this._vehicleRepository = vehicleRepository;
    this._refuelingRepository = refuelingRepository;
    this._notificationRepository = notificationRepository;
    this.remoteUrl = '10.0.0.2';

    makeObservable(this, {
      loading: observable,
      remoteUrl: observable,
      notifiche: observable,
      tessere: observable,
      rifornimenti: observable,

      //remoteUrlRead: computed,
      updateData:action,
      updateRemote: action,
      login: action
    });

    //makeAutoObservable(this);
  }


  // get remoteUrlRead(): string {
  //   return this.remoteUrl;
  // }

  // action
  async updateRemote() {
    // note the action wrapper
    this.remoteUrl = await this._accountRepository.refreshRemoteConfig();
  }

  // action
  async updateData(updateUI: boolean = false): Promise<boolean> {
    if (updateUI === true) {
      this.loading = true;
    }

    const primoAccesso=await AppPreferencesInstance.isPrimoAccesso();

    if (primoAccesso) {
      console.log('primo accesso');
      this.tessere = await this._vehicleRepository.update();
      this.rifornimenti = await this._refuelingRepository.update();
     // this.notifiche = await this._notificationRepository.update();
    } else {
      console.log('NOT primo accesso');
      this.tessere=await this._vehicleRepository.findAll();
      this.rifornimenti=await this._refuelingRepository.findAll();
      //this.notifiche
    }


    if (updateUI === true) {
      this.loading = false;
    }

    return true;
  }

  async isPrimoAccesso(): Promise<boolean> {
    return AppPreferencesInstance.isPrimoAccesso();
  }

  // action
  async login(username: string, password: string): Promise<boolean> {
    const loginResult = await this._accountRepository.login(username, password);

    if (loginResult !== 'INVALID') {
      await this.updateData();
      return true;
    } else {
      return false;
    }
  }

  async initAccountAndJWTToken(): Promise<boolean> {
    const account = await this._accountRepository.getAccount();
    const jwtToken = await this._accountRepository.getJWTToken();

    if (account !== null && jwtToken !== null) {
      console.log('checkAccountAndSetNavigation = TRUE', account, jwtToken)
      this._accountRepository.updateClientJWTToken(jwtToken);
      return true;
    } else {
      console.log('checkAccountAndSetNavigation = FALSE', account, jwtToken)
      return false;
    }
  }

  async init() {
    await this.updateRemote();
  }
}
