import {useEffect, useState} from "react"
import EmailStep from "./signUpSteps/EmailStep"
import PasswordStep from "./signUpSteps/PasswordStep"
import PersonalInfo from "./signUpSteps/PersonalInfo"
import {useForm} from "react-hook-form"
import {BiErrorCircle} from "react-icons/bi"
import LastStep from "./signUpSteps/LastStep"
import useTranslation from "next-translate/useTranslation"
import Stepper from "../stepComponent/Stepper"
import StepperControl from "../stepComponent/StepperControl"
import {useMutation} from "@apollo/client"
import {REGISTER} from "@/gql/mutation"

export let errorContainer = (error: string) => {
  return (
    <div
      className="flex flex-row items-center gap-2 text-sm"
      style={{color: "rgb(237,67,55)"}}
    >
      <BiErrorCircle />
      {error}
    </div>
  )
}

export default function SignupForm() {
  const [isEmailValied, setIsEmailValied] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const {t} = useTranslation("common")
  useEffect(() => {
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    })
  }, [])

  const {
    register,
    handleSubmit,
    watch,
    formState: {errors: formErrors, isValid},
    getValues,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  })

  const passwordValidate = (value: string) => {
    const {password} = getValues()
    return password === value || "Passwords should match!"
  }

  const steps = [t("email"), t("password"), t("personalInfo")]

  const displayStep = (step: any) => {
    switch (step) {
      case 1:
        return (
          <EmailStep
            register={register}
            email={watch("email")}
            formState={formErrors}
            isEmailValied={isEmailValied}
            setIsEmailValied={setIsEmailValied}
            setCurrentStep={setCurrentStep}
            isValid={isValid}
          />
        )
      case 2:
        return (
          <PasswordStep
            register={register}
            passwordValidate={passwordValidate}
          />
        )
      case 3:
        return <PersonalInfo register={register} />
      case 4:
        return <LastStep currentStep={currentStep} />
      default:
    }
  }

  const handleClick = async (direction: string) => {
    let newStep = currentStep
    direction === "next" ? newStep++ : newStep--
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep)
  }

  const [registerUser, {loading}] = useMutation(REGISTER)

  const onSubmit = async (data: any) => {
    const birthDate = new Date(data.dateOfBirth).getTime().toString()
    const fullName = data.fullName.trim().toLowerCase()
    try {
      await registerUser({
        variables: {
          input: {
            email: data.email,
            fullName: fullName,
            birthDate: birthDate,
            password: data.password,
            isEmailVerified: isEmailValied,
          },
        },
      }).then((res) => {
        setCurrentStep(currentStep + 1)
      })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
      <Stepper steps={steps} currentStep={currentStep} />
      <div>
        {" "}
        {displayStep(currentStep)}
        {formErrors.email?.type === "required" &&
          currentStep === 1 &&
          errorContainer(t("emailEequired"))}
        {formErrors.email?.type === "pattern" &&
          currentStep === 1 &&
          errorContainer(t("invalidEmail"))}
        {formErrors.password?.type === "required" &&
          currentStep === 2 &&
          errorContainer(t("passwordRequired"))}
        {formErrors.password?.type === "minLength" &&
          currentStep === 2 &&
          errorContainer(t("passwordNotLonger"))}
        {formErrors.password2?.type === "validate" &&
          currentStep === 2 &&
          errorContainer(t("passwordsShouldMatch"))}
        {formErrors.fullName?.type === "required" &&
          currentStep === 3 &&
          errorContainer(t("nameRequired"))}
        {formErrors.fullName?.type === "pattern" &&
          currentStep === 3 &&
          errorContainer(t("onlyLetters"))}
        {formErrors.dateOfBirth?.type === "Date of birth is required" &&
          currentStep === 3 &&
          errorContainer(t("dateRequired"))}
      </div>

      {currentStep > 1 && (
        <StepperControl
          currentStep={currentStep}
          steps={steps}
          handleClick={handleClick}
          disabled={!isValid || loading}
          loading={loading}
        />
      )}

      {currentStep === steps.length && (
        <div className="text-xs">
          {t("BySigningUp")}
          <br /> {t("BySigningUp2")}
        </div>
      )}
    </form>
  )
}
