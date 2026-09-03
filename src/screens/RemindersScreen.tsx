import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/theme';

export default function RemindersScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Reminders</Text>
      <Text style={globalStyles.subHeaderText}>Your scheduled reminders will show up here.</Text>
    </View>
  );
}