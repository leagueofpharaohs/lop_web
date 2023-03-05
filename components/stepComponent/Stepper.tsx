import React, {useState, useEffect, useRef} from "react"

interface StepperProps {
  steps: string[]
  currentStep: number
}

type step = {
  description: string
  completed: boolean
  highlighted: boolean
  selected: boolean
}

const Stepper = ({steps, currentStep}: StepperProps) => {
  const [newStep, setNewStep] = useState<step[]>([])
  const stepsRef = useRef()

  const updateStep = (stepNumber: number, steps: any) => {
    const newSteps = [...steps]

    let count = 0
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: false,
        }
        count++
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        }
        count++
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        }
        count++
      }
    }

    return newSteps
  }

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    )
    //@ts-ignore
    stepsRef.current = stepsState
    const current = updateStep(currentStep - 1, stepsRef.current)
    setNewStep(current)
  }, [steps, currentStep])

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-gray-400">
          <div
            className={`rounded-full transition duration-500 ease-in-out border-2 h-8 w-8 flex items-center justify-center py-3 ${
              step.selected
                ? "bg-primary-100 text-white dark:text-slate-600 font-bold border border-primary-100"
                : "border-gray-300 dark:border-gray-400"
            }`}
          >
            {step.completed ? (
              <span className="text-white dark:text-slate-600 font-bold text-xl">
                &#10003;
              </span>
            ) : (
              index + 1
            )}
          </div>
          <div
            className={`absolute top-0  text-center mt-10 w-32 text-xs font-medium uppercase ${
              step.highlighted
                ? "text-gray-900 dark:text-white"
                : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out  ${
            step.completed
              ? "border-yellow-light dark:border-yellow-dark"
              : "border-gray-300 dark:border-gray-400"
          }  `}
        ></div>
      </div>
    )
  })

  return (
    <div className="mx-4 px-4 pb-4 flex justify-between items-center">
      {stepsDisplay}
    </div>
  )
}
export default Stepper
