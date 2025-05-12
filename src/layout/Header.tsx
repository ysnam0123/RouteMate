import { useNavigate } from 'react-router';
import { axiosInstance } from '../api/axios';
import LogoImg from '../assets/images/headerLogoImg.svg';
import LogoText from '../assets/images/headerLogoText.svg';
import { useAuthStore } from '../stores/authStore';
export default function Header() {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();
    const logoutHandler = async () => {
        const { status } = await axiosInstance.post('/logout');
        if (status === 200) {
            console.log('logout');
            logout();
            navigate('/login');
        }
    };
    return (
        <>
            <header className="bg-[var(--color-header)] h-[85px]">
                <div className="max-w-8xl mx-auto px-[30px] sm:px-5 py-2.5 h-full">
                    <div className="flex justify-between h-full">
                        <div className="flex">
                            <div className="items-center gap-2.5 flex-shrink-0 flex">
                                <a>
                                    <img src={LogoImg} alt="TravelMate 로고이미지" className="h-11" />
                                </a>
                                <a>
                                    <img src={LogoText} alt="TravelMate 로고텍스트" className="h-11" />
                                </a>
                            </div>
                        </div>
                        <ul className="hidden sm:flex gap-[30px] items-center">
                            <li
                                className="montserrat text-xl w-[89px] text-center font-semibold text-[var(--color-notSelected)] cursor-pointer hover:font-bold hover:text-[var(--color-main-blue)] hover:text-shadow-custom transition-all duration-200"
                                onClick={logoutHandler}
                            >
                                Log Out
                            </li>
                            <li className="montserrat text-xl w-[92px] text-center font-semibold text-[var(--color-notSelected)] cursor-pointer hover:font-bold hover:text-[var(--color-main-blue)] hover:text-shadow-custom transition-all duration-200">
                                My Page
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center sm:hidden">
                        {' '}
                        <button className="inline-flex items-center justify-center">
                            <span className="sr-only">Open main menu</span>
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}
