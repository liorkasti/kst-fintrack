import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';

import WelcomeScreen from '../screens/WelcomeScreen';
import AppNavigation from './AppNavigation';
import {RootStateType} from '../constants/types';

const RootStack = createNativeStackNavigator();

const RootStackScreen: FC = () => {
  const fullName = useSelector((state: RootStateType) => state.user.fullName);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!fullName ? (
          <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        ) : (
          <RootStack.Screen
            name="AppNavigation"
            component={AppNavigation}
            options={{
              headerShown: true,
              title: fullName,
              headerTitleAlign: 'center',
              headerBackVisible: false,
            }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
