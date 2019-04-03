import React from 'react';
import {StyleSheet, Text, View, Dimensions, Alert} from 'react-native';
import {Button, Icon} from 'react-native-elements'
import {changeGlobalQDisc} from '../config/data'

const QueingAlgos = [
    {
      key: "pfifo",
      name: "Default"
    },
    {
      key: "tbf",
      name: "Smooth Traffic"
    },
    {
      key: "htb",
      name: "Random Classful"
    }
  ]

const screen_Height = Dimensions.get('window').height;

class RouterSettingsSubmit extends React.Component {

    constructor(props){
       super(props)
       this.state ={
       }
    }

     async updateGlobalQDisc(newQDisc, rate) {
        await changeGlobalQDisc(newQDisc, rate) //updates the name with the mac adress key
     }

    onUpdate = async () => { //happens after a new qdisc and rate is given
        Alert.alert( //alert popup after the data is sucessfully sent over
            'Confirm Update',
            'Click Yes to Update',
            [
                {
                    text: 'Yes', onPress: () => {
                        if(this.props.rate === "Select Rate" && this.props.qdisc === "Smooth Traffic"){ //if the rate is empty and its of a qdisc that can set rate
                            this.props.errorRate()
                        } else {
                            const qdiscObject = QueingAlgos.find((element) => { //finds the elements actual key name for the server to see
                                return element.name === this.props.qdisc;
                            })
                            let updateRouterSettings = this.updateGlobalQDisc(qdiscObject.key, this.props.rate) //updates the qdisc and rate
                            // updateRouterSettings.then(() => {
                            //     this.props.onGoBack()
                            //     this.props.navigation.goBack() //after the user hits okay it will send the user back
                            //})
                        }
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

export default RouterSettingsSubmit;


