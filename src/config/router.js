import React from 'react';
import {Text} from 'react-native'
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Main from '../screens/Main'
import RouterSettings from '../screens/RouterSettings '
import DeviceSettings from '../screens/DeviceSettings'
import LiveView from '../screens/LiveView'
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

const RouterStack = createStackNavigator({
    RouterSettings: {
        screen: RouterSettings,
        navigationOptions: () => ({
            title: 'Router Settings',
            headerLeft: (
                <Icon name='access-point-network' type='material-community' size= {45} color='black'></Icon>
            ),
            headerLeftContainerStyle: {
                marginTop: -5,
                marginLeft: 5
            },
            headerTitleStyle: {
                fontSize: 33,
                fontFamily: 'AmericanTypewriter-Light',
                color: '#ff0000',
                fontWeight: 'normal',
                marginRight: 10
            },
            headerStyle: {
                backgroundColor: '#dee0e2',
            },
        })
    }
})

const LiveStack = createStackNavigator({
    RouterSettings: {
        screen: LiveView,
        navigationOptions: () => ({
            title: 'Live Update',
            headerLeft: (
                <Icon name='access-point-network' type='material-community' size= {45} color='black'></Icon>
            ),
            headerLeftContainerStyle: {
                marginTop: -5,
                marginLeft: 5
            },
            headerTitleStyle: {
                fontSize: 33,
                fontFamily: 'AmericanTypewriter-Light',
                color: '#ff0000',
                fontWeight: 'normal',
                marginRight: 10
            },
            headerStyle: {
                backgroundColor: '#dee0e2',
            },
        })
    }
})

const Tabs = createBottomTabNavigator({
    Main: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: 'Main',
            tabBarIcon: ({tintColor}) => 
            <Icon name="home" size={34} color={tintColor} />
        }
    },
    Live: {
        screen: LiveStack,
        navigationOptions: {
            tabBarLabel: 'Live',
            tabBarIcon: ({tintColor}) =>
             <Icon name="flash" type="material-community" size={34} color = {tintColor}/>
        }
    },
    RouterSettings: {
        screen: RouterStack,
        navigationOptions: {
            tabBarLabel: 'Router',
            tabBarIcon: ({tintColor}) =>
             <Icon name="router-wireless-settings" type="material-community" size={34} color = {tintColor}/>
        }
    },
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