import {SQLResultSet, SQLTransaction} from 'expo-sqlite';
import {Connection} from '../connection';

export class NotificationDao {
  constructor(database: Connection) {
    this.database = database;
  }

  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS notification (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, messaggio TEXT, targa TEXT);';

  private database: Connection;

  query(tx: SQLTransaction, sql: string, args?: (number | string)[]): Promise<SQLResultSet> {
    return new Promise<SQLResultSet>((resolve, _) => {
      tx.executeSql(sql, args, (transaction, resultSet) => {
        resolve(resultSet);
      });
    });
  }
}

