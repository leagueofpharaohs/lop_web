import Link from "next/link"

interface ActionBtnProps {
  name: string
  onClick?: () => void
  type?: string
  color?: string
  bgColor?: string
  colorHover?: string
  btnWidth?: string
  btnHeight?: string
  fontWeight?: string
  fontSize?: string
  btnUrl?: string
}

const ActionBtn = ({
  name,
  onClick,
  type,
  color,
  bgColor,
  colorHover,
  btnWidth,
  btnHeight,
  fontWeight,
  fontSize,
  btnUrl,
}: ActionBtnProps) => {
  const btnType = type ? type : "link"
  const btnStyle = ` ${color ? color : "text-slate-300 dark:text-slate-100"}
      ${bgColor ? bgColor : "bg-slate-900"} ${
    colorHover ? colorHover : "hover:text-amber-500 dark:hover:text-amber-500"
  } ${btnWidth ? btnWidth : "w-36"} ${btnHeight && btnHeight} ${
    fontWeight ? fontWeight : "font-light"
  } ${
    fontSize ? fontSize : "text-xl"
  } uppercase p-2 rounded-tr rounded-bl tracking-wider outline outline-2 outline-offset-4 hover:outline-offset-0 transition-all duration-200 text-center shadow-xl`

  return (
    <>
      {btnType === "link" && (
        <Link href={btnUrl ? btnUrl : ""} className={btnStyle}>
          {name}
        </Link>
      )}
      {btnType === "button" && (
        <button onClick={onClick} className={btnStyle}>
          {name}
        </button>
      )}
    </>
  )
}

export default ActionBtn
