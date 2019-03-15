import React from 'react';
import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native';
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
        await changeName(newName, macAdress) //updates the name with the mac adress key
    }

    onUpdate = async () => { //happens after a new name is given
        Alert.alert( //alert popup after the data is sucessfully sent over
            'Confirm Update',
            'Click Yes to Update',
            [
                {
                    text: 'Yes', onPress: () => {
                        let changeName = this.updateName(this.props.updatedName, this.props.macAdress) //updates the name
                        changeName.then(() => {
                            this.props.onGoBack()
                            this.props.navigation.navigate('Main') //after the user hits okay it will send the user back
                        })
                    }
                },
                {
                    text: 'No', onPress: () => {},
                    style: 'destructive'
                },
                {
                    text: 'Cancel', onPress: () => {},
                    style: 'cancel'
                },  
            ]
        )
    }

  render() {
    return (
        <View style={styles.buttonContainer}>
            <Button icon={{ //button that submits the form
                name: 'edit',
                size: 35,
                color: 'black',
                type: "font-awesome"
                }} buttonStyle={{borderColor: '#e84a4a', borderWidth: 1.5}} title="Set New Settings" type="outline" titleStyle={{fontSize: 23, color: '#ff0000'}}
                onPress={() => {
                    this.onUpdate()
                }}
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


