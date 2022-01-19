// @ts-ignore
import getDirections from 'react-native-google-maps-directions'
import Snackbar from 'react-native-snackbar';

export const openGoogleMaps = (lat: number, lng: number) => {
  const data = {
    destination: {
      latitude: lat,
      longitude: lng
    },
  }

  getDirections(data)

  console.log('invio ', data);
}

export const showSnackbar = (message: string) => {
  Snackbar.show({
    text: message,
    //You can also give duration- Snackbar.LENGTH_SHORT, Snackbar.LENGTH_LONG
    duration: Snackbar.LENGTH_LONG,
    //color of snakbar
    backgroundColor: 'black',

    //color of text
    textColor: 'white'
  });
};
