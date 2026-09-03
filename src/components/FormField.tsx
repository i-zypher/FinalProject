import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSizes, fonts, globalStyles } from '../styles/theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, style, ...inputProps }: Props) {
  return (
    <View>
      <Text style={globalStyles.fieldLabel}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputRowError : null]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#9B96AC"
          {...inputProps}
        />
        {error ? <Ionicons name="alert-circle" size={20} color={colors.error} /> : null}
      </View>
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    height: 52,
    paddingHorizontal: spacing.md + 4,
    gap: spacing.sm + 4,
  },
  inputRowError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.md,
    color: colors.text,
    padding: 0,
  },
});