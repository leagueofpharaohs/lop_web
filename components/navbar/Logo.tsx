import React from "react"
import logo from "@/assets/images/logo.png"
import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link
      href={"/"}
      className=" absolute w-20 bg-slate-900 top-10 p-2 rounded-b-3xl z-40"
    >
      <Image src={logo} alt={"Logo"} priority />
    </Link>
  )
}
