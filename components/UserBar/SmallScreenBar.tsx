import {motion} from "framer-motion"
import useTranslation from "next-translate/useTranslation"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {MutableRefObject, useEffect, useRef, useState} from "react"
import {MdOutlineOtherHouses} from "react-icons/md"
import Links from "./Links"
import UserButton from "./UserButton"

const SmallScreenBar = () => {
  const {t} = useTranslation("common")

  const [isOpen, setIsOpen] = useState(false)

  const navBarLinks = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (navBarLinks.current && !navBarLinks.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [navBarLinks])

  const pathName = usePathname()
  const styles = {
    linkWrapper:
      "sm:hidden absolute bottom-0 w-full shadow-lg dark:shadow-layout-900/60 bg-slate-100 dark:bg-layout-600 flex flex-row justify-between items-center",
    link: "flex-col items-center gap-2 p-2 hover:bg-primary-100 rounded-lg min-w-[66px]",
    title: "text-[10px]",
  }
  const links = Links()
  return (
    <div className={styles.linkWrapper}>
      {links.slice(0, 2).map((link, index) => (
        <Link
          href={{pathname: link.href, query: {tab: link.tab && link.tab}}}
          as={link.href}
          key={index}
          className={`${link.hidden ? "hidden" : "hidden xs:flex"} ${
            styles.link
          } hidden xs:flex`}
        >
          <span>{link.icon}</span>
          <span className={styles.title}>{link.title}</span>
        </Link>
      ))}

      <UserButton
        initial={{x: 0, y: -200, opacity: 0}}
        animate={{
          x: 0,
          y: -260,
          opacity: 1,
          transition: {delay: 0.01},
        }}
      />
      {links.slice(2, 3).map((link, index) => (
        <Link
          href={{pathname: link.href, query: {tab: link.tab && link.tab}}}
          as={link.href}
          key={index}
          className={` ${link.hidden ? "hidden" : "hidden xs:flex"} ${
            styles.link
          } ${
            link.disabled
              ? " pointer-events-none text-slate-400"
              : " pointer-events-auto"
          } hidden xs:flex`}
        >
          <span>{link.icon}</span>
          <span className={styles.title}>{link.title}</span>
        </Link>
      ))}
      <div ref={navBarLinks}>
        <button
          className={styles.link}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <MdOutlineOtherHouses className="text-2xl" />
          <span className={styles.title}>{t("more")}...</span>
        </button>
        {isOpen && (
          <motion.div
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            className="absolute -top-[7.5rem] ltr:right-2 rtl:left-2 bg-slate-100 dark:bg-layout-600 rounded-lg overflow-hidden divide-y-2 dark:divide-slate-800 z-10"
          >
            {links.slice(3).map((link, index) => (
              <Link
                href={{pathname: link.href, query: {tab: link.tab && link.tab}}}
                as={link.href}
                key={index}
                className={` ${link.hidden ? "hidden" : "flex"} ${
                  pathName?.includes(link.name) ? " bg-primary-100" : ""
                } ${
                  link.disabled
                    ? " pointer-events-none text-slate-400"
                    : " pointer-events-auto"
                } flex-row justify-start items-center gap-2 p-4`}
              >
                <span>{link.icon}</span>
                <span className={styles.title}>{link.title}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SmallScreenBar
