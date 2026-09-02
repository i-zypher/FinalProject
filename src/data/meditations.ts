// Mock local data standing in for a real data source. Swap for an API
// call or AsyncStorage read later — the screens don't change, only
// where `meditations` comes from.
export type Meditation = {
  id: string;
  title: string;
  type: string; // e.g. "Calmness", "Focus", "Sleep"
  duration: string;
  description: string;
  imageUri: string;
  section: 'popular' | 'daily';
  done: boolean;
};

export const meditations: Meditation[] = [
  {
    id: '1',
    title: 'Mindful Breathing',
    type: 'Calmness',
    duration: '10 minutes',
    description:
      'A short guided breathing exercise to help you reset between tasks and lower stress.',
    imageUri: 'https://picsum.photos/seed/breathing/400/300',
    section: 'popular',
    done: false,
  },
  {
    id: '2',
    title: 'Deep Focus',
    type: 'Focus',
    duration: '15 minutes',
    description:
      'A concentration-building session designed to quiet distractions before deep work.',
    imageUri: 'https://picsum.photos/seed/focus/400/300',
    section: 'popular',
    done: false,
  },
  {
    id: '3',
    title: 'Evening Wind Down',
    type: 'Sleep',
    duration: '20 minutes',
    description: 'A slow, calming session to help you unwind and prepare for sleep.',
    imageUri: 'https://picsum.photos/seed/sleep/400/300',
    section: 'daily',
    done: false,
  },
  {
    id: '4',
    title: 'Morning Gratitude',
    type: 'Reflection',
    duration: '5 minutes',
    description: 'Start your day by reflecting on three things you\'re grateful for.',
    imageUri: 'https://picsum.photos/seed/gratitude/400/300',
    section: 'daily',
    done: true,
  },
];