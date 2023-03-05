import {motion} from "framer-motion"
import {useEffect, useRef} from "react"
import {MutableRefObject, useState} from "react"
import {IoIosArrowDown} from "react-icons/io"

interface DropDownComponentProps {
  children: React.ReactNode
  title: any
  open: boolean
  setOpen: (open: boolean) => void
  boxStyle?: string
  position?: any
  textColor?: string
  hoverColor?: string
  rotateOpen?: string
  rotateClose?: string
}

const DropDownComponent = ({
  children,
  title,
  open,
  setOpen,
  boxStyle,
  position,
  textColor,
  hoverColor,
  rotateOpen,
  rotateClose,
}: DropDownComponentProps) => {
  let ref = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    let openHandler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false)
      }
    }

    window.addEventListener("click", openHandler)
    return () => {
      window.removeEventListener("click", openHandler)
    }
  }, [setOpen])

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1, transition: {delay: 0.1}}}
      ref={ref}
      className={`${hoverColor} relative  p-1 rounded w-max flex flex-col justify-center items-center z-50`}
    >
      <button
        onClick={() => {
          setOpen(!open)
        }}
        className={`flex flex-row items-center w-max gap-1 h-5 text-sm ${textColor} `}
      >
        {title}
        <IoIosArrowDown
          className={`${
            open ? rotateOpen : rotateClose
          } transition-transform duration-200`}
        />
      </button>
      {open && (
        <motion.div
          exit={{opacity: 0}}
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: {duration: 0.2}, ...position}}
          className={`${boxStyle} absolute  w-max shadow-lg dark:shadow-slate-900/50`}
        >
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}

export default DropDownComponent
