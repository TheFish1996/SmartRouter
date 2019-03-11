import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {Overlay, CheckBox} from 'react-native-elements'

const networkAllocations = {
    className10: '10',
    className25: '25',
    className50: '50',
    className100: '100',
    className250: '250',
    className500: '500',
    className1000: '1000',
  }
  
class NetworkListPopUp extends React.Component {

constructor(props){
    super(props)
    this.state= {
    }
}

  render() {
    const Setheight = Dimensions.get('window').height - 350
    return (
        <Overlay isVisible={this.props.isPopupVisible} height={Setheight} onBackdropPress={this.props.deRenderPopup}
        overlayBackgroundColor='white'>
            <View style={styles.popUp}>
                <Text style={{textAlign: 'center', fontSize:20}}>Please Select Network Class</Text>
                <CheckBox title={networkAllocations.className10} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'   containerStyle={{backgroundColor: 'white', borderColor: 'white'}} ></CheckBox>
                <CheckBox title={networkAllocations.className25} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'   containerStyle={{backgroundColor: 'white', borderColor: 'white'}} ></CheckBox>
                <CheckBox title={networkAllocations.className50} checkedIcon='dot-circle-o' uncheckedIcon='circle-o'   containerStyle={{backgroundColor: 'white', borderColor: 'white'}} ></CheckBox>
                <CheckBox title={networkAllocations.className100}  checkedIcon='dot-circle-o' uncheckedIcon='circle-o' containerStyle={{backgroundColor: 'white', borderColor: 'white'}} ></CheckBox>
                <CheckBox title={networkAllocations.className250}  checkedIcon='dot-circle-o' uncheckedIcon='circle-o' containerStyle={{backgroundColor: 'white', borderColor: 'white'}} ></CheckBox>
                <CheckBox title={networkAllocations.className500}  checkedIcon='dot-circle-o' uncheckedIcon='circle-o' containerStyle={{backgroundColor: 'white', borderColor: 'white'}} ></CheckBox>
                <CheckBox title={networkAllocations.className1000} checkedIcon='dot-circle-o' uncheckedIcon='circle-o' containerStyle={{backgroundColor: 'white', borderColor: 'white'}}></CheckBox>
            </View>
        </Overlay>
    );
  }
}

const styles= StyleSheet.create({
    popUp: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default NetworkListPopUp;
