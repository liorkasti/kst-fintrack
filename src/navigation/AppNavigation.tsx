import React, {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-gesture-handler';

import {plusIcon} from '../assets';
import BottomModal from '../components/BottomModal';
import ExpenseEditor from '../components/ExpenseEditor';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {COLORS} from '../constants/theme';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

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
          tabBarIcon: ({focused}) => (
            <View>
              <TouchableOpacity onPress={handleOpenModal}>
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

              <BottomModal
                title={'Create Expense'}
                visible={isModalOpen}
                onClose={() => setIsModalOpen(!isModalOpen)}>
                <ExpenseEditor />
              </BottomModal>
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
