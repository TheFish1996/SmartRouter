import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableHighlight, TouchableOpacity, Modal, FlatList} from 'react-native';
import {Icon, Tooltip} from 'react-native-elements'
import RouterSettingsSubmit from '../components/RouterSettingsSubmit'

const screen_Width = Dimensions.get('window').width;
const screen_Height = Dimensions.get('window').height;

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
    name: "Random QDisc"
  }
]

class RouterSettings extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectedQueing: "Choose Queing",
      selectedRate: "Select Rate",
      modalQueing: false
    }
  }

   queingTooltip = (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <View style={{marginBottom: 20}}>
          <Text style={{color: "#ff0000", fontSize: 25}}>Details for Queing Disciplines</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 20}}>Default</Text>
          <Text>Keeps same traffics speeds (may lead to massive network spikes)</Text>
        </View>
        <View>
          <Text style={{fontSize: 20}}>Smooth Traffic</Text>
          <Text>Smooth out massive traffic spikes (may lower overall traffic speeds)</Text>
        </View>
    </View>
   )

   rateTooltip = (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
        <View style={{marginBottom: 20}}>
          <Text style={{color: "#ff0000", fontSize: 25}}>Details for Rate</Text>
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 20}}>When To Choose Rate</Text>
          <Text>In the router settings it is best to chose a rate</Text>
        </View>
        <View>
          <Text style={{fontSize: 20}}>Rate</Text>
          <Text>Rate is the speed at which we will send and recieve packets to a given router</Text>
        </View>
    </View>
   )

   setModalVisible(){
    this.setState({modalQueing: !this.state.modalQueing})
  } 

   updateQueing(queingName){
      this.setState({
         selectedQueing: queingName,
         modalQueing: !this.state.modalQueing
      })
   }

  render() {
    return (
      <View style= {styles.main}>
        <View style= {styles.que}>
          <View style={styles.queingHeader}>
            <Text style={{fontSize: 20, color: '#ff0000', fontWeight:'bold'}}>Router Queing</Text>
            <Tooltip width = {screen_Width * 0.6} height={screen_Height * 0.35} backgroundColor="#a0c4ff" popover={this.queingTooltip}>
              <Icon name="question-circle" type="font-awesome" size={32} ></Icon>
            </Tooltip>
          </View>
          <TouchableOpacity style={styles.boxStyle} onPress={() => {
            this.setModalVisible()
          }}>
            <Icon name="speedometer" type="material-community" size={35} iconStyle={{paddingRight: 20}} color='red'></Icon>
            <Text style={{fontSize: 20}}>{this.state.selectedQueing}</Text>
          </TouchableOpacity>
          <Modal transparent={true} visible={this.state.modalQueing} animationType='fade'>
            <View style = {styles.modalStyle}>
              <View style={styles.containerModal}>
                <FlatList
                  data={QueingAlgos}
                  showsVerticalScrollIndicator={true}
                  renderItem={({item}) => 
                      <TouchableHighlight style={styles.queingDropdown} underlayColor='#d6d6d6' onLongPress={() => {this.updateQueing(item.name)}}>
                        <Text style={{color: 'black', fontSize: 20}}>{item.name}</Text>
                      </TouchableHighlight>
                  }
                  keyExtractor={item => item.key}
                ></FlatList>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.rate}>
          <View style={styles.rateHeader}>
            <Text style={{fontSize: 20, color: '#ff0000', fontWeight:'bold'}}>Rate Selection</Text>
            <Tooltip width = {screen_Width * 0.6} height={screen_Height * 0.35} backgroundColor="#a0c4ff" popover={this.rateTooltip}>
              <Icon name="question-circle" type="font-awesome" size={32} ></Icon>
            </Tooltip>
          </View>
          <TouchableOpacity style={styles.boxStyle} onPress={() => {
            this.setModalVisible()
          }}>
            <Icon name="speedometer" type="material-community" size={35} iconStyle={{paddingRight: 20}} color='red'></Icon>
            <Text style={{fontSize: 20}}>{this.state.selectedRate}</Text>
          </TouchableOpacity>
        </View>
        <RouterSettingsSubmit />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 35,
    marginLeft: screen_Width * 0.2,
    marginRight: screen_Width * 0.15,
  },
  que: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textStyle: {
    flex: 2,
    fontSize: 20,
  },
  boxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 2,
    borderColor: 'black',
  },
  modalStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: screen_Height * 0.22,
    marginBottom: screen_Height * 0.64,
    marginLeft: screen_Width * 0.2,
    marginRight: screen_Width * 0.15,
    borderWidth: 2,
    borderColor: 'black',
    borderTopColor: 'white'
  },
  containerModal: {
    backgroundColor: 'white',
    paddingLeft: 20,
  },
  queingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  queingDropdown: {
    marginBottom: 10,
    marginRight: 100
  },

  rate: {
    flex: 1,
    justifyContent: 'flex-start',
    marginBottom: 250

  },
  rateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default RouterSettings ;