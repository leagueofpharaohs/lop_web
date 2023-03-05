import Input from "@/components/Input"
import useTranslation from "next-translate/useTranslation"

import {InputTypes} from "./inpuTypes"

interface PersonalInfoProps extends InputTypes {}

const PersonalInfo = ({register}: PersonalInfoProps) => {
  const {t} = useTranslation("common")
  return (
    <div className="flex flex-col gap-6 py-4">
      <Input
        type={"text"}
        name="fullName"
        register={register}
        label={t("fullName")}
        required={true}
        pattern={/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/}
        minLength={4}
        maxLength={30}
      />
      <Input
        type="date"
        register={register}
        name="dateOfBirth"
        label={t("dateOfBirth")}
        required={true}
      />
    </div>
  )
}

export default PersonalInfo
