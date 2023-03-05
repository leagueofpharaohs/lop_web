import useTranslation from "next-translate/useTranslation"
import {MdCheckCircle} from "react-icons/md"
import {RiEyeCloseFill, RiRefreshLine} from "react-icons/ri"
import {Element} from "react-scroll"
import Divider from "../../Divider"

export default function RoadmapSection() {
  const {t} = useTranslation("common")
  const raodMapContent = [
    {
      id: 1,
      head: "Q1 / 2022",
      stips: [
        {id: 1, sDetail: t("Brand"), stat: true},
        {id: 2, sDetail: t("gameLogic"), stat: true},
        {id: 3, sDetail: t("sMedia"), stat: true},
        {id: 4, sDetail: t("video"), stat: true},
        {id: 5, sDetail: t("website"), stat: true},
        {id: 6, sDetail: t("preMarketing"), stat: true},
      ],
      mainStat: "done",
    },
    {
      id: 2,
      head: "Q2 / 2022",
      stips: [
        {id: 1, sDetail: t("websiteV1"), stat: true},
        {id: 2, sDetail: t("character"), stat: true},
        {id: 3, sDetail: t("smartContract"), stat: true},
        {id: 4, sDetail: t("ico"), stat: true},
        {id: 5, sDetail: t("audit"), stat: true},
      ],
      mainStat: "done",
    },
    {
      id: 3,
      head: "Q3 / 2022",
      stips: [
        {id: 1, sDetail: t("publicsale"), stat: true},
        {id: 2, sDetail: t("Prototype"), stat: true},
        {id: 3, sDetail: t("Characters"), stat: true},
        {id: 4, sDetail: t("Marketing2"), stat: true},
      ],
      mainStat: "done",
    },
    {
      id: 4,
      head: "Q4 / 2022",
      stips: [
        {id: 1, sDetail: t("websiteV2"), stat: true},
        {id: 2, sDetail: t("Ecosystem"), stat: true},
        {id: 3, sDetail: t("deploy"), stat: true},
        {id: 4, sDetail: t("listing"), stat: true},
      ],
      mainStat: "done",
    },
    {
      id: 5,
      head: "Q1 / 2023",
      stips: [
        {id: 1, sDetail: t("privatesale"), stat: false},
        {id: 2, sDetail: t("gorillaMarketing"), stat: false},
        {id: 3, sDetail: t("markets"), stat: false},
        {id: 4, sDetail: t("NFTMBeta"), stat: false},
        {id: 5, sDetail: t("NFTM"), stat: false},
        {id: 6, sDetail: t("NFTSale"), stat: false},
        {id: 7, sDetail: t("NFTStake"), stat: false},
        {id: 8, sDetail: t("NFTFusion"), stat: false},
        {id: 9, sDetail: t("listing2"), stat: false},
      ],
      mainStat: "prog",
    },
    {
      id: 6,
      head: "Q2 & Q3 / 2023",
      stips: [
        {id: 1, sDetail: t("betaGame"), stat: false},
        {id: 2, sDetail: t("PVP"), stat: false},
        {id: 3, sDetail: t("character"), stat: false},
      ],
      mainStat: false,
    },
    {
      id: 7,
      head: "Q4 / 2023",
      stips: [
        {id: 1, sDetail: t("game"), stat: false},
        {id: 2, sDetail: t("additionalNFT"), stat: false},
        {id: 3, sDetail: t("Tournament"), stat: false},
      ],
      mainStat: false,
    },
  ]
  return (
    <Element
      name="roadmap"
      className={`min-h-screen bg-slate-900 bg-no-repeat bg-cover bg-fixed bg-center py-14 text-white bg-blend-overlay`}
      style={{backgroundImage: `url(/images/pharaohsBook.jpeg)`}}
    >
      <div className="container mx-auto space-y-8 ">
        <div className=" w-max mx-auto flex flex-col gap-4">
          <h3 className=" font-papyrus text-3xl uppercase">{t("roadmap")}</h3>
          <Divider />
        </div>
        <div className="relative mx-auto w-4/5 lg:before:absolute lg:before:top-0 lg:before:left-2/4 lg:before:h-full lg:before:w-0.5 lg:before:-translate-x-2/4 lg:before:content-[''] before:bg-slate-500 pt-0 md:pt-6">
          <ul>
            {raodMapContent.map((obj) => {
              return (
                <li
                  key={obj.id}
                  className={`roadmap_parent relative mb-4 rounded-lg p-4 text-black last:mb-0 lg:mb-10 lg:w-2/4 lg:odd:float-left lg:odd:clear-right lg:odd:-translate-x-8 lg:even:float-right lg:even:clear-left lg:even:translate-x-8 bg-center bg-cover`}
                  style={{backgroundImage: `url(/images/papyusPaper.png)`}}
                >
                  <div
                    className={`roadmap_status ${
                      obj.mainStat === "prog"
                        ? "bg-yellow-500"
                        : obj.mainStat === "done"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    } hidden justify-center lg:flex`}
                  >
                    {obj.mainStat === "done" ? (
                      <MdCheckCircle className={`w-full h-full`} />
                    ) : obj.mainStat === "prog" ? (
                      <RiRefreshLine className={`w-full h-full animate-spin`} />
                    ) : (
                      <RiEyeCloseFill className={`w-full h-full`} />
                    )}
                  </div>
                  <h2 className="font-aclo text-xl">{obj.head}</h2>
                  <div>
                    {obj.stips.map((obj) => {
                      return (
                        <div
                          key={obj.id}
                          className={`${
                            obj.stat &&
                            "before:mx-1.5 before:rounded-full before:text-slate-700 before:content-['✓']"
                          } my-2 text-center text-lg font-bold`}
                        >
                          {obj.sDetail}
                        </div>
                      )
                    })}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className=" clear-both"></div>
        </div>
      </div>
    </Element>
  )
}
