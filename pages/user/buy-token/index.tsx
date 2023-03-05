import InfBox from "@/components/pages/buyToken/buyIdo/InfBox"
import LoadingBox from "@/components/pages/buyToken/buyIdo/LoadingBox"
import PageWrapper from "@/components/PageWrapper"
import UserLayout from "@/layouts/UserLayout"
import dynamic from "next/dynamic"
import {useDebounce} from "use-debounce"

const BuyBox = dynamic(
  () => import("../../../components/pages/buyToken/buyIdo/BuyBox"),
  {ssr: false, loading: () => <LoadingBox />}
)

export default function BuyToken() {
  return (
    <PageWrapper pageName={"buy-token"}>
      <div
        className="w-full h-full flex flex-col-reverse lg:flex-row justify-around items-start gap-10 pt-[22rem] lg:pt-0"
        style={{minHeight: "calc(100vh - 210px)"}}
      >
        <InfBox />
        <BuyBox />
      </div>
    </PageWrapper>
  )
}

BuyToken.getLayout = UserLayout
