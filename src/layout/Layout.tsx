import React from 'react'
import Header from './Header'
import SidebarIsLogged from './SidebarIsLogged'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SidebarIsLogged />
      <main className="flex-grow">{children}</main>
    </div>
  )
}
