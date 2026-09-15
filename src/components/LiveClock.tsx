import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors, fontSizes, fonts } from '../styles/theme';

export default function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return <Text style={styles.clock}>{now.toLocaleTimeString()}</Text>;
}

const styles = StyleSheet.create({
  clock: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
});