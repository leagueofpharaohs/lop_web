import useTranslation from "next-translate/useTranslation"

const InfBox = () => {
  const {t} = useTranslation()
  const infoBoxDetails = [
    {title: t("swapRate"), description: t("swapValue")},
    {title: t("infoTokenPrice"), description: t("priceValue")},
    {title: t("minimumInvest"), description: t("investValue")},
  ]
  return (
    <div className=" w-full lg:w-1/2 nm-flat-layout-200-lg dark:nm-flat-layout-800-lg p-4 rounded-lg flex flex-col gap-2">
      <h1 className="text-xl font-semibold uppercase text-center tracking-widest rtl:tracking-wide">
        {t("infoBoxTitle")}
      </h1>
      <p className="text-center tracking-wider rtl:tracking-wide leading-loose">
        {t("infoBoxDescription")}
      </p>
      <ul className=" divide-y-2 dark:divide-slate-700/50">
        {infoBoxDetails.map((item, index) => (
          <li
            key={index}
            className="flex flex-row justify-between items-center capitalize py-6"
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfBox
