// Top navigation bar: hamburger icon (left), screen title (center),
// settings icon (right). Reused across screens that need this pattern.
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSizes } from '../styles/theme';

type Props = {
  title: string;
  onMenuPress?: () => void;
  onSettingsPress?: () => void;
};

export default function TopBar({ title, onMenuPress, onSettingsPress }: Props) {
  return (
    <View style={styles.bar}>
      <TouchableOpacity onPress={onMenuPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="menu" size={26} color={colors.text} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onSettingsPress} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        <Ionicons name="settings-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: { color: colors.text, fontSize: fontSizes.lg, fontWeight: '700' },
});