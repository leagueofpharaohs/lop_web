import {GiAnubis} from "react-icons/gi"
import {IoIosArrowForward} from "react-icons/io"
import Skeleton from "react-loading-skeleton"

const LoadingBox = () => {
  return (
    <div className="nm-flat-layout-200-lg dark:nm-flat-layout-800-lg w-full lg:w-1/2 p-4 flex flex-col gap-4">
      <div className="nm-inset-layout-200 dark:nm-inset-layout-800 p-2 sm:p-4">
        <Skeleton className=" h-5 w-20" />
        <div className="flex flex-col justify-center items-center gap-2 sm:gap-0 sm:flex-row relative">
          <div className="flex-1 outline-none bg-transparent p-2"></div>
          <Skeleton className=" w-24 h-8 rounded-full" />
        </div>
      </div>
      <Skeleton className=" h-4 w-28 float-right rtl:float-left" />
      <div className="nm-inset-layout-200 dark:nm-inset-layout-800 p-2 sm:p-4">
        <Skeleton className=" h-5 w-20" />
        <div className="flex flex-col justify-center items-center gap-2 sm:gap-0 sm:flex-row relative">
          <div className="flex-1 outline-none bg-transparent p-2"></div>
          <Skeleton className=" w-20 h-8 rounded-full" />
        </div>
      </div>
      <div className=" min-h-[2rem]"></div>
      <div className="flex flex-col justify-center items-center">
        <Skeleton className=" h-4 w-64 float-right rtl:float-left" />
        <Skeleton className=" h-8 w-96" />
      </div>
    </div>
  )
}

export default LoadingBox
