import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fonts } from '../styles/theme';
import type { Meditation } from '../data/meditations';
import { useFavorites } from '../context/FavoritesContext';

type Props = {
  meditation: Meditation;
  onPress: () => void;
};

export default function QuickStartCard({ meditation, onPress }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(meditation.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View>
        <Image source={{ uri: meditation.imageUri }} style={styles.image} />
        {/* Not in Figma's Home card design — added so favoriting works
            from Home too, per your request, not just from Detail. */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(meditation.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={16}
            color={favorited ? colors.primary : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {meditation.title}
      </Text>
      <View style={styles.metaRow}>
        <Text style={styles.category}>{meditation.category}</Text>
        <Text style={styles.dot}>{'\u2022'}</Text>
        <Text style={styles.duration}>{meditation.duration}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.sm + 4,
    width: 180,
    marginRight: spacing.md,
    gap: spacing.sm,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  heartBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  category: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  dot: {
    fontSize: 12,
    color: '#A39EB6',
  },
  duration: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
});