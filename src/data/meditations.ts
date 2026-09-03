export type MeditationStep = {
  title: string;
  description: string;
};

export type Meditation = {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  imageUri: string;
  steps: MeditationStep[];
};

// Same two generic steps reused for every session — Figma only fully
// specified real instructions for one example ("Overcoming Mid-day
// Chaos"). Real per-session steps would need unique content per
// meditation, which isn't part of the current data.
const genericSteps: MeditationStep[] = [
  {
    title: 'Inhale Deeply (4s)',
    description: 'Breathe in slowly through your nose, expanding your abdomen fully.',
  },
  {
    title: 'Hold Gently (4s)',
    description: 'Suspend the breath. Keep your shoulders down and jaw relaxed.',
  },
];

export const dailyFeatured: Meditation = {
  id: 'daily-1',
  title: 'Anxiety Release Protocol',
  category: 'RECOMMENDED',
  duration: '10 MIN',
  description: 'A rapid box-breathing routine for immediate stress relief.',
  imageUri: 'https://picsum.photos/seed/anxiety-release/800/600',
  steps: genericSteps,
};

export const popularMeditations: Meditation[] = [
  {
    id: '1',
    title: 'Breath of Relief',
    category: 'Calmness',
    duration: '5 min',
    description:
      'A short guided breathing exercise to help you reset between tasks and lower stress.',
    imageUri: 'https://picsum.photos/seed/breath-relief/400/300',
    steps: genericSteps,
  },
  {
    id: '2',
    title: 'Reset Your Mind',
    category: 'Focus',
    duration: '8 min',
    description:
      'A concentration-building session designed to quiet distractions before deep work.',
    imageUri: 'https://picsum.photos/seed/reset-mind/400/300',
    steps: genericSteps,
  },
  {
    id: '3',
    title: 'Sunset Release',
    category: 'Relaxation',
    duration: '10 min',
    description: 'A slow, calming session to help you unwind as the day comes to a close.',
    imageUri: 'https://picsum.photos/seed/sunset-release/400/300',
    steps: genericSteps,
  },
];

export const categories = ['Calmness', 'Relaxation', 'Focus', 'Sleep'];

export const allMeditations: Meditation[] = [dailyFeatured, ...popularMeditations];