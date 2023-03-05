import Input from "@/components/Input"
import useTranslation from "next-translate/useTranslation"
import React from "react"
import {BsInfoCircle} from "react-icons/bs"
import {InputTypes} from "./inpuTypes"

interface PasswordStepProps extends InputTypes {
  passwordValidate: (value: string) => string | boolean
}

const PasswordStep = ({register, passwordValidate}: PasswordStepProps) => {
  const {t} = useTranslation("common")
  return (
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
  )
}

export default PasswordStep
