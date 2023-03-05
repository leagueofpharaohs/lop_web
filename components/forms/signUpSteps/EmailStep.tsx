import CountDown from "@/components/CountDown"
import Input from "@/components/Input"
import OTP from "@/components/OTP"
import {
  CONFIRM_CODE,
  IS_USER_EXIST,
  SEND_CONFIREMATION_CODE,
} from "@/gql/mutation"
import {useMutation} from "@apollo/client"
import {useTheme} from "next-themes"
import useTranslation from "next-translate/useTranslation"
import React, {useState} from "react"
import {BsCheckCircleFill} from "react-icons/bs"
import {toast} from "react-toastify"
import {InputTypes} from "./inpuTypes"

interface EmailStepProps extends InputTypes {
  email: string
  formState: any
  isEmailValied: boolean
  setIsEmailValied: (val: boolean) => void
  setCurrentStep: (val: number) => void
  isValid: boolean
}

const EmailStep = ({
  register,
  email,
  formState,
  isEmailValied,
  setIsEmailValied,
  setCurrentStep,
  isValid,
}: EmailStepProps) => {
  const [nextEmailStep, setNextEmailStep] = useState(false)
  const [countDownDate, setCountDownDate] = useState<number>(0)
  const [isCountDown, setIsCountDown] = useState(false)
  const [inProssess, setInProssess] = useState(false)
  const {theme} = useTheme()

  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""))
  const {t} = useTranslation("common")

  const [isUserExist, {data, loading, error}] = useMutation(IS_USER_EXIST, {
    variables: {
      input: email,
    },
  })

  const [
    sendConfirmEmail,
    {loading: loadingSendConfirmEmail, error: errorSendConfirmEmail},
  ] = useMutation(SEND_CONFIREMATION_CODE, {
    variables: {
      input: {
        email: email,
      },
    },
  })

  const [confirmEmail, {error: errorConfirmEmail}] = useMutation(CONFIRM_CODE, {
    variables: {
      input: {
        email: email,
        code: otp.toString().replace(/,/g, ""),
        confiremStep: "register",
      },
    },
  })
  const sendEmailFunc = async () => {
    await sendConfirmEmail()
    setCountDownDate(Date.now())
    setIsCountDown(true)
    setNextEmailStep(true)
  }

  const handleClick = async () => {
    setInProssess(true)
    if (isEmailValied) {
      setCurrentStep(2)
      setInProssess(false)
    } else {
      setInProssess(true)
      await isUserExist().then((res) => {
        if (res.data.isUserExists === false && !isEmailValied) {
          sendEmailFunc()
          setInProssess(false)
        } else {
          setInProssess(false)
          setNextEmailStep(false)
          setIsCountDown(false)
        }
        if (res.data.isUserExists === true) {
          let useExistMsg = t("emailExist")
          toast.error(useExistMsg, {
            autoClose: 5000,
            theme: theme === "dark" ? "dark" : "light",
          })
          setInProssess(false)
        }
      })
    }
  }
  const handleConfirmOtp = async () => {
    try {
      await confirmEmail().then((res) => {
        toast.success(res.data.confirmEmail.message, {
          autoClose: 5000,
          theme: theme === "dark" ? "dark" : "light",
        })
        setIsEmailValied(true)
        setCurrentStep(2)
      })
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 5000,
        theme: theme === "dark" ? "dark" : "light",
      })
    }
  }

  const handleResend = async () => {
    try {
      await sendEmailFunc()
      toast.success("email have been send"),
        {
          autoClose: 5000,
          theme: theme === "dark" ? "dark" : "light",
        }
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex flex-row justify-center items-center gap-2">
        <div
          className={`${
            isEmailValied && "pointer-events-none opacity-40"
          } flex-1`}
        >
          <Input
            type={"email"}
            name={"email"}
            register={register}
            label={t("email")}
            required={true}
            pattern={
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
          />
        </div>
        {isEmailValied && <BsCheckCircleFill className="text-green-500" />}
      </div>
      <div className="text-xs ">{t("emailNote")}</div>
      {nextEmailStep && !isEmailValied && (
        <div className="w-full">
          <div className="flex flex-row rtl:flex-row-reverse justify-around items-center ">
            <div className="flex flex-row rtl:flex-row-reverse justify-center items-center">
              <OTP otp={otp} setOtp={setOtp} width="8" height="8" />
            </div>
            <button
              type="button"
              className="bg-primary-100 min-w-[4rem] text-sm py-1 rounded-md shadow-lg disabled:bg-slate-400 dark:disabled:bg-slate-400 disabled:text-slate-500 dark:disabled:text-slate-500 uppercase text-white dark:text-slate-900 transition duration-200 ease-in-out"
              disabled={isCountDown}
              onClick={handleResend}
            >
              {isCountDown ? (
                <CountDown
                  countDownDate={countDownDate}
                  totalMin={3}
                  setIsCountDown={setIsCountDown}
                />
              ) : (
                "resend"
              )}
            </button>
          </div>
          <div>
            <p className="text-xs leading-4 text-center pt-2">
              {t("confirmEmailNote")}
            </p>
          </div>
        </div>
      )}

      <div className={"w-full flex justify-end"}>
        <button
          type="button"
          onClick={() => {
            !nextEmailStep ? handleClick() : handleConfirmOtp()
          }}
          className={`rounded-lg bg-primary-100 disabled:bg-slate-400 dark:disabled:bg-slate-400 disabled:text-slate-500 dark:disabled:text-slate-500 py-2  uppercase text-white dark:text-slate-900 transition duration-200 ease-in-out shadow-lg min-w-[6.25rem]`}
          disabled={
            formState.isSubmitting ||
            loading ||
            loadingSendConfirmEmail ||
            inProssess ||
            !isValid
          }
        >
          {loading || inProssess ? "Loading..." : t("Next")}
        </button>
      </div>
    </div>
  )
}

export default EmailStep
