import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/types';
import { globalStyles, colors } from '../styles/theme';
import TopBar from '../components/TopBar';

type Props = DrawerScreenProps<DrawerParamList, 'Reminders'>;

export default function RemindersScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="Reminders" onMenuPress={() => navigation.toggleDrawer()} />
      <ScrollView contentContainerStyle={globalStyles.screenPadding}>
        <Text style={globalStyles.subHeaderText}>Your scheduled reminders will show up here.</Text>
      </ScrollView>
    </View>
  );
}