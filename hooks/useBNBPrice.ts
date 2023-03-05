import {useEffect, useState} from "react"

const useBNBPrice = () => {
  const [bnbPriceUsd, setBnbPriceUsd] = useState(300)

  const fetchingPrice = async () => {
    try {
      const Url =
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin&vs_currencies=usd"
      const response = await fetch(Url)
      const data = await response.json()
      setBnbPriceUsd(data.binancecoin.usd)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      fetchingPrice()
    } catch (error) {
      console.log(error)
    }
    let fathcingBNBPrice = setInterval(() => {
      fetchingPrice()
    }, 60 * 1000)

    return () => {
      clearInterval(fathcingBNBPrice)
    }
  }, [])

  return {bnbPriceUsd, setBnbPriceUsd}
}

export default useBNBPrice
