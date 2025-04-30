import Button from '../components/button';
import Input from '../components/Input';
import logo from '../assets/images/homeLogo.png';
import signInImg from '../assets/images/signInImg.png';

export default function Login() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[#daf0ff] px-4 py-8">
            <div className="flex w-full max-w-[1036px] h-[717px] bg-white rounded-[10px] overflow-hidden shadow-[0px_4px_30px_rgba(0,0,0,0.5)]">
                {/* 왼쪽 로그인 폼 영역 */}
                <div className="w-full md:w-[518px] h-[717px] flex justify-center items-start shadow-[0px_4px_15px_rgba(195,194,194,0.8)] p-6">
                    <div className="w-full max-w-[430px] px-4 pb-8">
                        {/* 로고 */}
                        <div className="flex justify-center mb-6">
                            <img src={logo} alt="로고" className="w-[95px] h-[102.91px] sm:w-[95px] sm:h-[102.91px]" />
                        </div>

                        {/* 제목 */}
                        <h1 className="text-[32px] sm:text-[32px] font-bold text-center mt-2">로그인</h1>

                        {/* 폼 */}
                        <form className="flex flex-col justify-between items-center pt-6 space-y-4">
                            {/* 아이디 입력 */}
                            <div className="w-full">
                                <div className="flex flex-col focus-within:text-[#ff9149] text-[#60B5ff]">
                                    <label className="text-[14px] sm:text-[16px] font-semibold">아이디</label>
                                    <Input className="w-full h-[50px] sm:h-[68px] px-3 mt-2 border border-[#60B5ff]" />
                                </div>
                            </div>

                            {/* 비밀번호 입력 */}
                            <div className="w-full">
                                <div className="flex flex-col focus-within:text-[#ff9149] text-[#60B5ff]">
                                    <label className="text-[14px] sm:text-[16px] font-semibold">비밀번호</label>
                                    <Input
                                        type="password"
                                        className="w-full h-[50px] sm:h-[68px] px-3 mt-2 border border-[#60B5ff]"
                                    />
                                </div>
                            </div>

                            {/* 비밀번호찾기, 처음이신가요? */}
                            <div className="flex justify-between text-xs sm:text-sm w-full mt-2">
                                <span className="text-[#2E5D87] cursor-pointer">비밀번호 찾기</span>
                                <span className="text-[#ff9149] cursor-pointer">RouteMate가 처음이신가요?</span>
                            </div>

                            {/* 로그인 버튼 */}
                            <Button
                                className="w-full max-w-[350px] h-[68px] sm:h-[68px] bg-[#60B5ff] text-[18px] sm:text-[24px] mt-16"
                                style={{ boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)' }}
                            >
                                로그인
                            </Button>
                        </form>
                    </div>
                </div>

                {/* 오른쪽 이미지 영역 */}
                <div className="hidden md:flex w-[518px] h-[717px] justify-center items-center shadow-[0px_4px_15px_rgba(0,0,0,0.1)]">
                    <img src={signInImg} alt="로그인 사진" className="w-[411px] h-[614px]" />
                </div>
            </div>
        </div>
    );
}
