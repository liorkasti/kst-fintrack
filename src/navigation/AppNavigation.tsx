import React, {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import 'react-native-gesture-handler';

import ExpenseEditor from '../components/ExpenseEditor';
import {TabBarIcon} from '../components/TabBarIcon';
import {HOME, PROFILE} from '../constants';
import {COLORS} from '../constants/theme';
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
        name={HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            //TODO: React.FC
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              {HOME}
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={'ExpenseEditor'}
        component={ExpenseEditor}
        options={{
          headerShown: false,
          tabBarIcon: () => <TabBarIcon />,
        }}
      />

      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              {PROFILE}
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
