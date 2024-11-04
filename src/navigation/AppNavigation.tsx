import React, {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import 'react-native-gesture-handler';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {height: 87},
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <Text>Home</Text>,
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => <Text>Profile</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
