import React from 'react';
import {Text} from 'react-native'
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Main from '../screens/Main'
import Device from '../screens/Device'
import DeviceSettings from '../screens/DeviceSettings'
import { Icon } from 'react-native-elements'

const HomeStack = createStackNavigator({
    Main: {
        screen: Main,
        navigationOptions: () => ({
            title: 'Device List',
            headerLeft: (
                <Icon name='access-point-network' type='material-community' size= {45} color='black'></Icon>
            ),
            headerLeftContainerStyle: {
                marginTop: -5,
                marginLeft: 5
            },
            headerTitleStyle: {
                fontSize: 35,
                fontFamily: 'AmericanTypewriter-Light',
                color: '#ff0000',
                fontWeight: 'normal',
            },
            headerStyle: {
                backgroundColor: '#dee0e2',
            },

        })
    },
    DeviceSettings: {
        screen: DeviceSettings
    }
})

const Tabs = createBottomTabNavigator({
    Main: {
        screen: HomeStack,
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