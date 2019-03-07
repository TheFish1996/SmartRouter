import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Main from '../screens/Main'
import Device from '../screens/Device'
import { Icon } from 'react-native-elements'

const Tabs = createBottomTabNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            tabBarLabel: 'Main',
            tabBarIcon: ({tintColor}) => 
            <Icon name="home" size={33} color={tintColor} />
        }
    },
    Device: {
        screen: Device,
        navigationOptions: {
            tabBarLabel: 'Device',
            tabBarIcon: ({tintColor}) =>
             <Icon name="devices" size={33} color = {tintColor}/>
        }
    }

}, {

    tabBarOptions: {
        activeTintColor: '#ff0000', // active icon color
        labelStyle: {
            fontSize: 15,
            paddingBottom: -1.3,
        },
        style: {
            marginBottom: 0,
            backgroundColor: '#ffffff'
        }
    }

});

const Root = createAppContainer(Tabs)
export default Root