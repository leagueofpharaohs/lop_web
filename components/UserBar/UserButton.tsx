/* eslint-disable @next/next/no-img-element */
import {GET_USER_BY_ID} from "@/gql/query"
import {useImageGenerator} from "@/hooks/useImageGenerator"
import {useQuery} from "@apollo/client"
import {motion} from "framer-motion"
import {MutableRefObject, useEffect, useRef, useState} from "react"
import {BsChevronDoubleRight} from "react-icons/bs"
import ToggleLangBtn from "../ToggleLangBtn"
import ToggleTheme from "../ToggleTheme"
import CircleBar from "./CircleBar"
import UserLinks from "./UserLinks"

interface UserButtonProps {
  initial?: any
  animate?: any
}

const UserButton = ({initial, animate}: UserButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const {data, loading} = useQuery(GET_USER_BY_ID)

  const avatar = data?.getUserById?.avatar

  const {image} = useImageGenerator(data?.getUserById?.fullName)

  const userButtonRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [userButtonRef])
  return (
    <div className="relative " ref={userButtonRef}>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className="p-4 flex flex-row justify-center items-center gap-2 w-full relative"
      >
        <div className=" w-16 h-16 lg:w-32 lg:h-32 rounded-full flex justify-center items-center nm-flat-slate-100 dark:nm-flat-layout-600-lg">
          <div className=" w-12 h-12 lg:w-24 lg:h-24 rounded-full nm-inset-slate-100 dark:nm-inset-layout-600-lg relative z-40 flex justify-center items-center">
            <img
              src={avatar ? avatar : image}
              alt="avatar"
              className=" rounded-full w-[40px] h-[40px] lg:w-[86px] lg:h-[86px]"
            />
          </div>
        </div>
        <div className=" absolute top-[.88rem] left-[.88rem] lg:top-[.98rem] lg:left-[0.98rem] lg:rtl:left-[2.55rem] ">
          <CircleBar />
        </div>
        <BsChevronDoubleRight className="text-lg rtl:rotate-180 hidden lg:inline-block" />
      </button>
      {isOpen && (
        <motion.div
          initial={{...initial}}
          animate={{...animate}}
          className="absolute bg-slate-100 dark:bg-layout-600 z-10 flex flex-col justify-center items-start divide-y-2 dark:divide-slate-800 rounded"
        >
          <div className="py-2 px-4">
            <span className="rtl:hidden">
              <ToggleLangBtn
                boxStyle={"bg-slate-100 dark:bg-layout-600 rounded-lg"}
                position={{y: 30, x: 100}}
                hoverColor={"hover:bg-primary-100"}
                rotateOpen={"rotate-0"}
                rotateClose={"-rotate-90"}
              />
            </span>
            <span className="hidden rtl:inline-block">
              <ToggleLangBtn
                boxStyle={"bg-slate-100 dark:bg-layout-600 rounded-lg"}
                position={{y: 30, x: -98}}
                hoverColor={"hover:bg-primary-100"}
                rotateOpen={"rotate-0"}
                rotateClose={"rotate-90"}
              />
            </span>
          </div>
          <UserLinks />
          <div className="w-full flex justify-center p-2">
            <ToggleTheme bgColor="bg-slate-300 dark:bg-layout-700" />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default UserButton
