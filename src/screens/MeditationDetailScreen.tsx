// Detail screen. Data comes entirely from navigation params passed by
// HomeScreen — no fetch or storage read needed for this stage.
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, spacing, fontSizes } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'MeditationDetail'>;

export default function MeditationDetailScreen({ route, navigation }: Props) {
  const { meditation } = route.params;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Image source={{ uri: meditation.imageUri }} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.title}>{meditation.title}</Text>

        <View style={styles.metaRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{meditation.type}</Text>
          </View>
          <Text style={styles.duration}>{meditation.duration}</Text>
        </View>

        <Text style={styles.description}>{meditation.description}</Text>

        <TouchableOpacity style={styles.playButton} onPress={() => {}}>
          <Ionicons name="play" size={18} color="#fff" />
          <Text style={styles.playText}>Begin Session</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color={colors.text} />
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.xl },
  image: { width: '100%', height: 220, backgroundColor: colors.border },
  body: { padding: spacing.lg },
  title: { color: colors.text, fontSize: fontSizes.xl, fontWeight: '700', marginBottom: spacing.sm },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  tag: { backgroundColor: colors.surface, borderRadius: 20, paddingHorizontal: spacing.md, paddingVertical: 4, marginRight: spacing.md },
  tagText: { color: colors.secondary, fontSize: fontSizes.sm, fontWeight: '600' },
  duration: { color: colors.textMuted, fontSize: fontSizes.sm },
  description: { color: colors.textMuted, fontSize: fontSizes.md, lineHeight: 22, marginBottom: spacing.lg },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm + 4,
  },
  playText: { color: '#fff', fontSize: fontSizes.md, fontWeight: '600', marginLeft: spacing.sm },
  backButton: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xl, alignSelf: 'flex-start' },
  backText: { color: colors.text, fontSize: fontSizes.md, marginLeft: spacing.sm },
});