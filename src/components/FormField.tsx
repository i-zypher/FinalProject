import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { globalStyles } from '../styles/theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, style, ...inputProps }: Props) {
  return (
    <View>
      <Text style={globalStyles.fieldLabel}>{label}</Text>
      <TextInput
        style={[globalStyles.input, style]}
        placeholderTextColor="#9B96AC"
        {...inputProps}
      />
      {error ? <Text style={globalStyles.errorText}>{error}</Text> : null}
    </View>
  );
}