import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Button, Icon} from 'react-native-elements'
import {changeName} from '../config/data'


const screen_Height = Dimensions.get('window').height;

class DeviceSettingsSubmit extends React.Component {

    constructor(props){
       super(props)
       this.state ={
       }
    }

    async updateName (newName, macAdress) {
        await changeName(newName, macAdress)
    }

  render() {
    return (
        <View style={styles.buttonContainer}>
            <Button icon={{
                name: 'edit',
                size: 35,
                color: 'black',
                type: "font-awesome"
                }} buttonStyle={{borderColor: '#e84a4a', borderWidth: 1.5}} title="Set New Settings" type="outline" titleStyle={{fontSize: 23, color: '#ff0000'}}
                onPress={() => {this.updateName("Iphone Device", '3C:CF:53:DB:7F:25')}}
                >
            </Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: screen_Height*0.07
    },
})

export default DeviceSettingsSubmit;


