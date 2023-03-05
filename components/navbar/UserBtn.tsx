import React from "react"
import {usePathname} from "next/navigation"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"

export default function UserBtn() {
  const {t} = useTranslation("common")

  const pathName = usePathname()

  const userBtns = [
    {
      btnName: t("signIn"),
      btnLink: "/auth/login",
      rounded: "rtl:rounded-r-lg ltr:rounded-l-lg",
    },
    {
      btnName: t("signUp"),
      btnLink: "/auth/register",
      rounded: "rtl:rounded-l-lg ltr:rounded-r-lg",
    },
  ]
  //TODO we need use name here
  return (
    <React.Fragment>
      <div className="flex flex-row items-center ltr:divide-x-2 divide-primary-dark">
        <React.Fragment>
          {userBtns.map((btn, i) => {
            return (
              <Link
                key={i}
                href={btn.btnLink}
                className={`capitalize px-2 tracking-wider hover:bg-primary-100 hover:text-slate-100 ${btn.rounded} py-1 text-sm`}
              >
                {btn.btnName}
              </Link>
            )
          })}
        </React.Fragment>
      </div>
    </React.Fragment>
  )
}
