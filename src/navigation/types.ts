import type { Meditation } from '../data/meditations';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  MeditationDetail: { meditation: Meditation };
};

export type DrawerParamList = {
  HomeStack: undefined;
  Favorites: undefined;
  Reminders: undefined;
  Settings: undefined;
};