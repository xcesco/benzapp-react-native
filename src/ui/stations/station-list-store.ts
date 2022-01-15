import {StationRepository} from '../../repositories/station-repository';
import {action, makeObservable, observable} from 'mobx';
import {Station} from '../../repositories/model/station';

export default class StationListStore {
  // observable
  loading: boolean = false;
  // observable
  stations: Station[] = [];

  private _stationRepository: StationRepository;

  constructor(stationRepository: StationRepository) {
    this._stationRepository = stationRepository;

    makeObservable(this, {
      loading: observable,
      stations: observable,

      selectAll: action
    });
  }

  // action
  async selectAll(): Promise<boolean> {
    this.loading = true;
    this.stations = await this._stationRepository.selectAll();
    this.loading = false;

    return true;
  }
}
