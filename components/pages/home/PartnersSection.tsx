import {Element} from "react-scroll"
import mnb from "@/assets/images/partners/mnb.png"
import kozak from "@/assets/images/partners/kozak.png"
import momen from "@/assets/images/partners/momen.png"
import platinum from "@/assets/images/partners/platinum.svg"
import difx from "@/assets/images/partners/difx.png"
import useTranslation from "next-translate/useTranslation"
import Divider from "../../Divider"
import Image from "next/image"

export default function PartnersSection() {
  const {t} = useTranslation("common")
  const vertical = {
    width: 180,
    height: 250,
  }
  const horizontal = {
    width: 350,
    height: 60,
  }

  const partnersList = [
    {
      id: 1,
      logo: mnb,
      name: "MNB",
      width: horizontal.width,
      height: horizontal.height,
    },
    {
      id: 2,
      logo: kozak,
      name: "Kozak",
      width: vertical.width,
      height: vertical.height,
      classes: "row-span-2",
    },

    {
      id: 4,
      logo: momen,
      name: "momen",
      width: vertical.width,
      height: vertical.height,
      classes: "row-span-2",
    },
    {
      id: 5,
      logo: difx,
      name: "difx",
      width: vertical.width,
      height: vertical.height,
      classes: "row-span-2",
    },
    {
      id: 3,
      logo: platinum,
      name: "Platinum",
      width: horizontal.width,
      height: horizontal.height,
    },
  ]

  return (
    <Element
      name="partners"
      className="relative w-full bg-slate-200 py-14 text-slate-800"
    >
      <div className=" w-max mx-auto flex flex-col gap-4">
        <h3 className=" font-papyrus text-3xl uppercase">{t("partners")}</h3>
        <Divider />
      </div>
      <div className="mx-auto flex h-full w-[90%] md:max-w-7xl flex-col flex-wrap gap-10 md:gap-2 text-center xl:grid xl:grid-cols-4 md:justify-evenly items-center pt-8">
        {partnersList.map((partner) => {
          return (
            <div
              key={partner.id}
              className={` ${partner.classes} place-self-center rounded-xl p-4 nm-flat-slate-200-lg shadow-lg border-t-2 border-l-2 border-slate-100`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                style={{width: partner.width, height: partner.height}}
              />
            </div>
          )
        })}
      </div>
    </Element>
  )
}
