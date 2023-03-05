import React, {Dispatch} from "react"
import {useEffect, useRef, useState} from "react"

interface OTPProps {
  otp: string[]
  setOtp: Dispatch<React.SetStateAction<string[]>>
  width: string
  height: string
}
let currentOTPIdeax: number = 0
const OTP = ({otp, setOtp, width, height}: OTPProps) => {
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleOnchange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const {value} = target

    const newOtp: string[] = [...otp]
    newOtp[currentOTPIdeax] = value.substring(value.length - 1)
    if (!value) setActiveOTPIndex(currentOTPIdeax - 1)
    else setActiveOTPIndex(currentOTPIdeax + 1)

    setOtp([...newOtp])
  }

  const handleOnKeyDown = (
    {key}: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIdeax = index
    if (key === "Backspace") {
      setActiveOTPIndex(currentOTPIdeax - 1)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOTPIndex])
  return (
    <React.Fragment>
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={index === activeOTPIndex ? inputRef : null}
              value={otp[index]}
              type="number"
              className={` border-2 rounded w-${width} h-${height} spin-button-none text-2xl text-center focus:outline-none focus:border-yellow-light dark:focus:border-yellow-dark bg-transparent`}
              onChange={handleOnchange}
              onKeyDown={(e) => {
                handleOnKeyDown(e, index)
              }}
            />
            {index < otp.length - 1 && <span className="mx-2">-</span>}
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

export default OTP
