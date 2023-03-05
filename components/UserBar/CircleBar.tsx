const CircleBar = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="w-16 h-16 lg:w-32 lg:h-32"
    >
      <defs>
        <linearGradient id="GradientColor">
          <stop offset="0%" stopColor="#BD4F8F" />
          <stop offset="100%" stopColor="#FF6E2F" />
        </linearGradient>
      </defs>
      <circle
        cx="65"
        cy="65"
        r="53"
        strokeLinecap="round"
        className=" fill-none stroke-green-500 stroke-[15px] hidden lg:block"
        style={{strokeDasharray: "330", strokeDashoffset: "0"}}
      />
      <circle
        cx="34"
        cy="34"
        r="20"
        strokeLinecap="round"
        className=" fill-none stroke-green-500 stroke-[19px] block lg:hidden"
        style={{strokeDasharray: "330", strokeDashoffset: "0"}}
      />
    </svg>
  )
}

export default CircleBar
