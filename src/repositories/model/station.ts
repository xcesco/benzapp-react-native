import {Marchio} from './marchio';

export interface Station {
  id: number;
  provincia: string;
  comune: string;
  indirizzo: string;
  longitudine: number;
  latitudine: number;
  marchio: Marchio;
}
