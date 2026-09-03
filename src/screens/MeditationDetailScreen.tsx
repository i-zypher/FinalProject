import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import { useFavorites } from '../context/FavoritesContext';

type Props = NativeStackScreenProps<HomeStackParamList, 'MeditationDetail'>;

export default function MeditationDetailScreen({ route, navigation }: Props) {
  const { meditation } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(meditation.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Image source={{ uri: meditation.imageUri }} style={StyleSheet.absoluteFillObject} />
        <View style={styles.heroOverlay} />
        <View style={styles.heroRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: spacing.sm + 4 }}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => toggleFavorite(meditation.id)}>
              <Ionicons name={favorited ? 'heart' : 'heart-outline'} size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn} onPress={() => {}}>
              <Ionicons name="share-social-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.badgeRow}>
          <View style={styles.catPill}>
            <Text style={styles.catPillText}>{meditation.category.toUpperCase()}</Text>
          </View>
          <View style={styles.timePill}>
            <Text style={styles.timePillText}>{meditation.duration.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.title}>{meditation.title}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this Session</Text>
          <Text style={styles.bodyText}>{meditation.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technique &amp; Instructions</Text>
          {meditation.steps.map((step, index) => (
            <View key={step.title} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <Text style={styles.stepNumText}>{index + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* No audio playback exists yet — this is a visual button only. */}
        <TouchableOpacity style={styles.startButton} onPress={() => {}}>
          <Text style={styles.startButtonText}>Start Session</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xl },
  hero: { height: 260, justifyContent: 'space-between', padding: spacing.lg },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between' },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { padding: spacing.lg, gap: spacing.lg },
  badgeRow: { flexDirection: 'row', gap: spacing.sm },
  catPill: { backgroundColor: '#EEF2FF', borderRadius: 999, paddingHorizontal: spacing.sm + 4, paddingVertical: 4 },
  catPillText: { fontFamily: fonts.bodyBold, fontSize: 12, color: colors.primary },
  timePill: { backgroundColor: '#D1FAE5', borderRadius: 999, paddingHorizontal: spacing.sm + 4, paddingVertical: 4 },
  timePillText: { fontFamily: fonts.bodyBold, fontSize: 12, color: '#065F46' },
  title: { fontFamily: fonts.headingBold, fontSize: 28, color: colors.text },
  section: { gap: spacing.sm + 4 },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.text },
  bodyText: { fontFamily: fonts.bodyRegular, fontSize: fontSizes.sm, color: colors.textMuted, lineHeight: 21 },
  stepRow: { flexDirection: 'row', gap: spacing.md },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.primary },
  stepTitle: { fontFamily: fonts.bodyBold, fontSize: fontSizes.sm, color: colors.text },
  stepDesc: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, marginTop: 2 },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: { fontFamily: fonts.bodyBold, fontSize: fontSizes.md, color: '#FFFFFF' },
});