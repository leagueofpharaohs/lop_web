import Community from "@/components/Community"
import BigScreenBar from "@/components/UserBar/BigScreenBar"
import SmallScreenBar from "@/components/UserBar/SmallScreenBar"
import UserNavbar from "@/components/UserNavbar"
import React, {ReactNode} from "react"

export default function UserLayout(child: ReactNode) {
  return (
    <React.Fragment>
      <div className="xs:flex sm:flex flex-row hidden ">
        <BigScreenBar />
        <SmallScreenBar />
        <div className="flex-1">
          <UserNavbar />
          <div className="w-full overflow-auto styledScrollbars p-4 h-[calc(100vh_-_178px)] sm:h-[calc(100vh_-_108px)] flex flex-col justify-center items-center">
            {child}
          </div>
          <div className="flex flex-row justify-center items-center gap-4 py-1 border-t-2 dark:border-slate-700/50">
            <p className="text-xs hidden sm:block">
              &copy; All rights reserved {new Date().getFullYear()}
            </p>
            <Community isIcon={true} />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-screen text-center px-2 xs:hidden sm:hidden capitalize">
        we are sorry! The webSite Does not Support this screen...
      </div>
    </React.Fragment>
  )
}
