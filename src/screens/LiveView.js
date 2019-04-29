import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {getLiveData} from '../config/data'

class LiveView extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            liveData : [
                {
                    dl: "",
                    mac_address: "",
                    name: "",
                    ul: "",
                },
            ],
            shouldUpdate: false
        }
    }

  componentWillMount(){
    const {navigation} = this.props;
    this.focusListener = navigation.addListener("willFocus", async () => {
        let liveData = await getLiveData();
        this.setState({
            liveData: liveData 
        }, async () => {
            this.intervalUpdate = setInterval( async () => {
                let update4Seconds = await getLiveData();
                console.log(update4Seconds)
            this.setState({
                liveData: update4Seconds
            })
         }, 4000)
        })
    })
    }

    componentWillUnmount(){
        console.log("Testing")
        this.focusListener.remove();
        clearInterval(this.intervalUpdate)
    } 

    render() {
        const { isFocused } = this.props.navigation;
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
            keyExtractor={item => item.mac_address}
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