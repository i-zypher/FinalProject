import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Switch, StyleSheet } from 'react-native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/types';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import TopBar from '../components/TopBar';
import { useUser } from '../context/UserContext';

type Props = DrawerScreenProps<DrawerParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const { name, setName } = useUser();
  const [darkModePreview, setDarkModePreview] = useState(true);

  const handleLogout = () => {
    setName('');
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const displayName = name ? name : 'Guest';
  const displayEmail = name ? name.toLowerCase() + '@aura.app' : 'guest@aura.app';

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="" onMenuPress={() => navigation.toggleDrawer()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Sanctuary Settings</Text>

        <View style={styles.profileCard}>
          <Image source={{ uri: 'https://i.pravatar.cc/112' }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.email}>{displayEmail}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>PRO</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.themeCard}>
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>Dark Mode</Text>
              <Text style={styles.toggleDesc}>Easier on the eyes for night sessions.</Text>
            </View>
            <Switch
              value={darkModePreview}
              onValueChange={setDarkModePreview}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.previewRow}>
            <Text style={styles.previewLabel}>Preview Mode State</Text>
            <Text style={styles.previewValue}>
              {darkModePreview ? 'Active (Dark Theme)' : 'Active (Light Theme)'}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account Safety</Text>
        <View style={styles.logoutCard}>
          <Text style={styles.logoutNote}>
            Note: Logging out will temporarily clear offline audio downloads and temporary mindfulness streaks from this local device.
          </Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  pageTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.text,
  },
  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  name: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  email: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    color: '#065F46',
  },
  sectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  themeCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.text,
  },
  toggleDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  previewValue: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
  },
  logoutCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  logoutNote: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  logoutButton: {
    backgroundColor: '#EEF2FF',
    borderRadius: 999,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.md,
    color: colors.primary,
  },
});