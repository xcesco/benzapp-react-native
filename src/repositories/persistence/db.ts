import {SQLResultSet} from 'expo-sqlite';
import {stations} from '../../../assets/json/stations';
import {StationDao} from './dao/station_dao';
import {NotificationDao} from './dao/notification_dao';
import {VehicleDao} from './dao/vehicle_dao';
import {RefuelingDao} from './dao/refueling_dao';
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
  const primoAccesso=await AppPreferencesInstance.isPrimoAccesso();

  if (!primoAccesso) {
    console.log('db-avvio - skipped');
    return;
  }
  console.log('db-avvio');
  await dbConnection.beginTransaction();

  await dbConnection.execute(NotificationDao.SQL_TABLE_CREATION);
  await dbConnection.execute(RefuelingDao.SQL_TABLE_CREATION);
  await dbConnection.execute(StationDao.SQL_TABLE_CREATION);
  await dbConnection.execute(VehicleDao.SQL_TABLE_CREATION);

  let value = await stationDao.selectAll();
  if (value.length === 0) {
    console.log('sono qui');
    for (const item of stations) {
      console.log('leggo', item);
      await stationDao.insert(item);
    }
    console.log('INSERITIO qui');
  } else {
    console.log('alaredy donecaricato');
  }
   await dbConnection.commitTransaction();
  console.log('db-finito');
};


export function queryOne(database: WebSQLDatabase, sql: string, args?: (number | string)[]): Promise<SQLResultSet> {
  return new Promise<SQLResultSet>((resolve, _) => {
    database.transaction((tx) =>
      tx.executeSql(sql, args, (transaction, resultSet) => {
        resolve(resultSet);
      })
    );
  });
}

