import { create } from "zustand";

interface AuthStore {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (accessToken: string, userId: string) => void;
  logout: () => void;
}

// sessionStorage에 저장된 토큰값 가져오기
let storedToken = sessionStorage.getItem("accessToken");
let storedUserId = sessionStorage.getItem("userId");

// Zustand를 이용한 상태 관리
export let useAuthStore = create<AuthStore>((set) => ({
  // sessionStorage에 토큰이 있으면 true, 없으면 false
  isLoggedIn: !!storedToken,

  // sessionStorage에서 토큰값 가져오기
  accessToken: storedToken,

  userId: storedUserId,

  // 로그인할 때 토큰과 id값을 sessionStorage에 저장
  login: (accessToken: string, userId: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("userId", userId);
    set({ isLoggedIn: true, accessToken, userId });
  },

  // 로그아웃할 때 sessionStorage에서 토큰과 id값을 삭제
  logout: () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userId");
    set({ isLoggedIn: false, accessToken: null, userId: null });
  },
}));
