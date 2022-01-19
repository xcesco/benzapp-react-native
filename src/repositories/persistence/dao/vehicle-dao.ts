import {ResultSet} from 'expo-sqlite';
import {Connection} from '../connection';
import {Vehicle} from '../../model/vehicle';

export class VehicleDao {
  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS vehicles (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, carburante TEXT, cittadino BLOB, codice TEXT, data_emissione TEXT, delega INTEGER, immagine TEXT, immagine_content_type TEXT, targa TEXT, veicolo TEXT);';
  readonly SQL_INSERT = 'INSERT INTO vehicles (carburante, cittadino, codice, data_emissione, delega, immagine, immagine_content_type, targa, veicolo) VALUES (?, ?, ?, ?, ?, ?, ? , ? ,?)';
  readonly SQL_DELETE_ALL = 'DELETE FROM vehicles';
  readonly SQL_SUM_LITRI_EROGATI_BY_TARGA = 'SELECT targa, spesa, litriErogati, risparmio FROM vehicle_summaries WHERE targa=?';
  readonly SQL_SELECT_BY_ID = 'SELECT * FROM vehicles WHERE id = ?';
  readonly SQL_SELECT_ALL = 'SELECT * FROM vehicles ORDER BY targa';
  private database: Connection;

  constructor(database: Connection) {
    this.database = database;
  }

  async findById(id: number): Promise<Vehicle> {
    // @ts-ignore
    return (await this.database.execute(this.SQL_SELECT_BY_ID, [id])).rows.map(item => this.fromDb(item))[0];
  }

  async selectAll(): Promise<Vehicle[]> {
    return (await this.database.execute(this.SQL_SELECT_ALL, [])).rows.map(item => this.fromDb(item));
  }

  async sumLitriErogatiByTarga(targa: string): Promise<ResultSet> {
    // @ts-ignore
    return (await this.database.execute(this.SQL_SUM_LITRI_EROGATI_BY_TARGA, [targa]));
  }

  async insert(item: Vehicle): Promise<ResultSet> {
    console.log('params: ',[...this.toDb(item)]);
    // @ts-ignore
    return (await this.database.execute(this.SQL_INSERT, [...this.toDb(item)]));
  }

  async deleteAll(): Promise<ResultSet> {
    // @ts-ignore
    return (await this.database.execute(this.SQL_DELETE_ALL, []));
  }

  private fromDb(item: { [x: string]: any; }): Vehicle {
    return {
      id: item.id,
      carburante: item.carburante,
      cittadino: JSON.parse(item.cittadino),
      codice: item.codice,
      dataEmissione: item.data_emissione,
      delega: item.delega,
      immagine: item.immagine,
      immagineContentType: item.immagine_content_type,
      targa: item.targa,
      veicolo: item.veicolo,
    };
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
      item.veicolo];

    // @ts-ignore
    return value;
  }
}
