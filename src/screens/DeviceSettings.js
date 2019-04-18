import React from 'react';
import {StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity, FlatList, TouchableHighlight, KeyboardAvoidingView} from 'react-native';
import {Overlay, CheckBox, Input, Icon, Button, Slider} from 'react-native-elements'
import DeviceSettingsSubmit from  "../components/DeviceSettingsSubmit"

const networkAllocations = [{
    className: '10', id: '1'},
    {   
        id: '2',
        className: '25'
    },

    {   
        id: '3',
        className: '50'
    },
    {   
        id: '4',
        className: '100'
    },
    {   
        id: '5',
        className: '250'
    },
    {   
        id: '6',
        className: '500'
    },
    {   
        id: '7',
        className: '1000'
    },
]

const screen_Height = Dimensions.get('window').height;
const screen_Width = Dimensions.get('window').width;
  
class DeviceSettings extends React.Component {

constructor(props){
    super(props)
    this.state = {
        networkClass: 'Select From Dropdown',
        newName: this.props.navigation.getParam('deviceName', 'No Name'),
        rate: this.props.navigation.getParam('rate'),
        ceiling: this.props.navigation.getParam('ceiling'),
        priority: this.props.navigation.getParam('priority')
    }
}

 setNetworkClass(className, visible){
    this.setState({
        networkClass: className
    })
    this.setModalVisible(visible)
 }

  render() {
    const deviceName = this.props.navigation.getParam('deviceName', 'No Name') //this gets the param that was set in the networkList screen
    const macAdress = this.props.navigation.getParam('macAdress', 'No Name')
    const goBack = this.props.navigation.getParam('onGoBack')
    const qdiscData = this.props.navigation.getParam('qdiscData')
    console.log(this.state.rate)
    return (
        <View style={styles.Settings}>
            <Text style={styles.deviceName}>{deviceName} Settings</Text>
            <View style={styles.Name}>
                <Input placeholder="Please Enter New Name"
                    maxLength={20}
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
                    clearTextOnFocus={true}
                    onSubmitEditing={(event) => {this.setState({newName: event.nativeEvent.text})}}
                ></Input>
            </View>
            {   qdiscData.qdisc === 'htb' &&
                <View style={styles.dropDown}>
                <Text style={{marginBottom: 5, paddingLeft: 10, fontSize: 20, color: '#ff0000', fontWeight:'bold'}}>Device Class Settings</Text>
                <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'space-between', paddingLeft: 10}}>
                    <Slider
                        value={this.state.rate}
                        maximumValue={100}
                        step={1}
                        minimumTrackTintColor={'#ff0000'}
                        onValueChange={value => this.setState({rate: value})}
                    />
                    {   this.state.rate === -1 
                        ? <Text style={{fontSize: 20}}>Please select a rate as a percentage</Text>
                        : <Text style={{fontSize: 25}}>Rate: {this.state.rate}%</Text>
                    }
                    <Slider
                        value={this.state.ceiling}
                        maximumValue={100}
                        step={1}
                        minimumTrackTintColor={'#ff0000'}
                        onValueChange={value => this.setState({ceiling: value})}
                    />
                    {   this.state.ceiling === -1 
                        ? <Text style={{fontSize: 20}}>Please select a ceiling as a percentage</Text>
                        : <Text style={{fontSize: 25}}>Ceiling: {this.state.ceiling}%</Text>
                    }
                    <Slider
                        minimumValue={0}
                        value={this.state.priority}
                        maximumValue={9}
                        step={1}
                        minimumTrackTintColor={'#ff0000'}
                        onValueChange={value => this.setState({priority: value})}
                    />
                    {   this.state.priority === -1 
                        ? <Text style={{fontSize: 20}}>Please select a priority on a scale from 0-9</Text>
                        : <Text style={{fontSize: 25}}>Priority: {this.state.priority}</Text>
                    }
                </View>
            </View>
            }
            <DeviceSettingsSubmit onGoBack={goBack} macAdress={macAdress} navigation={this.props.navigation} rate={this.state.rate}
                ceiling={this.state.ceiling} priority={this.state.priority} updatedName={this.state.newName}/>
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
        marginTop: screen_Height * 0.28,
        paddingRight: screen_Width * 0.2,
        marginBottom: screen_Height* 0.01
    },
    touchableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
    },
    networkClass: {
        marginBottom: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: screen_Height*0.07
    }
})

export default DeviceSettings;
