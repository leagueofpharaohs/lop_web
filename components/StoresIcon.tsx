import appstore from "../assets/images/stores/appstore.png"
import googlestore from "../assets/images/stores/googlestore.png"
import windowsstore from "../assets/images/stores/windowsstore.png"
import playstation from "../assets/images/stores/playstation.png"
import Xboxstore from "../assets/images/stores/Xboxstore.png"
import Image from "next/image"

const StoresIcon = () => {
  const stores = [
    {
      name: "app store",
      fileName: appstore,
    },
    {
      name: "play store",
      fileName: googlestore,
    },
    {
      name: "microsoft store",
      fileName: windowsstore,
    },
    {
      name: "playStation store",
      fileName: playstation,
    },
    {
      name: "xbox store",
      fileName: Xboxstore,
    },
  ]
  return (
    <div className="flex flex-row gap-6 px-4">
      {stores.map((store, i) => {
        return (
          <div key={i}>
            <div className="w-full">
              <Image
                src={store.fileName}
                alt={store.name}
                className=" w-8 h-8"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StoresIcon
