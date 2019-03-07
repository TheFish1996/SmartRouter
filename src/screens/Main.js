import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetworkList  from '../components/NetworkList'
import { getAllDevices } from '../config/data'

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      networkDevices : []
    }
  }

  async componentDidMount(){
    const getNetworkDevices = await getAllDevices() //gets all devices
    this.setState({networkDevices: getNetworkDevices}) //sets the state to pass into network list
  }

  render() {
    return (
      <View style={styles.container}>
        <NetworkList networkDevices={this.state.networkDevices} />
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