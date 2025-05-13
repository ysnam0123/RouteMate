<<<<<<< HEAD
import React, { useState } from 'react';
import Button from '../components/button';
import Input from '../components/Input';
import passport from '../assets/images/passportImg.svg';
import emailNot from '../assets/icons/emailNotOk.png';
import emailOk from '../assets/icons/emailOk.png';
import passwordNot from '../assets/icons/passwordNotOk.svg';
import passwordOk from '../assets/icons/passwordOk.svg';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../api/axios';
import axios from 'axios';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // 이메일,이름,비밀번호 핸들러
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };

    const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    // 회원가입 요청
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = fullName && email && password && password === confirmPassword;
        if (!isValid) return alert('입력값을 확인해주세요.');

        try {
            await axiosInstance.post('/signup', { email, fullName, password });
            // 입력값 초기화
            [setFullName, setEmail, setPassword, setConfirmPassword].forEach((fn) => fn(''));
            setIsEmailValid(false);
            alert('회원가입 성공!');
            // 완료되면 로그인페이지로 이동(이것도 임의로해둔거라 바꿔도됨)
            navigate('/login');
        } catch (e) {
            console.error('회원가입 에러:', e);

            const message = axios.isAxiosError(e)
                ? e.response?.data?.message || e.message
                : '회원가입 중 알 수 없는 오류가 발생했습니다.';

            alert(`회원가입 실패: ${message}`);
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

                {/* 회원가입 입력 */}
                <div className="w-[650px] h-[365px] bg-[var(--color-white)] flex relative">
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                        <div className="w-[205px] h-[15px] bg-[var(--color-main-navy)] rounded-[15px]" />
                        <div className="w-[147px] h-[54px] text-[35px] text-center text-[var(--color-black)]">
                            Register
                        </div>
                        <div className="w-[205px] h-[15px] bg-[var(--color-main-navy)] rounded-[15px]" />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-[650px] pt-15 px-10 flex flex-col justify-center items-center relative mb-2"
                    >
                        <div className="absolute left-0 top-0 bottom-0 w-[2px]" />

                        <div className="grid grid-cols-2 gap-4 w-full">
                            {/* 이름 */}
                            <div className="flex flex-col">
                                <label htmlFor="fullName" className="text-[var(--color-black)]">
                                    fullName
                                </label>
                                <Input id="fullName" name="fullName" value={fullName} onChange={handleFullnameChange} />
                            </div>

                            {/* 이메일 */}
                            <div className="flex flex-col relative">
                                <label htmlFor="email" className="text-[var(--color-black)]">
                                    Passanger email
                                </label>
                                <Input id="email" type="email" value={email} onChange={handleEmailChange} />
                                <img
                                    src={isEmailValid ? emailOk : emailNot}
                                    alt={isEmailValid ? '유효한 이메일' : '이메일 유효하지 않음'}
                                    className="w-[20px] h-[20px] absolute right-3 bottom-3"
                                />
                            </div>

                            {/* 비밀번호 */}
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-[var(--color-black)]">
                                    Password
                                </label>
                                <Input id="password" type="password" value={password} onChange={handlePasswordChange} />
                            </div>

                            {/* 비밀번호 확인 */}
                            <div className="flex flex-col relative">
                                <label htmlFor="confirm-password" className="text-[var(--color-black)]">
                                    Password confirm
                                </label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <img
                                    src={
                                        password !== '' && confirmPassword !== '' && password === confirmPassword
                                            ? passwordOk
                                            : passwordNot
                                    }
                                    alt={
                                        password !== '' && confirmPassword !== '' && password === confirmPassword
                                            ? '비밀번호 일치'
                                            : '비밀번호 일치하지 않음'
                                    }
                                    className="w-[20px] h-[20px] absolute right-3 bottom-3"
                                />
                            </div>
                        </div>

                        {/* 회원가입 버튼 */}
                        <Button type="submit" className="self-center mt-5 w-[200px] h-[50px]">
                            회원가입
                        </Button>
                    </form>
                </div>

                {/* 여권 하단 장식 */}
                <div className="h-[75px] px-7 pt-3 bg-[var(--color-lightGray)] rounded-b-[30px]">
                    <div className="w-[630px] text-[14px] text-[var(--color-black)]">
                        {'<<< ROUTE <<< MATE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'}
                        <br />
                        {' <<< AB586511 <<<<<<<<<<<<<<<<< R <<<<<< 185651321854 <<<<<<<<<<<<<<<<<<<<'}
=======
import Button from '../components/button';
import Input from '../components/Input';
import logo from '../assets/images/homeLogo.png';
import signUpImg from '../assets/images/signUpImg.png';
import emailNot from '../assets/icons/emailNotOk.png';
import passwordNot from '../assets/icons/passwordNotOk.svg';
// import email from '../assets/icons/emailOk.png';
// import password from '../assets/icons/passwordOk.svg';

export default function Register() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#5A6C75] px-4 py-8">
            <div className="flex flex-col md:flex-row w-full max-w-[1036px] bg-white rounded-[10px] overflow-hidden shadow-[0px_4px_30px_rgba(0,0,0,0.5)]">
                {/* 이미지 영역 - 모바일에서는 숨김, 태블릿 이상에서 표시 */}
                <div className="hidden md:flex md:w-1/2 justify-center items-center shadow-[0px_4px_15px_rgba(0,0,0,0.1)] p-4">
                    <img src={signUpImg} alt="회원가입 사진" className="w-full max-w-[411px] h-auto object-contain" />
                </div>

                {/* 폼 영역 - 모바일에서 전체 너비, 태블릿 이상에서 절반 */}
                <div className="w-full md:w-1/2 flex justify-center items-start pt-6 shadow-[0px_4px_15px_rgba(195,194,194,0.8)] overflow-y-auto">
                    <div className="w-full max-w-[430px] px-4 pb-8">
                        {/* 로고 */}
                        <div className="flex justify-center mb-2">
                            <img src={logo} alt="로고" className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]" />
                        </div>

                        {/* 제목 */}
                        <h1 className="text-[20px] sm:text-[25px] font-bold text-center text-[#ff9149] mt-2">
                            Welcome!
                        </h1>
                        <h2 className="text-[11px] sm:text-[13px] text-center text-[#60B5ff] leading-tight">
                            Days are yours, <br />
                            routes are ours.
                        </h2>

                        {/* 폼 */}
                        <form className="flex flex-col justify-between items-center pt-[10px] space-y-3 sm:space-y-4">
                            {/* 아이디 */}
                            <div className="w-full">
                                <div className="flex flex-col focus-within:text-[#ff9149] text-[#60B5ff]">
                                    <label className="text-[14px] sm:text-[16px] font-semibold text-inherit">
                                        아이디
                                    </label>
                                    <Input className="w-full h-[50px] sm:h-[68px] px-3 mt-1 border border-[#60B5ff]" />
                                </div>
                            </div>

                            {/* 이메일 */}
                            <div className="w-full relative">
                                <div className="flex flex-col focus-within:text-[#ff9149] text-[#60B5ff]">
                                    <label className="text-[14px] sm:text-[16px] font-semibold text-inherit">
                                        이메일
                                    </label>
                                    <Input
                                        type="email"
                                        className="w-full h-[50px] sm:h-[68px] px-3 mt-1 pr-10 border border-[#60B5ff]"
                                    />
                                    <img
                                        src={emailNot}
                                        alt="이메일 유효하지 않음"
                                        className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] absolute right-3 bottom-4 sm:bottom-5"
                                    />
                                </div>
                            </div>

                            {/* 비밀번호 */}
                            <div className="w-full">
                                <div className="flex flex-col focus-within:text-[#ff9149] text-[#60B5ff]">
                                    <label className="text-[14px] sm:text-[16px] font-semibold text-inherit">
                                        비밀번호
                                    </label>
                                    <Input
                                        type="password"
                                        className="w-full h-[50px] sm:h-[68px] px-3 mt-1 border border-[#60B5ff]"
                                    />
                                </div>
                            </div>

                            {/* 비밀번호 확인 */}
                            <div className="w-full relative">
                                <div className="flex flex-col focus-within:text-[#ff9149] text-[#60B5ff]">
                                    <label className="text-[14px] sm:text-[16px] font-semibold text-inherit">
                                        비밀번호 확인
                                    </label>
                                    <Input
                                        type="password"
                                        className="w-full h-[50px] sm:h-[68px] px-3 mt-1 pr-10 border border-[#60B5ff]"
                                    />
                                    <img
                                        src={passwordNot}
                                        alt="비밀번호 일치하지 않음"
                                        className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] absolute right-3 bottom-4 sm:bottom-5"
                                    />
                                </div>
                            </div>

                            {/* 회원가입 버튼 */}
                            <Button
                                className="w-full max-w-[350px] h-[45px] sm:h-[54px] bg-[#60B5ff] text-[18px] sm:text-[24px] mt-[10px]"
                                style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.25)' }}
                            >
                                회원가입
                            </Button>
                        </form>
>>>>>>> 4c468f32df8cb9c0dac2b786e37b6a99bd86802e
                    </div>
                </div>
            </div>
        </div>
    );
}
