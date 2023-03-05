import Link from "next/link"
import React from "react"

interface ButtonProps {
  title: string
  link: string
  type: "primary" | "secondary"
  color?: string
}

const styles = {
  btnStyle: ` flex justify-center items-center tracking-wider capitalize text-xl rounded-sm rounded-tl-2xl rounded-br-2xl w-36 h-12 drop-shadow-lg  transition-colors duration-300 ease-in-out`,
}

const Button = ({title, link, type, color}: ButtonProps) => {
  return (
    <React.Fragment>
      {type === "primary" && (
        <Link
          href={link ? link : ""}
          className={`${styles.btnStyle} ${color} text-slate-100 hover:bg-opacity-80 pointer-events-auto`}
        >
          {title}
        </Link>
      )}
      {type === "secondary" && (
        <Link
          href={link ? link : ""}
          className={`${styles.btnStyle} ${color} border-2 hover:text-slate-100 pointer-events-auto`}
        >
          {title}
        </Link>
      )}
    </React.Fragment>
  )
}

export default Button
