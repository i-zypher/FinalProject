import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import MeditationDetailScreen from '../screens/MeditationDetailScreen';
import { RootStackParamList } from './types';
import { colors } from '../styles/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="MeditationDetail"
        component={MeditationDetailScreen}
        options={({ route }) => ({ title: route.params.meditation.title })}
      />
    </Stack.Navigator>
  );
}