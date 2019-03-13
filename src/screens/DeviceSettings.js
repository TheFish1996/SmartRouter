import React from 'react';
import {StyleSheet, Text, View, Dimensions, Modal, TouchableOpacity, FlatList, TouchableHighlight, KeyboardAvoidingView} from 'react-native';
import {Overlay, CheckBox, Input, Icon, Button} from 'react-native-elements'
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
        modalVisible: false,
        networkClass: 'Select From Dropdown',
        newName: ''
    }
}

 setModalVisible(visible){
     this.setState({modalVisible: visible})
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
            <View style={styles.dropDown}>
                <Text style={{marginBottom: 5, paddingLeft: 10, fontSize: 20, color: '#ff0000', fontWeight:'bold'}}>Network Class</Text>
                <TouchableOpacity style={styles.touchableHeader} onPress={() => {this.setModalVisible(true)}}>
                    <Icon name="speedometer" type="material-community" size={35} iconStyle={{paddingRight: 20}} color='red'></Icon>
                    <Text style={{fontSize: 20}}>{this.state.networkClass}</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent={true} visible={this.state.modalVisible} animationType='fade'>
                <View style={styles.modalStyle}>
                    <View style={styles.containerModal}>
                        <FlatList
                            data={networkAllocations}
                            showsVerticalScrollIndicator={true}
                            renderItem={({item}) =>
                                <View style={styles.networkClass}>
                                    <TouchableHighlight underlayColor='#d6d6d6' onLongPress={() => {this.setNetworkClass(item.className, !this.state.modalVisible)}}>
                                        <Text style={{color: 'black', fontSize: 25}}>{item.className}</Text>
                                    </TouchableHighlight>
                                </View>
                            }
                            keyExtractor={item => item.id}
                            >
                        </FlatList>
                    </View>
                </View>
            </Modal>
            <DeviceSettingsSubmit macAdress={macAdress} navigation={this.props.navigation} updatedName={this.state.newName}/>
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
        marginTop: screen_Height * 0.38,
        paddingRight: screen_Width * 0.2,
        marginBottom: screen_Height* 0.2
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
         marginTop: screen_Height * 0.375,
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
