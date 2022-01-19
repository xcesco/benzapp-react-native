import {ApiClient} from './network/api-client';
import {Connection} from './persistence/connection';
import {RefuelingDao} from './persistence/dao/refueling-dao';
import {Refueling, refuelingOf} from './model/refueling';
import {dbConnection} from './persistence/db';

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
    const list = (await this._apiClient.rifornimentoResourceApi.getAllRifornimentosUsingGET(1000)).data;

    await this._connection.beginTransaction();
    await this._refuelingDao.deleteAll();
    for (const item of list) {
      const refueling = refuelingOf(item);
      await this._refuelingDao.insert(refueling);
    }

    const result: Refueling[] = await this._refuelingDao.findlAll();

    await this._connection.commitTransaction();

    return result;
  }

  async findAll(): Promise<Refueling[]> {
    await this._connection.beginTransaction();
    const result: Refueling[] = await this._refuelingDao.findlAll();
    await this._connection.commitTransaction();

    return result;
  }

  async findById(id: any) {
    let result: Refueling;
    try {
      await this._connection.beginTransaction();
      result = await this._refuelingDao.findById(id);
      await this._connection.commitTransaction();
    } catch (e) {
      console.log(e);
      await dbConnection.rollbackTransaction();
    }
    return result!;
  }

  async findAllByTarga(targa: string): Promise<Refueling[]> {
    let result: Refueling[];
    try {
      await this._connection.beginTransaction();
      result = await this._refuelingDao.findAllByTarga(targa);
      await this._connection.commitTransaction();
    } catch (e) {
      console.log(e);
      await dbConnection.rollbackTransaction();
    }

    return result!;
  }
}
