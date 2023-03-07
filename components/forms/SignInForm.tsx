import {LOGIN} from "@/gql/mutation"
import {useMutation} from "@apollo/client"
import Cookies from "js-cookie"
import {useTheme} from "next-themes"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"
import Input from "../Input"

interface SignInFormProps {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export default function SignInForm({loading, setLoading}: SignInFormProps) {
  const {t} = useTranslation()

  const {theme} = useTheme()

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: {isValid},
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  })

  const [Login, {loading: loginLoading, error, data: loginData, client}] =
    useMutation(LOGIN)

  const onSubmit = async (data: any) => {
    setLoading(true)
    const {email, password} = data
    try {
      await Login({
        variables: {
          input: {
            email,
            password,
          },
        },
      })

      client.resetStore()

      toast.success("login success", {
        autoClose: 5000,
        theme: theme === "dark" ? "dark" : "light",
      })
      router.push("/user/buy-token")
      reset()
    } catch (error: any) {
      if (error.message === "email or password is incorrect") {
        toast.error(error.message, {
          autoClose: 5000,
          theme: theme === "dark" ? "dark" : "light",
        })
      } else {
        toast.error("Invalid credentials", {
          autoClose: 5000,
          theme: theme === "dark" ? "dark" : "light",
        })
      }
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
      <Input
        type={"email"}
        name={"email"}
        label={t("email")}
        register={register}
        required={true}
        pattern={
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
      />
      <div>
        <Input
          type={"password"}
          name={"password"}
          label={t("password")}
          register={register}
          required={true}
          minLength={8}
        />
        <Link
          href="/auth/forgot-password"
          className={"text-slate-500 font-semibold text-xs"}
        >
          {t("ForgotPassword")}
        </Link>
      </div>

      <div className={"w-full flex justify-end"}>
        <button
          type="submit"
          onClick={(e) => e.preventDefault}
          className={`rounded-lg bg-primary-100 disabled:bg-slate-400 dark:disabled:bg-slate-400 disabled:text-slate-500 dark:disabled:text-slate-500 py-2  uppercase text-white dark:text-slate-900 transition duration-200 ease-in-out shadow-lg min-w-[6.25rem]`}
          disabled={!isValid || loading || status === "authenticated"}
        >
          {t("continue")}
        </button>
      </div>
    </form>
  )
}
