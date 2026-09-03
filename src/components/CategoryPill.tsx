import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export default function CategoryPill({ label, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
      onPress={onPress}
    >
      <Text style={active ? styles.labelActive : styles.labelInactive}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.md + 4,
    paddingVertical: spacing.sm + 2,
    borderRadius: 999,
    marginRight: spacing.sm,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  pillInactive: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  labelActive: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: '#FFFFFF',
  },
  labelInactive: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
});