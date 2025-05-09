import { create } from 'zustand';

const storedToken = localStorage.getItem('accessToken');

interface AuthStore {
    isLoggedIn: boolean;
    accessToken: string | null;
    login: (accessToken: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isLoggedIn: !!storedToken,
    accessToken: storedToken,
    login: (accessToken: string) => {
        localStorage.setItem('accessToken', accessToken);
        set({ isLoggedIn: true, accessToken });
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        set({ isLoggedIn: false, accessToken: null });
    },
}));
