import LogoImg from "../assets/images/headerLogoImg.svg";
import LogoText from "../assets/images/headerLogoText.svg";
export default function Header() {
  return (
    <>
      <header className="bg-[var(--color-header)] h-[65px]">
        <div className="max-w-8xl mx-auto px-[30px] sm:px-[50px] py-[10px]">
          <div className="flex justify-between">
            <div className="flex">
              <div className="items-center gap-3.5 flex-shrink-0 flex">
                <a>
                  <img
                    src={LogoImg}
                    alt="TravelMate 로고이미지"
                    className="h-11"
                  />
                </a>
                <a>
                  <img
                    src={LogoText}
                    alt="TravelMate 로고텍스트"
                    className="h-11"
                  />
                </a>
              </div>
            </div>
            <ul className="hidden sm:flex gap-[30px] items-center">
              <li className="montserrat text-[20px] w-[89px] text-center font-semibold text-[var(--color-main-blue)] cursor-pointer hover:font-bold hover:text-shadow-custom transition-all duration-200">
                Log Out
              </li>
              <li className="montserrat text-[20px] w-[92px] text-center font-semibold text-[var(--color-main-blue)] cursor-pointer hover:font-bold hover:text-shadow-custom transition-all duration-200">
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
