import useTranslation from "next-translate/useTranslation"
import {BiWalletAlt} from "react-icons/bi"
import {BsGift, BsSafe} from "react-icons/bs"
import {FaRegMoneyBillAlt} from "react-icons/fa"
import {GiAnubis, GiCardRandom} from "react-icons/gi"
import {MdOutlineDashboard} from "react-icons/md"

const Links = () => {
  const mainLink = "/user"
  const {t} = useTranslation("common")
  const links = [
    // {
    //   name: "dashboard",
    //   title: t("dashboard"),
    //   href: `${mainLink}/dashboard`,
    //   icon: <MdOutlineDashboard className="text-2xl" />,
    //   disabled: false,
    // },
    {
      name: "buy-token",
      title: t("buyLop"),
      href: `${mainLink}/buy-token`,
      icon: <GiAnubis className="text-2xl" />,
      disabled: false,
      hidden: false,
      subLinks: [
        {
          name: t("buyIdo"),
          href: `${mainLink}/buy-token`,
        },
        {
          name: t("buyTokenFromExchange"),
          href: "https://difx.com/en",
        },
      ],
    },
    {
      name: "balance",
      title: t("balance"),
      href: `${mainLink}/balance`,
      tab: "buy",
      icon: <FaRegMoneyBillAlt className="text-2xl" />,
      disabled: false,
      hidden: false,
      subLinks: [
        {
          name: t("tokenBalance"),
          href: `${mainLink}/balance`,
          tab: "buy",
        },
        // {
        //   name: t("investBalance"),
        //   href: `${mainLink}/balance/invest`,
        //   tab: "invest",
        // },
      ],
    },
    {
      name: "airdrops",
      title: t("airdrops"),
      href: `${mainLink}/airdrops`,
      icon: <BsGift className="text-2xl" />,
      disabled: true,
      hidden: false,
    },
    {
      name: "wallets",
      title: t("wallets"),
      href: `${mainLink}/wallets`,
      icon: <BiWalletAlt className="text-2xl" />,
      label: t("soon"),
      disabled: true,
      hidden: false,
    },
    {
      name: "withdrawal",
      title: t("withdrawal"),
      href: `${mainLink}/withdrawal`,
      icon: <BiWalletAlt className="text-2xl" />,
      hidden: true,
    },
    {
      name: "nft-market",
      title: t("nFTMarket"),
      href: `${mainLink}/nft-marketplace`,
      icon: <GiCardRandom className="text-2xl" />,
      label: t("soon"),
      disabled: true,
      hidden: false,
    },
  ]
  return links
}

export default Links
