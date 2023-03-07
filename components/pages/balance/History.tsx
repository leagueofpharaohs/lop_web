import {GET_USER_BY_ID} from "@/gql/query"
import {useQuery} from "@apollo/client"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import {useRouter} from "next/router"
import {useEffect, useRef, useState} from "react"
import {AiOutlineHistory} from "react-icons/ai"
import {BsThreeDots} from "react-icons/bs"
import BuyTable from "./BuyTable"

const History = () => {
  const {data: userData, loading: userLoading} = useQuery(GET_USER_BY_ID)

  const route = useRouter()

  const {t} = useTranslation("common")

  const [openAction, setOpenAction] = useState(false)

  const historyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let openHandler = (e: any) => {
      if (!historyRef.current?.contains(e.target)) {
        setOpenAction(false)
      }
    }

    window.addEventListener("click", openHandler)
    return () => {
      window.removeEventListener("click", openHandler)
    }
  }, [setOpenAction])

  const {tab} = route.query

  const subLink = [
    {
      name: t("buyTokens"),
      href: "/user/balance",
      tab: "buy",
    },
    // {
    //   name: t("withdrawal"),
    //   href: "/user/balance",
    //   tab: "withdrawal",
    // },
  ]
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-1 flex-row items-center gap-1 capitalize text-xl border-b-2 dark:border-slate-700/50">
        <AiOutlineHistory />
        <h2>{t("History")}</h2>
        <div className="hidden sm:flex flex-row text-sm justify-start items-end gap-6 px-6 h-full w-full">
          {subLink.map((link, i) => {
            return (
              <Link
                href={{
                  pathname: link.href,
                  query: {tab: link.tab},
                }}
                as={link.href}
                key={i}
                className={`${
                  link.tab === tab
                    ? "border-primary-100 text-primary-100"
                    : "border-transparent text-slate-900 dark:text-slate-100"
                } border-b-2 pb-2`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
        <div
          ref={historyRef}
          className="flex col-span-4 sm:hidden justify-center items-center
         relative px-4"
        >
          <button
            onClick={() => {
              setOpenAction(!openAction)
            }}
          >
            <BsThreeDots className="text-xl" />
          </button>
          {openAction && (
            <div className="flex flex-col gap-2 absolute top-5 ltr:right-0 rtl:left-0 bg-slate-100 dark:bg-layout-700 shadow-lg dark:shadow-slate-900 rounded-md overflow-hidden z-50">
              {subLink.map((item, index) => (
                <Link
                  key={index}
                  href={{
                    pathname: item.href,
                    query: {tab: item.tab},
                  }}
                  as={item.href}
                  className="flex flex-row items-center gap-2 text-xs p-2 hover:bg-primary-100"
                >
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <BuyTable tab={tab} />
    </div>
  )
}

export default History
