import {GET_USER_BY_ID} from "@/gql/query"
import {useQuery} from "@apollo/client"
import {Web3Button} from "@web3modal/react"
import useTranslation from "next-translate/useTranslation"
import {usePathname} from "next/navigation"
import React from "react"
import Skeleton from "react-loading-skeleton"
import ToggleTheme from "./ToggleTheme"
import Links from "./UserBar/Links"

const UserNavbar = () => {
  const {data, loading} = useQuery(GET_USER_BY_ID)
  const {t} = useTranslation("common")
  const links = Links()
  const pathName = usePathname()

  return (
    <div className="py-1 px-1 sm:px-4 border-b-2 dark:border-slate-700/50">
      <div className="w-full flex justify-center items-center min-h-[24px]"></div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col">
          {loading ? (
            <Skeleton height={15} />
          ) : (
            <span className="text-sm tracking-wider">
              <span className=" uppercase">{t("welcome")} </span>
              {data?.getUserById?.fullName.split(" ")[0]}{" "}
              {data?.getUserById?.fullName.split(" ")[1]}
            </span>
          )}
          <h1 className="text-xl uppercase ltr:tracking-widest rtl:tracking-wide font-semibold">
            {links.map((link, index) => {
              return (
                <React.Fragment key={index}>
                  {pathName?.includes(link.name) && <span>{link.title}</span>}
                </React.Fragment>
              )
            })}
          </h1>
        </div>
        <div className="flex flex-row justify-center items-center gap-2 my-1">
          {/* <button className=" bg-primary-100 py-1 px-2 rounded-md text-slate-900">
            {t("connectWallet")}
          </button> */}
          <Web3Button icon="hide" label="Connect wallet" />
          <div className="hidden">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar
