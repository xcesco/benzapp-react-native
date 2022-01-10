import assets from '../../../assets';

export enum Marchio { notDefined, eni, esso, kerotris, oilItalia, q8, tamoil }

export function getMarchioImage(value: Marchio) {
  switch (value) {
    case Marchio.notDefined:
      return assets.marchi.notDefined;
    case Marchio.eni:
      return assets.marchi.eni;
    case Marchio.esso:
      return assets.marchi.esso;
    case Marchio.kerotris:
      return assets.marchi.kerotris;
    case Marchio.oilItalia:
      return assets.marchi.oilItalia;
    case Marchio.q8:
      return assets.marchi.q8;
    case Marchio.tamoil:
      return assets.marchi.tamoil;
  }
  return assets.marchi.notDefined;
}
