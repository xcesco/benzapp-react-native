import {SQLResultSet, SQLTransaction} from 'expo-sqlite';
import {Marchio} from '../../model/marchio';
import {Connection} from '../connection';
import {ResultSet} from 'expo-sqlite/src/SQLite.types';

export class StationDao {
  constructor(database: Connection) {
    this.database = database;
  }

  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS station (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, comune TEXT, indirizzo TEXT, latitudine REAL, longitudine REAL, marchio TEXT, provincia TEXT, tipo TEXT);';

  private database: Connection;

  query(tx: SQLTransaction, sql: string, args?: (number | string)[]): Promise<SQLResultSet> {
    return new Promise<SQLResultSet>((resolve, _) => {
      tx.executeSql(sql, args, (transaction, resultSet) => {
        resolve(resultSet);
      });
    });
  }

  insert(item: any): Promise<ResultSet> {
    const sql = 'INSERT INTO station (comune, indirizzo, latitudine, longitudine, marchio, provincia, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)';

    // @ts-ignore
    return this.database.execute(sql, [item['comune'], item['indirizzo'], item['latitudine'], item['longitudine'], this.transformMarchio(item['marchio_id']), item['provincia'], item['tipo']]);
  }

  selectAll(tx: SQLTransaction): Promise<SQLResultSet> {
    const sql = 'SELECT * FROM stations ORDER BY comune asc, indirizzo asc';

    return this.query(tx, sql, []);

  }

  private transformMarchio(marchio_id: string): string {
    const marchio = Marchio[Number(marchio_id)];
    return marchio.toString();
  }
}

