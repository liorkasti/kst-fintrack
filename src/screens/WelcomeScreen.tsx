import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, Key, useEffect, useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import Button from '../components/Button';
import {COLORS} from '../constants/theme';

interface WelcomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}
const WelcomeScreen: FC<WelcomeScreenProps> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<Key>('');

  useEffect(() => {
    if (id !== '') {
      navigation.navigate('AppNavigation');
    }
  }, [id, navigation]);

  const handleLoginPress = async () => {
    if (name.length > 2) {
      try {
        const userId = Math.random().toString(36).substr(2, 5);
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
        placeholderTextColor={COLORS.placeholder}
        value={name}
        onChangeText={setName}
      />
      <Button onButtonPress={handleLoginPress} text="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  //TODO: add custom styles in theme.tsx
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
