import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class RouterSettings extends React.Component {
  render() {
    return (
      <View style= {styles.main}>
        <Text>Router Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default RouterSettings ;