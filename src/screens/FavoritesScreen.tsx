import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/types';
import { globalStyles, colors } from '../styles/theme';
import TopBar from '../components/TopBar';

type Props = DrawerScreenProps<DrawerParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Favorites" onMenuPress={() => navigation.toggleDrawer()} />
      <ScrollView contentContainerStyle={globalStyles.screenPadding}>
        <Text style={globalStyles.subHeaderText}>Saved meditations will show up here.</Text>
      </ScrollView>
    </View>
  );
}