import { create } from 'zustand';

const storedToken = localStorage.getItem('accessToken');

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (accessToken: string, userId: string) => void;
  logout: () => void;
}

const storedUserId = localStorage.getItem('userId');

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: !!storedToken,
  accessToken: storedToken,
  userId: storedUserId,
  login: (accessToken: string, userId: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);
    set({ isLoggedIn: true, accessToken, userId });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    set({ isLoggedIn: false, accessToken: null, userId: null });
  },
}));
