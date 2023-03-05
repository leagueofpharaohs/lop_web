import Link from "next/link"
import {usePathname} from "next/navigation"
import {ReactNode} from "react"
import Links from "./UserBar/Links"

interface PageWrapperProps {
  children: ReactNode
  pageName?: string
}

const PageWrapper = ({children, pageName}: PageWrapperProps) => {
  const pathName = usePathname()
  const links = Links()

  const pageLinks = links
    .filter((link) => link.name === pageName)
    .shift()?.subLinks

  return (
    <div className=" w-full max-w-7xl">
      {pageName && (
        <div className="flex flex-row justify-start items-start gap-6 capitalize text-sm border-b-2 dark:border-slate-700/50">
          {pageLinks?.map((link, i) => {
            return (
              <Link
                //@ts-ignore
                href={{pathname: link.href, query: {tab: link.tab && link.tab}}}
                as={link.href}
                key={i}
                className={`${
                  pathName === link.href
                    ? "text-primary-100 border-primary-100"
                    : "border-transparent"
                } border-b-2 pb-2 hover:text-primary-100 transition-all duration-300 ease-in-out tracking-widest rtl:tracking-wide text-xs sm:text-ms pt-[5rem] sm:pt-2`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      )}
      <div className="py-4" style={{minHeight: "calc(100vh - 180px)"}}>
        {children}
      </div>
    </div>
  )
}

export default PageWrapper
