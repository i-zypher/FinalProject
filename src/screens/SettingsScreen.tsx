import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Switch, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/types';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import TopBar from '../components/TopBar';
import FormField from '../components/FormField';
import { useUser } from '../context/UserContext';
import { saveAccount, deleteAccount, saveProfileExtra, loadProfileExtra, deleteProfileExtra, verifyCredentials } from '../data/accounts';


type Props = DrawerScreenProps<DrawerParamList, 'Settings'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hitSlopValue = { top: 8, bottom: 8, left: 8, right: 8 };

export default function SettingsScreen({ navigation }: Props) {
  const { name, setName, email, setEmail } = useUser();
  const [darkModePreview, setDarkModePreview] = useState(true);

    // Persisted for real (unlike the dark mode toggle above) — but does
  // NOT yet trigger actual OS-level push notifications. That needs
  // expo-notifications and permission handling, not wired up yet.
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('aura_notifications_enabled').then((value) => {
      if (value !== null) setNotificationsEnabled(value === 'true');
    });
  }, []);

   const handleToggleNotifications = (value: boolean) => {
    setNotificationsEnabled(value);
    AsyncStorage.setItem('aura_notifications_enabled', value ? 'true' : 'false');
  };

  // Saved for real, but nothing reads it yet — Start Session is still a
  // no-op, so there's nothing for a "default duration" to actually
  // apply to. This just gets the preference persisting honestly ahead
  // of that being built.
  const [preferredDuration, setPreferredDuration] = useState('10 min');

  useEffect(() => {
    AsyncStorage.getItem('aura_preferred_duration').then((value) => {
      if (value) setPreferredDuration(value);
    });
  }, []);

  const handleSelectDuration = (duration: string) => {
    setPreferredDuration(duration);
    AsyncStorage.setItem('aura_preferred_duration', duration);
  };

  const handleLogout = () => {
    setName('');
    setEmail('');
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const displayName = name ? name : 'Guest';
  const displayEmail = email ? email : 'guest@aura.app';

    const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);
  const [editUsername, setEditUsername] = useState('');
  const [editAge, setEditAge] = useState(25);
  const [editCountry, setEditCountry] = useState('United States');
  const [profileErrors, setProfileErrors] = useState<{ name?: string; email?: string }>({});

  // What's shown on the display (non-edit) card, so the profile card
  // itself proves the extra fields actually persisted.
  const [profileExtraDisplay, setProfileExtraDisplay] = useState<{
    username: string;
    age: number;
    country: string;
  } | null>(null);

  useEffect(() => {
    if (!email) {
      setProfileExtraDisplay(null);
      return;
    }
    loadProfileExtra(email).then((extra) => {
      setProfileExtraDisplay(extra ? extra : null);
    });
  }, [email, isEditingProfile]);

   const handleStartEditing = async () => {
    setEditName(name);
    setEditEmail(email);
    setProfileErrors({});

    const extra = await loadProfileExtra(email);
    setEditUsername(extra?.username ?? '');
    setEditAge(extra?.age ?? 25);
    setEditCountry(extra?.country ?? 'United States');

    setIsEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    const trimmedName = editName.trim();
    const trimmedEmail = editEmail.trim();
    const nextErrors: { name?: string; email?: string } = {};

    if (!trimmedName) {
      nextErrors.name = 'Name is required.';
    }
    if (!trimmedEmail) {
      nextErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    setProfileErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

        // If the email changed, move the stored account (and profile
    // extras) to the new key instead of leaving stale duplicates
    // under the old email.
    if (email && trimmedEmail.toLowerCase() !== email.toLowerCase()) {
        await deleteAccount(email);
        await deleteProfileExtra(email);
      }
      await saveAccount(trimmedEmail, trimmedName);
      await saveProfileExtra(trimmedEmail, {
        username: editUsername.trim(),
        age: editAge,
        country: editCountry,
      });
  
      setName(trimmedName);
      setEmail(trimmedEmail);
      setIsEditingProfile(false);

      // Matches the Flutter sample's Fluttertoast confirmation.
      Alert.alert('Profile updated successfully');
    };
  
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordErrors, setPasswordErrors] = useState<{
      current?: string;
      newPass?: string;
      confirm?: string;
    }>({});
  
    const handleChangePassword = async () => {
      const nextErrors: typeof passwordErrors = {};
  
      if (!currentPassword) {
        nextErrors.current = 'Current password is required.';
      }
      if (!newPassword || newPassword.length < 8) {
        nextErrors.newPass = 'New password must be at least 8 characters';
      }
      if (newPassword !== confirmNewPassword) {
        nextErrors.confirm = 'Passwords do not match.';
      }
  
      setPasswordErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;
  
      // Actually verifies the current password before allowing the
      // change — same check Login uses.
      const verifiedName = await verifyCredentials(email, currentPassword);
      if (!verifiedName) {
        setPasswordErrors({ current: 'Current password is incorrect.' });
        return;
      }
  
      await saveAccount(email, verifiedName, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      Alert.alert('Password updated successfully');
    };



  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="" onMenuPress={() => navigation.toggleDrawer()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Sanctuary Settings</Text>

        {isEditingProfile ? (
          <View style={styles.profileEditCard}>
            <FormField
              label="Full Name"
              value={editName}
              onChangeText={setEditName}
              error={profileErrors.name}
            />
                        <FormField
              label="Email address"
              autoCapitalize="none"
              keyboardType="email-address"
              value={editEmail}
              onChangeText={setEditEmail}
              error={profileErrors.email}
            />
            <FormField
              label="Username"
              autoCapitalize="none"
              value={editUsername}
              onChangeText={setEditUsername}
            />

            <View>
              <Text style={styles.sliderLabel}>Age: {Math.round(editAge)}</Text>
              <Slider
                minimumValue={18}
                maximumValue={100}
                step={1}
                value={editAge}
                onValueChange={setEditAge}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
              />
            </View>

            <View>
              <Text style={styles.sliderLabel}>Country</Text>
              <View style={styles.pickerWrapper}>
                <Picker selectedValue={editCountry} onValueChange={setEditCountry}>
                  <Picker.Item label="United States" value="United States" />
                  <Picker.Item label="Canada" value="Canada" />
                  <Picker.Item label="India" value="India" />
                </Picker>
              </View>
            </View>

            <View style={styles.editActionsRow}>
              <TouchableOpacity
                style={[styles.editActionBtn, styles.editCancelBtn]}
                onPress={() => setIsEditingProfile(false)}
              >
                <Text style={styles.editCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.editActionBtn, styles.editSaveBtn]} onPress={handleSaveProfile}>
                <Text style={styles.editSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.profileCard}>
            <Image source={{ uri: 'https://i.pravatar.cc/112' }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.email}>{displayEmail}</Text>
              {profileExtraDisplay ? (
                <Text style={styles.profileExtraText}>
                  @{profileExtraDisplay.username || 'no-username'} • Age {Math.round(profileExtraDisplay.age)} • {profileExtraDisplay.country}
                </Text>
              ) : null}
            </View>
            <View style={{ alignItems: 'flex-end', gap: spacing.sm }}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>PRO</Text>
              </View>
              <TouchableOpacity onPress={handleStartEditing} hitSlop={hitSlopValue}>
                <Ionicons name="pencil" size={16} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

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

        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.themeCard}>
          <Text style={styles.toggleLabel}>Default Session Length</Text>
          <Text style={styles.toggleDesc}>
            Saved as your preference — not yet used to pre-select anything, since Start Session doesn't do anything yet either.
          </Text>
          <View style={styles.durationRow}>
            {['5 min', '10 min', '15 min'].map((duration) => (
              <TouchableOpacity
                key={duration}
                style={
                  preferredDuration === duration
                    ? [styles.durationPill, styles.durationPillActive]
                    : styles.durationPill
                }
                onPress={() => handleSelectDuration(duration)}
              >
                <Text
                  style={
                    preferredDuration === duration
                      ? styles.durationLabelActive
                      : styles.durationLabelInactive
                  }
                >
                  {duration}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Change Password</Text>
        <View style={styles.themeCard}>
          <View style={{ gap: spacing.md }}>
            <FormField
              label="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              error={passwordErrors.current}
            />
            <FormField
              label="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              error={passwordErrors.newPass}
            />
            <FormField
              label="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              error={passwordErrors.confirm}
            />
                        <TouchableOpacity style={styles.updatePasswordBtn} onPress={handleChangePassword}>
              <Text style={styles.editSaveText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.themeCard}>
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>Reminder Notifications</Text>
              <Text style={styles.toggleDesc}>Get nudged when a scheduled reminder is due.</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
            <View style={{ gap: spacing.sm }}>
            <TouchableOpacity onPress={() => navigation.navigate('Reminders')} style={{ alignSelf: 'flex-start' }}>
              <Text style={styles.manageRemindersLink}>Manage Reminders →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ alignSelf: 'flex-start' }}>
              <Text style={styles.manageRemindersLink}>View Favorites →</Text>
            </TouchableOpacity>
          </View>
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

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutAppName}>Aura</Text>
          <Text style={styles.aboutVersion}>Version 1.0.0</Text>
          <Text style={styles.aboutDescription}>
            A calm space for short, guided meditation sessions built into your day.
          </Text>
          <Text style={styles.aboutCredit}>Built by Nate Miller</Text>
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

  aboutCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.lg - 4,
    gap: 4,
  },
  aboutAppName: {
    fontFamily: fonts.headingBold,
    fontSize: fontSizes.md,
    color: colors.text,
  },
  aboutVersion: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  aboutDescription: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
  aboutCredit: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  manageRemindersLink: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.sm,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  durationRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm + 4,
  },
  durationPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  durationPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  durationLabelInactive: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  durationLabelActive: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: '#FFFFFF',
  },
  profileEditCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    gap: spacing.md,
  },
  editActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm + 4,
  },
  editActionBtn: {
    flex: 1,
    borderRadius: 999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editCancelBtn: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editSaveBtn: {
    backgroundColor: colors.primary,
  },
  editCancelText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
  },
  editSaveText: {
    fontFamily: fonts.bodyBold,
    fontSize: fontSizes.sm,
    color: '#FFFFFF',
  },
  sliderLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  profileExtraText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  updatePasswordBtn: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
});
