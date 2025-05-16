import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <div className="h-screen w-screen overflow-hidden">
            {/* 헤더 고정 */}
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>

            {/* 사이드바 고정 */}
            <div className="fixed top-[85px] left-0 z-40">
                <Sidebar />
            </div>

            {/* 본문 영역 */}
            <main className="ml-[240px] mt-[85px] h-[calc(100vh-85px)] overflow-y-auto">{children || <Outlet />}</main>
        </div>
    );
}
