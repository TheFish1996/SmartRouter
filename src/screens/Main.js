import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import NetworkList  from '../components/NetworkList'
import { getAllDevices } from '../config/data'

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      networkDevices : [],
      animating: true
    }
  }



  async componentDidMount(){
    const getNetworkDevices = await getAllDevices() //gets all devices
    setTimeout(() => 
      this.setState({
        animating: false,
        networkDevices: getNetworkDevices
      }), 1000)  //sets the timeout for the network call to finish
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" animating= {this.state.animating} />
        {this.state.animating === false && 
          <NetworkList networkDevices={this.state.networkDevices} />
        }
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