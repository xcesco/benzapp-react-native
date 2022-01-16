// @ts-ignore
import getDirections from 'react-native-google-maps-directions'

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
