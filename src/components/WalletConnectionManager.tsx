// ERRORS

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

function WalletConnectionManager() {
  const { wallet, connect, connected, disconnect } = useWallet();
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const savedWalletName = localStorage.getItem('connectedWallet');
    
    if (savedWalletName && !connected && !isReconnecting) {
      setIsReconnecting(true);
      const savedWallet = wallet.find(w => w.adapter.name === savedWalletName);
      
      if (savedWallet) {
        connect(savedWallet.adapter)
          .catch(console.error)
          .finally(() => setIsReconnecting(false));
      } else {
        setIsReconnecting(false);
      }
    }
  }, [wallet, connect, connected, isReconnecting]);

  useEffect(() => {
    if (connected && wallet) {
      localStorage.setItem('connectedWallet', wallet.adapter.name);
    } else {
      localStorage.removeItem('connectedWallet');
    }
  }, [connected, wallet]);

  return null; // This component doesn't render anything
}

export default WalletConnectionManager;