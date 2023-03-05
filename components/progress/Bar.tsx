interface BarProps {}

export const Bar = ({animationDuration, progress}: any) => (
  <div
    className="bg-primary-100 h-1 w-full left-0 top-0 fixed z-[1000]"
    style={{
      marginLeft: `${(-1 + progress) * 100}%`,
      transition: `margin-left ${animationDuration}ms linear`,
    }}
  ></div>
)
