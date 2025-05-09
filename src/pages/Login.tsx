import { useState } from 'react';
import passport from '../assets/images/passportImg.svg';
import loginlogo from '../assets/images/LogInLogo.svg';
import Input from '../components/Input';
import Button from '../components/button';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../api/axios';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });

            const data = response.data;
            login(data.token); // zustand에 저장
            setEmail('');
            setPassword('');
            alert('로그인 성공!');
            navigate('/test');
        } catch (err: unknown) {
            console.error('로그인 에러:', err);
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || err.message;
                alert(`로그인 실패: ${message}`);
            } else {
                alert(`에러 발생: ${err}`);
            }
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[var(--color-darkNavy)]">
            <div className="w-[650px] h-[750px] bg-[var(--color-white)] rounded-[30px] flex flex-col">
                {/* 상단 */}
                <div className="w-[650px] h-[440px] flex items-center justify-center relative border-b-[3px] border-[var(--color-black)]">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px]" />
                    <img src={passport} alt="여권정보 사진" className="w-[702px] h-[305px] object-contain z-10" />
                </div>

                {/* 하단 */}
                <div className="w-[650px] h-[365px] bg-[var(--color-white)] flex relative">
                    {/* 로그인글씨 */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                        <div className="w-[205px] h-[15px] bg-[var(--color-main-navy)] rounded-[15px]" />
                        <div className="w-[147px] h-[54px] text-[35px] text-center text-[var(--color-black)]">
                            Log In
                        </div>
                        <div className="w-[205px] h-[15px] bg-[var(--color-main-navy)] rounded-[15px]" />
                    </div>

                    {/* 로고 영역 */}
                    <div className="w-[450px] top-2 flex flex-col items-center justify-center pl-10 relative">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px]" />
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center mb-2">
                                <img
                                    src={loginlogo}
                                    alt="로그인로고 사진"
                                    className="w-[90px] h-[115px] object-contain"
                                />
                            </div>
                            <div className="text-[40px] font-bold">
                                Travel<span className="text-[var(--color-main-skyBlue)]">Mate</span>
                            </div>
                        </div>
                    </div>

                    {/* 입력 영역 */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-[650px] top-9 px-10 flex flex-col justify-center relative"
                    >
                        <div className="absolute right-0 top-0 bottom-0 w-[2px]" />

                        {/* 이메일 입력 */}
                        <div className="mb-4">
                            <label htmlFor="email" className="text-[var(--color-black)]">
                                Passanger email
                            </label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        {/* 비밀번호 입력 */}
                        <div className="mb-3">
                            <label htmlFor="password" className="text-[var(--color-black)]">
                                Password
                            </label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* 로그인 버튼 */}
                        <Button type="submit" className="px-5 py-2 self-end">
                            로그인
                        </Button>
                    </form>
                </div>

                {/* 하단 장식 */}
                <div className="h-[75px] px-7 pt-3 bg-[var(--color-lightGray)] rounded-b-[30px]">
                    <div className="w-[630px] text-[14px] text-[var(--color-black)]">
                        {'<<< ROUTE <<< MATE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'}
                        <br />
                        {' <<< AB586511 <<<<<<<<<<<<<<<<< R <<<<<< 185651321854 <<<<<<<<<<<<<<<<<<<<'}
                    </div>
                </div>
            </div>
        </div>
    );
}
