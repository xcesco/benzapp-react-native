import RefuelingRepository from '../../repositories/refueling-repository';
import {Refueling} from '../../repositories/model/refueling';
import {
  RifornimentoTipoCarburanteEnum,
  TesseraCarburanteEnum,
  TesseraVeicoloEnum
} from '../../repositories/network/models';
import {action, makeObservable, observable, runInAction} from 'mobx';

export default class RefuelingStore {
  // observable
  loading: boolean = false;

  // observable
  rifornimenti: Refueling[];

  // observable
  rifornimento: Refueling;

  private _refuelingRepository: RefuelingRepository;

  constructor(refuelingRepository: RefuelingRepository) {
    this._refuelingRepository = refuelingRepository;
    this.rifornimenti = [];
    this.rifornimento = {
      id: 0,
      data: new Date(),
      gestore: {},
      litriErogati: 0,
      prezzoAlLitro: 0,
      sconto: 0,
      tessera: {
        carburante: TesseraCarburanteEnum.BENZINA,
        id: 0,
        codice: '',
        dataEmissione: new Date(),
        targa: '',
        veicolo: TesseraVeicoloEnum.AUTOVEICOLO
      },
      tipoCarburante: RifornimentoTipoCarburanteEnum.BENZINA,
      targa: '',
      gestoreId: 0
    };

    makeObservable(this, {
      loading: observable,
      rifornimenti: observable,

      findAll: action,
      findById: action,
      findAllByTarga: action
    });

  }

// action
  async findAll(): Promise<boolean> {
    console.log('RefuelingStore > findAll');
    const result = await this._refuelingRepository.findAll();

    runInAction(() => {
        this.rifornimenti = result;
      }
    )
    return true;
  }

  async init(): Promise<void> {
  }

  // action
  async findById(id: number): Promise<boolean> {
    console.log('RefuelingStore > findOne');

    const result = await this._refuelingRepository.findById(id);
    console.log('RefuelingStore > findOne: ', result);

    runInAction(() => {
        this.rifornimento = result;
      }
    )
    return true;
  }

  // action
  async findAllByTarga(targa: string): Promise<boolean> {
    console.log('RefuelingStore > findOne');

    const result = await this._refuelingRepository.findAllByTarga(targa);
    console.log('RefuelingStore > findOne: ', result);

    runInAction(() => {
        this.rifornimenti = result;
      }
    )
    return true;
  }
}
