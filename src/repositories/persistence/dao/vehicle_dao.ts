import {SQLResultSet, SQLTransaction} from 'expo-sqlite';
import {Connection} from '../connection';

export class VehicleDao {
  constructor(database: Connection) {
    this.database = database;
  }

  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS vehicle (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, carburante TEXT, cittadino BLOB, codice TEXT, data_emissione TEXT, delega INTEGER, delegas BLOB, immagine TEXT, immagine_content_type TEXT, rifornimentos BLOB, targa TEXT, veicolo TEXT);';

  private database: Connection;

  query(tx: SQLTransaction, sql: string, args?: (number | string)[]): Promise<SQLResultSet> {
    return new Promise<SQLResultSet>((resolve, _) => {
      tx.executeSql(sql, args, (transaction, resultSet) => {
        resolve(resultSet);
      });
    });
  }
}
