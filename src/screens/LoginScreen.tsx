import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/theme';
import Logo from '../components/Logo';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }

    if (!password) {
      next.password = 'Password is required.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    // No backend yet, so this isn't real authentication — it just derives
    // a display name from whatever was typed in the email field so the
    // Home screen greeting isn't hardcoded. Replace with a real auth call
    // (and the name it returns) once there's a backend to hit.
    const namePart = email.trim().split('@')[0];
    const displayName = namePart ? namePart : 'there';
    navigation.navigate('Home', { name: displayName });
  };

  return (
    <View style={globalStyles.container}>
      <Logo />
      <Text style={globalStyles.headerText}>Welcome Back</Text>
      <Text style={globalStyles.subHeaderText}>Log in to continue</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        placeholderTextColor="#7A7A96"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={globalStyles.errorText}>{errors.email}</Text>}

      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        placeholderTextColor="#7A7A96"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={globalStyles.errorText}>{errors.password}</Text>}

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={globalStyles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}