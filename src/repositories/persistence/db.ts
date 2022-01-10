import * as SQLite from 'expo-sqlite';
import {stations} from '../../../assets/json/stations';
import {Marchio} from '../model/marchio';

const db = SQLite.openDatabase('benzapp-react-native.db');

function transformMarchio(marchio_id: string) {
  const marchio = Marchio[Number(marchio_id)];
  return marchio.toString();
}

export const init = () => {
  db.transaction((tx) => {
    // creazione del db
    tx.executeSql('CREATE TABLE IF NOT EXISTS notification (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, messaggio TEXT, targa TEXT);');
    tx.executeSql('CREATE TABLE IF NOT EXISTS refueling (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, data TEXT, gestore BLOB, gestore_id INTEGER, litri_erogati REAL, prezzo_al_litro REAL, sconto REAL, targa TEXT, tessera BLOB, tipo_carburante TEXT);');
    tx.executeSql('CREATE TABLE IF NOT EXISTS station (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, comune TEXT, indirizzo TEXT, latitudine REAL, longitudine REAL, marchio TEXT, provincia TEXT, tipo TEXT);');
    tx.executeSql('CREATE TABLE IF NOT EXISTS vehicle (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, carburante TEXT, cittadino BLOB, codice TEXT, data_emissione TEXT, delega INTEGER, delegas BLOB, immagine TEXT, immagine_content_type TEXT, rifornimentos BLOB, targa TEXT, veicolo TEXT);');

    // populator: workaround per evitare di inserire nuovamente le stazioni: se non ci sono elementi allora li aggiungo.
    tx.executeSql('SELECT * FROM station', [], (transaction, resultSet) => {
      if (resultSet.rows.length === 0) {
        console.log('sono qui');
        let data = stations;
        for (const item of data) {
          console.log('leggo', item);
          // @ts-ignore
          tx.executeSql('INSERT INTO station (comune, indirizzo, latitudine, longitudine, marchio, provincia, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)', [item['comune'], item['indirizzo'], item['latitudine'], item['longitudine'], transformMarchio(item['marchio_id']), item['provincia'], item['tipo']]);
        }
        console.log('INSERITIO qui');
      } else {
        console.log('alaredy donecaricato');
      }
    })
  }, (error) => {
    console.log(error);
  });
}
