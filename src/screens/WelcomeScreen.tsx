import React, {FC, useEffect, useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../components/Button';
import useLogin from '../hooks/useLogin';
import {RootStackParamListType, StoreUserPayload} from '../constants/types';
import {COLORS} from '../constants/theme';
import useInputValidation from '../hooks/useInputValidation';
import {saveUser, storeUser} from '../redux/slices/user-slice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<
    RootStackParamListType,
    'WelcomeScreen'
  >;
}

const WelcomeScreen: FC<WelcomeScreenProps> = ({navigation}) => {
  const {name, setName, validateInputs} = useInputValidation();
  const [id, setId] = useState<string>('');

  const dispatch = useDispatch();

  const handleLoginPress = async () => {
    if (validateInputs()) {
      try {
        const userId = Math.random().toString(36).substr(2, 5);
        setId(userId);
        const user = {userName: name, id};
        dispatch(storeUser(user));

        setName('');
        setId('');
        navigation.navigate('AppNavigation');
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to save user data');
      }
    } else {
      Alert.alert('Please enter a valid name between 2 to 20 characters');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter name"
        placeholderTextColor={COLORS.placeholder}
        value={name}
        onChangeText={setName}
      />
      <Button onButtonPress={handleLoginPress} text="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bkg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    backgroundColor: COLORS.inputBkg,
    borderWidth: 1,
    borderColor: COLORS.thirdary,
    color: COLORS.thirdary,
    borderRadius: 3,
    paddingTop: 28,
    paddingBottom: 9,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'left',
    fontSize: 16,
  },
});

export default WelcomeScreen;
