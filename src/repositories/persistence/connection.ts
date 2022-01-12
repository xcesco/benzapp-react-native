import * as SQLite from 'expo-sqlite';
import {WebSQLDatabase} from 'expo-sqlite';
import {
  ResultSet,
  ResultSetError,
  SQLTransactionCallback,
  SQLTransactionErrorCallback
} from 'expo-sqlite/src/SQLite.types';

export class Connection {
  private _db: WebSQLDatabase;
  private transacting: boolean;

  constructor(databaseName: string) {
    this._db = SQLite.openDatabase(databaseName);
    this.transacting = false;
  }

  execute(sqlStatement: string, args = []): Promise<ResultSet> {
    return new Promise((resolve, reject) => {
      console.log(`sql: ${sqlStatement}`);
      this._db.exec([{sql: sqlStatement, args}], false, (err, res) => {
        console.log('sql response: ',res);

        if (err) {
          return reject(err);
        }

        // if (!(res) || !this.isResultSet(res[0])) {
        //   // @ts-ignore
        //   return reject(<ResultSetError>res[0].error);
        // }

        // @ts-ignore
        return resolve(res[0]);
      });
    });
  }

  isResultSet(result: ResultSet | ResultSetError): result is ResultSetError {
    return (<ResultSetError>result).error !== undefined;
  }


  async beginTransaction() {
    await this.execute('begin transaction');
    this.transacting = true;
  }

  async commitTransaction() {
    await this.execute('commit');
    this.transacting = false;
  }

  async rollbackTransaction() {
    await this.execute('rollback');
    this.transacting = false;
  }

  transaction(callback: SQLTransactionCallback,
              errorCallback?: SQLTransactionErrorCallback,
              successCallback?: () => void) {
    this._db.transaction(callback, errorCallback, successCallback);
  }
}
