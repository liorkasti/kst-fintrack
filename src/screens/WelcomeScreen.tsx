import React, {FC, useEffect, useState} from 'react';
import {Button, StyleSheet, TextInput, Alert, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import inputsValidation from '../utils/inputsValidation';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}
const WelcomeScreen: FC<WelcomeScreenProps> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (id !== '') {
      navigation.navigate('AppNavigation');
    }
  }, [id, navigation]);

  const handleLoginPress = async () => {
    if (name.length > 2) {
      try {
        const userId = Math.random().toString(36).substr(2, 5);
        await AsyncStorage.setItem('user', JSON.stringify({id: userId, name}));
        setId(userId);
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
        placeholderTextColor={'gray'}
        value={name}
        onChangeText={setName}
      />
      <Button onPress={handleLoginPress} title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  //TODO: add custom styles in theme.tsx
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    color: 'navy',
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
