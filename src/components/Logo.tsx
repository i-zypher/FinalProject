import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

// Placeholder logo built from plain Views — no image file needed.
// Swap for <Image source={require('../../assets/images/logo.png')} />
// once you've uploaded your real Figma-exported logo.
export default function Logo() {
  return (
    <View style={styles.outer}>
      <View style={styles.inner} />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    alignSelf: 'center',
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.secondary,
  },
});