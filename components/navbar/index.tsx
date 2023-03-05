import {motion} from "framer-motion"
import {jwtVerify} from "jose"
import Cookies from "js-cookie"
import {GetServerSideProps} from "next"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {useEffect, useRef, useState} from "react"
import {FaBars} from "react-icons/fa"
import Community from "../Community"
import ToggleLangBtn from "../ToggleLangBtn"
import ToggleTheme from "../ToggleTheme"
import Links from "./Links"
import Logo from "./Logo"
import UserBtn from "./UserBtn"

const NavBar = () => {
  const {t} = useTranslation("common")
  const [click, setClick] = useState(false)
  const [navBarHight, setNavBarHight] = useState(0)
  const [isUser, setIsUser] = useState(false)

  const sideNav = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClick = () => setClick(!click)

  const getUser = () => {
    try {
      const userToken = Cookies.get("_at")
      if (userToken) {
        setIsUser(true)
      } else {
        setIsUser(false)
      }
    } catch (e) {
      if (e) {
        setIsUser(false)
      }
    }
  }

  const pathName = usePathname()

  useEffect(() => {
    getUser()
    setNavBarHight(document.getElementById("main-nav")!.offsetHeight + 5)
  }, [click])

  useEffect(() => {
    let openHandler = (e: any) => {
      if (!sideNav.current?.contains(e.target)) {
        setClick(false)
      }
    }

    window.addEventListener("click", openHandler)
    return () => {
      window.removeEventListener("click", openHandler)
    }
  }, [])

  return (
    <div
      id="main-nav"
      className={`fixed 
       flex flex-col dark:bg-slate-800 shadow-md w-full top-0 z-[99]`}
    >
      <div className="flex flex-row justify-between items-center px-4 py-2 bg-slate-900 text-sm h-full w-full">
        <div className="flex flex-row gap-4 items-center h-full">
          <h2 className=" uppercase hidden md:block text-xs tracking-wider text-slate-100">
            {t("follow-us")} :
          </h2>
          <div className="noSicoalMedia">
            <Community isIcon={true} color={"text-slate-100"} />
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center h-full min-h-[28px]">
          <ToggleLangBtn
            boxStyle="bg-slate-900 text-slate-100 top-8 rounded-b-lg"
            textColor="text-slate-100"
            hoverColor="hover:bg-slate-600"
            rotateOpen={"rotate-180"}
            rotateClose={"rotate-0"}
          />
          <ToggleTheme bgColor="bg-slate-700" />
        </div>
      </div>
      <div
        className="flex flex-row gap-2 py-2 px-4 bg-layout-200 dark:bg-slate-800"
        ref={sideNav}
      >
        <Logo />
        {!pathName?.includes("user") && (
          <>
            <div className="flex flex-1 justify-end md:hidden cursor-pointer">
              <FaBars
                onClick={() => {
                  handleClick()
                }}
              />
            </div>
            <div
              className={` absolute ${
                click
                  ? "ltr:right-0 rtl:left-0 opacity-100"
                  : "ltr:-left-full rtl:-right-full opacity-0  md:opacity-100"
              } top-20 md:static md:flex-1 md:justify-end transition md:transition-none duration-500 ease-in-out`}
            >
              <div
                className="flex flex-col justify-between text-center md:flex-row md:justify-end md:items-center gap-6 py-6 px-6 md:px-0 md:py-0 md:h-full bg-slate-100 dark:bg-slate-800 md:bg-transparent shadow-lg md:shadow-none dark:md:bg-transparent"
                style={{height: `calc(100vh - ${navBarHight}px),`}}
              >
                <div className="flex flex-col md:flex-row gap-6 text-sm tracking-wider">
                  <Links handleClick={handleClick} />
                </div>

                {isUser ? (
                  <Link
                    href={"/user/buy-token"}
                    className=" hover:text-primary-100"
                  >
                    {t("dashboard")}
                  </Link>
                ) : (
                  <UserBtn />
                )}
              </div>
            </div>
          </>
        )}
        {pathName?.includes("user") && (
          <div className="flex justify-end w-full h-10"></div>
        )}
      </div>
    </div>
  )
}

export default NavBar
