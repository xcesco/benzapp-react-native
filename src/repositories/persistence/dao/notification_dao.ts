import {ResultSet} from 'expo-sqlite';
import {Connection} from '../connection';
import {Notification} from '../../model/notification';

export class NotificationDao {
  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, messaggio TEXT, targa TEXT);';
  readonly SQL_DELETE_ALL = 'DELETE FROM notifications';
  readonly SQL_INSERT: string = 'INSERT INTO notifications (messaggio, targa) VALUES (?, ?)';
  readonly SQL_SELECT_ALL = 'SELECT * FROM notifications';
  readonly SQL_SELECT_COUNT = 'SELECT count(*) FROM notifications';
  private database: Connection;

  constructor(database: Connection) {
    this.database = database;
  }

  async deleteAll(): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_DELETE_ALL, []);
  }

  async insert(item: Notification): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_INSERT, [item.messaggio, item.targa]);
  }

  async findlAll(): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_SELECT_ALL, []).then;
  }

  async findCount(): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_SELECT_COUNT, []);
  }

  private fromDb(item: { [x: string]: any; }): Notification {
    return {
      messaggio: item['messaggio'],
      targa: item['targa']
    }
  }
}

