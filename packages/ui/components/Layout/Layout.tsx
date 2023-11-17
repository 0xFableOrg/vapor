import React from "react"

import Header from "./Header"
import LandingSection from "@components/LandingSection"

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="bg-black ">
        <Header />
        <LandingSection />
      </div>
      <div className="flex flex-col w-full bg-black grow">{children}</div>
    </div>
  )
}

export default Layout
