import logo from "@/assets/images/WEBLOGO.png"
import useTranslation from "next-translate/useTranslation"

import Image from "next/image"

const OverView = () => {
  const {t} = useTranslation("common")
  return (
    <div className="xl:h-screen bg-slate-900 py-10">
      <div className="flex justify-center">
        <Image src={logo} alt={"logo"} priority />
      </div>
      <div className="flex flex-col xl:flex-row gap-12 items-center h-[90%] px-4 xl:px-12">
        <p
          className="bg-cover bg-no-repeat bg-center p-10 font-papyrus text-base xl:text-xl shadow-lg font-bold text-center capitalize w-full xl:w-1/2 text-black break-all leading-loose"
          style={{
            backgroundImage: `url(/images/papyusPaper.png)`,
            textShadow: "#FFF 0 0px 3px ",
          }}
        >
          {t("overview")}
        </p>
        <iframe
          src="https://www.youtube.com/embed/A-Y4iHUpurU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-tr-[2rem] rounded-bl-[2rem] outline outline-offset-8 outline-2 outline-yellow-600 dark:outline-yellow-500 col-span-6 justify-self-center w-full xl:w-1/2 h-72 xl:h-4/5"
        ></iframe>
      </div>
    </div>
  )
}

export default OverView
