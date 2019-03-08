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
        <Text style={styles.header}>Device 1</Text>
      </View>
    );
  };
 
  _renderContent = section => {
    return (
      <View>
        <Text style={styles.item}>{section.mac_address}</Text>
        <Text style={styles.item}>{section.ip_address}</Text>
        <Text style={styles.item}>{section.ul_data}</Text>
        <Text style={styles.item}>{section.dl_data}</Text>
      </View>
    );
  };
 
  _updateSections = activeSections => {
    this.setState({ 'activeSections' : activeSections });
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.List}>Device List</Text>
        <ScrollView contentInset={{top: 0, left: 0, bottom: 0, right:0}} bounces={false}>
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
        marginTop: 80,
        width: '100%',
        
    },
    List: {
      fontSize: 30,
      textAlign: 'center'
    },
    item: {
      fontSize: 20,
      textAlign: 'left',
      paddingLeft: 60
    },
    header : {
        fontSize: 50,
        paddingLeft: 60
    }
})

export default NetworkList;