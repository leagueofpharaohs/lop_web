import {motion} from "framer-motion"
import Image from "next/image"
import blob from "@/assets/images/blob.svg"
import youngAnoubs from "@/assets/images/cheracters/youngAnoubs.png"
import Link from "next/link"
import HomeLayout from "@/layouts/HomeLayout"

const Custom404 = () => {
  return (
    <motion.div
      exit={{opacity: 0}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="flex flex-row justify-center items-center w-full h-full flex-wrap gap-4 py-24 lg:py-0"
      style={{minHeight: "calc(100vh - 203px)"}}
    >
      <div className=" relative flex justify-center w-[20rem] h-[20rem]">
        <Image src={blob} alt={"blob"} className=" absolute w-[20rem]" />
        <Image
          src={youngAnoubs}
          alt={"young anoubs"}
          className="w-[10rem] absolute"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-7xl font-bold text-center font-aclonica">404</h1>
        <h1 className="text-3xl font-bold text-center font-aclonica">
          Page Not Found
        </h1>

        <p className="text-center text-gray-500">
          The page you are looking for might have been removed
          <br /> had its name changed or is temporarily unavailable.
        </p>

        <div className="flex justify-center">
          <Link
            href={"/"}
            className=" bg-primary-100 shadow-lg text-white px-4 py-2 rounded-md mt-4"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Custom404

Custom404.getLayout = HomeLayout
