import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';


export function VehicleQRCodeDetailScreen() {

  return (
          <View style={style.container}>
            <QRCode size={240}
                    value="http://awesome.link.qr"
            />
            <Text style={{marginTop: 24}}>Numero tessera</Text>
            <Text>Targa</Text>
          </View>
  )
          ;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
