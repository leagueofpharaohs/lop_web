import {Element} from "react-scroll"
import nftCart from "@/assets/images/nftCard.png"
import useTranslation from "next-translate/useTranslation"
import Divider from "../../Divider"
import Image from "next/image"

export default function NftSection() {
  const {t} = useTranslation("common")
  return (
    <Element
      name="nft"
      className="min-h-screen bg-slate-900 relative overflow-hidden text-slate-100"
    >
      <div className=" hidden xl:block min-h-screen w-2/5 bg-slate-200 ltr:skew-x-12 rtl:-skew-x-12 absolute top-0 z-10"></div>
      <div className="z-20 relative w-full h-full py-14">
        <div className=" w-max mx-auto flex flex-col gap-4">
          <h3 className=" font-papyrus text-3xl uppercase ">{t("nft")}</h3>
          <Divider />
        </div>
        <div className="flex flex-col xl:flex-row xl:justify-between items-center gap-6 px-8">
          <Image
            src={nftCart}
            alt="neft Card"
            className=" w-[40rem] my-8 xl:my-0"
          />
          <p className=" w-full xl:w-1/2 break-word text-xl font-papyrus leading-loose font-semibold">
            {t("nftDesc")}
          </p>
        </div>
      </div>
    </Element>
  )
}
