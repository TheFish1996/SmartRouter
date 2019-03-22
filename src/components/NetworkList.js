import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, RefreshControl, Animated} from 'react-native';
import {Button, Overlay, CheckBox, Icon} from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';
import NetworkListHeader from  "../components/NetworkListHeader"

const screen_Width = Dimensions.get('window').width;

class NetworkList extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        activeSection: [],
        checked: false,
        selectedDevice: '',
      }
  }

 // IconZPos = new Animated.Value(90)
  _renderHeader = (section, index) => { //The header for the collapsible
    return (
      <NetworkListHeader key={index} section={section} />
    );
  };
 
  _renderContent = section => { //section for content of the accordion package
    return (
      <View style={styles.items}>
        <Text style={styles.mac_address}>Mac Adress: {section.mac_address}</Text>
        <Text style={styles.mac_address}>IP Adress: {section.ip_address}</Text>
        <Text style={styles.mac_address}>Upload: {section.ul_data / 1000}kb/s  </Text>
        <Text style={styles.mac_address}>Download: {section.dl_data / 1000}kb/s</Text>
        <Button icon={{
          name: 'cogs',
          size: 35,
          color: '#ff0000',
          type: "material-community"
        }} buttonStyle={{borderColor: '#e84a4a', borderWidth: 1.5, marginRight: 20, marginBottom: 5}} title="Edit Device Settings" type="outline" titleStyle={{fontSize: 23, color: '#ff0000'}}
        onPress={() => this.props.navigation.navigate('DeviceSettings', { //this is the params you are sending to the device list
            deviceName: section.Name,
            macAdress: section.mac_address,
            onGoBack: this.props.onGoBack
        })}
        ></Button>
      </View>
    );
  };
 
  _updateSections = activeSection => { //grabs the current active section
    this.setState({ 'activeSection' : activeSection });
  };


  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentInset={{top: 0, left: 0, bottom: 0, right:0}} bounces={true}
          refreshControl = {
            <RefreshControl refreshing={this.props.refreshedState} onRefresh={this.props.onRefresh} title="Pull Down to refresh" tintColor="#ff0000" titleColor="#ff0000"></RefreshControl>
          }>
            <Accordion
                sections={this.props.networkDevices}
                activeSections={this.state.activeSection}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                sectionContainerStyle={{marginBottom: 10}}
                underlayColor='#dee0e2'
                touchableProps={{
                  style: {
                    marginHorizontal: screen_Width * 0.2
                  }
                }
                }      
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        width: '100%',
    },
    items: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'left',
      marginLeft: screen_Width * 0.1,
      marginRight: screen_Width * 0.1,
      shadowColor: 'black',
      shadowOffset: {
      width: 2,
      height: 2
      },
      shadowRadius: 10,
      shadowOpacity: 2,
      borderColor: '#e84a4a', 
      borderWidth: 2,
      backgroundColor: 'white',
      paddingLeft: 10
    },
    mac_address: {
      fontSize: 20,
      marginBottom: 15
    },
    header : {
      flexDirection: 'row',
      marginBottom: 10,
    },
    headerText: {
      flex: 1,
      fontSize: 40,
      textAlign: 'center'
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    popUp: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
})

export default NetworkList;