import Footer from "@/components/Footer"
import NavBar from "@/components/navbar"
import React from "react"
import {ReactNode} from "react"

export default function HomeLayout(child: ReactNode) {
  return (
    <React.Fragment>
      <NavBar />
      {child}
      <Footer />
    </React.Fragment>
  )
}
