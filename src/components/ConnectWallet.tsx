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

  const connectWallet = async () => {
    try {
      const accounts = await peraWalletAuth.login();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected account: {account}</p>
      ) : (
        <button className="wallet-button" onClick={connectWallet}>Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;








