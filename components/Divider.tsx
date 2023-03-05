interface DividerType {
  text?: any
  width?: string
  height?: string
}

export default function Divider({text}: DividerType) {
  return (
    <div className="flex flex-row justify-center items-center">
      <div
        className={`flex-1 h-1  from-primary-100 rounded-full ltr:bg-gradient-to-l rtl:bg-gradient-to-r`}
      ></div>
      {text && <div className={`uppercase px-1`}>{text}</div>}
      {!text && (
        <div className="relative h-4">
          <div className="w-full absolute h-[4px] bg-gradient-to-r from-transparent via-yellow-600 dark:via-yellow-400 to-transparent"></div>
          <div className="w-4 h-4 bg-cyan-300 absolute rotate-45 border-[2px] outline outline-2 outline-offset-1 outline-yellow-600 dark:outline-yellow-400 border-slate-500"></div>
        </div>
      )}
      <div
        className={`flex-1 h-1 from-primary-100 rounded-full ltr:bg-gradient-to-r rtl:bg-gradient-to-l`}
      ></div>
    </div>
  )
}
