import {useState} from "react"
import {BsArrowDownCircleFill} from "react-icons/bs"
import {HiOutlineArrowUpOnSquare} from "react-icons/hi2"
import {IoIosArrowDropdownCircle} from "react-icons/io"

const InvestingTable = () => {
  const [open, setOpen] = useState(false)
  const data = [
    {
      date: "2021-01-01",
      walletAddress: "0x1234567890",
      amount: "1000",
      plan: "royal-plan",
      planPeriod: "12",
      withdrawalPeriod: "48",
      planType: "weekly",
      planYield: "60",
      avalibleAmount: "1000",
      withdrawalAmount: "100",
      withdrawalAmountDetails: [
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
        {
          amount: "100",
          itemCount: "1",
          withdrawalStatus: "3",
          transactionLink: "https://google.com",
          withdrawalTime: "2021-01-01",
        },
      ],
      profit: [
        {
          itemCount: "1",
          percentageYield: "10",
          Amount: "500",
          percentageYieldProfit: "10",
          perecentageYieldProfitByPeriod: "10",
          withdrawalAppear: true,
          withdrawalTime: "2021-01-01",
        },
      ],
    },
  ]

  const style = {
    tableData: "col-span-1",
    subTableData: "col-span-1 text-center",
  }

  const tableHeader = [
    {name: "Date", hidden: true},
    {name: "Wallet Address", hidden: true},
    {name: "Amount", hidden: false},
    {name: "Plan", hidden: false},
    {name: "Plan Period", hidden: true},
    {name: "Withdrawal Period", hidden: true},
    {name: "Plan Type", hidden: true},
    {name: "Plan Yield", hidden: true},
    {name: "Avalible Amount", hidden: false},
    {name: "active", hidden: false},
  ]

  const subTableHeader = [
    "Withdrawal Time",
    "Amount",
    "Item Count",
    "Withdrawal Status",
    "Transaction Link",
  ]
  return (
    <div>
      <div className="grid grid-cols-4 lg:grid-cols-10 text-[12px] bg-slate-700 py-2 rounded-lg justify-items-center text-center text-slate-100">
        {tableHeader.map((item, i) => {
          return (
            <div
              key={i}
              className={`${
                item.hidden && "hidden lg:inline-block"
              } col-span-1`}
            >
              {item.name}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col gap-4 py-4">
        {data.map((item, i) => {
          return (
            <>
              <div
                key={i}
                className="grid grid-cols-4 lg:grid-cols-10 justify-items-center text-sm nm-flat-layout-100-lg dark:nm-flat-layout-800-lg py-2 rounded-lg"
              >
                <div className={`${style.tableData} hidden lg:inline-block`}>
                  {item.date}
                </div>
                <div className={`${style.tableData} hidden lg:inline-block`}>
                  {item.walletAddress}
                </div>
                <div className={style.tableData}>{item.amount}</div>
                <div className={style.tableData}>{item.plan}</div>
                <div className={`${style.tableData} hidden lg:inline-block`}>
                  {item.planPeriod}
                </div>
                <div className={`${style.tableData} hidden lg:inline-block`}>
                  {item.withdrawalPeriod}
                </div>
                <div className={`${style.tableData} hidden lg:inline-block`}>
                  {item.planType}
                </div>
                <div className={`${style.tableData} hidden lg:inline-block`}>
                  {item.planYield}
                </div>
                <div
                  className={`${style.tableData} flex flex-row gap-2 items-center`}
                >
                  {item.avalibleAmount}
                  <span className="nm-flat-layout-100 dark:nm-flat-layout-800 p-1 rounded-full">
                    <HiOutlineArrowUpOnSquare />
                  </span>
                </div>
                <div className={style.tableData}>
                  <button
                    onClick={() => {
                      setOpen(!open)
                    }}
                  >
                    <IoIosArrowDropdownCircle
                      className={open ? "rotate-180" : "rotate-0"}
                    />
                  </button>
                </div>
              </div>
              {open && (
                <>
                  <div className="grid grid-cols-5 text-center text-xs rounded-lg py-2">
                    {subTableHeader.map((item, i) => {
                      return (
                        <div key={i} className="col-span-1">
                          {item}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex flex-col gap-6 max-h-[240px]  styledScrollbars overflow-y-auto py-4">
                    {item.withdrawalAmountDetails.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="grid grid-cols-5 text-sm nm-flat-layout-100-lg dark:nm-flat-layout-800-lg py-2 rounded-lg"
                        >
                          <div className={style.subTableData}>
                            {item.withdrawalTime}
                          </div>
                          <div className={style.subTableData}>
                            {item.amount}
                          </div>
                          <div className={style.subTableData}>
                            {item.itemCount}
                          </div>
                          <div className={style.subTableData}>
                            {item.withdrawalStatus}
                          </div>
                          <div className={style.subTableData}>
                            {item.transactionLink}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default InvestingTable
