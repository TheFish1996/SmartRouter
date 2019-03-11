import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Overlay, CheckBox} from 'react-native-elements'

const networkAllocations = {
    className10: '10',
    className25: '25',
    className50: '50',
    className100: '100',
    className250: '250',
    className500: '500',
    className1000: '1000',
  }
  
class DeviceSettings extends React.Component {

constructor(props){
    super(props)
    this.state= {
    }
}

  render() {
    const deviceName = this.props.navigation.getParam('deviceName', 'No Name') //this gets the param that was set in the networkList screen
    console.log()
    const Setheight = Dimensions.get('window').height - 350
    return (
        <View style={styles.popUp}>
            <Text>{deviceName}</Text>
        </View>
    );
  }
}

const styles= StyleSheet.create({
    popUp: {
        flex: 1,
        alignItems: 'center'
    }
})

export default DeviceSettings;
