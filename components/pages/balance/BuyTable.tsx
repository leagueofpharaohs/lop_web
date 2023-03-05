import EmptyTable from "@/components/EmptyTable"
import Table from "@/components/table/Table"
import {GET_USER_BY_ID} from "@/gql/query"
import {kFormatter} from "@/utils/numberFormat"
import {useQuery} from "@apollo/client"
import {useRouter} from "next/router"

const BuyTable = ({tab, userData, userLoading}: any) => {
  const tableName = "buy"

  const buyTokenData = userData?.getUserById.balance.buy.buyToken.map(
    (item: any, index: number) => {
      return {
        create_at: new Date(item.createdAt).toDateString(),
        buy_by: item.currencyUsed,
        buy_price: item.currencyprice,
        amount: item.amount,
        token_Price: item.tokenPrice,
        token_Units: kFormatter(Number(item.tokenUnits)),
        buy_Phase: item.buyPhase,
        status: item.status,
      }
    }
  )

  const buyTokenDataSmallScreen =
    userData?.getUserById.balance.buy.buyToken.map(
      (item: any, index: number) => {
        return {
          create_at: new Date(item.createdAt).toDateString(),
          token_Units: item.tokenUnits,
          buy_Phase: item.buyPhase,
          status: item.status,
        }
      }
    )

  return (
    <div className={` ${tableName === tab ? "block" : "hidden"}`}>
      {!userLoading && buyTokenData.length > 0 && (
        <Table
          tbData={buyTokenData}
          gridTemplateColumns={`repeat(${
            Object.keys(buyTokenData[0]).length
          }, minmax(0, 1fr))`}
        />
      )}
      {!userLoading && buyTokenData.length === 0 && <EmptyTable />}
    </div>
  )
}

export default BuyTable
