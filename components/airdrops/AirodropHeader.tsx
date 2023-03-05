import useTranslation from "next-translate/useTranslation"

const AirodropHeader = () => {
  const {t} = useTranslation()
  const airDrops = [
    {
      name: t("Stage1"),
      description: t("descriptionStage1"),
      image: "https://i.imgur.com/1ZQZQYt.png",
      link: "https://www.google.com",
      stages: [
        "follow us on twitter",
        "retweet our tweet",
        "tag 3 friends",
        "join our telegram group",
        "follow us on  facebook",
      ],
      bg: ["bg-blue-600", "bg-blue-900"],
      notActive: true,
    },
    {
      name: t("Stage2"),
      description: t("descriptionStage2"),
      image: "https://i.imgur.com/1ZQZQYt.png",
      link: "https://www.google.com",
      stages: [
        "inveite 5 friends",
        "tweet on our channel for 1 month",
        "be active on our telegram group for 1 mounth",
      ],
      bg: ["bg-green-600", "bg-green-900"],
      notActive: true,
    },
    {
      name: t("Stage3"),
      description: t("descriptionStage3"),
      image: "https://i.imgur.com/1ZQZQYt.png",
      link: "https://www.google.com",
      stages: [
        "buy LOP from IDO",
        "invite friends to buy LOP from IDO and get 2% bonus",
        "be active on our social media channels",
      ],
      bg: ["bg-red-600", "bg-red-900"],
      notActive: true,
    },
  ]
  return (
    <div className="flex flex-col justify-center items-center pt-16 sm:pt-0">
      <h2 className=" capitalize text-sm py-2 tracking-wider rtl:tracking-wide">
        airdrops stage
      </h2>
      <div className="flex flex-row flex-wrap justify-center gap-4 items-center h-40 md:h-auto overflow-y-auto">
        {airDrops.map((airDrop, index) => {
          return (
            <div
              key={index}
              className="min-w-[20rem] min-h-[10rem] bg-slate-100 rounded-md px-2 py-2 text-slate-900 relative overflow-hidden flex flex-row justify-between"
            >
              <div>
                <div className="max-w-[160px] text-xs font-semibold">
                  {airDrop.description}
                </div>
                {airDrop.stages.map((stage, index) => {
                  return (
                    <div key={index} className="flex flex-row gap-2 py-1 ">
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      <p className="text-xs max-w-[140px]">{stage}</p>
                    </div>
                  )
                })}
              </div>
              <div className="flex flex-col justify-between items-center relative z-20">
                <h2 className="text-lg font-medium">{airDrop.name}</h2>
                <button
                  className=" bg-primary-100 p-2 rounded-lg shadow-lg capitalize disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-slate-500"
                  disabled={airDrop.notActive}
                >
                  {t("startNow")}
                </button>
              </div>
              <div
                className={` absolute ${airDrop.bg[0]} w-44 h-44 rounded-full -bottom-16 ltr:-right-16 rtl:-left-16 flex justify-center items-center`}
              >
                <div
                  className={`${airDrop.bg[1]} rounded-full w-32 h-32`}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AirodropHeader
