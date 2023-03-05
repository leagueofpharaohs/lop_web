import {useCallback, useEffect, useState} from "react"
import ReactPaginate from "react-paginate"
import SearchBar from "./SearchBar"
import {CgSortAz} from "react-icons/cg"
import {motion} from "framer-motion"

interface TableProps {
  tbData: any[]
  gridTemplateColumns: string
}

const sortData = (data: any[], sortField: any, order: string | undefined) => {
  if (!sortField) return data

  const sortedData = data.sort((a, b) => {
    return a[sortField] > b[sortField] ? 1 : -1
  })

  if (order === "desc") {
    return sortedData.reverse()
  }
  return sortedData
}

const Table = ({tbData, gridTemplateColumns}: TableProps) => {
  const itemsPerPage = 10
  const [currentItems, setCurrentItems] = useState([])
  const [searchItems, setSearchItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [sortField, setSortField] = useState<string | undefined>()
  const [order, setOrder] = useState<string | undefined>()
  const [isSorted, setIsSorted] = useState(false)

  const sortedData = useCallback(
    () => sortData(tbData, sortField, order),
    [tbData, sortField, order]
  )

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(searchItems.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(searchItems.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, searchItems])

  const handlePageClick = (event: {selected: number}) => {
    const newOffset = (event.selected * itemsPerPage) % tbData?.length
    setItemOffset(newOffset)
  }

  const handleSortingChange = (accessor: any) => {
    setSortField(accessor)
    setOrder(order === "asc" ? "desc" : "asc")
  }
  const handleUnSort = () => {
    if (isSorted) {
      setSortField(undefined)
      setOrder(undefined)
      setIsSorted(false)
    } else {
      setIsSorted(true)
    }
  }

  return (
    <motion.div
      exit={{opacity: 0}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="h-full w-full relative "
    >
      <div className="flex justify-start py-2">
        <span className="text-xs">total rows : {tbData.length}</span>
      </div>
      <div className="w-[20rem] xsm:w-[25rem] sm:w-[30rem] md:w-[40rem] lg:w-full overflow-x-auto mx-auto">
        <div
          className={`flex-1 grid justify-items-center bg-slate-600 dark:bg-slate-900 text-xs font-medium uppercase text-slate-100 py-2 mx-2 rounded-lg w-[1042px] lg:w-[98%]`}
          style={{
            gridTemplateColumns: gridTemplateColumns,
          }}
        >
          {Object.keys(tbData[0]).map((item, index) => (
            <div
              key={index}
              className="flex flex-row gap-2 justify-center items-center "
            >
              <h2 className=" col-span-1 text-xs">{item}</h2>
              {isSorted && (
                <button
                  className="flex flex-col justify-center items-center gap-1"
                  onClick={() => {
                    handleSortingChange(item)
                  }}
                >
                  <div
                    className={`w-0 h-0 border-l-[.25rem] border-l-transparent border-r-[.25rem] border-r-transparent border-b-[.5rem] ${
                      sortField === item && order === "asc"
                        ? "border-b-white"
                        : "border-b-slate-700"
                    }`}
                  ></div>
                  <div
                    className={`w-0 h-0 border-l-[.25rem] border-l-transparent border-r-[.25rem] border-r-transparent border-t-[.5rem] border-t-white ${
                      sortField === item && order === "desc"
                        ? "border-t-white"
                        : "border-t-slate-700"
                    }`}
                  ></div>
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-row items-center px-4">
          <div className="flex-1">
            <SearchBar
              data={sortedData()}
              setData={setSearchItems}
              setItemOffset={setItemOffset}
              setPageCount={setPageCount}
              order={order}
              sortField={sortField}
            />
          </div>
          <button
            onClick={() => {
              handleUnSort()
            }}
            className={`flex flex-row justify-center items-center ${
              isSorted && "text-cyan-500"
            }`}
          >
            <CgSortAz className="text-xl" />
          </button>
        </div>
        <div
          className={`h-[16rem] overflow-auto mt-1 styledScrollbars w-[1042px] lg:w-[98%]`}
        >
          {currentItems.map((item: any, index) => (
            <div
              key={index}
              className={`grid justify-items-center text-sm font-medium p-4 nm-flat-layout-200 dark:nm-flat-layout-800 mb-3 mx-2 rounded-lg shadow-md border-t-2 border-l-2 border-slate-50 dark:border-slate-700/30 last-of-type:mb-2`}
              style={{
                gridTemplateColumns: gridTemplateColumns,
              }}
            >
              {Object.values(item).map((value: any, index: number) => {
                return <span key={index}>{value}</span>
              })}
            </div>
          ))}
          {currentItems.length == 0 && (
            <div className="text-center ">No data found</div>
          )}
        </div>
      </div>

      {tbData?.length > 10 && (
        <ReactPaginate
          breakLabel=". . ."
          nextLabel={`next >`}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel={`< previous`}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      )}
    </motion.div>
  )
}

export default Table
