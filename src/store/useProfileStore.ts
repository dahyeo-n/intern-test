import create from 'zustand';
import { ProfileStoreState } from '../types';

export const useProflieStore = create<ProfileStoreState>((set) => ({
  nickname: '',
  avatar: null,
  setProfile: (nickname, avatar) => set({ nickname, avatar }),
}));
