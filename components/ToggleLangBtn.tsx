import React, {useEffect, useState} from "react"
import DropDownComponent from "./DropDownComponent"
import useTranslation from "next-translate/useTranslation"
import {TbLanguageHiragana} from "react-icons/tb"
import {useRouter} from "next/router"
import Link from "next/link"
import {BsCheckLg} from "react-icons/bs"

const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "eg",
  },
]

interface ToggleLangBtnProps {
  boxStyle: string
  position?: any
  textColor?: string
  hoverColor?: string
  rotateClose?: string
  rotateOpen?: string
}

const ToggleLangBtn = ({
  boxStyle,
  position,
  textColor,
  hoverColor,
  rotateClose,
  rotateOpen,
}: ToggleLangBtnProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {locale} = router

  const currentLanguageCode = locale

  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)

  return (
    <DropDownComponent
      title={
        <React.Fragment>
          <TbLanguageHiragana className="text-lg" />
          <span className=" capitalize font-medium">
            {currentLanguage?.name}
          </span>
        </React.Fragment>
      }
      setOpen={setOpen}
      open={open}
      boxStyle={boxStyle}
      position={position}
      textColor={textColor}
      hoverColor={hoverColor}
      rotateOpen={rotateOpen}
      rotateClose={rotateClose}
    >
      <div className="flex flex-col">
        {languages.map((lang, index) => {
          return (
            <Link
              href={router.asPath}
              locale={lang.code}
              key={index}
              className={`${
                currentLanguageCode === lang.code &&
                "pointer-events-none hover:bg-transparent hover:dark:hover:bg-transparent opacity-30"
              } text-sm text-center w-full overflow-hidden p-2 cursor-pointer transition-color ease-in-out duration-200 first-of-type:rounded-t-lg last-of-type:rounded-b-lg flex flex-row justify-between items-center gap-2 hover:bg-primary-100`}
              onClick={() => {
                setOpen(false)
              }}
            >
              <span className={`fi fi-${lang.country_code}`}></span>
              {lang.name}
            </Link>
          )
        })}
      </div>
    </DropDownComponent>
  )
}

export default ToggleLangBtn
