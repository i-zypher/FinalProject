import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/theme';

export default function FavoritesScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.headerText}>Favorites</Text>
      <Text style={globalStyles.subHeaderText}>Saved meditations will show up here.</Text>
    </View>
  );
}