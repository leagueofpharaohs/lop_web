import Image from "next/image"
import logo from "@/assets/images/logo.png"
import logoFontLight from "@/assets/images/lopFont_light.png"
import Links from "./Links"
import Link from "next/link"
import UserButton from "./UserButton"
import Skeleton from "react-loading-skeleton"
import {GET_USER_BY_ID} from "@/gql/query"
import {DocumentNode} from "graphql"
import {useQuery} from "@apollo/client"
import {usePathname} from "next/navigation"

const BigScreenBar = () => {
  const links = Links()

  const {data, loading} = useQuery(GET_USER_BY_ID)

  const pathName = usePathname()

  return (
    <div className={"relative hidden sm:block"}>
      <div className="h-screen flex flex-col divide-y-2 dark:divide-slate-800 shadow-lg dark:shadow-layout-900/60 bg-slate-100 dark:bg-layout-600 relative z-20">
        <div className=" relative">
          <div className="flex flex-row bg-layout-700 p-2 gap-2 rounded-b-2xl w-max mx-auto">
            <Image src={logo} alt="logo" className=" w-12 h-12 " />
            <Image
              src={logoFontLight}
              alt="logo Font"
              className=" w-32 hidden lg:block"
              priority
            />
          </div>
          <div className="hidden lg:block">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center py-6">
                <Skeleton width={120} height={120} className="rounded-full" />
              </div>
            ) : (
              <>
                <span className="rtl:hidden ltr:inline-block">
                  <UserButton
                    initial={{x: 100, y: -120, opacity: 0}}
                    animate={{
                      x: 204,
                      y: -90,
                      opacity: 1,
                      transition: {delay: 0.01},
                    }}
                  />
                </span>
                <span className="ltr:hidden rtl:inline-block">
                  <UserButton
                    initial={{x: -100, y: -120, opacity: 0}}
                    animate={{
                      x: -204,
                      y: -90,
                      opacity: 1,
                      transition: {delay: 0.01},
                    }}
                  />
                </span>
              </>
            )}
          </div>
          <div className="block lg:hidden">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center py-4">
                <Skeleton width={60} height={60} className="rounded-full" />
              </div>
            ) : (
              <>
                <span className="rtl:hidden ltr:inline-block">
                  <UserButton
                    initial={{x: 50, y: -120, opacity: 0}}
                    animate={{
                      x: 100,
                      y: -90,
                      opacity: 1,
                      transition: {delay: 0.01},
                    }}
                  />
                </span>
                <span className="ltr:hidden rtl:inline-block">
                  <UserButton
                    initial={{x: -50, y: -120, opacity: 0}}
                    animate={{
                      x: -100,
                      y: -90,
                      opacity: 1,
                      transition: {delay: 0.01},
                    }}
                  />
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto styledScrollbars">
          {links.map((link, i) => (
            <Link
              href={{pathname: link.href, query: {tab: link.tab && link.tab}}}
              as={link.href}
              key={i}
              className={` ${link.hidden ? "hidden" : "flex"} ${
                link.disabled
                  ? "text-gray-400 pointer-events-none hover:bg-transparent"
                  : " hover:bg-primary-100 hover:text-layout-900"
              } ${
                pathName?.includes(link.name) &&
                "bg-primary-100 text-layout-900"
              }  flex-row justify-center lg:justify-start items-center gap-1 p-3  my-1 mx-auto lg:mx-2 rounded-lg transition-colors duration-200 ease-in-out min-w-[85.85px]`}
            >
              <span className="flex flex-col lg:flex-row justify-start items-center gap-3">
                {link.icon}
                <span className="text-xs lg:text-sm">{link.title}</span>
              </span>
              {link.label && (
                <span className="text-xs hidden lg:inline-block">
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BigScreenBar
