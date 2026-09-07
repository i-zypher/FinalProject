import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/types';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import TopBar from '../components/TopBar';
import { useReminders } from '../context/RemindersContext';

type Props = DrawerScreenProps<DrawerParamList, 'Reminders'>;

export default function RemindersScreen({ navigation }: Props) {
  const { reminders, addReminder, removeReminder } = useReminders();
  const [label, setLabel] = useState('');
  const [time, setTime] = useState('');

  const handleAdd = () => {
    if (!label.trim() || !time.trim()) return;
    addReminder(label.trim(), time.trim());
    setLabel('');
    setTime('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <TopBar title="" onMenuPress={() => navigation.toggleDrawer()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ gap: 4 }}>
          <Text style={styles.pageTitle}>Reminders</Text>
          <Text style={styles.pageSubtitle}>Gentle nudges to make space for your practice.</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Reminder label (e.g. Morning breath)"
            placeholderTextColor="#9B96AC"
            value={label}
            onChangeText={setLabel}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (e.g. 7:00 AM)"
            placeholderTextColor="#9B96AC"
            value={time}
            onChangeText={setTime}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add Reminder</Text>
          </TouchableOpacity>
        </View>

        {reminders.length === 0 ? (
          <Text style={styles.emptyText}>
            No reminders saved yet — add one above to get gentle nudges throughout your day.
          </Text>
        ) : (
          <View style={{ gap: spacing.md }}>
            {reminders.map((reminder) => (
              <View key={reminder.id} style={styles.row}>
                <View style={styles.iconCircle}>
                  <Ionicons name="notifications-outline" size={18} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reminderLabel}>{reminder.label}</Text>
                  <Text style={styles.reminderTime}>{reminder.time}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeReminder(reminder.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: spacing.lg, gap: spacing.lg },
  pageTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.text },
  pageSubtitle: { fontFamily: fonts.bodyRegular, fontSize: fontSizes.sm, color: colors.textMuted },
  form: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    gap: spacing.sm + 4,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    height: 48,
    paddingHorizontal: spacing.md,
    fontFamily: fonts.bodyRegular,
    fontSize: fontSizes.sm,
    color: colors.text,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { fontFamily: fonts.bodyBold, fontSize: fontSizes.sm, color: '#FFFFFF' },
  emptyText: { fontFamily: fonts.bodyRegular, fontSize: fontSizes.sm, color: colors.textMuted },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.sm + 4,
    gap: spacing.sm + 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderLabel: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.text },
  reminderTime: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, marginTop: 2 },
});