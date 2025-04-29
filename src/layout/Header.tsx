import Logo from "../assets/images/headerLogoImg.png";
export default function Header() {
  return (
    <>
      <header className="bg-[#EDF9FF] h-[65px]">
        <div className="max-w-8xl mx-auto px-[30px] sm:px-[50px] py-[10px]">
          <div className="flex justify-between">
            <div className="flex">
              <div className="items-center gap-5 flex-shrink-0 flex">
                <a>
                  <img src={Logo} alt="RouteMate 로고" className="h-11" />
                </a>
                <span className="montserrat text-[#F96300] text-[26px] font-bold w-[165px] h-[37px]">
                  RouteMate
                </span>
              </div>
            </div>
            <ul className="hidden sm:flex gap-[30px] items-center">
              <li className="montserrat text-[18px] w-[89px] text-center font-medium text-[#4DA0FF] cursor-pointer hover:text-[#FF9149] hover:font-bold hover:text-shadow-custom transition-all duration-200">
                Log Out
              </li>
              <li className="montserrat text-[18px] w-[92px] text-center font-medium text-[#4DA0FF] cursor-pointer hover:text-[#FF9149] hover:font-bold hover:text-shadow-custom transition-all duration-200">
                My Page
              </li>
            </ul>
          </div>
          <div className="flex items-center sm:hidden">
            {" "}
            <button className="inline-flex items-center justify-center">
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
