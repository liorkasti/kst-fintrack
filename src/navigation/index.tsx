import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {RootStateType} from '../constants/types';

import WelcomeScreen from '../screens/WelcomeScreen';
import AppNavigation from './AppNavigation';

const RootStack = createNativeStackNavigator();

const RootStackScreen: FC = () => {
  const {fullName} = useSelector((state: RootStateType) => state.user);

  const getAppNavigationOptions = (): NativeStackNavigationOptions => {
    if (fullName) {
      return {
        headerShown: true,
        title: fullName,
        headerTitleAlign: 'center',
        headerBackVisible: false,
      };
    } else {
      return {
        title: undefined,
        headerShown: false,
        headerBackVisible: false,
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
