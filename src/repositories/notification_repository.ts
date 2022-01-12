import {Notification} from './model/notification';
import {ApiClient} from './network';
import {Connection} from './persistence/connection';
import {NotificationDao} from './persistence/dao/notification_dao';

export class NotificationRepository {
  constructor(apiClient: ApiClient, dbConnection: Connection, notificationDao: NotificationDao) {
    this._apiClient = apiClient;
    this._connection = dbConnection;
    this._notificationDao = notificationDao;
  }

  private _apiClient: ApiClient;
  private _connection: Connection;
  private _notificationDao: NotificationDao;

  async update(): Promise<Notification[]> {
    return [];
  }
}
