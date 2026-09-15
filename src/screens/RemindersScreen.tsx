import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { DrawerParamList } from '../navigation/types';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';
import TopBar from '../components/TopBar';
import LiveClock from '../components/LiveClock';
import ReminderDateTimePicker from '../components/ReminderDateTimePicker';
import { useReminders } from '../context/RemindersContext';
import { requestNotificationPermissions, scheduleNotificationAt } from '../utils/notifications';

type Props = DrawerScreenProps<DrawerParamList, 'Reminders'>;

const hitSlopValue = { top: 8, bottom: 8, left: 8, right: 8 };

export default function RemindersScreen({ navigation }: Props) {
  const { reminders, addReminder, removeReminder } = useReminders();

  const [label, setLabel] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [manualTime, setManualTime] = useState('');
  const [pickerTime, setPickerTime] = useState(new Date());

  const [labelError, setLabelError] = useState<string | undefined>();
  const [dateTimeError, setDateTimeError] = useState<string | undefined>();

  const handleAdd = async () => {
    let hasError = false;

    if (!label.trim()) {
      setLabelError('A label is required.');
      hasError = true;
    } else {
      setLabelError(undefined);
    }

    if (!selectedDate) {
      setDateTimeError('Please select a date.');
      hasError = true;
      if (hasError) return;
    }

    const timeMatch = manualTime.match(/^(\d{1,2}):(\d{2})$/);
    let hours: number;
    let minutes: number;
    if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = parseInt(timeMatch[2], 10);
    } else {
      hours = pickerTime.getHours();
      minutes = pickerTime.getMinutes();
    }

    const [year, month, day] = selectedDate!.split('-').map(Number);
    const triggerDate = new Date(year, month - 1, day, hours, minutes, 0, 0);

    if (triggerDate.getTime() <= Date.now()) {
      setDateTimeError('Please select a future time — same-day is fine, just not already past.');
      hasError = true;
    } else {
      setDateTimeError(undefined);
    }

    if (hasError) return;

    addReminder(label.trim(), triggerDate.toISOString());

    const granted = await requestNotificationPermissions();
    if (granted) {
      await scheduleNotificationAt('Reminder', `Time for: ${label.trim()}`, triggerDate);
    } else {
      setDateTimeError(
        'Reminder saved, but notification permission was denied — it won\'t actually fire.'
      );
    }

    setLabel('');
    setSelectedDate(null);
    setManualTime('');
    setPickerTime(new Date());
  };

  const sortedReminders = [...reminders].sort(
    (a, b) => new Date(a.dateTimeIso).getTime() - new Date(b.dateTimeIso).getTime()
  );

  return (
    <View style={styles.screen}>
      <TopBar title="" onMenuPress={() => navigation.toggleDrawer()} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBlock}>
          <Text style={styles.pageTitle}>Reminders</Text>
          <Text style={styles.pageSubtitle}>Gentle nudges to make space for your practice.</Text>
          <View style={styles.clockRow}>
            <Ionicons name="time-outline" size={14} color={colors.textMuted} />
            <Text style={styles.clockLabel}>Current time:</Text>
            <LiveClock />
          </View>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.fieldLabel}>Reminder Label</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Morning breath"
              placeholderTextColor="#9B96AC"
              value={label}
              onChangeText={setLabel}
            />
            {labelError ? <Text style={styles.errorText}>{labelError}</Text> : null}
          </View>

          <ReminderDateTimePicker
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            manualTime={manualTime}
            onManualTimeChange={setManualTime}
            pickerTime={pickerTime}
            onPickerTimeChange={setPickerTime}
            error={dateTimeError}
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.addButtonText}>Add Reminder</Text>
          </TouchableOpacity>
        </View>

        {sortedReminders.length === 0 ? (
          <Text style={styles.emptyText}>
            No reminders saved yet — add one above to get gentle nudges throughout your day.
          </Text>
        ) : (
          <View style={{ gap: spacing.md }}>
            {sortedReminders.map((reminder) => (
              <View key={reminder.id} style={styles.row}>
                <View style={styles.iconCircle}>
                  <Ionicons name="notifications-outline" size={18} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reminderLabel}>{reminder.label}</Text>
                  <Text style={styles.reminderTime}>
                    {new Date(reminder.dateTimeIso).toLocaleString()}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeReminder(reminder.id)} hitSlop={hitSlopValue}>
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
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
  screen: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: spacing.lg, gap: spacing.lg },
  headerBlock: { gap: 4 },
  pageTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.text },
  pageSubtitle: { fontFamily: fonts.bodyRegular, fontSize: fontSizes.sm, color: colors.textMuted },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xs,
  },
  clockLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  form: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.md,
    gap: spacing.sm + 4,
  },
  fieldLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs + 4,
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
  errorText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.error,
    marginTop: spacing.xs,
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