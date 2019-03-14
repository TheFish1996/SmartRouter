import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import NetworkList  from '../components/NetworkList'
import { getAllDevices } from '../config/data'

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      networkDevices : [],
      animating: true,
      refreshing: false
    }
  }

  _onGoBack = async() => {
    const getNetworkDevices = await getAllDevices();
    this.setState({
      networkDevices: getNetworkDevices
    })
  }

  _refreshing = async () => {
    const getNetworkDevices = await getAllDevices() //gets all devices
    this.setState({
      refreshing: true,
    })
    setTimeout(() => 
      this.setState({
        refreshing: false,
        networkDevices: getNetworkDevices
      }), 1000)  //sets the timeout for the network call to finish
  }

  async componentDidMount(){
    const getNetworkDevices = await getAllDevices() //gets all devices
    this.setState({networkDevices: getNetworkDevices})
  }

  render() {
    const networkDevices = this.state.networkDevices
    return (
      <View style={styles.container}>
        <NetworkList onGoBack={this._onGoBack} navigation={this.props.navigation} onRefresh={this._refreshing} refreshedState={this.state.refreshing} networkDevices={networkDevices} />
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