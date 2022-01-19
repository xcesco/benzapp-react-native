import {Connection} from './persistence/connection';
import {StationDao} from './persistence/dao/station-dao';
import {Station} from './model/station';
import {dbConnection} from './persistence/db';

export class StationRepository {
  constructor(connection: Connection, stationDao: StationDao) {
    this._connection = connection;
    this._stationDao = stationDao;
  }

  private _connection: Connection;
  private _stationDao: StationDao;

  async selectAll(): Promise<Station[]> {
    let stations = null;
    try {
      await this._connection.beginTransaction();
      stations = await this._stationDao.selectAll();
      await dbConnection.commitTransaction();
    } catch (e) {
      console.log(e);
      await dbConnection.rollbackTransaction();
    }

    return stations!;
  }
}
