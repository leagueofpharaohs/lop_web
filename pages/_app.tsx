import {Progress} from "@/components/progress"
import client from "@/gql/client"
import useProgress from "@/hooks/useProgress"
import "@/styles/globals.css"
import {ApolloProvider} from "@apollo/client"
import {GoogleOAuthProvider} from "@react-oauth/google"
import {NextPage} from "next"
import {ThemeProvider} from "next-themes"
import type {AppProps} from "next/app"
import {useRouter} from "next/router"
import React, {useEffect} from "react"
import {ReactElement, ReactNode} from "react"
import {ToastContainer} from "react-toastify"
import "/node_modules/flag-icons/css/flag-icons.min.css"
import "react-toastify/dist/ReactToastify.css"
import "react-loading-skeleton/dist/skeleton.css"
import {Web3Modal} from "@web3modal/react"
import {ethereumClient, wagmiClient} from "@/utils/configure"
import {WagmiConfig} from "wagmi"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({Component, pageProps}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const {progress, setProgress} = useProgress()

  const router = useRouter()

  const {locale} = router

  const dir = locale === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  useEffect(() => {
    const handleStart = () => {
      setProgress(true)
    }
    const handleStop = () => {
      setProgress(false)
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router, setProgress])

  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <ApolloProvider client={client}>
        {getLayout(
          <React.Fragment>
            <Progress isAnimating={progress} />
            <GoogleOAuthProvider
              //@ts-ignore
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            >
              <Web3Modal
                projectId={process.env.NEXT_PUBLIC_WAGMI_CLIENT_ID as string}
                ethereumClient={ethereumClient}
              />
              <WagmiConfig client={wagmiClient}>
                <ToastContainer />
                <Component {...pageProps} />
              </WagmiConfig>
            </GoogleOAuthProvider>
          </React.Fragment>
        )}
      </ApolloProvider>
    </ThemeProvider>
  )
}
