import {Cittadino, Delega, Tessera, TesseraCarburanteEnum, TesseraVeicoloEnum} from '../network/models';

export interface Vehicle {
  id?: number;
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

export function fromDelega(delega: Delega): Vehicle {
  return {
    carburante: delega.tessera?.carburante ?? TesseraCarburanteEnum.BENZINA,
    cittadino: delega.cittadino!,
    codice: delega.tessera?.codice ?? '',
    dataEmissione: delega.tessera?.dataEmissione ?? Date.now(),
    immagine: delega.tessera?.immagine ?? '',
    immagineContentType: delega.tessera?.immagineContentType ?? '',
    targa: delega.tessera?.targa ?? '',
    veicolo: delega.tessera?.veicolo ?? TesseraVeicoloEnum.AUTOVEICOLO,
    delega: true
  };
}

export function fromTessera(tessera: Tessera): Vehicle {
  return {
    carburante: tessera.carburante ?? TesseraCarburanteEnum.BENZINA,
    cittadino: tessera.cittadino!,
    codice: tessera.codice ?? '',
    dataEmissione: tessera.dataEmissione ?? Date.now(),
    immagine: tessera.immagine ?? '',
    immagineContentType: tessera.immagineContentType ?? '',
    targa: tessera.targa ?? '',
    veicolo: tessera.veicolo ?? TesseraVeicoloEnum.AUTOVEICOLO,
    delega: false
  };
}
