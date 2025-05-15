import React from 'react';
import SidebarIsLogged from './SidebarIsLogged';
import { useAuthStore } from '../stores/authStore';
import SidebarIsNotLogged from './SidebarIsNotLogged';

export default function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isLoggedIn);
  return (
    <div className="flex">
      <div className="flex flex-1 min-h-screen">
        {isAuthenticated ? <SidebarIsLogged /> : <SidebarIsNotLogged />}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
