import React from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {Button, Overlay} from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion';


class NetworkList extends React.Component {

  constructor(props){
      super(props)
      this.state = {
        activeSections: [],
        isPopupVisible: false
      }
  }

  _renderPopup = () => {
    this.setState({isPopupVisible: true})
  }
 
  _renderHeader = (section, index) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Device {index + 1}</Text>
      </View>
    );
  };
 
  _renderContent = section => {
  
    return (
      <View style={styles.items}>
        <Text style={styles.mac_address}>Mac Adress: {section.mac_address}</Text>
        <Text style={styles.mac_address}>IP Adress:{section.ip_address}</Text>
        <View style={styles.footer}>
          <Text style={styles.mac_address}>UpLink: {section.ul_data}  </Text>
          <Text style={styles.mac_address}>Downlink: {section.dl_data}</Text>
        </View>
        <Button icon={{
          name: 'speedometer',
          size: 35,
          color: '#ff0000',
          type: "material-community"
        }} buttonStyle={{borderColor: '#e84a4a', borderWidth: 1.5}} title="Class Type: 10" type="outline" titleStyle={{fontSize: 23, color: '#ff0000'}}
        onPress={this._renderPopup}
        ></Button>
      </View>
    );
  };
 
  _updateSections = activeSections => {
    this.setState({ 'activeSections' : activeSections });
  };


  render() {
    const Setheight = Dimensions.get('window').height - 500
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Device List</Text>
        <ScrollView contentInset={{top: 0, left: 0, bottom: 0, right:0}} bounces={false}>
            <Accordion
                sections={this.props.networkDevices}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
                sectionContainerStyle={{marginBottom: 10}}
            />
        </ScrollView>
      <Overlay isVisible={this.state.isPopupVisible} height={Setheight} onBackdropPress={() => this.setState({ isPopupVisible: false })}
        overlayBackgroundColor='white'
        overlayStyle={{opacity: 0.9}}>
        <Text>Testing Overlay!</Text>
      </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        width: '100%',
    },
    title: {
      fontSize: 50,
      textAlign: 'center'
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
      marginBottom: 10
    },
    headerText: {
      fontSize: 40,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
})

export default NetworkList;