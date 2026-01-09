import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useBalance, useChainId } from 'wagmi'

const WalletInfo = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

  const { data: balance, isLoading } = useBalance({
    address,
    query: { enabled: !!address }
  })

  const getNetworkName = (id: number) => {
    switch (id) {
      case 1: return 'Ethereum Mainnet'
      case 11155111: return 'Sepolia Testnet'
      case 137: return 'Polygon'
      case 42161: return 'Arbitrum'
      default: return 'Unknown Network'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Wallet Test App
        </h1>

        {!isConnected ? (
          <button
            onClick={() => open()}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="break-all bg-gray-700 p-2 rounded text-sm">
                {address}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Network</p>
              <p className="font-semibold">
                {getNetworkName(chainId)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-xl font-bold">
                {isLoading
                  ? 'Loading...'
                  : `${Number(balance?.value).toFixed(4)} ${balance?.symbol}`
                }
              </p>
            </div>

            <button
              onClick={() => open()}
              className="w-full bg-gray-600 hover:bg-gray-700 py-2 rounded-lg"
            >
              Change Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletInfo
