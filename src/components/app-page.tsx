import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {
  title: string;
};

export class AppPage extends React.Component<Props> {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        {this.props.children}
      </View>
    );
  }
}
