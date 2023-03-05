import {GiAirBalloon, GiChest} from "react-icons/gi"

const AirdropBody = () => {
  return (
    <div className="w-full border-2 dark:border-slate-600 my-4 py-4 flex flex-col justify-center items-center gap-4 max-w-[992px] mx-auto rounded-lg">
      <div className=" nm-flat-layout-100 dark:nm-flat-layout-800 p-4 rounded-full">
        <GiAirBalloon className="text-5xl" />
      </div>
      <h2 className=" uppercase tracking-widest rtl:tracking-wide text-center">
        Start first stage and get 100 LOP !
      </h2>
      <span className="text-center uppercase tracking-widest rtl:tracking-wide text-xs">
        once you start your stage, you will see the steps here
      </span>
    </div>
  )
}

export default AirdropBody
