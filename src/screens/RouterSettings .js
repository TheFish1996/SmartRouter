import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableHighlight, TouchableOpacity, Modal, FlatList} from 'react-native';
import {Icon, Tooltip} from 'react-native-elements'
import RouterSettingsSubmit from '../components/RouterSettingsSubmit'
import { withNavigationFocus } from "react-navigation";  
import { getDisc } from '../config/data'
const screen_Width = Dimensions.get('window').width;
const screen_Height = Dimensions.get('window').height;

const QueingAlgos = [
  {
    key: "pfo",
    name: "Monitor Only"
  },
  {
    key: "tbf",
    name: "Router Cap"
  },
  {
    key: "htb",
    name: "Advanced Config"
  }
]

const rateChoice= [
  {
    key: "0",
    name: "5"
  },
  {
    key: "1",
    name: "10"
  },
  {
    key: "2",
    name: "15"
  },
  {
    key: "3",
    name: "20"
  },
  {
    key: "4",
    name: "25"
  },
  {
    key: "5",
    name: "50"
  },
  {
    key: "6",
    name: "75"
  },
  {
    key: "7",
    name: "100"
  },
]

class RouterSettings extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      selectedModal: "",          //selected modal
      stringQueing: "Monitor Only",    //touchable header string for queing
      stringRate: "Rate Selection Disabled",  //touchable header string for Rate
      modalQueing: false,         //state for any modal being viewed
      modalPosition: styles.modalStyle, //style for the modal position selected
      dropdownList: [],                 //dropdown list for which modal selected
      disableRateDropdown: true,       //boolean for rate modal disabling on certain selections
      noSelectedRate: false           //boolean for selected rate
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener("willFocus", async () => {
      const queingName = await getDisc();
      const qdiscObject = QueingAlgos.find((element) => { //finds the elements actual key name for the server to see
        return element.key === queingName.qdisc;
      })
      this.updateOnMount(qdiscObject.name, queingName.rate)
    })
  }

  componentWillUnmount(){
    this.focusListener.remove();
  }

  updateOnMount(queingName, rateSelected){
    let rateDisabled = true
    switch(queingName){
      case "Monitor Only":
      rateDisabled = true;
      break; 
      case "Router Cap":
      rateDisabled = false;
      break;
      case "Advanced Config":
      rateDisabled = false;
    }
    if(!rateDisabled){
      this.setState({
        stringQueing: queingName,
        disableRateDropdown: rateDisabled,
        stringRate: (parseInt(rateSelected) /  1000).toString()
      })
    } else {
      this.setState({
        stringQueing: queingName,
        disableRateDropdown: rateDisabled
      })
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
          <Text style={{fontSize: 20}}>Rate</Text>
          <Text>Rate is the speed at which we will send and recieve packets to a given router</Text>
        </View>
        <View>
          <Text style={{fontSize: 20}}>When Rate Can be Chosen</Text>
          <Text>Certain Router queing methods chosen up top let you set the rate globally or locally per device</Text>
        </View>
    </View>
   )

   setModalVisible(modalStyle, dropdownData, selectedModal){
    this.setState({
      selectedModal: selectedModal,
      modalQueing: !this.state.modalQueing,
      modalPosition: modalStyle,
      dropdownList: dropdownData
    })
  }
  
  setErrorRate = () => {
      this.setState({noSelectedRate: true})
  }

   updateQueing(queingName){  //updates the touchableopacity for the specific modal it was triggered on
     if(this.state.selectedModal == "")
        return;

      if(this.state.selectedModal === "Rate" && !this.state.disableRateDropdown){ //If the selected modal is rate and its not currently disabled
        this.setState({
          stringRate: queingName,
          modalQueing: !this.state.modalQueing,
          noSelectedRate: false                 //will set noselected rate back to false to update
        })
      } else if (this.state.selectedModal === "Queing"){
        if(queingName === "Monitor Only"){ //if the queing discipline is a random qdisc or pfifo we want to disable rate selection because then its user defined per device
          this.setState({
            stringQueing: queingName,
            stringRate: "Rate Selection Disabled",
            disableRateDropdown: true,
            modalQueing: !this.state.modalQueing,
          })
        } else {
          this.setState({
            stringQueing: queingName,
            stringRate: "Select Rate",
            disableRateDropdown: false,
            modalQueing: !this.state.modalQueing,
          })
        }
      }
   }

  render() {
    return (
      <View style= {styles.main}>
        <View style= {styles.que}>
          <View style={styles.queingHeader}>
            <Text style={{fontSize: 20, color: '#ff0000', fontWeight:'bold'}}>Router Mode</Text>
            <Tooltip width = {screen_Width * 0.6} height={screen_Height * 0.35} backgroundColor="#a0c4ff" popover={this.queingTooltip}>
              <Icon name="question-circle" type="font-awesome" size={32} ></Icon>
            </Tooltip>
          </View>
          <TouchableOpacity style={styles.boxStyle} onPress={() => {
            this.setModalVisible(styles.modalStyle, QueingAlgos, "Queing")
          }}>
            <Icon name="server-plus" type="material-community" size={35} iconStyle={{paddingRight: 20}} color='red'></Icon>
            <Text style={{fontSize: 20}}>{this.state.stringQueing}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rate}>
          <View style={styles.rateHeader}>
            <Text style={{fontSize: 20, color: '#ff0000', fontWeight:'bold'}}>Rate Cap (Mb/s)</Text>
            <Tooltip width = {screen_Width * 0.6} height={screen_Height * 0.35} backgroundColor="#a0c4ff" popover={this.rateTooltip}>
              <Icon name="question-circle" type="font-awesome" size={32} ></Icon>
            </Tooltip>
          </View>
          <TouchableOpacity disabled={this.state.disableRateDropdown} style={[styles.boxStyle, this.state.disableRateDropdown && {backgroundColor: '#dee0e2'}, 
            !this.state.disableRateDropdown && this.state.noSelectedRate && {borderColor: 'red', backgroundColor:'#dee0e2'}]} 
            //if the dropdown is disabled itll have a specific background color and if the dropdown is not disabled and no selected rate is true then we set red border and background
            onPress={() => {
              this.setModalVisible(styles.rateModalStyle, rateChoice, "Rate") //onpress sets the modalvisible for the rate with the style for that modal
          }}>
            <Icon name="speedometer" type="material-community" size={35} iconStyle={{paddingRight: 20}} color='red'></Icon>
            <Text style={{fontSize: 20}}>{this.state.stringRate}</Text>
          </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={this.state.modalQueing} animationType='fade'>
            <View style = {this.state.modalPosition}>
              <View style={styles.containerModal}>
                <FlatList
                  data={this.state.dropdownList}
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
        <RouterSettingsSubmit qdisc={this.state.stringQueing} 
        rate={this.state.stringRate === "Rate Selection Disabled" ? "" : this.state.stringRate} //if the rate is disabled then send empty string, otherwise send the string
        errorRate={this.setErrorRate} //error rate for function
        />
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
  rateModalStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: screen_Height * 0.36,
    marginBottom: screen_Height * 0.5,
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
    marginRight: 80
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
  },
})

export default RouterSettings ;