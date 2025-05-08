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
                    </div>
                </div>
            </div>
        </div>
    );
}
