import {useWeb3ModalTheme} from "@web3modal/react"
import {motion} from "framer-motion"
import {useTheme} from "next-themes"
import React, {useEffect} from "react"
import {FaMoon, FaSun} from "react-icons/fa"

interface ToggleThemeProps {
  bgColor?: string
  pointerColor?: string
}

const ToggleTheme = ({bgColor, pointerColor}: ToggleThemeProps) => {
  const {theme, setTheme} = useTheme()
  const {theme: web3Theme, setTheme: web3SetTheme} = useWeb3ModalTheme()

  useEffect(() => {
    web3SetTheme({
      themeMode: theme === "dark" ? "dark" : "light",
      themeBackground: "gradient",
      themeColor: "orange",
    })
  }, [web3SetTheme, theme])

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {delay: 0.1}}}
    >
      <label
        htmlFor="toggle-theme"
        className={`${
          bgColor ? bgColor : "bg-slate-500"
        }  rounded-full cursor-pointer flex flex-row rtl:flex-row-reverse justify-between items-center p-1 relative h-[1rem] w-9 transform scale-150 text-[0.6rem]`}
      >
        <input
          type="checkbox"
          id="toggle-theme"
          className="peer opacity-0 absolute pointer-events-none"
          onChange={(e) => {
            setTheme(e.target.checked ? "dark" : "light")
          }}
          checked={theme === "dark"}
        />
        <FaMoon className="text-slate-200" />
        <FaSun className=" text-primary-100" />
        <div
          className={`${
            pointerColor ? pointerColor : "bg-slate-500"
          } rounded-full absolute top-[.12rem] left-[2px] w-3 h-3 ease-linear duration-100 peer-checked:translate-x-[1.2rem] shadow-md`}
        ></div>
      </label>
    </motion.div>
  )
}

export default ToggleTheme
