import React from 'react';
import {StyleSheet, Text, View, Animated, TouchableHighlight, Dimensions, Easing} from 'react-native';
import {Icon} from 'react-native-elements'

const screen_Width = Dimensions.get('window').width;

class NetworkListHeader extends React.Component {
    IconZPos = new Animated.Value(0)
    constructor(props){
        super(props)
        this.state = {
        }
    }
    handlepress = () => {
    //    let newValue = this.IconZPos._value === 90 ? 0: 90 
        this.props.change([this.props.index])
        Animated.timing(
            this.IconZPos,
            {
              toValue: 90,
              duration: 1000,
              easing: Easing.bounce    
            }).start()
    }

    render() {
        const section = this.props.section
        return (
            <TouchableHighlight underlayColor='#dee0e2' onPress={this.handlepress} style={{marginHorizontal: screen_Width * 0.2}}>
                <View style={styles.header}>
                    <Animated.View style= {{transform: [{rotateZ: `${this.IconZPos._value}deg`}] }} >
                        <Icon name='angle-right' type='font-awesome' size= {45} color='black' iconStyle={{marginLeft: 15,
                        }}></Icon>
                    </Animated.View>
                    <Text style={styles.headerText}>{section.name}</Text>
                </View>
            </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
    header : {
        flexDirection: 'row',
        marginBottom: 10,
    },
        headerText: {
        flex: 1,
        fontSize: 40,
        color: 'black',
        textAlign: 'center',
    },

})
export default NetworkListHeader;
