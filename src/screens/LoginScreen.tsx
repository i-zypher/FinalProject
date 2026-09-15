import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/theme';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import { useUser } from '../context/UserContext';
import { verifyCredentials } from '../data/accounts';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = {
  email?: string;
  password?: string;
};

export default function LoginScreen({ navigation }: Props) {
    const { setName, setEmail: setUserEmail } = useUser();
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

 const handleLogin = async () => {
    if (!validate()) return;

    // Actually gates access now — rejects login if no account exists
    // for this email, or if the password doesn't match what was set
    // at Signup.
    const savedName = await verifyCredentials(email, password);
    if (!savedName) {
      setErrors({ password: 'Incorrect email or password.' });
      return;
    }

    setName(savedName);
    setUserEmail(email.trim());
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