import {useEffect, useState} from "react"
import {FiSearch} from "react-icons/fi"

const SearchBar = ({
  data,
  setData,
  setItemOffset,
  setPageCount,
  order,
  sortField,
}: any) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (query.length == 0 || query.length > 2) {
      setItemOffset(0)
      setPageCount(0)
      setData(
        data.filter((item: any) =>
          Object.values(item).some((value: any) =>
            value.toLowerCase().includes(query)
          )
        )
      )
    }
  }, [query, data, order, sortField])
  return (
    <div className="flex flex-row items-center justify-start gap-2">
      <FiSearch className="text-blue-1600 text-xl pointer-events-auto" />
      <input
        type={"text"}
        placeholder="search . . ."
        className={
          " bg-transparent outline-none placeholder:text-base placeholder:pointer-events-auto"
        }
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
