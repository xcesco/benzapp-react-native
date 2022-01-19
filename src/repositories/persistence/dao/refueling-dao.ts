import {Connection} from '../connection';
import {ResultSet} from 'expo-sqlite';
import {Refueling} from '../../model/refueling';
import {VehicleSummary} from '../../model/vehicle-summary';

export class RefuelingDao {
  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS refuelings (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, data TEXT, gestore BLOB, gestore_id INTEGER, litri_erogati REAL, prezzo_al_litro REAL, sconto REAL, targa TEXT, tessera BLOB, tipo_carburante TEXT);';
  readonly SQL_DELETE_ALL = 'DELETE FROM refuelings';
  readonly SQL_INSERT: string = 'INSERT INTO refuelings (data, gestore, gestore_id, litri_erogati, prezzo_al_litro, sconto, targa, tessera, tipo_carburante) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  readonly SQL_SELECT_ALL = 'SELECT * FROM refuelings ORDER BY data desc';
  readonly SQL_SELECT_BY_TARGA = 'SELECT * FROM refuelings WHERE targa = ?';
  readonly SQL_SELECT_BY_ID = 'SELECT * FROM refuelings WHERE id = ?';
  readonly SQL_SELECT_SUM_LITRI_EROGATI_BY_TARGA = 'select sum((prezzo_al_litro-sconto)*litri_erogati) as spesa, sum(litri_erogati) as litriErogati, sum(sconto*litri_erogati) as risparmio from refuelings where targa= ?';
  private database: Connection;

  constructor(database: Connection) {
    this.database = database;
  }

  async deleteAll(): Promise<ResultSet> {
    // @ts-ignore
    return (await this.database.execute(this.SQL_DELETE_ALL, []));
  }

  async insert(item: Refueling): Promise<ResultSet> {
    //console.log('params: ',[...this.toDb(item)]);
    // @ts-ignore
    return (await this.database.execute(this.SQL_INSERT, [...this.toDb(item)]));
  }

  async findlAll(): Promise<Refueling[]> {
    // @ts-ignore
    const result = (await this.database.execute(this.SQL_SELECT_ALL, []));
    const value: Refueling[] = result.rows.map(item => this.fromDb(item));

    return value;
  }

  async findSummaryByTarga(targa: string): Promise<VehicleSummary> {
    // @ts-ignore
    const result = (await this.database.execute(this.SQL_SELECT_SUM_LITRI_EROGATI_BY_TARGA, [targa]));
    const value: VehicleSummary = result.rows.map(item => this.summaryFromDb(item))[0];

    return value;
  }

  async findById(id: number): Promise<Refueling> {
    // @ts-ignore
    const result = (await this.database.execute(this.SQL_SELECT_BY_ID, [id]));
    const value: Refueling[] = result.rows.map(item => this.fromDb(item));

    return value[0];
  }

  private toDb(item: Refueling): [] {
    //(data, gestore, gestore_id, litri_erogati, prezzo_al_litro, sconto, targa, tessera, tipo_carburante)
    // @ts-ignore
    const value = [
      item.data,
      JSON.stringify(item.gestore),
      item.gestoreId,
      item.litriErogati,
      item.prezzoAlLitro,
      item.sconto,
      item.tessera.targa,
      JSON.stringify(item.tessera),
      item.tipoCarburante,
    ];
    // @ts-ignore
    return value;
  }

  private fromDb(item: { [x: string]: any; }): Refueling {
    // @ts-ignore
    const value: Refueling = {
      id: item.id,
      data: new Date(item.data),
      gestore: JSON.parse(item.gestore),
      litriErogati: item.litri_erogati,
      prezzoAlLitro: item.prezzo_al_litro,
      sconto: item.sconto,
      tessera: item.tessera,
      tipoCarburante: item.tipo_carburante,
      targa: item.targa,
      gestoreId: item.gestore_id,
    };

    return value;
  }

  private summaryFromDb(item: { [x: string]: any; }): VehicleSummary {
    // @ts-ignore
    const value: VehicleSummary = {
      litriErogati: item.litriErogati,
      spesa: item.spesa,
      risparmio: item.risparmio,
    };

    return value;
  }
}
