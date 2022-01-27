import {action, makeObservable, observable, runInAction} from 'mobx';
import AccountRepository from '../../repositories/account-repository';
import AppPreferencesInstance from '../../repositories/persistence/app-preferences';
import RefuelingRepository from '../../repositories/refueling-repository';
import {VehicleRepository} from '../../repositories/vehicle-repository';
import {NotificationRepository} from '../../repositories/notification-repository';
import {Notification} from '../../repositories/model/notification';
import {Refueling} from '../../repositories/model/refueling';
import {Vehicle} from '../../repositories/model/vehicle';
import messaging from '@react-native-firebase/messaging';
import {Subject} from 'rxjs';

export default class HomeStore {
  // observable
  loading: boolean;
  // observable
  remoteUrl;
  // observable
  notifiche: Notification[];
  // observable
  tessere: Vehicle[];
  // observable
  rifornimenti: Refueling[];

  private _accountRepository: AccountRepository;
  private _vehicleRepository: VehicleRepository;
  private _refuelingRepository: RefuelingRepository;
  private _notificationRepository: NotificationRepository;
  readonly notificationSubject: Subject<string>;

  constructor(accountRepository: AccountRepository, vehicleRepository: VehicleRepository, refuelingRepository: RefuelingRepository, notificationRepository: NotificationRepository) {
    this._accountRepository = accountRepository;
    this._vehicleRepository = vehicleRepository;
    this._refuelingRepository = refuelingRepository;
    this._notificationRepository = notificationRepository;
    this.remoteUrl = '10.0.0.2';

    this.loading = false;
    this.remoteUrl = '';
    this.notifiche = [];
    this.tessere = [];
    this.rifornimenti = [];

    // The Main Subject/Stream to be listened on.
    this.notificationSubject = new Subject<string>();

    makeObservable(this, {
      loading: observable,
      remoteUrl: observable,
      notifiche: observable,
      tessere: observable,
      rifornimenti: observable,

      //remoteUrlRead: computed,
      updateData: action,
      updateRemote: action,
      login: action
    });

    //makeAutoObservable(this);
  }

  publishNotification(message: string): void {
    this.notificationSubject.next(message);
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
    if (updateUI) {
      runInAction(() => this.loading = true);
    }

    const primoAccesso = await AppPreferencesInstance.isPrimoAccesso();
    let tessere: Vehicle[] = [];
    let rifornimenti: Refueling[] = [];

    if (primoAccesso || updateUI) {
      console.log('primo accesso');
      tessere = await this._vehicleRepository.update();
      rifornimenti = await this._refuelingRepository.update();
      // this.notifiche = await this._notificationRepository.update();
    } else {
      console.log('NOT primo accesso');
      tessere = await this._vehicleRepository.findAll();
      rifornimenti = await this._refuelingRepository.findAll();
      //this.notifiche
    }

    runInAction(() => {
        console.log('aggiorno!!!');
        this.tessere = tessere;
        this.rifornimenti = rifornimenti;
      }
    );

    if (updateUI) {
      runInAction(() => this.loading = false);
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

  async logout(): Promise<void> {
    await this._accountRepository.logout();
  }
}
