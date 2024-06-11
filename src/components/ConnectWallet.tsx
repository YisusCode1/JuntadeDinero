// src/components/ConnectWallet.tsx

import React, { useEffect, useState } from 'react';
import { peraWalletAuth } from '../utils/peraWalletAuth';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem('peraWalletAccount');
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  const toggleWallet = async () => {
    if (account) {
      await peraWalletAuth.disconnectWallet();
      localStorage.removeItem('peraWalletAccount');
      setAccount(null);
    } else {
      connectWallet();
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await peraWalletAuth.connectWallet();
      setAccount(accounts[0]);
      localStorage.setItem('peraWalletAccount', accounts[0]);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {account ? (
        <>
          <p>Connected account: {account}</p>
          <button className="wallet-button" onClick={toggleWallet}>Disconnect</button>
        </>
      ) : (
        <button className="wallet-button" onClick={toggleWallet}>Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;










