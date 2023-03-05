import {MutableRefObject, useEffect, useRef, useState} from "react"

const formatTime = (time: any) => {
  let minutes: any = Math.floor(time / 60)
  let seconds: any = Math.round(time - minutes * 60)

  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
}

interface CountDownProps {
  countDownDate: number
  totalMin: number
  setIsCountDown?: (value: React.SetStateAction<boolean>) => void
}

const CountDown = ({
  countDownDate,
  totalMin,
  setIsCountDown,
}: CountDownProps) => {
  let timePlusmin = countDownDate + totalMin * 60 * 1000
  let distance = timePlusmin - countDownDate
  let distanceInSec = Math.floor((distance % (1000 * 60 * 60)) / 1000)
  const [countDown, setCountDown] = useState(distanceInSec)
  const timeId: any = useRef()

  useEffect(() => {
    timeId.current = setInterval(() => {
      setCountDown((prev) => prev - 1)
    }, 1000)
    return () => {
      clearInterval(timeId.current)
    }
  }, [countDownDate])

  useEffect(() => {
    if (countDown === 0) {
      clearInterval(timeId.current)
      setIsCountDown && setIsCountDown(false)
    }
  }, [countDown, setIsCountDown])

  return <div>{formatTime(countDown)}</div>
}

export default CountDown
