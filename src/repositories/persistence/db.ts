import {SQLResultSet} from 'expo-sqlite';
import {stations} from '../../../assets/json/stations';
import {StationDao} from './dao/station-dao';
import {NotificationDao} from './dao/notification-dao';
import {VehicleDao} from './dao/vehicle-dao';
import {RefuelingDao} from './dao/refueling-dao';
import {WebSQLDatabase} from 'expo-sqlite/src/SQLite.types';
import {Connection} from './connection';
import AppPreferencesInstance from './app-preferences';

// https://blog.gennady.pp.ua/wrapper-for-expo-sqlite-with-async-await-migrations-and-transactions-support/
// https://gist.github.com/GendelfLugansk/db31d7742c4dbc3d6d768fa525474aff
export const dbConnection = new Connection('benzapp-react-native.db');
export const notificationDao = new NotificationDao(dbConnection);
export const refuelingDao = new RefuelingDao(dbConnection);
export const stationDao = new StationDao(dbConnection);
export const vehicleDao = new VehicleDao(dbConnection);

export const initAndPopulateDb = async () => {
  const primoAccesso = await AppPreferencesInstance.isPrimoAccesso();

  if (!primoAccesso) {
    return;
  }
  await dbConnection.beginTransaction();

  await dbConnection.execute(NotificationDao.SQL_TABLE_CREATION);
  await dbConnection.execute(RefuelingDao.SQL_TABLE_CREATION);
  await dbConnection.execute(StationDao.SQL_TABLE_CREATION);
  await dbConnection.execute(VehicleDao.SQL_TABLE_CREATION);

  let value = await stationDao.selectAll();
  if (value.length === 0) {
    for (const item of stations) {
      await stationDao.insert(item);
    }
  }
  await dbConnection.commitTransaction();
};

