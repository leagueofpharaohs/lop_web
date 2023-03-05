import {GET_USER_BY_ID} from "@/gql/query"
import {useQuery} from "@apollo/client"
import {BsThreeDots} from "react-icons/bs"
import {HiOutlineArrowUpTray} from "react-icons/hi2"
import {GiAnubis, GiTwoCoins} from "react-icons/gi"
import Skeleton from "react-loading-skeleton"
import {useEffect, useRef, useState} from "react"
import useTranslation from "next-translate/useTranslation"
import {kFormatter} from "@/utils/numberFormat"
import Link from "next/link"
import {toast} from "react-toastify"
import {useTheme} from "next-themes"
import {redirect} from "next/navigation"

const TokenTable = () => {
  const {data: userData, loading: userLoading} = useQuery(GET_USER_BY_ID)
  const [openAction, setOpenAction] = useState(false)

  const {theme} = useTheme()

  const {t} = useTranslation("common")

  const actionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let openHandler = (e: any) => {
      if (!actionRef.current?.contains(e.target)) {
        setOpenAction(false)
      }
    }

    window.addEventListener("click", openHandler)
    return () => {
      window.removeEventListener("click", openHandler)
    }
  }, [setOpenAction])

  const actionData = [
    {
      name: t("buyAction"),
      icon: <GiTwoCoins />,
      link: "/user/buy-token",
      type: "link",
    },
    {
      name: t("withdrawalAction"),
      icon: <HiOutlineArrowUpTray />,
      link: "/user/withdrawal",
      type: "button",
    },
  ]

  const balanceData = userData?.getUserById.balance

  const tokenTableHead = [
    t("tokenTitle"),
    t("lockedTitle"),
    t("unlockedTitle"),
    t("actionTitle"),
  ]
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="w-full grid grid-cols-12 justify-items-center bg-slate-100 dark:bg-slate-900 py-1 rounded-md text-sm capitalize">
        {tokenTableHead.map((item, index) => {
          return (
            <span
              className=" first-of-type:col-span-2 col-span-3 md:col-span-2 last-of-type:col-span-4 md:last-of-type:col-span-6"
              key={index}
            >
              {item}
            </span>
          )
        })}
      </div>
      <div className="text-sm grid grid-cols-12 justify-items-center items-center w-full bg-slate-100 dark:bg-slate-800 rounded-md py-1 shadow-md dark:shadow-layout-700/50">
        <span className="flex flex-row justify-start items-center gap-1 col-span-2 ">
          <span className="bg-slate-200 rounded-full text-slate-900 p-[2px] hidden md:block">
            <GiAnubis className=" text-xl " />
          </span>

          <span className="flex flex-col justify-center items-start text-xs">
            <span className=" font-semibold uppercase">lop</span>
            <span className="hidden md:block">leagueofpharahs</span>
          </span>
        </span>
        <span className="col-span-3 md:col-span-2 ">
          {userLoading || !userData ? (
            <Skeleton className=" w-16 h-4" />
          ) : (
            kFormatter(Number(balanceData?.totalLocked))
          )}
        </span>
        <span className="col-span-3 md:col-span-2 ">
          {userLoading || !userData ? (
            <Skeleton className=" w-16 h-4" />
          ) : (
            kFormatter(Number(balanceData?.totalUnlocked))
          )}
        </span>
        <span className=" hidden sm:flex col-span-4 md:col-span-6 flex-row justify-center items-center w-full gap-2 md:gap-6 px-4 capitalize tracking-wider rtl:tracking-wide">
          {actionData.map((item, index) => {
            return (
              <div key={index}>
                {item.type === "link" && (
                  <Link
                    href={item.link}
                    key={index}
                    className="flex flex-row justify-center items-center gap-2"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                )}
                {item.type === "button" && (
                  <button
                    key={index}
                    onClick={() => {
                      if (userData?.getUserById?.balance?.totalUnlocked == 0) {
                        toast.error(
                          "You don't have enough unlocked token to withdrawal",
                          {
                            autoClose: 5000,
                            theme: theme === "dark" ? "dark" : "light",
                          }
                        )
                      } else {
                        redirect(item.link)
                      }
                    }}
                    className="flex flex-row justify-center items-center gap-2"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                )}
              </div>
            )
          })}
        </span>
        <div
          ref={actionRef}
          className="flex col-span-4 sm:hidden justify-center items-center
         relative"
        >
          <button
            onClick={() => {
              setOpenAction(!openAction)
            }}
          >
            <BsThreeDots className="text-xl" />
          </button>
          {openAction && (
            <div className="flex flex-col gap-2 absolute -bottom-[4.5rem] ltr:right-0 rtl:left-0 bg-slate-100 dark:bg-layout-700 shadow-lg dark:shadow-slate-900 rounded-md overflow-hidden">
              {actionData.map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className="flex flex-row items-center gap-2 text-xs p-2 hover:bg-primary-100"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TokenTable
