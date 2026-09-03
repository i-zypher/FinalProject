import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/theme';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import { useUser } from '../context/UserContext';
import { findAccountName } from '../data/accounts';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginScreen({ navigation }: Props) {
  const { setName } = useUser();
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

    // Prefer the name saved at Signup for this email, if there is one.
    // Falls back to guessing from the email prefix for anyone logging
    // in without having signed up in this session (no real backend).
    const savedName = findAccountName(email);
    const fallbackName = email.trim().split('@')[0];
    setName(savedName ?? (fallbackName || 'there'));
    navigation.navigate('Main');
  };

  return (
    <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.scrollContent}>
      <View style={globalStyles.brandHeader}>
        <Logo />
        <Text style={globalStyles.headerText}>Welcome Back</Text>
        <Text style={globalStyles.subHeaderText}>Take a breath and sign in to continue</Text>
      </View>

      <View style={{ gap: 20 }}>
        <FormField
          label="Email address"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
        />
        <FormField
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={errors.password}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={globalStyles.linkRow}>
          <Text style={globalStyles.linkText}>New to Aura?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={globalStyles.linkTextBold}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}