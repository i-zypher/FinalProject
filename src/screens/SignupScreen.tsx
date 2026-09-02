import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/theme';
import Logo from '../components/Logo';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!name.trim()) {
      next.name = 'Full name is required.';
    }

    if (!email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }

    if (!password) {
      next.password = 'Password is required.';
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;

    // No backend yet, so there's no real account to persist — send the
    // user to Login to complete the sign-in step, matching a real signup
    // flow (create account, then log in) rather than skipping straight
    // into the app.
    navigation.navigate('Login');
  };

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
      {errors.name && <Text style={globalStyles.errorText}>{errors.name}</Text>}

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

      <TextInput
        style={globalStyles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#7A7A96"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={globalStyles.errorText}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity style={globalStyles.button} onPress={handleSignup}>
        <Text style={globalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={globalStyles.linkText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}