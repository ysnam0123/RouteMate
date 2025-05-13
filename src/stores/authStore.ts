import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (accessToken: string, userId: string) => void;
  logout: () => void;
}

// sessionStorage에 저장된 토큰값을 가져온다.
const storedToken = sessionStorage.getItem("accessToken");
const storedUserId = sessionStorage.getItem("userId");

export const useAuthStore = create<AuthStore>((set) => ({
  // sessionStorage에 토큰이 있으면 true, 없으면 false
  isLoggedIn: !!storedToken,

  // sessionStorage에서 토큰값 가져온다.
  accessToken: storedToken,

  userId: storedUserId,

  // 로그인할떄 토큰과 id값을 sessionStorage에 저장해준다.
  login: (accessToken: string, userId: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("userId", userId);
    set({ isLoggedIn: true, accessToken, userId });
  },

  // 로그아웃할떄 토큰과 id값을 sessionStorage에서 삭제한다.
  logout: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
    set({ isLoggedIn: false, accessToken: null, userId: null });
  },
}));
