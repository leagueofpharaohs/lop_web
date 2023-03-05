import Button from "@/components/Button"
import useTranslation from "next-translate/useTranslation"
import {Element} from "react-scroll"
import ActionBtn from "../../ActionBtn"
import Divider from "../../Divider"
import TeamMembers from "../../TeamMembers"

export default function TeamSection() {
  const {t} = useTranslation("common")
  return (
    <Element name="team" className=" min-h-screen">
      <div className="container mx-auto space-y-8 py-14">
        <div className="w-max mx-auto flex flex-col gap-4">
          <h3 className="font-papyrus text-3xl uppercase">{t("leadership")}</h3>
          <Divider />
        </div>
        <TeamMembers />
      </div>
      <div
        className={` bg-slate-900/70 bg-no-repeat bg-cover bg-fixed bg-center bg-blend-overlay flex flex-row justify-center items-center gap-10 py-10`}
        style={{backgroundImage: `url(/images/pharaohs-wall.jpg)`}}
      >
        <Button
          title={t("buyNow")}
          link="/user/buy-token"
          type="primary"
          color="bg-primary-100"
        />
      </div>
    </Element>
  )
}
