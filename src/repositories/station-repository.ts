import {Connection} from './persistence/connection';
import {StationDao} from './persistence/dao/station_dao';
import {Station} from './model/station';

export class StationRepository {
  constructor(connection: Connection, stationDao: StationDao) {
    this._connection = connection;
    this._stationDao = stationDao;
  }

  private _connection: Connection;
  private _stationDao: StationDao;

  async selectAll(): Promise<Station[]> {
    await this._connection.beginTransaction();

    const stations = await this._stationDao.selectAll();

    await this._connection.commitTransaction();

    return stations;
  }
}
