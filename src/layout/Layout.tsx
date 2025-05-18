import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import modeToggle from '../assets/icons/modeToggle.svg';
import modeToggleDark from '../assets/icons/modeToggleDark.svg';
import { useDarkModeStore } from '../stores/darkModeStore';

export default function Layout({ children }: { children?: React.ReactNode }) {
    const { isDarkMode, toggleDarkMode } = useDarkModeStore();
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="h-screen w-screen flex flex-col">
            {/* 헤더 */}
            <div className="h-[85px] w-full fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>

            <div className="flex flex-row pt-[85px] h-full">
                {/* 사이드바 */}
                <div className="transition-all duration-300">
                    <Sidebar />
                </div>

                {/* 본문 */}
                <main className="flex-grow bg-[var(--color-main-bg)] overflow-y-auto relative transition-all duration-300">
                    {children || <Outlet />}
                    <button onClick={toggleDarkMode} className="absolute right-[30px] top-[90%] hover:scale-[1.1]">
                        <img
                            src={isDarkMode ? modeToggleDark : modeToggle}
                            alt="toggle"
                            className="w-[60px] h-[60px]"
                        />
                    </button>
                </main>
            </div>
        </div>
    );
}
