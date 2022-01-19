import {action, makeObservable, observable, runInAction} from 'mobx';
import {Vehicle} from '../../repositories/model/vehicle';
import {VehicleRepository} from '../../repositories/vehicle-repository';
import {TesseraCarburanteEnum, TesseraVeicoloEnum} from '../../repositories/network/models';
import {VehicleSummary} from '../../repositories/model/vehicle-summary';
import {QRCodeInfo} from '../../repositories/model/qr-code';

export default class VehicleStore {
  // observable
  loading: boolean = false;

  // observable
  vehicles: Vehicle[];

  // observable
  vehicle: Vehicle = {
    carburante: TesseraCarburanteEnum.BENZINA,
    cittadino: {},
    codice: '',
    dataEmissione: new Date(),
    delega: 0,
    immagine: '',
    immagineContentType: '',
    targa: '',
    veicolo: TesseraVeicoloEnum.AUTOVEICOLO
  };

  // observable
  qrCodeInfo: QRCodeInfo = {
    carburante: TesseraCarburanteEnum.BENZINA,
    codiceFiscale: '',
    targa: '',
    tesseraNumero: '',
    veicolo: TesseraVeicoloEnum.AUTOVEICOLO
  };

  // summary
  vehicleSummary: VehicleSummary = {litriErogati: 0, risparmio: 0, spesa: 0};

  private _vehicleRepository: VehicleRepository;

  constructor(vehicleRepository: VehicleRepository) {
    this._vehicleRepository = vehicleRepository;
    this.vehicles = [];

    makeObservable(this, {
      loading: observable,
      vehicles: observable,
      vehicle: observable,
      vehicleSummary: observable,
      qrCodeInfo: observable,

      findAll: action,
      findById: action,
      findQRCodeById: action
    });
  }


  // action
  async findAll(): Promise<boolean> {
    const result = await this._vehicleRepository.findAll();

    runInAction(() => {
      this.vehicles = result;
    })
    return true;
  }

  async init(): Promise<void> {

  }

  // action
  async findById(id: number): Promise<boolean> {
    console.log('RefuelingStore > findOne');

    const result = await this._vehicleRepository.findById(id);
    console.log('RefuelingStore > findOne: ', result);

    runInAction(() => {
        this.vehicle = result.vehicle;
        this.vehicleSummary = result.summary;
      }
    )
    return true;
  }

  // action
  async findQRCodeById(id: number): Promise<boolean> {
    console.log('RefuelingStore > findOne');

    const result = await this._vehicleRepository.findById(id);
    console.log('RefuelingStore > findOne: ', result);

    runInAction(() => {
        this.qrCodeInfo = {
          carburante: result.vehicle.carburante,
          codiceFiscale: result.vehicle.cittadino.codiceFiscale,
          targa: result.vehicle.targa,
          tesseraNumero: result.vehicle.codice,
          veicolo: result.vehicle.veicolo
        };
      }
    )
    return true;
  }
}
