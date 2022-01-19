import {fromDelega, fromTessera, Vehicle} from './model/vehicle';
import {ApiClient} from './network/api-client';
import {Connection} from './persistence/connection';
import {VehicleDao} from './persistence/dao/vehicle-dao';
import {RefuelingDao} from './persistence/dao/refueling-dao';
import {VehicleSummary} from './model/vehicle-summary';
import {dbConnection} from './persistence/db';

export class VehicleRepository {
  constructor(apiClient: ApiClient, connection: Connection, vehicleDao: VehicleDao, refuelingDao: RefuelingDao) {
    this._apiClient = apiClient;
    this._connection = connection;
    this._vehicleDao = vehicleDao;
    this._refuelingDao = refuelingDao;
  }

  private _apiClient: ApiClient;
  private _connection: Connection;
  private _vehicleDao: VehicleDao;
  private _refuelingDao: RefuelingDao;

  async update(): Promise<Vehicle[]> {
    const tesseraResourceApi = this._apiClient.tesseraResourceApi;
    const delegaResourceApi = this._apiClient.delegaResourceApi;
    let result = null;

    try {
      await this._connection.beginTransaction();

      await this._vehicleDao.deleteAll();
      const listValue1 = (await tesseraResourceApi.getAllTesserasUsingGET()).data;
      const listTessere = listValue1.map(tessera => fromTessera(tessera));

      const listValue2 = (await delegaResourceApi.getAllDelegasUsingGET()).data;
      const listDeleghe = listValue2.map(delega => fromDelega(delega));

      for (const item of listTessere) {
        await this._vehicleDao.insert(item);
      }

      for (const item of listDeleghe) {
        await this._vehicleDao.insert(item);
      }

      result = await this._vehicleDao.selectAll();

      await dbConnection.commitTransaction();
    } catch (e) {
      console.log(e);
      await dbConnection.rollbackTransaction();
    }

    return result!;
  }

  async findAll(): Promise<Vehicle[]> {
    let result: Vehicle[];
    try {
      await this._connection.beginTransaction();
      result = await this._vehicleDao.selectAll();
      await this._connection.commitTransaction();
    } catch (e) {
      console.log(e);
      await dbConnection.rollbackTransaction();
    }

    return result!;
  }

  async findById(id: number): Promise<{ vehicle: Vehicle, summary: VehicleSummary }> {
    try {
      await this._connection.beginTransaction();
      const vehicleValue: Vehicle = await this._vehicleDao.findById(id);
      const summaryValue: VehicleSummary = await this._refuelingDao.findSummaryByTarga(vehicleValue.targa);
      await this._connection.commitTransaction();
      return {vehicle: vehicleValue, summary: summaryValue};
    } catch (e) {
      console.log(e);
      await dbConnection.rollbackTransaction();
    }

    // @ts-ignore
    return {vehicle: {}, summary: {}};

  }
}
