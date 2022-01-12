import {Connection} from '../connection';
import {ResultSet} from 'expo-sqlite';
import {Refueling} from '../../model/refueling';

export class RefuelingDao {
  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS refuelings (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, data TEXT, gestore BLOB, gestore_id INTEGER, litri_erogati REAL, prezzo_al_litro REAL, sconto REAL, targa TEXT, tessera BLOB, tipo_carburante TEXT);';
  readonly SQL_DELETE_ALL = 'DELETE FROM refuelings';
  readonly SQL_INSERT: string = 'INSERT INTO refuelings (data, gestore, gestore_id, litri_erogati, prezzo_al_litro, sconto, targa, tessera, tipo_carburante) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  readonly SQL_SELECT_ALL = 'SELECT * FROM refueling ORDER BY data desc';
  readonly SQL_SELECT_BY_TARGA = 'SELECT * FROM refuelings WHERE targa = ? ORDER BY data desc';
  readonly SQL_SELECT_BY_ID = 'SELECT * FROM refuelings WHERE id = ? ORDER BY data desc';
  private database: Connection;

  constructor(database: Connection) {
    this.database = database;
  }

  async deleteAll(): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_DELETE_ALL, []);
  }

  async insert(item: Refueling): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_INSERT, [...this.toDb(item)]);
  }

  async findlAll(): Promise<Refueling[]> {
    // @ts-ignore
    const result = await this.database.execute(this.SQL_SELECT_ALL, []);
    const value: Refueling[] = result.rows.map(item => this.fromDb(item));

    return value;
  }

  async findByTarga(targa: string): Promise<Refueling> {
    // @ts-ignore
    const result = await this.database.execute(this.SQL_SELECT_BY_TARGA, [targa]);
    const value: Refueling[] = result.rows.map(item => this.fromDb(item));

    return value[0];
  }

  async findById(id: number): Promise<Refueling> {
    // @ts-ignore
    const result = await this.database.execute(this.SQL_SELECT_BY_ID, [id]);
    const value: Refueling[] = result.rows.map(item => this.fromDb(item));

    return value[0];
  }

  private toDb(item: Refueling): [] {
    // @ts-ignore
    const value = [
      item.data,
      JSON.stringify(item.gestore),
      item.litriErogati,
      item.prezzoAlLitro,
      item.sconto,
      item.tessera,
      item.tipoCarburante,
      item.targa,
      item.gestoreId
    ];
    // @ts-ignore
    return value;
  }

  private fromDb(item: { [x: string]: any; }): Refueling {
    // @ts-ignore
    const value: Refueling = {
      id: item['id'],
      data: new Date(item['date']),
      gestore: JSON.parse(item['gestore']),
      litriErogati: item['litriErogati'],
      prezzoAlLitro: item['prezzoAlLitro'],
      sconto: item['sconto'],
      tessera: item['tessera'],
      tipoCarburante: item['tipoCarburante'],
      targa: item['targa'],
      gestoreId: item['gestoreId']
    };

    return value;
  }
}
