import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion'

const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...'
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...'
    }
  ];

class NetworkList extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        activeSections: []
      }
  }
 
  _renderHeader = section => {
    return (
      <View>
        <Text style={styles.header}>Device List</Text>
      </View>
    );
  };
 
  _renderContent = section => {
    return (
      <View>
        <Text>{section.mac_address}</Text>
        <Text>{section.ip_address}</Text>
        <Text>{section.ul_data}</Text>
        <Text>{section.dl_data}</Text>
      </View>
    );
  };
 
  _updateSections = activeSections => {
    this.setState({ 'activeSections' : activeSections });
  };


  render() {
    return (
      <View style={styles.container}>
        <Text>Device List</Text>
        <ScrollView contentInset={{top: 0, left: 0, bottom: 150, right:0}}>
            <Accordion
                sections={this.props.networkDevices}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 65,
    },
    header : {
        fontSize: 50
    }
})

export default NetworkList;