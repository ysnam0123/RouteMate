import useRandomBackgroundImage from '../hook/Homebackground.ts';

import homeButtonIcon from '../assets/icons/homeIcon.svg';
import searchIcon from '../assets/icons/Search.svg';
import homeLogo from '../assets/images/homeLogo.png';

export default function Home() {
    const backgroundImage = useRandomBackgroundImage();
    return (
        <>
            {/* 전체 div */}
            <div
                className="w-screen h-screen bg-cover bg-center leading-[1]  flex justify-evenly items-center "
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                {/* 왼쪽 wrapper */}
                <div
                    className="flex flex-col ml-[10px]
        "
                >
                    {/* 왼쪽 슬로건 */}
                    <h1 className="text-[96px] text-white font-bold ">
                        Days are yours, <br /> Routes are ours.
                    </h1>
                    {/* 여행이야기, 검색하기 */}
                    <div className="flex flex-row gap-25 ml-[150px] mt-[50px]">
                        <button
                            className="flex gap-2 items-center justify-center bg-[white] w-[155px] h-[50px] rounded-xl 
              hover:border-3 hover:border-[#4DACFF] hover:text-[#4DA0FF] 
              cursor-pointer
              transition-all duration-100 ease-in
              active:scale-95
              
              "
                        >
                            <img src={homeButtonIcon} alt="homeButtonIcon" />
                            <span className="mt-[4px] "> 여행 이야기</span>
                        </button>
                        <button
                            className="flex gap-2 items-center justify-center bg-[white] w-[155px] h-[50px] rounded-xl
              transition-all duration-100 ease-in
              cursor-pointer
            hover:border-3 hover:border-[#FF6A09] hover:text-[#FF6A09] 
            active:scale-95
            "
                        >
                            <img src={searchIcon} alt="searchIcon" />
                            <span className="mt-[4px]"> 검색하기 </span>
                        </button>
                    </div>
                </div>
                {/* 오른쪽 전체 wrapper */}
                <div
                    className="  w-[520px] h-[600px] bg-white
        flex flex-col items-center gap-15 rounded-xl
        shadow-[11px_12px_4px_rgba(0,0,0,0.25)] 
        
        "
                >
                    {/* 로고이미지, 텍스트 */}
                    <div className="mt-[75px] flex flex-col items-center gap-10">
                        <img src={homeLogo} alt="homeLogo" className="w-[102px] h-[110px]" />
                        <span className="text-[#FF9149] text-[50px] border-[#FF6A09] font-bold ">RouteMate</span>
                    </div>
                    {/* button box */}
                    <div className="flex flex-col gap-5">
                        <button
                            className="bg-[#60B5FF] w-[248px] h-[50px] rounded-[7px] font-semibold text-[22px] text-white shadow-[4px_6px_4px_rgba(0,0,0,0.25)]
              cursor-pointer
              hover:bg-[#3985C7] active:scale-95 transition-all duration-100 ease-in-out
"
                        >
                            Log In
                        </button>
                        <button
                            className="bg-[#FF9149] w-[248px] h-[50px] rounded-[7px] font-semibold text-[22px] text-white shadow-[4px_6px_4px_rgba(0,0,0,0.25)]
              cursor-pointer
              hover:bg-[#C36B32] active:scale-95 transition-all duration-100 ease-in-out
"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
