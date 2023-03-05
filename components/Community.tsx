import Link from "next/link"
import {BsInstagram, BsMedium, BsTwitter, BsYoutube} from "react-icons/bs"
import {FaFacebookF, FaTelegramPlane} from "react-icons/fa"

export const SocialIconsData = [
  {
    iconName: FaTelegramPlane,
    socialLink: "https://t.me/lopofficial",
    socialName: "telegram",
  },
  {
    iconName: BsTwitter,
    socialLink: "https://twitter.com/LeagueofPharaoh",
    socialName: "twitter",
  },
  {
    iconName: FaFacebookF,
    socialLink: "https://www.facebook.com/LeagueOfPharaoh/",
    socialName: "facebook",
  },
  {
    iconName: BsInstagram,
    socialLink: "https://www.instagram.com/leagueofpharaohsofficial/",
    socialName: "instagram",
  },
  {
    iconName: BsYoutube,
    socialLink: "https://www.youtube.com/channel/UCauMVD1elulFERGeJlyMXTQ",
    socialName: "youtube",
  },
  {
    iconName: BsMedium,
    socialLink: "https://medium.com/@Leagueofpharoahs",
    socialName: "medium",
  },
]

interface CommunityType {
  isIcon?: boolean
  isName?: boolean
  position?: string
  color?: string
}

const Community = ({isIcon, isName, position, color}: CommunityType) => {
  return (
    <ul
      className={`${
        position == "col" ? "flex-col" : "flex-row"
      } flex gap-2 items-center ${color} `}
    >
      {SocialIconsData.map((icon, i) => {
        return (
          <li key={i}>
            <Link
              href={icon.socialLink}
              target="_blank"
              className="flex flex-col items-center justify-center"
            >
              {isIcon && <icon.iconName />}
              {isName && <span>{icon.socialName}</span>}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Community
