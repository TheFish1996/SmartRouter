import React from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import {Icon} from 'react-native-elements'

class NetworkListHeader extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            IconZPos: "90deg"
        }
    }

    render() {
        const section = this.props.section
        return (
            <View style={styles.header}>
                <Icon name='angle-right' type='font-awesome' size= {45} color='black' iconStyle={{marginLeft: 15,
                transform: [{rotateZ: this.state.IconZPos}]
                }}></Icon>
                <Text style={styles.headerText}>{section.Name}</Text>
            </View>
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
        textAlign: 'center'
    },

})
export default NetworkListHeader;
