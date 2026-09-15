import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'aura_reminders';

export type Reminder = {
  id: string;
  label: string;
  dateTimeIso: string;
};

type RemindersContextType = {
  reminders: Reminder[];
  addReminder: (label: string, dateTimeIso: string) => void;
  removeReminder: (id: string) => void;
};

const RemindersContext = createContext<RemindersContextType | undefined>(undefined);

export function RemindersProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setReminders(JSON.parse(raw));
      } catch (err) {
        console.warn('Failed to load reminders from storage', err);
      }
    })();
  }, []);

  const persist = async (list: Reminder[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.warn('Failed to save reminders to storage', err);
    }
  };

  const addReminder = (label: string, dateTimeIso: string) => {
    setReminders((prev) => {
      const next = [...prev, { id: Date.now().toString(), label, dateTimeIso }];
      persist(next);
      return next;
    });
  };

  const removeReminder = (id: string) => {
    setReminders((prev) => {
      const next = prev.filter((r) => r.id !== id);
      persist(next);
      return next;
    });
  };

  return (
    <RemindersContext.Provider value={{ reminders, addReminder, removeReminder }}>
      {children}
    </RemindersContext.Provider>
  );
}

export function useReminders() {
  const ctx = useContext(RemindersContext);
  if (!ctx) throw new Error('useReminders must be used within a RemindersProvider');
  return ctx;
}