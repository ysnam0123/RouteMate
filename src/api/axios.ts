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

let retry = false;

// 응답 인터셉터
axiosInstance.interceptors.response.use(
    (response) => response, // 응답이 성공하면 그대로 반환
    async (error) => {
        const originalRequest = error.config;
        // 만약 403 에러가 발생하고 재시도한 적이 없으면
        if (error.response?.status === 403 && !retry) {
            retry = true;
            console.log('토큰 실패, 새 토큰 발급 시도');

            try {
                // 리프레시 토큰을 사용해 새로운 액세스 토큰을 요청
                const { data } = await axiosInstance.post('/token');

                // 새로운 액세스 토큰을 상태에 저장
                useAuthStore.setState({
                    accessToken: data.accessToken,
                    isLoggedIn: true,
                });

                retry = false;

                // 원본 요청에 새로운 액세스 토큰을 헤더에 추가하고 재시도
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // 리프레시 토큰도 실패한 경우, 로그아웃 처리 또는 페이지 리디렉션
                console.error('리프레시 토큰 실패:', refreshError);
                useAuthStore.setState({ isLoggedIn: false, accessToken: '' });
                // 리다이렉션 또는 로그아웃 처리
                // 예: window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
