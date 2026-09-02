// A single content card: thumbnail, title, type tag, duration,
// a checkbox to mark done/not-done for today, and an edit icon.
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSizes } from '../styles/theme';
import type { Meditation } from '../data/meditations';

type Props = {
  meditation: Meditation;
  onPress: () => void;
  onToggleDone: () => void;
  onEdit: () => void;
};

export default function MeditationCard({ meditation, onPress, onToggleDone, onEdit }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: meditation.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{meditation.title}</Text>
        <Text style={styles.subtitle}>{meditation.type}</Text>
        <Text style={styles.duration}>{meditation.duration}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onToggleDone} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons
            name={meditation.done ? 'checkbox' : 'square-outline'}
            size={22}
            color={meditation.done ? colors.primary : colors.textMuted}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} style={{ marginTop: spacing.sm }}>
          <Ionicons name="create-outline" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    marginRight: spacing.md,
    width: 220,
    alignItems: 'center',
  },
  image: { width: 56, height: 56, borderRadius: 8, marginRight: spacing.sm, backgroundColor: colors.border },
  info: { flex: 1 },
  title: { color: colors.text, fontSize: fontSizes.md, fontWeight: '600' },
  subtitle: { color: colors.secondary, fontSize: fontSizes.sm, marginTop: 2 },
  duration: { color: colors.textMuted, fontSize: fontSizes.sm, marginTop: 2 },
  actions: { alignItems: 'center', marginLeft: spacing.xs },
});