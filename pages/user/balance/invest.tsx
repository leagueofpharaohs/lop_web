import InvestingTable from "@/components/InvestingTable"
import PageWrapper from "@/components/PageWrapper"
import UserLayout from "@/layouts/UserLayout"

export default function Invest() {
  return (
    <PageWrapper pageName="balance">
      <InvestingTable />
    </PageWrapper>
  )
}

Invest.getLayout = UserLayout
