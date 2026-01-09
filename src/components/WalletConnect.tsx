import { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';
import { Wallet, Send, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const WalletConnect = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    query: { enabled: !!address },
  });

  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [txStatus, setTxStatus] = useState('');

  // Send transaction
  const {
    data: txHash,
    sendTransaction,
    isPending: isSending,
  } = useSendTransaction();

  // Wait for confirmation
  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) {
      setTxStatus('Transaction confirmed!');
      setRecipientAddress('');
      setAmount('');
    }
  }, [isSuccess]);

  const handleSendTransaction = () => {
    if (!recipientAddress || !amount) {
      setTxStatus('Please enter recipient address and amount');
      return;
    }

    try {
      setTxStatus('Processing transaction...');
      sendTransaction({
        to: recipientAddress as `0x${string}`,
        value: parseEther(amount),
      });
    } catch (error: any) {
      setTxStatus(`Transaction failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Web3 Wallet Connect
            </h1>
            <p className="text-gray-600">
              Connect your wallet and send transactions
            </p>
          </div>

          {!isConnected ? (
            <div className="text-center">
              <button
                onClick={() => open()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
              >
                <Wallet size={24} />
                Connect Wallet
              </button>
            </div>
          ) : (
            <div>
              {/* Wallet Info */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-gray-700">
                      Connected
                    </span>
                  </div>
                  <button
                    onClick={() => open()}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Change Wallet
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Account
                    </p>
                    <p className="text-sm font-mono text-gray-800 break-all bg-white px-3 py-2 rounded-lg">
                      {address}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Balance
                    </p>
                    <p className="text-xl font-bold text-purple-600">
                      {balance
                        ? `${parseFloat(balance.formatted).toFixed(4)} ${
                            balance.symbol
                          }`
                        : '0 ETH'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Send Transaction */}
              <div className="space-y-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Send size={20} />
                  Send Transaction
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleSendTransaction}
                  disabled={
                    !recipientAddress ||
                    !amount ||
                    isSending ||
                    isConfirming
                  }
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  {isSending
                    ? 'Sending...'
                    : isConfirming
                    ? 'Confirming...'
                    : 'Send Transaction'}
                </button>
              </div>

              {/* Transaction Status */}
              {txStatus && (
                <div
                  className={`rounded-lg p-4 ${
                    txStatus.includes('confirmed')
                      ? 'bg-green-50 border border-green-200'
                      : txStatus.includes('failed')
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {txStatus.includes('confirmed') ? (
                      <CheckCircle
                        className="text-green-600 flex-shrink-0"
                        size={20}
                      />
                    ) : txStatus.includes('failed') ? (
                      <XCircle
                        className="text-red-600 flex-shrink-0"
                        size={20}
                      />
                    ) : (
                      <AlertCircle
                        className="text-blue-600 flex-shrink-0"
                        size={20}
                      />
                    )}

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {txStatus}
                      </p>

                      {txHash && (
                        <a
                          href={`https://etherscan.io/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-600 hover:text-purple-700 underline mt-1 inline-block break-all"
                        >
                          View on Etherscan
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              📝 Instructions:
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Install MetaMask browser extension</li>
              <li>• Click “Connect Wallet” to connect</li>
              <li>• Choose your wallet from the modal</li>
              <li>• Enter recipient address and amount</li>
              <li>• Confirm transaction in your wallet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
