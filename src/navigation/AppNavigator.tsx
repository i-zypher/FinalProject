import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DrawerNavigator from './DrawerNavigator';
import { RootStackParamList } from './types';
import { colors } from '../styles/theme';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '600' },
        cardStyle: { flex: 1 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Log In' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}