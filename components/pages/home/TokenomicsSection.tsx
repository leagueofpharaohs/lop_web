import {Element} from "react-scroll"
import chart from "@/assets/images/chartfinal.png"
import group24 from "@/assets/images/groups/Group24.svg"
import group25 from "@/assets/images/groups/Group25.svg"
import group26 from "@/assets/images/groups/Group26.svg"
import group27 from "@/assets/images/groups/Group27.svg"
import useTranslation from "next-translate/useTranslation"
import Divider from "../../Divider"

import Image from "next/image"

export default function TokenomicsSection() {
  const {t} = useTranslation("common")
  const tokensDescription = [
    {
      id: 1,
      image: group24,
      title: t("tokenTitle1"),
      discraption: t("tokenFeature01"),
    },
    {
      id: 2,
      image: group25,
      title: t("tokenTitle2"),
      discraption: t("tokenFeature02"),
    },
    {
      id: 3,
      image: group26,
      title: t("tokenTitle3"),
      discraption: t("tokenFeature03"),
    },
    {
      id: 4,
      image: group27,
      title: t("tokenTitle4"),
      discraption: t("tokenFeature04"),
    },
  ]
  return (
    <Element
      name="tokenomics"
      className={`min-h-screen w-full bg-black bg-opacity-60 bg-cover bg-fixed bg-center bg-no-repeat py-14 text-white bg-blend-overlay`}
      style={{backgroundImage: `url(/images/pharaohs-wall.jpg)`}}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 w-max mx-auto">
          <h2 className="text-4xl font-bold text-center uppercase">
            {t("tokenomics")}
          </h2>
          <Divider />
        </div>
        <div className="flex flrex-wrap space-y-8 container mx-auto flex-col md:flex-row justify-around items-center px-4 md:px-0 md:gap-8">
          <div className="w-full flex items-center justify-center my-6 xl:my-0">
            <Image src={chart} alt="Token Distribution" className="w-4/5" />
          </div>

          <div className=" flex flex-col gap-y-5 items-center justify-center px-2">
            <h2 className=" uppercase font-papyrus text-center text-4xl tracking text-yellow-400">
              <span className="text-5xl">&#36; </span> {t("token")}
            </h2>
            <h4 className="text-center text-2xl">
              {t("totalSupply")} &#x3a; 10,000,000,000 &#36;LOP
            </h4>
            <p className="text-lg leading-relaxed">
              {t("tokenomicsDescription")}
            </p>
            <ul className="space-y-4">
              {tokensDescription.map((obj) => {
                return (
                  <li
                    key={obj.id}
                    className="flex flex-row flex-wrap justify-start"
                  >
                    <div className="w-[12%]">
                      <Image
                        src={obj.image}
                        alt={obj.title}
                        className=" w-16"
                      />
                    </div>
                    <div className="w-4/5">
                      <h2>{obj.title}</h2>
                      <p className="">{obj.discraption}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </Element>
  )
}
