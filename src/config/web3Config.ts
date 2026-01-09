import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet, polygon, arbitrum, optimism, sepolia } from 'wagmi/chains'

// WalletConnect Cloud Project ID
const projectId = 'e613dc134c70bb16ad98f96dde9893f7'

// App metadata
const metadata = {
  name: 'My Web3 DApp',
  description: 'Web3 Wallet Connection',
  url: 'https://wallet-test-run.vercel.app', // your Vercel URL later
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// IMPORTANT: chains MUST be a tuple in wagmi v2
const chains = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  sepolia,
] as const

// Create wagmi config
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

// Create Web3Modal (NO `chains` here)
createWeb3Modal({
  wagmiConfig,
  projectId,
})

export default wagmiConfig
