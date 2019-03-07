import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetworkList  from '../components/NetworkList'
import { getAllDevices } from '../config/data'

class Main extends React.Component {

  async componentDidMount(){
    const getNetworkDevices = await getAllDevices()
    console.log(getNetworkDevices)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to React Native!</Text>
        <NetworkList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Main;