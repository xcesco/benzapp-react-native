import {ResultSet} from 'expo-sqlite';
import {Connection} from '../connection';
import {Vehicle} from '../../model/vehicle';

export class VehicleDao {
  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS vehicles (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, carburante TEXT, cittadino BLOB, codice TEXT, data_emissione TEXT, delega INTEGER, delegas BLOB, immagine TEXT, immagine_content_type TEXT, rifornimentos BLOB, targa TEXT, veicolo TEXT);';
  readonly SQL_INSERT = 'INSERT INTO vehicles (carburante, cittadino, codice, data_emissione, delega, delegas, immagine, immagine_content_type, rifornimentos, targa, veicolo)) VALUES (?, ?, ?, ?, ?, ?)';
  readonly SQL_DELETE_ALL = 'DELETE FROM vehicles';
  readonly SQL_SUM_LITRI_EROGATI_BY_TARGA = 'SELECT targa, spesa, litriErogati, risparmio FROM vehicle_summaries WHERE targa=?';
  readonly SQL_SELECT_BY_TARGA = 'SELECT * FROM vehicles WHERE targa = ? ORDER BY targa';
  readonly SQL_SELECT_ALL = 'SELECT * FROM vehicles ORDER BY targa';
  private database: Connection;

  constructor(database: Connection) {
    this.database = database;
  }

  findOneByTarga(targa: string): Promise<Vehicle> {
    // @ts-ignore
    return this.database.execute(this.SQL_SELECT_BY_TARGA, [targa]).rows.map(item => this.fromDb(item))[0];
  }

  sumLitriErogatiByTarga(targa: string): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_SUM_LITRI_EROGATI_BY_TARGA, [targa]);
  }

  async insert(item: Vehicle): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_INSERT, [...this.toDb(item)]);
  }

  async deleteAll(): Promise<ResultSet> {
    // @ts-ignore
    return this.database.execute(this.SQL_DELETE_ALL, []);
  }

  private fromDb(item: { [x: string]: any; }): Vehicle {
    return {
      id: item['id'],
      carburante: item['carburante'],
      cittadino: JSON.parse(item['cittadino']),
      codice: item['codice'],
      dataEmissione: item['data_emissione'],
      delega: item['delega'],
      immagine: item['immagine'],
      immagineContentType: item['immagine_content_type'],
      targa: item['targa'],
      veicolo: item['veicolo'],
    }
  }

  private toDb(item: Vehicle): [] {
    const value = [
      item.carburante,
      JSON.stringify(item.cittadino),
      item.codice,
      item.dataEmissione,
      item.delega,
      item.immagine,
      item.immagineContentType,
      item.targa,
      item.veicolo]

    // @ts-ignore
    return value;
  }

  async selectAll(): Promise<Vehicle[]> {
    return (await this.database.execute(this.SQL_SELECT_ALL, [])).rows.map(item => this.fromDb(item));
  }
}
