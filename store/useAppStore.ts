import { create } from 'zustand';

interface UserState {
  uid: string | null;
  name: string | null;
  phone: string | null;
  guardianMode: boolean;
  crashSensitivity: number; // G threshold
  setUserData: (data: Partial<UserState>) => void;
  logout: () => void;
}

interface AppStore extends UserState {
  isSOSActive: boolean;
  setSOSActive: (active: boolean) => void;
  liveLocationShared: boolean;
  setLiveLocationShared: (shared: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  uid: null,
  name: null,
  phone: null,
  guardianMode: false,
  crashSensitivity: 2.5,
  isSOSActive: false,
  liveLocationShared: false,
  setUserData: (data) => set((state) => ({ ...state, ...data })),
  logout: () => set({ uid: null, name: null, phone: null, guardianMode: false }),
  setSOSActive: (active) => set({ isSOSActive: active }),
  setLiveLocationShared: (shared) => set({ liveLocationShared: shared }),
}));
