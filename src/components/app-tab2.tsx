import React, {useState} from 'react';
import {Button, Modal, Text} from 'react-native-paper';
import {View} from 'react-native';

export type Props = {
  name: string;
  baseCounter: number;
  onPress(): void;
};

export default function AppTab2(props: Props) {
  const [valore, setValore] = useState({counter: props.baseCounter});
  const [visible, setVisible] = React.useState(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20, height: 200};

  const onPressHandler = () => {
    console.log('Pressed');
    props.onPress();
    setValore(prevState => ({counter: prevState.counter + 1}));
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={{height: 400}}>
      <Button icon="camera" mode="contained" onPress={onPressHandler}>
        <Text>{valore.counter}</Text>
      </Button>
      <Button icon="camera" mode="contained" onPress={showModal}>
        <Text>{valore.counter}</Text>
      </Button>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </View>
  );
}
