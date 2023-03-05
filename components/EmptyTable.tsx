import burialOpen from "@/assets/images/burialOpen.png"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"

const EmptyTable = () => {
  const {t} = useTranslation("common")
  return (
    <div className=" flex flex-col justify-center items-center border-2 dark:border-slate-700 p-6 gap-6 rounded-lg w-full md:w-4/5 mx-auto mt-4">
      <div className="nm-flat-layout-100-lg dark:nm-flat-layout-800-lg w-20 h-20 md:w-40 md:h-40 flex justify-center items-center rounded-full">
        <Image
          src={burialOpen}
          alt={"burialOpen"}
          className={"w-4/5 opacity-70"}
        />
      </div>
      <h2 className=" font-mono tracking-wider rtl:tracking-wide uppercase text-base sm:text-lg md:text-xl">
        {t("noTransaction")}
      </h2>
      <p className="font-mono  tracking-wider rtl:tracking-wide uppercase text-xs md:text-sm">
        {t("transactionWillAppearHere")}
      </p>
    </div>
  )
}

export default EmptyTable
