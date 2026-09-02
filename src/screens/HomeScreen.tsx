import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, spacing, fontSizes, globalStyles } from '../styles/theme';
import TopBar from '../components/TopBar';
import MeditationCard from '../components/MeditationCard';
import { meditations as initialMeditations } from '../data/meditations';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: Props) {
  const { name } = route.params;

  const [meditations, setMeditations] = useState(initialMeditations);

  const popular = meditations.filter((m) => m.section === 'popular');
  const daily = meditations.filter((m) => m.section === 'daily');

  const toggleDone = (id: string) => {
    setMeditations((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  };

  return (
    <View style={styles.screen}>
      <TopBar title="Find your perfect meditation" onMenuPress={() => {}} onSettingsPress={() => {}} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcome}>
          <Text style={globalStyles.headerText}>Hello, {name}!</Text>
          <Text style={globalStyles.subHeaderText}>
            Discover a session tailored to how you're feeling today.
          </Text>
        </View>

        <Text style={styles.sectionHeader}>Popular Meditations</Text>
        {popular.length === 0 ? (
          <Text style={styles.emptyText}>Nothing here yet.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
            {popular.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                onPress={() => navigation.navigate('MeditationDetail', { meditation })}
                onToggleDone={() => toggleDone(meditation.id)}
                onEdit={() => {}}
              />
            ))}
          </ScrollView>
        )}

        <Text style={styles.sectionHeader}>Daily Meditation</Text>
        {daily.length === 0 ? (
          <Text style={styles.emptyText}>Nothing scheduled yet.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
            {daily.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                onPress={() => navigation.navigate('MeditationDetail', { meditation })}
                onToggleDone={() => toggleDone(meditation.id)}
                onEdit={() => {}}
              />
            ))}
          </ScrollView>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: 100 },
  welcome: { paddingHorizontal: spacing.lg, marginTop: spacing.sm, marginBottom: spacing.lg },
  sectionHeader: {
    color: colors.text,
    fontSize: fontSizes.lg,
    fontWeight: '700',
    marginLeft: spacing.lg,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  row: { paddingLeft: spacing.lg, marginBottom: spacing.sm },
  emptyText: { color: colors.textMuted, fontSize: fontSizes.sm, marginLeft: spacing.lg, marginBottom: spacing.md },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
});