import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Axios 인스턴스 생성
export const axiosInstance = axios.create({
    baseURL: 'http://13.125.208.179:5001',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
    (config) => {
        // 상태에서 토큰 가져오기
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 403) {
            console.error('403 에러 발생: 토큰 만료 또는 권한 없음');
            // 자동 로그아웃 처리
            useAuthStore.getState().logout();
            // 로그인전 유저에게 알려주기
            alert('세션이 만료되어 다시 로그인해주세요.');
            // 로그인 페이지로 이동
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);
