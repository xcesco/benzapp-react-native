import {Marchio} from '../../model/marchio';
import {Connection} from '../connection';
import {ResultSet} from 'expo-sqlite/src/SQLite.types';
import {Station} from '../../model/station';
import {TipoImpianto} from '../../model/tipo-impianto';

export class StationDao {
  static readonly SQL_TABLE_CREATION: string = 'CREATE TABLE IF NOT EXISTS stations (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, comune TEXT, indirizzo TEXT, latitudine REAL, longitudine REAL, marchio TEXT, provincia TEXT, tipo TEXT);';
  readonly SQL_INSERT = 'INSERT INTO stations (comune, indirizzo, latitudine, longitudine, marchio, provincia, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)';
  readonly SQL_SELECT_ALL = 'SELECT * FROM stations ORDER BY comune asc, indirizzo asc';
  private database: Connection;

  constructor(database: Connection) {
    this.database = database;
  }

  async insert(item: any): Promise<ResultSet> {
    // @ts-ignore
    return (await this.database.execute(this.SQL_INSERT, [item.comune, item.indirizzo, item.latitudine, item.longitudine, transformMarchioToDB(item.marchio_id), item.provincia, item.tipo]));
  }

  async selectAll(): Promise<Station[]> {
    const resultSet = (await this.database.execute(this.SQL_SELECT_ALL, []));

    const result = resultSet.rows.map(item => this.fromDb(item));
    return result;
  }

  private fromDb(item: { [x: string]: any; }) {
    return {
      id: item.id,
      comune: item.comune,
      indirizzo: item.indirizzo,
      latitudine: item.latitudine,
      longitudine: item.longitudine,
      marchio: transformMarchioFromDB(item.marchio),
      provincia: item.provincia,
      tipo: TipoImpianto.STRADALE,
    };
  }
}

export function transformMarchioToDB(marchio_id: string): string {
  const marchio = Marchio[Number(marchio_id)];
  return marchio.toString();
}

export function transformMarchioFromDB(marchio: string): Marchio {
  if (marchio === 'q8') {
    return Marchio.q8;
  } else if (marchio === 'eni') {
    return Marchio.eni;
  } else if (marchio === 'esso') {
    return Marchio.esso;
  } else if (marchio === 'tamoil') {
    return Marchio.tamoil;
  } else if (marchio === 'kerotris') {
    return Marchio.kerotris;
  } else if (marchio === 'oilItalia') {
    return Marchio.oilItalia;
  }

  return Marchio.notDefined;
}

