import AirdropComponent from "@/components/airdrops"
import UserLayout from "@/layouts/UserLayout"

export default function Airdrop() {
  return (
    <div className="w-full">
      <AirdropComponent />
    </div>
  )
}

Airdrop.getLayout = UserLayout
