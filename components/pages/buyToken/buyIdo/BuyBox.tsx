/* eslint-disable @next/next/no-img-element */
import {IoIosArrowForward} from "react-icons/io"
import {useDebounce} from "use-debounce"
import {GiAnubis} from "react-icons/gi"
import {useEffect, useRef, useState} from "react"
import React from "react"
import useBNBPrice from "@/hooks/useBNBPrice"
import {useForm} from "react-hook-form"
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi"
import {ethers, utils} from "ethers"
import {bsc} from "wagmi/chains"
import USDT_ABI, {USDT_Address} from "@/utils/ABI/UsdtAbi"
import useTranslation from "next-translate/useTranslation"
import {useMutation, useQuery} from "@apollo/client"
import {GET_USER_BY_ID} from "@/gql/query"
import {BUY_TOKEN} from "@/gql/mutation"
import {toast} from "react-toastify"
import {useTheme} from "next-themes"

const BuyBox = () => {
  const {t} = useTranslation()
  const {theme} = useTheme()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors: formErrors, isValid},
    getValues,
    reset,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  })

  const {data: userData, loading: userLoading} = useQuery(GET_USER_BY_ID)

  const userID = userData?.getUserById

  const {bnbPriceUsd} = useBNBPrice()
  const TokensAccept = [
    {
      name: "USDT",
      icon: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
      value: 1,
      dicimel: false,
      tokenAddress: "0x55d398326f99059fF775485246999027B3197955",
    },
    {
      name: "BNB",
      icon: "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
      value: bnbPriceUsd,
      dicimel: true,
    },
  ]
  const [currenttoken, setCurrentToken] = useState(TokensAccept[0])
  const [show, setShow] = useState(false)
  const [totalBuyToken, setTotalBuyToken] = useState(0)
  const [totalBuyAmount, setTotalBuyAmount] = useState(0)
  const tokenRef = useRef<HTMLDivElement>(null)

  const tokenPrice = 0.015
  const minmumBuy = 25
  const maxmumBuy = 10000

  useEffect(() => {
    let openHandler = (e: any) => {
      if (!tokenRef.current?.contains(e.target)) {
        setShow(false)
      }
    }

    window.addEventListener("click", openHandler)
    return () => {
      window.removeEventListener("click", openHandler)
    }
  }, [setShow])

  useEffect(() => {
    reset()
    setTotalBuyToken(0)
  }, [currenttoken, reset])

  const {address, isConnected} = useAccount()

  const {data} = useBalance({
    address: address,
    //@ts-ignore
    token: currenttoken.tokenAddress,
  })

  const {config} = usePrepareSendTransaction({
    request: {
      from: address,
      to: process.env.NEXT_PUBLIC_RECERVED_ADDRESS as string,
      value: (Number(totalBuyAmount) * 1e18).toString(),
      data: "0x",
    },
  })

  const {
    data: transactionData,
    isLoading: isTransactionLoading,
    isSuccess: isTransactionStarted,
    sendTransaction,
  } = useSendTransaction(config)

  const {config: contractWrite} = usePrepareContractWrite({
    address: USDT_Address,
    abi: USDT_ABI,
    functionName: "transfer",
    chainId: bsc.id,
    args: [
      process.env.NEXT_PUBLIC_RECERVED_ADDRESS as string,
      (Number(totalBuyAmount) * 1e18).toString(),
    ],
  })

  const {
    data: datContractWrite,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite({...contractWrite, request: contractWrite.request})

  const {isLoading: waitTransactionLoading, isSuccess: waitTransactionSuccess} =
    useWaitForTransaction({
      hash:
        currenttoken.name === "BNB"
          ? transactionData?.hash
          : datContractWrite?.hash,
    })

  const [buyToken, {data: buyTokenData, loading: buyTokenLoading}] =
    useMutation(BUY_TOKEN)

  const sendData = async () => {
    const status = "LOCKED"
    const buyPhase = "IDO"
    await buyToken({
      variables: {
        input: {
          currencyUsed: currenttoken.name.toLowerCase(),
          currencyprice: (currenttoken.name === "BNB"
            ? bnbPriceUsd
            : 1
          ).toString(),
          amount: totalBuyAmount.toString(),
          tokenUnits: totalBuyToken.toString(),
          tokenPrice: tokenPrice.toString(),
          buyPhase: buyPhase,
          status: status,
          wallet: address,
          balanceId: userData.getUserById.balance.id,
        },
      },
      refetchQueries: [
        {
          query: GET_USER_BY_ID,
        },
      ],
    })
  }

  useEffect(() => {
    if (waitTransactionSuccess) {
      sendData()
      toast.success("Transaction Success", {
        autoClose: 5000,
        theme: theme === "dark" ? "dark" : "light",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitTransactionSuccess])

  const onSubmit = async (data: any) => {
    if (currenttoken.name === "BNB") {
      sendTransaction?.()
    } else {
      write?.()
    }
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="nm-flat-layout-200-lg dark:nm-flat-layout-800-lg w-full lg:w-1/2 p-4 flex flex-col gap-4"
    >
      <div className="nm-inset-layout-200 dark:nm-inset-layout-800 p-2 sm:p-4">
        <h2 className="text-sm capitalize tracking-wider">{t("spend")}</h2>
        <div className="flex flex-col justify-center items-center gap-2 sm:gap-0 sm:flex-row relative">
          <input
            type="text"
            className="flex-1 outline-none bg-transparent p-2"
            {...register("buyToken", {
              required: {value: true, message: "Required Amount"},
              // min: {
              //   value: currenttoken.dicimel
              //     ? (minmumBuy / currenttoken.value).toFixed(3).toString()
              //     : minmumBuy.toString(),
              //   message: `Minmum Amount ${
              //     currenttoken.dicimel
              //       ? (minmumBuy / currenttoken.value).toFixed(3).toString()
              //       : minmumBuy.toString()
              //   } ${currenttoken.name}`,
              // },

              // max: {
              //   value: currenttoken.dicimel
              //     ? (maxmumBuy / currenttoken.value).toFixed(3).toString()
              //     : maxmumBuy.toString(),
              //   message: `Maxmum Amount ${
              //     currenttoken.dicimel
              //       ? (maxmumBuy / currenttoken.value).toFixed(3).toString()
              //       : maxmumBuy.toString()
              //   } ${currenttoken.name}`,
              // },
            })}
            onChange={(e) => {
              setTotalBuyToken(
                currenttoken.dicimel
                  ? (Number(e.target.value) * currenttoken.value) / tokenPrice
                  : Number(e.target.value) / tokenPrice
              )
              setTotalBuyAmount(Number(e.target.value))
            }}
            placeholder={
              currenttoken.dicimel
                ? `${(minmumBuy / currenttoken.value).toFixed(3)} - ${(
                    maxmumBuy / currenttoken.value
                  ).toFixed(3)}`
                : `${minmumBuy} - ${maxmumBuy}`
            }
            autoComplete="off"
          />
          <div ref={tokenRef}>
            <button
              type="button"
              onClick={() => {
                setShow(!show)
              }}
              className=" bg-slate-200 dark:bg-slate-900 flex flex-row rtl:flex-row-reverse justify-center items-center gap-2 p-2 rounded-full w-max"
            >
              <span className=" w-6 h-6 p-1 bg-slate-200 rounded-full flex justify-center items-center">
                <img src={currenttoken.icon} alt={currenttoken.name} />
              </span>
              <span className=" tracking-widest rtl:tracking-wide">
                {currenttoken.name}
              </span>
              <IoIosArrowForward />
            </button>
            {show && (
              <div className=" absolute sm:ltr:right-2 sm:rtl:left-2 -bottom-[3.75rem] bg-slate-200 dark:bg-slate-900 p-2 rounded-lg">
                {TokensAccept.map((token, i) => {
                  return (
                    <React.Fragment key={i}>
                      {token.name !== currenttoken.name && (
                        <button
                          key={i}
                          className="flex flex-row rtl:flex-row-reverse justify-start items-center gap-2 p-2 cursor-pointer hover:bg-primary-100 w-full"
                          onClick={() => {
                            setCurrentToken(token)
                          }}
                        >
                          <>
                            <span className=" w-6 h-6 p-1 bg-slate-200 rounded-full flex justify-center items-center">
                              <img src={token.icon} alt={token.name} />
                            </span>
                            <span className=" tracking-widest rtl:tracking-wide">
                              {token.name}
                            </span>
                          </>
                        </button>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="flex w-full justify-end capitalize text-xs tracking-widest rtl:tracking-wide">
        {isConnected
          ? `${t("balance")} : ${Number(data?.formatted).toFixed(3)} ${
              data?.symbol
            }`
          : t("connectwallet")}
      </span>
      <div className="nm-inset-layout-200 dark:nm-inset-layout-800 p-2 sm:p-4">
        <h2 className="text-sm capitalize tracking-wider">{t("receive")}</h2>
        <div className="flex flex-col justify-center items-center gap-2 sm:gap-0 sm:flex-row">
          <span className="flex-1 outline-none p-2">
            {Number.isNaN(totalBuyToken) ? 0 : totalBuyToken.toLocaleString()}
          </span>
          <div className=" bg-slate-200 dark:bg-slate-900 flex justify-center items-center gap-2 p-2 rounded-full w-max">
            <span className="bg-slate-200 rounded-full w-6 h-6 flex justify-center items-center p-1">
              <GiAnubis className="text-slate-900" />
            </span>
            <span className=" tracking-widest rtl:tracking-wide">LOP</span>
          </div>
        </div>
      </div>
      <div className=" min-h-[2rem]">
        {formErrors.buyToken?.type !== "required" && (
          <span className="text-xs text-red-500 flex flex-row justify-start items-center gap-1">
            {formErrors.buyToken?.message?.toString()}
          </span>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <span className=" text-xs sm:text-sm tracking-widest rtl:tracking-wide">
          Estimated price 1 {currenttoken.name} ≈{" "}
          {(Number(currenttoken.value) / tokenPrice).toFixed(2)} LOP
        </span>
        <button
          type="submit"
          className="bg-primary-100 w-full p-2 rounded uppercase font-semibold tracking-widest rtl:tracking-wide text-slate-900 disabled:bg-slate-400 disabled:text-slate-500"
          disabled={
            !isConnected ||
            isLoading ||
            isTransactionLoading ||
            waitTransactionLoading
          }
        >
          {isLoading || isTransactionLoading ? (
            "waiting for confirm"
          ) : waitTransactionLoading ? (
            <span className=" animate-pulse">in processing...</span>
          ) : (
            "buy LOP"
          )}
        </button>
      </div>
    </form>
  )
}

export default BuyBox
