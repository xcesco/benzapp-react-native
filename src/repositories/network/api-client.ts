import {Configuration} from './configuration';
import {
  AccountResourceApi,
  DelegaResourceApi,
  RifornimentoResourceApi,
  TesseraResourceApi,
  UserJwtControllerApi
} from './api'
import {AppDebugLog} from '../../utils/AppDebug';

export class ApiClient {
  constructor() {
    this.init();
  }

  private _baseUrl: string = 'http://localhost';
  private _jwtToken: string = '<NO-TOKEN>';

  // @ts-ignore
  private _userJwtControllerApi: UserJwtControllerApi;

  // @ts-ignore
  private _accountResourceApi: AccountResourceApi;

  // @ts-ignore
  private _tesseraResourceApi: TesseraResourceApi;

  // @ts-ignore
  private _rifornimentoResourceApi: RifornimentoResourceApi;

  // @ts-ignore
  private _delegaResourceApi: DelegaResourceApi;

  get userJwtControllerApi(): UserJwtControllerApi {
    return this._userJwtControllerApi;
  }

  get accountResourceApi(): AccountResourceApi {
    return this._accountResourceApi;
  }

  get tesseraResourceApi(): TesseraResourceApi {
    return this._tesseraResourceApi;
  }

  get rifornimentoResourceApi(): RifornimentoResourceApi {
    return this._rifornimentoResourceApi;
  }

  get delegaResourceApi(): DelegaResourceApi {
    return this._delegaResourceApi;
  }

  private init(baseUrl: string | null = null, token: string | null = null): void {
    if (baseUrl !== undefined && baseUrl !== null) {
      this._baseUrl = baseUrl;
    }

    if (token !== undefined && token !== null) {
      this._jwtToken = token;
    }

    const configuration = new Configuration({basePath: this._baseUrl, accessToken: this._jwtToken});
    AppDebugLog('set rest configuration',configuration, token, this._jwtToken);

    this._userJwtControllerApi = new UserJwtControllerApi(configuration);
    this._accountResourceApi = new AccountResourceApi(configuration);
    this._tesseraResourceApi = new TesseraResourceApi(configuration);
    this._rifornimentoResourceApi = new RifornimentoResourceApi(configuration);
    this._delegaResourceApi = new DelegaResourceApi(configuration);
  }

  updateJWTToken(value: string): void {
    this.init(null, value);
  }

  updateBaseUrl(baseUrl: string) {
    this.init(baseUrl, null);
  }
}

export default ApiClient;
