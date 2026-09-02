import type { Meditation } from '../data/meditations';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: { name: string };
  MeditationDetail: { meditation: Meditation };
};