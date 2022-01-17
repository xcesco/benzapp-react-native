import {action, makeObservable, observable, runInAction} from 'mobx';
import {Vehicle} from '../../repositories/model/vehicle';
import {VehicleRepository} from '../../repositories/vehicle-repository';

export default class VehicleStore {
  // observable
  loading: boolean = false;

  // observable
  vehicles: Vehicle[];

  private _vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this._vehicleRepository = vehicleRepository;
    this.vehicles = [];

    makeObservable(this, {
      loading: observable,
      vehicles: observable,

      findAll: action
    });
  }


  // action
  async findAll(): Promise<boolean> {
    const result = await this._vehicleRepository.findAll();

    runInAction(() => {
      this.vehicles = result;
    })
    return true;
  }

  async init(): Promise<void> {

  }
}
