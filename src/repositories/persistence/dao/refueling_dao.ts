import {WebSQLDatabase} from 'expo-sqlite/src/SQLite.types';
import {SQLResultSet, SQLTransaction} from 'expo-sqlite';
import {Connection} from '../connection';

export class RefuelingDao {
  constructor(database: Connection) {
    this.database = database;
  }

  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS refueling (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, data TEXT, gestore BLOB, gestore_id INTEGER, litri_erogati REAL, prezzo_al_litro REAL, sconto REAL, targa TEXT, tessera BLOB, tipo_carburante TEXT);';

  private database: Connection;

  query(tx: SQLTransaction, sql: string, args?: (number | string)[]): Promise<SQLResultSet> {
    return new Promise<SQLResultSet>((resolve, _) => {
      tx.executeSql(sql, args, (transaction, resultSet) => {
        resolve(resultSet);
      });
    });
  }
}
