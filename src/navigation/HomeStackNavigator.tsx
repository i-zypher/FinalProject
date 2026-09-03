import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MeditationDetailScreen from '../screens/MeditationDetailScreen';
import { HomeStackParamList } from './types';
import { colors } from '../styles/theme';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="MeditationDetail"
        component={MeditationDetailScreen}
        options={({ route }) => ({ title: route.params.meditation.title })}
      />
    </Stack.Navigator>
  );
}