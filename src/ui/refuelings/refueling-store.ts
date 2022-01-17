import {action, makeObservable, observable, runInAction} from 'mobx';
import RefuelingRepository from '../../repositories/refueling-repository';
import {Refueling} from '../../repositories/model/refueling';

export default class RefuelingStore {
  // observable
  loading: boolean = false;

  // observable
  rifornimenti: Refueling[];

  private _refuelingRepository: RefuelingRepository;

  constructor(refuelingRepository: RefuelingRepository) {
    this._refuelingRepository = refuelingRepository;
    this.rifornimenti = [];

    makeObservable(this, {
      loading: observable,
      rifornimenti: observable,

      findAll: action
    });
  }

  // action
  async findAll(): Promise<boolean> {
    console.log('RefuelingStore > findAll');

    const result = await this._refuelingRepository.findAll();

    runInAction(() => {
      this.rifornimenti = result;
    })
    return true;
  }

  async init(): Promise<void> {

  }
}
