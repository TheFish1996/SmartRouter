import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import NetworkList  from '../components/NetworkList'
import { getAllDevices, getDisc } from '../config/data'

class Main extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      networkDevices : [],
      animating: true,
      refreshing: false,
      qdisc: ''
    }
  }

  _onGoBack = async() => {
    const getNetworkDevices = await getAllDevices();
    const getQDisc  = await getDisc()
    this.setState({
      networkDevices: getNetworkDevices,
      qdisc: getQDisc.qdisc
    })
  }

  _refreshing = async () => {
    const getNetworkDevices = await getAllDevices() //gets all devices
    const getQDisc  = await getDisc() //gets queing disc
    this.setState({
      refreshing: true,
    })
    setTimeout(() => 
      this.setState({
        refreshing: false,
        networkDevices: getNetworkDevices,
        qdisc: getQDisc.qdisc
      }), 1000)  //sets the timeout for the network call to finish
  }

  async componentDidMount(){
    const getNetworkDevices = await getAllDevices() //gets all devices
    const getQDisc  = await getDisc()
    this.setState({
      networkDevices: getNetworkDevices,
      qdisc: getQDisc.qdisc
    })
  }

  render() {
    const networkDevices = this.state.networkDevices
    return (
      <View style={styles.container}>
        <NetworkList onGoBack={this._onGoBack} navigation={this.props.navigation} onRefresh={this._refreshing} 
          refreshedState={this.state.refreshing} networkDevices={networkDevices} qdisc={this.state.qdisc} />
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