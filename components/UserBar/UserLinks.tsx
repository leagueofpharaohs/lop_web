import {LOGOUT} from "@/gql/mutation"
import {useMutation} from "@apollo/client"
import {jwtVerify} from "jose"
import Cookies from "js-cookie"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import {useRouter} from "next/router"
import React from "react"
import {AiFillSetting} from "react-icons/ai"
import {FaPowerOff} from "react-icons/fa"

const UserLinks = () => {
  const {t} = useTranslation("common")

  const [logOut] = useMutation(LOGOUT)

  const router = useRouter()

  const logoutMethod = async () => {
    try {
      await logOut()
      Cookies.remove("_at")
      Cookies.remove("_rt")
      router.push("/auth/login")
    } catch (e) {
      Cookies.remove("_at")
      Cookies.remove("_rt")
      router.push("/auth/login")
    }
  }

  const userLinks = [
    {
      title: t("settings"),
      name: "settings",
      href: "/user/settings",
      icon: <AiFillSetting className="text-sm" />,
      type: "link",
    },
    {
      title: t("logout"),
      name: "logout",
      icon: <FaPowerOff className="text-sm" />,
      type: "button",
      onclick: logoutMethod,
    },
  ]

  return (
    <React.Fragment>
      {userLinks.map((link, i) => (
        <React.Fragment key={i}>
          {link.type === "link" && (
            <Link
              href={link.href as string}
              className="flex flex-row w-full justify-start items-center py-2 px-4 gap-2 hover:bg-primary-100 capitalize"
            >
              {link.icon}
              {link.title}
            </Link>
          )}
          {link.type === "button" && (
            <button
              onClick={link.onclick as () => void}
              className="flex flex-row w-full justify-start items-center py-2 px-4 gap-2 hover:bg-primary-100 capitalize"
            >
              {link.icon}
              {link.title}
            </button>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default UserLinks
