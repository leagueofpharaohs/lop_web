import useTranslation from "next-translate/useTranslation"
import {useRouter} from "next/router"

import {useEffect, useState} from "react"

interface LastStepProps {
  currentStep: number
}

const LastStep = ({currentStep}: LastStepProps) => {
  const {t} = useTranslation("common")
  const [count, setCount] = useState(5)

  const route = useRouter()
  useEffect(() => {
    let interval: any
    if (count > 0 && currentStep === 4) {
      interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
    }

    if (count === 0) {
      route.push("/auth/login")
    }

    return () => {
      clearInterval(interval)
    }
  }, [count, currentStep, route])

  return (
    <div className="flex flex-col justify-center items-center gap-4 py-4">
      <div
        className=" bg-green-500 rounded-full flex justify-center items-center text-5xl font-bold text-white"
        style={{width: "5rem", height: "5rem"}}
      >
        &#10003;
      </div>
      <div className="text-2xl font-bold mt-4">{t("thankMsg")}</div>
      <span>
        {t("redirectionMsg")} {count} {t("sec")}
      </span>
    </div>
  )
}

export default LastStep
