import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';

export type Props = {
  name: string;
  baseCounter: number;
};

export default function AppTab1(props: Props) {
  const [valore, setValore] = useState({counter: props.baseCounter});

  const onPressHandler = () => {
    console.log('Pressed');
    setValore(prevState => ({counter: prevState.counter + 1}));
  };

  return (
    <Button icon="camera" mode="contained" onPress={onPressHandler}>
      <Text>{valore.counter}</Text>
    </Button>
  );
}
