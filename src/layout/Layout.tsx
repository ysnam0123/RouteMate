import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div className="flex flex-1 min-h-screen">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-4">{children || <Outlet />}</main>
            </div>
        </div>
    );
}
