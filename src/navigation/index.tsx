import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {FC} from 'react';

import WelcomeScreen from '../screens/WelcomeScreen';
import AppNavigation from './AppNavigation';

const RootStack = createNativeStackNavigator();
const username = 'Lior';

const RootStackScreen: FC = () => {
  const getAppNavigationOptions = (): NativeStackNavigationOptions => {
    if (username) {
      return {
        headerShown: true,
        title: 'Lior',
        headerTitleAlign: 'center',
        headerBackVisible: false,
      };
    } else {
      return {
        headerShown: false,
        title: undefined,
        headerTitleAlign: undefined,
        headerBackVisible: undefined,
      };
    }
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <RootStack.Screen
          name="AppNavigation"
          component={AppNavigation}
          options={getAppNavigationOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
