import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { DrawerActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../navigation/types';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import CategoryPill from '../components/CategoryPill';
import QuickStartCard from '../components/QuickStartCard';
import Logo from '../components/Logo'; 
import CosmicMomentCard from '../components/CosmicMomentCard';
import { dailyFeatured, popularMeditations, categories } from '../data/meditations';
import { useUser } from '../context/UserContext';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ navigation }: Props) {
  const { name } = useUser();
  // Visual-only selection, matching Figma's "Browse by Need" pills —
  // doesn't currently filter the Popular Quick Starts list below.
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[colors.logoGradientStart, colors.logoGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroRow}>
            <TouchableOpacity
              onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="menu" size={26} color="#FFFFFF" />
            </TouchableOpacity>

            <Logo size={32}/>

            <View style={styles.greetingBlock}>
              <Text style={styles.greetingTitle}>
                {getGreeting()}
                {name ? `, ${name}` : ''}
              </Text>
              <Text style={styles.greetingSubtitle}>Ready to exhale the morning stress?</Text>
            </View>

            <Image source={{ uri: 'https://i.pravatar.cc/88' }} style={styles.avatar} />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Daily Breath</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MeditationDetail', { meditation: dailyFeatured })}
            >
              <ImageBackground
                source={{ uri: dailyFeatured.imageUri }}
                style={styles.featuredCard}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.featuredOverlay} />
                <View style={styles.featuredBadgeRow}>
                  <View style={styles.badgeLight}>
                    <Text style={styles.badgeLightText}>{dailyFeatured.category}</Text>
                  </View>
                  <View style={styles.badgeGreen}>
                    <Text style={styles.badgeGreenText}>{dailyFeatured.duration}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.featuredTitle}>{dailyFeatured.title}</Text>
                  <Text style={styles.featuredDesc}>{dailyFeatured.description}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse by Need</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((cat) => (
                <CategoryPill
                  key={cat}
                  label={cat}
                  active={cat === selectedCategory}
                  onPress={() => setSelectedCategory(cat)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Quick Starts</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularMeditations.map((meditation) => (
                <QuickStartCard
                  key={meditation.id}
                  meditation={meditation}
                  onPress={() => navigation.navigate('MeditationDetail', { meditation })}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cosmic Calm</Text>
            <CosmicMomentCard />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { paddingBottom: spacing.xl },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  greetingBlock: { flex: 1, gap: 4 },
  greetingTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: '#FFFFFF',
  },
  greetingSubtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.sm,
    color: '#E2E8F0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.xl - 4,
  },
  section: { gap: spacing.sm + 4 },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.text,
  },
  featuredCard: {
    height: 220,
    borderRadius: 24,
    padding: spacing.lg,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 24,
  },
  featuredBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeLight: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 4,
  },
  badgeLightText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: '#FFFFFF',
  },
  badgeGreen: {
    backgroundColor: '#D1FAE5',
    borderRadius: 999,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: 4,
  },
  badgeGreenText: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    color: '#065F46',
  },
  featuredTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  featuredDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.sm,
    color: '#F1F5F9',
  },
});