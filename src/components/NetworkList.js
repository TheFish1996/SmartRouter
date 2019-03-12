import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions, RefreshControl} from 'react-native';
import {Button, Overlay, CheckBox, Icon} from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';


class NetworkList extends React.Component {

  constructor(props){
      super(props)
      this.state = {
        activeSections: [],
        checked: false,
        selectedDevice: ''
      }
  }

  _renderHeader = (section, index) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.Name}</Text>
      </View>
    );
  };
 
  _renderContent = section => {
    return (
      <View style={styles.items}>
        <Text style={styles.mac_address}>Mac Adress: {section.mac_address}</Text>
        <Text style={styles.mac_address}>IP Adress:{section.ip_address}</Text>
        <View style={styles.footer}>
          <Text style={styles.mac_address}>Upload: {section.ul_data / 1000}kb/s  </Text>
          <Text style={styles.mac_address}>Download: {section.dl_data / 1000}kb/s</Text>
        </View>
        <Button icon={{
          name: 'cogs',
          size: 35,
          color: '#ff0000',
          type: "material-community"
        }} buttonStyle={{borderColor: '#e84a4a', borderWidth: 1.5}} title="Edit Device Settings" type="outline" titleStyle={{fontSize: 23, color: '#ff0000'}}
        onPress={() => this.props.navigation.navigate('DeviceSettings', { //this is the params you are sending to the device list
            deviceName: section.Name,
            macAdress: section.mac_address
        })}
        ></Button>
      </View>
    );
  };
 
  _updateSections = activeSections => {
    this.setState({ 'activeSections' : activeSections });
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
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                sectionContainerStyle={{marginBottom: 10}}
                underlayColor='white'           
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
      alignItems: 'center',
      textAlign: 'justify'

    },
    mac_address: {
      fontSize: 20,
      marginBottom: 15
    },
    header : {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerText: {
      fontSize: 40,
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