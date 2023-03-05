import Input from "@/components/Input"
import {SEND_FORGOT_PASSWORD_EMAIL} from "@/gql/mutation"
import {useMutation} from "@apollo/client"
import {useTheme} from "next-themes"
import useTranslation from "next-translate/useTranslation"
import {useRouter} from "next/router"

import {useState} from "react"
import {useForm} from "react-hook-form"
import {toast} from "react-toastify"

const ForgotPasswordForm = () => {
  const {t} = useTranslation("common")
  const router = useRouter()

  const {theme} = useTheme()

  const {
    register,
    handleSubmit,
    formState: {errors: formErrors, isValid},
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  })

  const [sendForgetPasswordEmail, {data, loading, error}] = useMutation(
    SEND_FORGOT_PASSWORD_EMAIL
  )

  const onSubmit = async (data: any) => {
    try {
      await sendForgetPasswordEmail({
        variables: {
          input: data.email,
        },
      }).then((res) => {
        toast.success(res.data.sendResetPasswordEmail.message, {
          autoClose: 5000,
          theme: theme === "dark" ? "dark" : "light",
        })
        router.push("/auth/login")
      })
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 5000,
        theme: theme === "dark" ? "dark" : "light",
      })
    }
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

      <div className={"w-full flex justify-end"}>
        <button
          className={`rounded-lg bg-primary-100 disabled:bg-slate-400 dark:disabled:bg-slate-400 disabled:text-slate-500 dark:disabled:text-slate-500 py-2  uppercase text-white dark:text-slate-900 transition duration-200 ease-in-out shadow-lg min-w-[6.25rem]`}
          disabled={!isValid || loading}
        >
          {t("continue")}
        </button>
      </div>
    </form>
  )
}

export default ForgotPasswordForm
