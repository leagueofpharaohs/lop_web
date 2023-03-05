import {initials} from "@dicebear/collection"
import {createAvatar} from "@dicebear/core"
import {useEffect, useState} from "react"

export const useImageGenerator = (seed: any) => {
  const [image, setImage] = useState<string>("")

  const generatImage = async () => {
    const avatar = createAvatar(initials, {
      seed,
      backgroundColor: [
        "00acc1",
        "1e88e5",
        "5e35b1",
        "7cb342",
        "8e24aa",
        "039be5",
        "43a047",
        "00897b",
        "3949ab",
        "d81b60",
        "e53935",
        "f4511e",
        "fb8c00",
        "ffb300",
      ],
      scale: 100,
      radius: 50,
      textColor: ["ffffff"],
    })

    await avatar.toDataUri().then((dataUri) => setImage(dataUri))
  }
  useEffect(() => {
    generatImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed])

  return {image, generatImage}
}
