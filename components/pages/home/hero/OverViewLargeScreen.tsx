import {motion, useTransform} from "framer-motion"
import {useEffect, useState} from "react"
import useTranslation from "next-translate/useTranslation"

const OverViewLargeScreen = ({scrollYProgress}: any) => {
  const {t} = useTranslation("common")
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHight, setScreenHight] = useState(0)

  const [leftDoorMovmentOpen, setLeftDoorMovmentOpen] = useState(0)
  const [leftDoorMovmentClose, setLeftDoorMovmentClose] = useState(0)

  const [rightDoorMovmentOpen, setRightDoorMovmentOpen] = useState(0)
  const [rightDoorMovmentClose, setRightDoorMovmentClose] = useState(0)

  const [doorsHight, setDoorsHight] = useState(0)
  const [doorsPosition, setdoorsPosition] = useState<any>()

  const containerscale = useTransform(scrollYProgress, [0, 0.2], [5.9, 1])

  const rightDoor = useTransform(
    scrollYProgress,
    [0.25, 0],
    [rightDoorMovmentClose, rightDoorMovmentOpen]
  )
  const LeftDoor = useTransform(
    scrollYProgress,
    [0.25, 0],
    [leftDoorMovmentClose, leftDoorMovmentOpen]
  )
  const contentOpactiy = useTransform(scrollYProgress, [0.28, 0.32], [0, 1])
  function handleResize() {
    setScreenWidth(window.innerWidth)
  }

  function handleHightOnResize() {
    const scrolled = window.pageYOffset
    setScreenHight(Math.ceil(scrolled))
  }

  useEffect(() => {
    window.addEventListener("scroll", handleHightOnResize)

    return () => window.removeEventListener("scroll", handleHightOnResize)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    setDoorsHight(
      screenWidth == 1280
        ? screenWidth * 0.00073
        : screenWidth == 1366
        ? screenWidth * 0.00084
        : screenWidth * 0.00073
    )
    setdoorsPosition(
      screenWidth == 1280
        ? screenWidth * 0.13
        : screenWidth >= 1365 && screenWidth <= 1368
        ? screenWidth * 0.184
        : screenWidth >= 1360 && screenWidth <= 1439
        ? screenWidth * 0.14
        : screenWidth >= 1440 && screenWidth <= 1535
        ? screenWidth * 0.145
        : screenWidth >= 1536 && screenWidth <= 1599
        ? screenWidth * 0.152
        : screenWidth >= 1600 && screenWidth <= 1679
        ? screenWidth * 0.158
        : screenWidth >= 1680 && screenWidth <= 1792
        ? screenWidth * 0.161
        : screenWidth >= 1793 && screenWidth <= 1919
        ? screenWidth * 0.168
        : screenWidth >= 1920 && screenWidth <= 2559
        ? screenWidth * 0.173
        : screenWidth >= 2560
        ? screenWidth * 0.195
        : screenWidth * 0.13
    )

    setRightDoorMovmentOpen(
      screenWidth == 1280
        ? screenWidth * 0.7
        : screenWidth == 1366
        ? screenWidth * 1
        : screenWidth * 0.7
    )
    setRightDoorMovmentClose(
      screenWidth == 1280
        ? screenWidth * 0.473
        : screenWidth >= 1365 && screenWidth <= 1368
        ? screenWidth * 0.579
        : screenWidth >= 1360 && screenWidth <= 1439
        ? screenWidth * 0.478
        : screenWidth >= 1440 && screenWidth <= 1535
        ? screenWidth * 0.482
        : screenWidth >= 1536 && screenWidth <= 1599
        ? screenWidth * 0.484
        : screenWidth >= 1600 && screenWidth <= 1679
        ? screenWidth * 0.491
        : screenWidth >= 1680 && screenWidth <= 1792
        ? screenWidth * 0.495
        : screenWidth >= 1793 && screenWidth <= 1919
        ? screenWidth * 0.499
        : screenWidth >= 1920 && screenWidth <= 2559
        ? screenWidth * 0.504
        : screenWidth >= 2560
        ? screenWidth * 0.521
        : screenWidth * 0.473
    )

    setLeftDoorMovmentOpen(
      screenWidth == 1280 ? screenWidth * 0.16 : screenWidth * 0.1
    )

    setLeftDoorMovmentClose(
      screenWidth == 1280
        ? screenWidth * 0.328
        : screenWidth >= 1365 && screenWidth <= 1368
        ? screenWidth * 0.4079
        : screenWidth >= 1360 && screenWidth <= 1439
        ? screenWidth * 0.332
        : screenWidth >= 1440 && screenWidth <= 1535
        ? screenWidth * 0.338
        : screenWidth >= 1536 && screenWidth <= 1599
        ? screenWidth * 0.339
        : screenWidth >= 1600 && screenWidth <= 1679
        ? screenWidth * 0.344
        : screenWidth >= 1680 && screenWidth <= 1792
        ? screenWidth * 0.348
        : screenWidth >= 1793 && screenWidth <= 1919
        ? screenWidth * 0.352
        : screenWidth >= 1920 && screenWidth <= 2559
        ? screenWidth * 0.357
        : screenWidth >= 2560
        ? screenWidth * 0.372
        : screenWidth * 0.328
    )

    return () => window.removeEventListener("resize", handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize])

  return (
    <div
      className={`${
        screenHight >= 300 ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <motion.div
        className={`absolute top-0 w-full h-screen`}
        style={{scale: containerscale, perspective: 1000}}
      >
        <div
          className={` bg-cover w-full h-full overflow-x-hidden relative pointer-events-none z-20`}
          style={{backgroundImage: `url(/images/tample.png)`}}
        ></div>
        <div className="flex flex-row">
          <motion.img
            //@ts-ignore
            src={"/images/leftDoor.png"}
            className={` absolute z-10`}
            style={{
              left: LeftDoor,
              scale: doorsHight,
              top: doorsPosition,
            }}
          />
          <motion.img
            //@ts-ignore
            src={"/images/rightDoor.png"}
            className={` absolute z-10`}
            style={{
              left: rightDoor,
              scale: doorsHight,
              top: doorsPosition,
            }}
          />
        </div>
        <motion.div
          className="absolute inset-0 flex items-center max-w-7xl mx-auto z-[99]"
          style={{opacity: contentOpactiy}}
        >
          <div className="grid grid-cols-12 px-6 gap-8 z-40 w-full">
            <p
              className={`bg-cover bg-no-repeat bg-center p-8 font-papyrus text-xl shadow-lg  leading-loose font-semibold text-center capitalize col-span-6 justify-self-center text-black `}
              style={{backgroundImage: `url(/images/papyusPaper.png)`}}
            >
              {t("overview")}
            </p>

            <iframe
              src="https://www.youtube.com/embed/A-Y4iHUpurU"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-tr-[2rem] rounded-bl-[2rem] outline outline-offset-8 outline-2 outline-yellow-600 dark:outline-yellow-500 col-span-6 justify-self-center w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OverViewLargeScreen
