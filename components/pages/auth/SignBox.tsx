import {BiLeftArrowAlt} from "react-icons/bi"
import useTranslation from "next-translate/useTranslation"
import Divider from "@/components/Divider"
import {GoogleLogin} from "@react-oauth/google"
import {ImSpinner9} from "react-icons/im"
import Link from "next/link"
import React, {useEffect} from "react"
import {useRouter} from "next/router"
import {toast} from "react-toastify"
import {useTheme} from "next-themes"
import {LOGIN_WITH_GOOGLE} from "@/gql/mutation"
import {useMutation} from "@apollo/client"
import Cookies from "js-cookie"

interface SignBoxProps {
  children: React.ReactNode
  title: string
  footerTitle: string
  footerUrl: string
  footerLinkText: string
  soicalAuth?: boolean
  loading?: boolean
  setLoading?: (loading: boolean) => void
}

const SignBox = ({
  children,
  title,
  footerTitle,
  footerUrl,
  footerLinkText,
  soicalAuth,
  loading,
  setLoading,
}: SignBoxProps) => {
  const {t} = useTranslation("common")

  const router = useRouter()

  const {theme} = useTheme()

  const [googleAuth, {data, loading: googleLoading, client}] =
    useMutation(LOGIN_WITH_GOOGLE)

  const googleSuccessAouth = async (credentialResponse: any) => {
    setLoading!(true)
    try {
      await googleAuth({
        variables: {
          input: credentialResponse.credential,
        },
      }).then((res) => {
        const accessToken = res.data.signIn.accessToken
        const refreshToken = res.data.signIn.refreshToken
        Cookies.set("_at", accessToken)
        Cookies.set("_rt", refreshToken)
      })

      client.resetStore()

      toast.success("login success", {
        autoClose: 5000,
        theme: theme === "dark" ? "dark" : "light",
      })
      router.push("/user/buy-token")
    } catch (error: any) {
      console.log(error)
      toast.error(error.massage, {
        autoClose: 5000,
        theme: theme === "dark" ? "dark" : "light",
      })
    }
    setLoading!(false)
  }

  return (
    <div className="shadow-lg dark:shadow-2xl w-max max-w-[22rem] border-t-2 border-l-2 border-t-white/20 dark:border-t-white/5 border-l-white/20 dark:border-l-white/5 rounded-lg divide-y-2 divide-slate-300 dark:divide-slate-600 min-w-[22rem]">
      <div className="flex flex-col gap-2 p-4">
        <Link href={"/"} className="flex flex-row items-center">
          <BiLeftArrowAlt className="rtl:rotate-180" />
          <span className="capitalize text-xs">{t("backHome")}</span>
        </Link>
        <div className="text-center capitalize font-semibold tracking-wider leading-loose ">
          <div>{title}</div>
          <span className="font-papyrus text-xl">league of pharaohs</span>
        </div>
        {children}

        {soicalAuth && (
          <React.Fragment>
            <Divider text={t("or")} />
            <div
              className={`${
                loading ? " pointer-events-none" : " pointer-events-auto"
              } w-full flex justify-center items-center bg-white min-h-[4rem] rounded-xl shadow-inner shadow-slate-400 dark:shadow-slate-700 relative`}
            >
              {loading && (
                <div className=" absolute text-slate-900 w-full h-full top-0 left-0 z-50 flex justify-center items-center backdrop-blur-[2px] backdrop-grayscale">
                  <ImSpinner9 className=" text-3xl text-primary-100 animate-spin" />
                </div>
              )}

              <GoogleLogin
                useOneTap={true}
                onSuccess={googleSuccessAouth}
                onError={() => {
                  console.log("Login Failed")
                }}
              />
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="px-4 py-2 capitalize text-center">
        {footerTitle}{" "}
        <Link className="text-primary-100 font-semibold" href={footerUrl}>
          {footerLinkText}
        </Link>
      </div>
    </div>
  )
}

export default SignBox
