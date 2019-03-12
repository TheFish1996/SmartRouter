import React from 'react';
import {StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity} from 'react-native';
import {Overlay, CheckBox, Input, Icon} from 'react-native-elements'

const networkAllocations = {
    className10: '10',
    className25: '25',
    className50: '50',
    className100: '100',
    className250: '250',
    className500: '500',
    className1000: '1000',
  }

const screen_Height = Dimensions.get('window').height;
const screen_Width = Dimensions.get('window').width;
  
class DeviceSettings extends React.Component {

constructor(props){
    super(props)
    this.state= {
    }
}

  render() {
    const deviceName = this.props.navigation.getParam('deviceName', 'No Name') //this gets the param that was set in the networkList screen
    const macAdress = this.props.navigation.getParam('macAdress', 'No Name')
    return (
        <View style={styles.Settings}>
            <Text style={styles.deviceName}>{deviceName}</Text>
            <View style={styles.Name}>
                <Input placeholder="Please Enter New Name"
                    label="Name"
                    labelStyle= {{
                        marginBottom: 5,
                        paddingLeft: 10,
                        fontSize: 20,
                        color: '#ff0000',
                    }}
                    containerStyle={{
                        paddingRight: screen_Width * 0.2
                    }}
                    inputContainerStyle={{
                        borderWidth: 2,
                        borderRadius: 20,
                        borderColor: 'black',
                    }}
                    leftIcon= {
                        <Icon name="device-hub"></Icon>
                    }
                    leftIconContainerStyle= {{
                        paddingRight: 10
                    }}
                ></Input>
            </View>
            <View style={styles.dropDown}>
                <Text style={{marginBottom: 5, paddingLeft: 10, fontSize: 20, color: '#ff0000', fontWeight:'bold'}}>Network Class</Text>
                <TouchableOpacity style={styles.touchableHeader} onPress={() => {console.log('Testing')}}>
                    <Icon name="speedometer" type="material-community" size={35} iconStyle={{paddingRight: 20}} color='red'></Icon>
                    <Text style={{fontSize: 20}}>Select From Dropdown</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent={true} visible={true} animationType='fade'>
                <View style={styles.modalStyle}>
                    <View style={styles.containerModal}>
                        <Text>Testing</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
  }
}

const styles= StyleSheet.create({
    Settings: {
        flex: 1,
        justifyContent: 'center'
    },
    Name: {
        flex: 1,
        justifyContent: 'flex-start',
        height: 20,
        marginBottom: -350
    },
    deviceName: {
        fontSize: 30,
        marginBottom: 5,
        textAlign: 'center'
    },
    dropDown: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 10,
        paddingRight: screen_Width * 0.2,
        marginBottom: -1
    },
    touchableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
    },
    modalStyle: {
         flex: 1,
         justifyContent: 'flex-start',
         marginTop: screen_Height * 0.40,
         marginBottom: screen_Height * 0.45,
         marginRight: screen_Width * 0.2,
         marginLeft: 10,
         borderWidth: 2,
         borderColor: 'black',
         borderTopColor: 'white'
    },
    containerModal: {
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingTop: 10
    }
})

export default DeviceSettings;
