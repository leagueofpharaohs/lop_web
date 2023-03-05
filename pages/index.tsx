import Hero from "@/components/pages/home/hero/Hero"
import NftSection from "@/components/pages/home/NftSection"
import PartnersSection from "@/components/pages/home/PartnersSection"
import RoadmapSection from "@/components/pages/home/RoadmapSection"
import TeamSection from "@/components/pages/home/TeamSection"
import TokenomicsSection from "@/components/pages/home/TokenomicsSection"
import HomeLayout from "@/layouts/HomeLayout"
import {motion} from "framer-motion"

export default function Home() {
  return (
    <motion.div
      exit={{opacity: 0}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
    >
      <Hero />
      <TokenomicsSection />
      <RoadmapSection />
      <PartnersSection />
      <NftSection />
      <TeamSection />
    </motion.div>
  )
}

Home.getLayout = HomeLayout
