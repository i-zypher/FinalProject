import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/theme';

export default function AboutScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>About</Text>
      <Text style={globalStyles.subHeaderText}>A meditation app built for the final project.</Text>
    </View>
  );
}