import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { globalStyles } from '../styles/theme';
import Logo from '../components/Logo';
import FormField from '../components/FormField';
import { saveAccount } from '../data/accounts';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
};

export default function SignupScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};

    if (!fullName.trim()) {
      next.fullName = 'Full name is required.';
    }

    if (!username.trim()) {
      next.username = 'Username is required.';
    }

    if (!email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }

    if (!password || password.length < 8) {
      next.password = 'Password must be at least 8 characters';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSignup = () => {
    if (!validate()) return;

    // No real backend — save the name against this email in the
    // runtime-only accounts store so Login can look it up afterward.
    saveAccount(email, fullName.trim());
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.scrollContent}>
      <View style={globalStyles.brandHeader}>
        <Logo />
        <Text style={globalStyles.headerText}>Begin Your Journey</Text>
        <Text style={globalStyles.subHeaderText}>Cultivate peace in just 5 minutes a day</Text>
      </View>

      <View style={{ gap: 20 }}>
        <FormField
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />
        <FormField
          label="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          error={errors.username}
        />
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
        <TouchableOpacity style={globalStyles.button} onPress={handleSignup}>
          <Text style={globalStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={globalStyles.linkRow}>
          <Text style={globalStyles.linkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={globalStyles.linkTextBold}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}