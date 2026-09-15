import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') {
    // @ts-ignore - window.Notification is a browser API, not in RN's types
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return false;
    }
    // @ts-ignore
    if (window.Notification.permission === 'granted') return true;
    // @ts-ignore
    if (window.Notification.permission === 'denied') return false;
    // @ts-ignore
    const result = await window.Notification.requestPermission();
    return result === 'granted';
  }

  const { status } = await Notifications.getPermissionsAsync();
  if (status === 'granted') return true;
  const { status: requestedStatus } = await Notifications.requestPermissionsAsync();
  return requestedStatus === 'granted';
}

// Schedules a notification for an exact target Date, on any platform.
export async function scheduleNotificationAt(
  title: string,
  body: string,
  targetDate: Date
): Promise<void> {
  if (Platform.OS === 'web') {
    // @ts-ignore
    if (typeof window === 'undefined' || !('Notification' in window)) {
      console.warn('Notification API not available in this browser.');
      return;
    }
    // @ts-ignore
    if (window.Notification.permission !== 'granted') {
      console.warn('Notification permission not granted.');
      return;
    }
    const delayMs = targetDate.getTime() - Date.now();
    if (delayMs <= 0) {
      console.warn('scheduleNotificationAt called with a date in the past — skipping.');
      return;
    }
    // No native scheduling on web — setTimeout fires it client-side.
    // Only works while this browser tab stays open.
    setTimeout(() => {
      // @ts-ignore
      new window.Notification(title, { body });
    }, delayMs);
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { date: targetDate },
  });
}