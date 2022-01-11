import {Cittadino, TesseraCarburanteEnum, TesseraVeicoloEnum} from '../network/models';

export interface Vehicle {
  carburante: TesseraCarburanteEnum;

  cittadino: Cittadino;

  codice: string;

  dataEmissione: Date;

  immagine: string;

  immagineContentType: string;

  targa: string;

  veicolo: TesseraVeicoloEnum;

  delega: boolean;
}
