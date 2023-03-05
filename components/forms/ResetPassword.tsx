import Input from "@/components/Input"
import {RESET_PASSWORD} from "@/gql/mutation"
import {useMutation} from "@apollo/client"
import {useTheme} from "next-themes"

import useTranslation from "next-translate/useTranslation"
import {useRouter} from "next/router"
import {useForm} from "react-hook-form"

import {BsInfoCircle} from "react-icons/bs"
import {toast} from "react-toastify"

const ResetPasswordForm = () => {
  const {t} = useTranslation("common")

  const {theme} = useTheme()

  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors: formErrors, isValid},
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  })

  const passwordValidate = (value: string) => {
    const {password} = getValues()
    return password === value || "Passwords should match!"
  }

  const router = useRouter()

  const {uid} = router.query
  const {token} = router.query

  const [ResetPassword, {loading}] = useMutation(RESET_PASSWORD)

  const onSubmit = async (data: any) => {
    const {password} = data
    try {
      await ResetPassword({
        variables: {
          input: {
            id: uid,
            token,
            password,
          },
        },
      }).then((res) => {
        toast.success(res.data.resetPassword.message, {
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
      <div className="py-4 flex flex-col gap-6">
        <Input
          type={"password"}
          register={register}
          name="password"
          label={t("password")}
          required={true}
          minLength={8}
        />
        <div className="flex flex-col gap-2">
          <Input
            type={"password"}
            register={register}
            name="password2"
            label={t("rePassword")}
            required={true}
            minLength={8}
            validate={passwordValidate}
          />
          <div className="flex flex-row items-center text-xs gap-2 ">
            <BsInfoCircle />
            {t("passNote1")}
            <br /> {t("passNote2")}
          </div>
        </div>
      </div>

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

export default ResetPasswordForm
