import BuyTable from "@/components/pages/balance/BuyTable"
import History from "@/components/pages/balance/History"
import TokenTable from "@/components/pages/balance/TokenTable"
import PageWrapper from "@/components/PageWrapper"
import UserLayout from "@/layouts/UserLayout"
import {GetServerSideProps} from "next"

export default function Balance() {
  return (
    <PageWrapper pageName="balance">
      <div className="flex flex-col gap-6">
        <TokenTable />
        <History />
      </div>
    </PageWrapper>
  )
}

Balance.getLayout = UserLayout

export const getServerSideProps = async (context: any) => {
  const {req, query} = context
  const {tab} = query

  if (!tab) {
    return {
      redirect: {
        destination: "/user/balance?tab=buy",
      },
    }
  }

  return {
    props: {},
  }
}
