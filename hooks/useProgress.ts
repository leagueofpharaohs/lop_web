import React from "react"

const useProgress = () => {
  const [progress, setProgress] = React.useState(false)

  return {progress, setProgress}
}

export default useProgress
