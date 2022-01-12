import {Gestore, Rifornimento, RifornimentoTipoCarburanteEnum, Tessera} from '../network/models';

export interface Refueling {
  id: number,
  data: Date;
  gestore: Gestore;
  litriErogati: number;
  prezzoAlLitro: number;
  sconto: number;
  tessera: Tessera;
  tipoCarburante: RifornimentoTipoCarburanteEnum;
  targa: string;
  gestoreId: number;
}

export interface RefuelingDb {
  data: Date;
  gestore: Gestore;
  litri_erogati: number;
  prezzo_al_litro: number;
  sconto: number;
  tessera: Tessera;
  tipo_carburante: RifornimentoTipoCarburanteEnum;
  targa: string;
  gestore_id: number;
}

export function refuelingOf(item: Rifornimento): Refueling {
  return item as Refueling;
}
