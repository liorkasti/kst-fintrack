import React, {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';

import {plusIcon} from '../assets';
import ExpenseEditor from '../components/ExpenseEditor';
import ExpenseModal from '../components/ExpenseModal';
import {COLORS} from '../constants/theme';
import {useModal} from '../contexts/ModalContext';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const {openModal} = useModal();

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
          tabBarIcon: ({focused}) => (
            //TODO: React.FC
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={'ExpenseEditor'}
        component={ExpenseEditor}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            //TODO: React.FC
            <View>
              <TouchableOpacity onPress={() => openModal('Create')}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: COLORS.primary,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: Platform.OS == 'android' ? 80 : 50,
                  }}>
                  <Image
                    source={plusIcon}
                    style={{
                      width: 32,
                      height: 32,
                      tintColor: 'white',
                    }}
                  />
                </View>
              </TouchableOpacity>

              <ExpenseModal>
                <ExpenseEditor />
              </ExpenseModal>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigation;
