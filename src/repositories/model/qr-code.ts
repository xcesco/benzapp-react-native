import {TesseraCarburanteEnum, TesseraVeicoloEnum} from '../network/models';

export interface QRCodeInfo {
  codiceFiscale: string;
  tesseraNumero: string;
  targa: string;
  veicolo: TesseraVeicoloEnum;
  carburante: TesseraCarburanteEnum
}
