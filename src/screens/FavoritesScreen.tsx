import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/types';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import TopBar from '../components/TopBar';
import { allMeditations } from '../data/meditations';
import { useFavorites } from '../context/FavoritesContext';

type Props = DrawerScreenProps<DrawerParamList, 'Favorites'>;

export default function FavoritesScreen({ navigation }: Props) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favorites = allMeditations.filter((m) => favoriteIds.includes(m.id));

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="" onMenuPress={() => navigation.toggleDrawer()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ gap: 4 }}>
          <Text style={styles.pageTitle}>My Sanctuary</Text>
          <Text style={styles.pageSubtitle}>Your personal collection of rapid peace sessions.</Text>
        </View>

        {favorites.length === 0 ? (
          <Text style={styles.emptyText}>
            Nothing favorited yet — tap the heart on any session to save it here.
          </Text>
        ) : (
          <View style={{ gap: spacing.md }}>
            {favorites.map((meditation) => (
              <View key={meditation.id} style={styles.row}>
                <Image source={{ uri: meditation.imageUri }} style={styles.thumbnail} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.title} numberOfLines={1}>
                    {meditation.title}
                  </Text>
                  <View style={styles.metaRow}>
                    <Text style={styles.category}>{meditation.category}</Text>
                    <Text style={styles.dot}>{'\u2022'}</Text>
                    <Text style={styles.duration}>{meditation.duration}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.heartBtn} onPress={() => toggleFavorite(meditation.id)}>
                  <Ionicons name="heart" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: spacing.lg, gap: spacing.lg },
  pageTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.text },
  pageSubtitle: { fontFamily: fonts.bodyRegular, fontSize: fontSizes.sm, color: colors.textMuted },
  emptyText: { fontFamily: fonts.bodyRegular, fontSize: fontSizes.sm, color: colors.textMuted },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.sm + 4,
    gap: spacing.sm + 4,
  },
  thumbnail: { width: 64, height: 64, borderRadius: 12 },
  title: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  category: { fontFamily: fonts.bodySemiBold, fontSize: 12, color: colors.primary },
  dot: { fontSize: 12, color: '#A39EB6' },
  duration: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  heartBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});