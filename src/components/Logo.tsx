import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export default function Logo() {
  return (
    <LinearGradient
      colors={[colors.logoGradientStart, colors.logoGradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.circle}
    >
      <Ionicons name="flower" size={32} color="#FFFFFF" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});