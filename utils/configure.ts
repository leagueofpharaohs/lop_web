import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum"
import {configureChains, createClient} from "wagmi"
import {bsc} from "wagmi/chains"

const chains = [bsc]

// Wagmi client
const {provider} = configureChains(chains, [
  walletConnectProvider({
    projectId: process.env.NEXT_PUBLIC_WAGMI_CLIENT_ID as string,
  }),
])
export const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    appName: process.env.NEXT_PUBLIC_APP_NAME as string,
    chains,
  }),
  provider,
})

// Web3Modal Ethereum Client
export const ethereumClient = new EthereumClient(wagmiClient, chains)
