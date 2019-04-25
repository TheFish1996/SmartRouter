import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';


const randomData= [
    {
        mac_Adress: "1213",
        name: "Device 1",
        ul: "10",
        dl: "10"
    },
    {
        mac_Adress: "1214",
        name: "Device 2",
        ul: "10",
        dl: "10"
    },
    {
        mac_Adress: "1215",
        name: "Device 3",
        ul: "10",
        dl: "10"
    },
    {
        mac_Adress: "1216",
        name: "Device 4",
        ul: "10",
        dl: "10"
    },
]

class LiveView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            liveData : randomData
        }
    }

    componentWillMount(){
        this.intervalUpdate = setInterval(() => {
            this.setState({
                liveData: randomData
            })
        }, 3000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalUpdate)
    } 

    render() {
        return (
        <View style={styles.container}>
            <FlatList
            data={this.state.liveData}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) =>
                <View style={styles.liveDeviceContainer}>
                    <Text style={styles.deviceTextStyle}>{item.name}</Text>
                    <Text style={styles.dataTextStyle}>Ul: {item.ul}</Text>
                    <Text style={styles.dataTextStyle}>DL: {item.dl}</Text>
                </View> 
            }
            keyExtractor={item => item.mac_Adress}
            ></FlatList>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    liveDeviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 30
    },
    deviceTextStyle: {
        fontSize: 40
    },
    dataTextStyle: {
        fontSize: 25
    }
})


export default LiveView;