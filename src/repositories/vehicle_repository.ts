import {fromDelega, fromTessera, Vehicle} from './model/vehicle';
import {ApiClient} from './network/api-client';
import {Connection} from './persistence/connection';
import {VehicleDao} from './persistence/dao/vehicle_dao';

export class VehicleRepository {
  constructor(apiClient: ApiClient, connection: Connection, vehicleDao: VehicleDao) {
    this._apiClient = apiClient;
    this._connection = connection;
    this._vehicleDao = vehicleDao;
  }

  private _apiClient: ApiClient;
  private _connection: Connection;
  private _vehicleDao: VehicleDao;

  async update(): Promise<Vehicle[]> {
    const tesseraResourceApi = this._apiClient.tesseraResourceApi;
    const delegaResourceApi = this._apiClient.delegaResourceApi;

    await this._connection.beginTransaction();

    await this._vehicleDao.deleteAll();
    const listValue1=(await tesseraResourceApi.getAllTesserasUsingGET()).data;
    const listTessere=listValue1.map(tessera => fromTessera(tessera));

    const listValue2=(await delegaResourceApi.getAllDelegasUsingGET()).data;
    const listDeleghe=listValue2.map(delega => fromDelega(delega));

    for (const item of listTessere) {
      await this._vehicleDao.insert(item);
    }

    for (const item of listDeleghe) {
      await this._vehicleDao.insert(item);
    }

    const result=await this._vehicleDao.selectAll();

    await this._connection.commitTransaction();

    return result;
  }
}
