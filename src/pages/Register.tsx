import React, { useState } from 'react';
import Button from '../components/button';
import Input from '../components/Input';
import passport from '../assets/images/passportImg.svg';
import emailNot from '../assets/icons/emailNotOk.png';
import emailOk from '../assets/icons/emailOk.png';
import passwordNot from '../assets/icons/passwordNotOk.svg';
import passwordOk from '../assets/icons/passwordOk.svg';
import useRandomVideo from '../hook/RandomVideo';
import { useNavigate } from 'react-router';
import { axiosInstance } from '../api/axios';
import axios from 'axios';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const video = useRandomVideo();
  const navigate = useNavigate();

  // 이메일 올바르게 쳤나 확인
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    // 이메일 형식이 맞는지 정규표현식으로 체크
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(value));
  };

  const handleFullnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  // 회원가입 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || password !== confirmPassword) {
      alert('입력값을 확인해주세요.');
      return;
    }

    try {
      await axiosInstance.post('/signup', {
        email,
        fullName,
        password,
      });

      alert('회원가입 성공!');
      // 입력값 초기화
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsEmailValid(false);
      navigate('/login');
    } catch (err: unknown) {
      console.error('회원가입 에러:', err);
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || err.message;
        alert(`회원가입 실패: ${message}`);
      } else {
        alert('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[var(--color-darkNavy)]">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="relative w-[650px] h-[750px] bg-[var(--color-white)] rounded-[30px] flex flex-col mb-[150px]">
        {/* 상단 */}
        <div className="w-[650px] h-[440px] flex items-center justify-center relative border-b-[3px] border-[var(--color-black)]">
          <div className="absolute left-0 top-0 bottom-0 w-[2px]" />
          <img
            src={passport}
            alt="여권정보 사진"
            className="w-[702px] h-[305px] object-contain z-10"
          />
        </div>

        {/* 하단 */}
        <div className="w-[650px] h-[365px] bg-[var(--color-white)] flex relative">
          {/* 로그인글씨 */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            {/* 왼쪽 막대 */}
            <div className="w-[205px] h-[15px] bg-[var(--color-main-navy)] rounded-[15px]" />

            {/* 텍스트 */}
            <div className="w-[147px] h-[54px] text-[35px] text-center text-[var(--color-black)]">
              Register
            </div>

            {/* 오른쪽 막대 */}
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
                <Input
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={handleFullnameChange}
                />
              </div>

              {/* 이메일 */}
              <div className="flex flex-col relative">
                <label htmlFor="email" className="text-[var(--color-black)]">
                  Passanger email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
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
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {/* 비밀번호 확인 */}
              <div className="flex flex-col relative">
                <label
                  htmlFor="confirm-password"
                  className="text-[var(--color-black)]"
                >
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
                    password !== '' &&
                    confirmPassword !== '' &&
                    password === confirmPassword
                      ? passwordOk
                      : passwordNot
                  }
                  alt={
                    password !== '' &&
                    confirmPassword !== '' &&
                    password === confirmPassword
                      ? '비밀번호 일치'
                      : '비밀번호 일치하지 않음'
                  }
                  className="w-[20px] h-[20px] absolute right-3 bottom-3"
                />
              </div>
            </div>

            {/* 제출 버튼 */}
            <Button
              type="submit"
              className="self-center mt-5 w-[200px] h-[50px]"
            >
              회원가입
            </Button>
          </form>
        </div>

        {/* 여권 하단 장식 */}
        <div className="h-[75px] px-7 pt-3 bg-[var(--color-lightGray)] rounded-b-[30px]">
          <div className="w-[630px] text-[14px] text-[var(--color-black)]">
            {
              '<<< ROUTE <<< MATE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'
            }
            <br />
            {
              ' <<< AB586511 <<<<<<<<<<<<<<<<< R <<<<<< 185651321854 <<<<<<<<<<<<<<<<<<<<'
            }
          </div>
        </div>
      </div>
    </div>
  );
}
