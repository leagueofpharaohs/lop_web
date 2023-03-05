import logo from "@/assets/images/WEBLOGO.png"
import Link from "next/link"
import Image from "next/image"
import {SocialIconsData} from "./Community"

const Footer = () => {
  return (
    <footer
      className="w-full bg-black py-4 text-center space-y-2 text-white"
      id="footer"
    >
      <div className="flex flex-row justify-center gap-4">
        {SocialIconsData.map((link, i) => {
          return (
            <Link
              key={i}
              href={link.socialLink}
              className={`rounded-full bg-slate-100 py-2 px-1`}
              target={"_blank"}
            >
              <link.iconName className={`w-6 fill-black`} />
            </Link>
          )
        })}
      </div>
      <div className="flex justify-center">
        <Image src={logo} alt={"main-logo"} className="w-72" priority />
      </div>
      <p className="text-sm md:text-base">
        {" "}
        &trade; &#38; &copy; League of pharaohs. All rights reserved{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  )
}

export default Footer
