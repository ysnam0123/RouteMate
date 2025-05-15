import useRandomVideo from '../hook/RandomVideo';
import Button from '../components/button';
import homeButtonIcon from '../assets/icons/homeIcon.svg';
import homeLogo from '../assets/images/homeLogo.svg';
import Footer from '../layout/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    // 라우팅
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/Login');
    };

    const goToRegister = () => {
        navigate('/Register');
    };

    const goToChannel = () => {
        navigate('/Channel');
    };
    const video = useRandomVideo();
    return (
        <div className="w-screen h-screen bg-cover overflow-hidden fixed">
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={video} type="video/mp4" />
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
            <div className="z-20 relative flex justify-evenly items-center h-full min-h-screen">
                {/* 왼쪽 */}
                <div>
                    <h1 className="text-[110px] text-white font-bold leading-[1]">
                        Days are yours, <br /> Route are ours.
                    </h1>
                    {/* 여행이야기, 검색하기 */}
                    <div className="flex flex-row gap-30 ml-[150px] mt-[50px]">
                        <Button
                            className="flex gap-2 items-center justify-center bg-[white] w-[400px] h-[50px] text-black
              hover:border-2 hover:border-[var(--color-main-navy)] hover:text-black"
                            onClick={goToChannel}
                        >
                            <img src={homeButtonIcon} alt="homeButtonIcon" />
                            <span className="mt-[4px] "> 여행 이야기</span>
                        </Button>
                        {/* <Button
                            className="flex gap-2 items-center justify-center bg-[white] w-[155px] h-[50px] text-black
            hover:border-2 hover:border-[var(--color-main-navy)] hover:text-black"
                            onClick={goToChannel}
                        >
                            <img src={searchIcon} alt="searchIcon" />
                            <span className="mt-[4px]"> 검색하기 </span>
                        </Button> */}
                    </div>
                </div>
                {/* 오른쪽 */}
                {/* 오른쪽 전체 wrapper */}
                <div
                    className="  w-[450px] h-[600px] bg-white
        flex flex-col items-center gap-15 rounded-xl
        shadow-[11px_12px_4px_rgba(0,0,0,0.25)] 
        
        "
                >
                    {/* 로고이미지, 텍스트 */}
                    <div className="mt-[75px] flex flex-col items-center gap-10">
                        <img src={homeLogo} alt="homeLogo" className="w-[102px] h-[110px]" />
                        <span className="text-black text-[50px] font-bold ">
                            Travel <span className="text-[#60B5FF]">Mate</span>
                        </span>
                    </div>
                    {/* button box */}
                    <div className="flex flex-col gap-5">
                        <Button
                            className="bg-[#063579] w-[248px] h-[50px] text-[22px]  hover:bg-[#001A40] shadow-[4px_6px_4px_0_rgba(0,0,0,0.25)]"
                            onClick={goToLogin}
                        >
                            Log In
                        </Button>
                        <Button
                            className="bg-white w-[248px] h-[50px]  text-[22px] text-black hover:bg-[#B4B4B4] shadow-[4px_6px_4px_0_rgba(0,0,0,0.25)]"
                            onClick={goToRegister}
                        >
                            Register
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
