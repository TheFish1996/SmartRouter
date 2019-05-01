import React from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions} from 'react-native';
import {getLiveData} from '../config/data'

const screen_Width = Dimensions.get('window').width;
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
                    <Text style={styles.dataTextStyle}>Download Rate:  
                    {
                        item.dl >= 1000 ? " " + (item.dl/ 1000) + " kb/s" : " " + item.dl + " mb/s"
                    }
                    </Text>
                    <Text style={styles.dataTextStyle}>Upload Rate:  
                    {
                        item.ul >= 1000 ? " " + (item.ul / 1000) + " kb/s" : " " + item.ul + " mb/s"
                    }
                    </Text>
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
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 30,
        marginLeft: screen_Width * 0.1,
        borderBottomColor: '#e84a4a', 
        borderBottomWidth: 2.5,
        marginRight: screen_Width * 0.2
    },
    deviceTextStyle: {
        fontSize: 40
    },
    dataTextStyle: {
        fontSize: 25
    }
})


export default LiveView;