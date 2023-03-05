import {Link as Scroll} from "react-scroll"
import React from "react"
import useTranslation from "next-translate/useTranslation"
import {usePathname} from "next/navigation"
import Link from "next/link"

interface LinksProps {
  handleClick: () => void
}

interface dufaultLinks {
  linkName: string
  href: string
}

interface homeLinks {
  linkName: string
  href: string
}

export default function Links({handleClick}: LinksProps) {
  const {t} = useTranslation("common")

  const path = usePathname()
  const defaultLinks = [] as dufaultLinks[]
  const homeLinks = [
    {
      linkName: t("tokenomics"),
      href: "tokenomics",
    },
    {
      linkName: t("roadmap"),
      href: "roadmap",
    },
    {
      linkName: t("Partners"),
      href: "partners",
    },
    {
      linkName: t("nft"),
      href: "nft",
    },
    {
      linkName: t("team"),
      href: "team",
    },
  ] as homeLinks[]

  return (
    <>
      {path == "/"
        ? homeLinks.map((link, i) => {
            return (
              <Scroll
                key={i}
                to={link.href}
                spy={true}
                smooth={true}
                activeClass="text-primary-100 font-medium"
                className="cursor-pointer capitalize"
                onClick={() => {
                  handleClick()
                }}
              >
                {link.linkName}
              </Scroll>
            )
          })
        : defaultLinks.map((link, i) => {
            return (
              <Link
                key={i}
                href={link.href}
                className="capitalize links tracking-wider"
                onClick={() => {
                  handleClick()
                }}
              >
                {link.linkName}
              </Link>
            )
          })}
    </>
  )
}
