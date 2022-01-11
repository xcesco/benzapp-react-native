import {Gestore, RifornimentoTipoCarburanteEnum, Tessera} from '../network/models';

export interface Refueling {
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
