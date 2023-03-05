import Image from "next/image"
import anobs from "@/assets/images/cheracters/anobs.png"
import king from "@/assets/images/cheracters/king.png"
import horus from "@/assets/images/cheracters/horus.png"
import Button from "@/components/Button"
import logoFontLight from "@/assets/images/lopFont_light.png"
import logoFontDark from "@/assets/images/lopFont_dark.png"
import {useTheme} from "next-themes"
import StoresIcon from "@/components/StoresIcon"
import useTranslation from "next-translate/useTranslation"

const BigScreen = () => {
  const {t} = useTranslation("common")
  const {theme, setTheme} = useTheme()
  return (
    <div className=" hidden xl:flex flex-row justify-between items-end h-screen px-4 overflow-hidden">
      <div className="h-full w-1/2 flex flex-col justify-end items-center gap-10">
        <div className="w-4/5">
          <Image
            src={logoFontLight}
            alt={"logo"}
            className={"w-full hidden dark:block"}
          />
          <Image
            src={logoFontDark}
            alt={"logo"}
            className={"w-full block dark:hidden"}
          />
        </div>
        <p className=" capitalize font-medium text:lg xl:text-xl text-slate-500 dark:text-slate-200 tracking-wider">
          live as a{" "}
          <span className="text-2xl xl:text-3xl font-aclonica uppercase text-primary-100">
            king
          </span>{" "}
          and fight as a{" "}
          <span className="text-2xl xl:text-3xl font-aclonica uppercase text-primary-100">
            legend
          </span>
        </p>
        <div className="flex flex-row justify-center items-center gap-10">
          {/* <Button
            title={t("common:whitePaper")}
            link="/"
            type="secondary"
            color="border-primary-100 text-primary-100 hover:bg-primary-100 hover:text-slate-100"
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
      <div className=" relative w-1/2 flex justify-center">
        <div
          className=" bg-secondary-100 skew-x-12 w-1/2"
          style={{height: "calc(100vh - 84px)"}}
        >
          <div className=" w-[90%] mx-auto h-full shadow-lg">
            <div
              className={` h-full bg-cover bg-center bg-no-repeat`}
              style={{backgroundImage: "url(./images/pyramid_background.png)"}}
            >
              <div className="-skew-x-12 h-full">
                <Image
                  src={horus}
                  alt="horus"
                  className=" w-[95%] absolute bottom-0 right-2/3"
                  priority
                />
                <Image
                  src={anobs}
                  alt="anobs"
                  className=" w-[95%] absolute bottom-0 left-2/3 "
                  priority
                />
                <Image
                  src={king}
                  alt="king"
                  className=" w-[95%] absolute bottom-0 animate-[pharaohBounce_10s_infinite]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BigScreen
