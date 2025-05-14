import React from 'react';
import SidebarIsLogged from './SidebarIsLogged';
import { useAuthStore } from '../stores/authStore';
import SidebarIsNotLogged from './SidebarIsNotLogged';

export default function Layout({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isLoggedIn);
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1 overflow-hidden">
                {isAuthenticated ? <SidebarIsLogged /> : <SidebarIsNotLogged />}
                <main className="flex-1 overflow-y-auto p-4">{children}</main>
            </div>
        </div>
    );

