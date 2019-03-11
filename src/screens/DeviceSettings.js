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
    const Setheight = Dimensions.get('window').height - 350
    return (
        <View style={styles.popUp}>
            <Text>Hello</Text>
        </View>
    );
  }
}

const styles= StyleSheet.create({
    popUp: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default DeviceSettings;
