import useTranslation from "next-translate/useTranslation"

interface StepperControlProps {
  currentStep: number
  steps: string[]
  handleClick: (direction: string) => void
  disabled?: boolean
  loading?: boolean
}

const StepperControl = ({
  currentStep,
  steps,
  handleClick,
  disabled,
  loading,
}: StepperControlProps) => {
  const {t} = useTranslation("common")
  const style = {
    backBtn: `rounded-xl border-2 border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-900 py-2 px-4 uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white`,
    nextBtn: `rounded-lg bg-primary-100 disabled:bg-slate-400 dark:disabled:bg-slate-400 disabled:text-slate-500 dark:disabled:text-slate-500 y-2 py-2 px-4 uppercase text-white dark:text-slate-900 transition duration-200 ease-in-out hover:bg-primary-100/90 hover:text-white shadow-lg min-w-[6.25rem]`,
  }

  return (
    <div className="container flex justify-around">
      {currentStep <= steps.length && (
        <button
          type="button"
          onClick={() => {
            handleClick("back")
          }}
          className={`${style.backBtn} ${
            currentStep === 1 && " cursor-not-allowed opacity-50 "
          }`}
        >
          {t("Back")}
        </button>
      )}

      {currentStep < steps.length && (
        <button
          type="button"
          onClick={() => {
            handleClick("next")
          }}
          className={style.nextBtn}
          disabled={disabled}
        >
          {loading ? t("loading") : t("Next")}
        </button>
      )}

      {currentStep === steps.length && (
        <button
          type="submit"
          onClick={() => {
            handleClick("next")
          }}
          className={style.nextBtn}
          disabled={disabled}
        >
          {loading ? t("loading") : t("confirm")}
        </button>
      )}
    </div>
  )
}

export default StepperControl
