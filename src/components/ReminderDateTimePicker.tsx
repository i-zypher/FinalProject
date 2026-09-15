import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, spacing, fontSizes, fonts } from '../styles/theme';

type Props = {
  selectedDate: string | null; // 'YYYY-MM-DD'
  onSelectDate: (date: string) => void;
  manualTime: string; // 'HH:mm'
  onManualTimeChange: (time: string) => void;
  pickerTime: Date;
  onPickerTimeChange: (date: Date) => void;
  error?: string;
};

export default function ReminderDateTimePicker({
  selectedDate,
  onSelectDate,
  manualTime,
  onManualTimeChange,
  pickerTime,
  onPickerTimeChange,
  error,
}: Props) {
  const [showNativeTimePicker, setShowNativeTimePicker] = useState(false);
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <View>
      <Text style={styles.label}>Date</Text>
      <Calendar
        onDayPress={(day: DateData) => onSelectDate(day.dateString)}
        minDate={todayStr}
        markedDates={
          selectedDate ? { [selectedDate]: { selected: true, selectedColor: colors.primary } } : {}
        }
        theme={{
          todayTextColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          arrowColor: colors.primary,
        }}
        style={styles.calendar}
      />

      <Text style={[styles.label, { marginTop: spacing.md }]}>Time</Text>

      {/* Native picker is only rendered on iOS/Android — its web
          support isn't reliable, so web relies on manual entry below. */}
      {Platform.OS !== 'web' && (
        <TouchableOpacity style={styles.pickTimeBtn} onPress={() => setShowNativeTimePicker(true)}>
          <Text style={styles.pickTimeBtnText}>Pick Time</Text>
        </TouchableOpacity>
      )}
      {showNativeTimePicker && (
        <DateTimePicker
          value={pickerTime}
          mode="time"
          onChange={(_event, selected) => {
            setShowNativeTimePicker(false);
            if (selected) {
              onPickerTimeChange(selected);
              onManualTimeChange(
                selected.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
              );
            }
          }}
        />
      )}

      <TextInput
        placeholder="HH:mm (e.g. 07:30)"
        placeholderTextColor="#9B96AC"
        value={manualTime}
        onChangeText={onManualTimeChange}
        keyboardType="numeric"
        maxLength={5}
        style={styles.input}
      />

      <Text style={styles.selectedText}>
        Selected: {selectedDate || 'no date'} at {manualTime || 'no time'}
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs + 4,
  },
  calendar: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  pickTimeBtn: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  pickTimeBtnText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: fontSizes.sm,
    color: colors.text,
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
  selectedText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  error: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.error,
    marginTop: spacing.xs,
  },
});