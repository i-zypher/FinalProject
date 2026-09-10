import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import { fetchAstronomyPicture, AstronomyPicture } from '../data/nasa';

export default function CosmicMomentCard() {
  const [picture, setPicture] = useState<AstronomyPicture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAstronomyPicture()
      .then((data) => setPicture(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (error || !picture) {
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>Couldn't load today's cosmic moment.</Text>
      </View>
    );
  }

  const isImage = picture.url.match(/\.(jpg|jpeg|png|gif)$/i);

  return (
    <View style={styles.card}>
      {isImage ? <Image source={{ uri: picture.url }} style={styles.image} /> : null}
      <Text style={styles.title}>{picture.title}</Text>
      <Text style={styles.explanation} numberOfLines={3}>
        {picture.explanation}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    gap: spacing.sm,
    minHeight: 80,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.text,
  },
  explanation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  errorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
});