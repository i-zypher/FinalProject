import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/theme';
import Logo from '../components/Logo';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={globalStyles.container}>
      <Logo />
      <Text style={globalStyles.headerText}>Create Account</Text>
      <Text style={globalStyles.subHeaderText}>Sign up to get started</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Full Name"
        placeholderTextColor="#7A7A96"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        placeholderTextColor="#7A7A96"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        placeholderTextColor="#7A7A96"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#7A7A96"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={globalStyles.button} onPress={() => {}}>
        <Text style={globalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}