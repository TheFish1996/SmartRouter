import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Main from '../screens/Main'
import Device from '../screens/Device'

const Tabs = createBottomTabNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            tabBarLabel: 'Main'
        }
    },
    Device: {
        screen: Device
    }
})

const Root = createAppContainer(Tabs)
export default Root