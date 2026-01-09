import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { mainnet, polygon, arbitrum, optimism, sepolia } from 'wagmi/chains'

const projectId = 'e613dc134c70bb16ad98f96dde9893f7'

const metadata = {
  name: 'My Web3 DApp',
  description: 'Web3 Wallet Connection',
  url: 'http://localhost:5173', // ✅ LOCAL FOR NOW
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

const chains = [mainnet, polygon, arbitrum, optimism, sepolia]

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
})

export default config
