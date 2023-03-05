import {useScroll} from "framer-motion"
import dynamic from "next/dynamic"
import React from "react"
import LoadingBox from "../../buyToken/buyIdo/LoadingBox"
import OverView from "../OverView"
import BigScreen from "./BigScreen"
import SmallScreen from "./SmallScreen"

const OverViewLargeScreen = dynamic(() => import("./OverViewLargeScreen"), {
  ssr: false,
})

const Hero = () => {
  const {scrollYProgress} = useScroll()
  return (
    <React.Fragment>
      <div className=" relative w-full hidden xl:block" style={{height: 5800}}>
        <div
          className="absolute w-full h-full top-0 left-0 z-10"
          style={{height: 5800}}
        >
          <div className="sticky top-0 overflow-hidden">
            <BigScreen />
            <OverViewLargeScreen scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
      <div className="xl:hidden">
        <SmallScreen />
        <OverView />
      </div>
    </React.Fragment>
  )
}

export default Hero
