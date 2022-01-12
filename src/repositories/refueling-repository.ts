import {ApiClient} from './network/api-client';
import {Connection} from './persistence/connection';
import {RefuelingDao} from './persistence/dao/refueling_dao';
import {Refueling, refuelingOf} from './model/refueling';

export default class RefuelingRepository {

  constructor(apiClient: ApiClient, connection: Connection, refuelingDao: RefuelingDao) {
    this._apiClient = apiClient;
    this._connection = connection;
    this._refuelingDao = refuelingDao;
  }

  private _apiClient: ApiClient;
  private _connection: Connection;
  private _refuelingDao: RefuelingDao;

  async update(): Promise<Refueling[]> {
    const result: Refueling[] = [];
    const list = (await this._apiClient.rifornimentoResourceApi.getAllRifornimentosUsingGET(1000)).data;

    await this._connection.beginTransaction();
    await this._refuelingDao.deleteAll();
    for (const item of list) {
      const refueling = refuelingOf(item);
      await this._refuelingDao.insert(refueling);
      result.push(refueling);
    }

    await this._connection.commitTransaction();

    return result;
  }

}
