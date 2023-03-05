import Image from "next/image"
import anobs from "@/assets/images/cheracters/anobs.png"
import king from "@/assets/images/cheracters/king.png"
import horus from "@/assets/images/cheracters/horus.png"
import Button from "@/components/Button"
import logoFontLight from "@/assets/images/lopFont_light.png"
import {useTheme} from "next-themes"
import StoresIcon from "@/components/StoresIcon"
import useTranslation from "next-translate/useTranslation"

const SmallScreen = () => {
  const {t} = useTranslation("common")
  const {theme, setTheme} = useTheme()
  return (
    <div className="relative block xl:hidden items-end h-screen overflow-hidden">
      <div className=" h-full flex flex-col items-center justify-end relative z-50 bg-lay pointer-events-none">
        <div
          className=" flex flex-col justify-end items-center gap-10"
          style={{height: "calc(100vh - 84px)"}}
        >
          <div className="bg-slate-900/80 p-2 rounded-lg w-4/5 lg:w-2/4">
            <Image src={logoFontLight} alt={"light logo"} />
          </div>

          <p className=" capitalize font-medium text-slate-100 tracking-wider bg-slate-900/70 p-1 rounded-lg w-ful">
            live as a{" "}
            <span className="text-lg font-aclonica uppercase text-primary-100">
              king
            </span>{" "}
            and fight as a{" "}
            <span className="text-lg font-aclonica uppercase text-primary-100">
              legend
            </span>
          </p>
          <div className="flex flex-row justify-center items-center gap-10">
            {/* <Button
              title={t("common:whitePaper")}
              link="/"
              type="secondary"
              color={
                "border-slate-100 text-slate-100 hover:bg-primary-100 hover:text-slate-100"
              }
            /> */}
            <Button
              title={t("buyNow")}
              link="/user/buy-token"
              type="primary"
              color="bg-primary-100"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-6 shadow-2xl p-4 rounded border-t-2 border-l-2 border-slate-200/50 dark:border-slate-700/30 bg-layout-200 dark:bg-layout-800">
            <h2 className=" font-papyrus text-xl capitalize tracking-widest rtl:tracking-wider">
              {t("availableOn")}
            </h2>
            <StoresIcon />
          </div>
        </div>
      </div>
      <div
        className=" absolute w-full bottom-0"
        style={{height: "calc(100vh - 84px)"}}
      >
        <div className=" w-3/4 md:w-2/5 inset-x-0 mx-auto h-full bg-secondary-100 overflow-hidden">
          <div
            className={` w-[90%] mx-auto h-screen bg-cover bg-center bg-no-repeat`}
            style={{backgroundImage: "url(./images/pyramid_background.png)"}}
          >
            <Image
              src={king}
              alt="king"
              className=" absolute bottom-0 animate-[pharaohBounce_10s_infinite] inset-x-0 mx-auto w-80 md:w-4/6 lg:w-96"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallScreen
