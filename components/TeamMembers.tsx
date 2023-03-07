import {FaLinkedin, FaTwitter} from "react-icons/fa"
import maz from "@/assets/images/team/mz.png"
import bill from "@/assets/images/team/bil.png"
import asad from "@/assets/images/team/asd.png"
import daved from "@/assets/images/team/dv.png"
import ahmed from "@/assets/images/team/ahmed.png"
import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import Link from "next/link"

const TeamMembers = () => {
  const {t} = useTranslation("common")

  const teamWork = [
    {
      id: 1,
      character: maz,
      possion: t("charactorPossion1"),
      jobTitle: t("characterJob1"),
      name: t("characterName1"),
      Links: [
        {
          id: 2,
          socialMedia: "Linkedin",
          link: "https://www.linkedin.com/in/mazen-alhabeby-527a61268/",
          socialIcon: FaLinkedin,
        },
      ],
    },
    {
      id: 2,
      character: bill,
      possion: t("charactorPossion2"),
      jobTitle: t("characterJob2"),
      name: t("characterName2"),
      Links: [
        {
          id: 1,
          socialMedia: "Linkedin",
          link: "https://www.linkedin.com/in/bill-salah-b89002201/",
          socialIcon: FaLinkedin,
        },
      ],
    },
    {
      id: 3,
      character: asad,
      possion: t("advisorPossion2"),
      jobTitle: t("advisorTitle2"),
      name: t("advisor2"),
      Links: [
        {
          id: 1,
          socialMedia: "Linkedin",
          link: "https://www.linkedin.com/in/asadzeeshan/",
          socialIcon: FaLinkedin,
        },
      ],
    },
    {
      id: 4,
      character: daved,
      possion: t("charactorPossion5"),
      jobTitle: t("characterJob5"),
      name: t("characterName5"),
      Links: [
        {
          id: 1,
          socialMedia: "Twitter",
          link: "https://twitter.com/David90079007",
          socialIcon: FaTwitter,
        },
        {
          id: 2,
          socialMedia: "Linkedin",
          link: "https://www.linkedin.com/in/david-okorokoff-1362071a3/",
          socialIcon: FaLinkedin,
        },
      ],
    },
    // {
    //   id: 5,
    //   character: ahmed,
    //   possion: t("charactorPossion7"),
    //   jobTitle: t("characterJob7"),
    //   name: t("characterName7"),
    //   Links: [
    //     {
    //       id: 1,
    //       socialMedia: "Linkedin",
    //       link: "https://www.linkedin.com/in/ahmed-ragab-67b203174",
    //       socialIcon: FaLinkedin,
    //     },
    //   ],
    // },
  ]
  return (
    <div>
      <div className="container mx-auto space-y-8">
        <div className="space-y-8">
          <div className="flex flex-row flex-wrap justify-center text-center">
            {teamWork.map((obj) => {
              return (
                <div
                  key={obj.id}
                  className="m-8 rounded-2xl px-4 py-6 shadow-lg border-t-2 border-l-2 border-slate-100 dark:border-slate-600/30"
                >
                  <Image
                    src={obj.character}
                    alt={obj.name}
                    className=" w-[12rem] mb-2"
                  />
                  <div className="text-center text-sm">
                    <h2 className=" font-aclonica text-lg">{obj.name}</h2>
                    <h1>{obj.possion}</h1>
                    <h3>{obj.jobTitle}</h3>
                    <div className="flex flex-row flex-wrap justify-evenly">
                      {obj.Links.map((link) => {
                        return (
                          <Link
                            href={link.link}
                            key={link.id}
                            className="mt-3 flex h-14 w-14 flex-row items-center justify-center rounded-xl shadow-lg border-t-2 border-l-2 border-slate-100 dark:border-slate-600"
                            target={"_blank"}
                          >
                            <link.socialIcon className="align-middle text-3xl text-yellow-light dark:text-yellow-dark" />
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamMembers
