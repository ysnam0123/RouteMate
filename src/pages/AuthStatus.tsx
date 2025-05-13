import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { axiosInstance } from '../api/axios';

export default function AuthStatus() {
    const { accessToken, isLoggedIn, logout } = useAuthStore();
    const [userInfo, setUserInfo] = useState<unknown>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAuthUser = async () => {
            if (!accessToken) return;

            setLoading(true);
            try {
                const response = await axiosInstance.get('/auth-user');
                setUserInfo(response.data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('알 수 없는 에러');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAuthUser();
    }, [accessToken]);

    const logoutHandler = () => {
        logout(); // 로그아웃 처리
    };

    if (!isLoggedIn) {
        return (
            <div className="text-red-600 font-semibold">
                ❌ 로그인하지 않은 사용자입니다. <br />
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => (window.location.href = '/login')} // 로그인 페이지로 이동
                >
                    로그인 페이지로 가기
                </button>
            </div>
        );
    }

    if (loading) {
        return <div className="text-gray-500">🔄 사용자 정보 불러오는 중...</div>;
    }

    if (error) {
        return <div className="text-red-500">❗ 인증 오류: {error}</div>;
    }

    return (
        <div className="text-green-600 font-semibold">
            ✅ 인증된 사용자입니다. <br />
            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
            <button onClick={logoutHandler} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                로그아웃
            </button>
        </div>
    );
}
