import React, { useEffect, useRef, useState } from 'react';
import { PrivyProvider, usePrivy, useWallets, useUser } from '@privy-io/react-auth';
import ChartCanvas from './components/ChartCanvas';
import CoinBurst from './components/CoinBurst';
import { BrowserProvider } from 'ethers';
import './styles.css';

function MainApp() {
  const [portfolio, setPortfolio] = useState(0);
  const [growth, setGrowth] = useState(false);
  const [tapTrigger, setTapTrigger] = useState(0);
  const interactRef = useRef<HTMLDivElement>(null);
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const { user } = useUser();

  if (!ready)
    return (
      <div className="app">
        <p>Loading...</p>
      </div>
    );

  const connected = authenticated && wallets.length > 0;
  const walletAddr = connected ? wallets[0].address : '';
  const shortAddr = walletAddr ? `${walletAddr.slice(0, 6)}...${walletAddr.slice(-4)}` : '';

  const handleTap = () => {
    if (!connected) return;
    setPortfolio((p) => p + 1);
    setGrowth(true);
    setTapTrigger((t) => t + 1);
    setTimeout(() => setGrowth(false), 300);
  };

  const openFarcasterComposer = (text: string) => {
    const url = `https://farcaster.xyz/~/compose?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShare = async () => {
    if (!connected || !wallets[0]) return;

    const eipProvider = await wallets[0].getEthereumProvider();
    const provider = new BrowserProvider(eipProvider);
    const signer = await provider.getSigner();
    const message = `CC:${portfolio}:${walletAddr}`;
    const signature = await signer.signMessage(message);
    const sigShort = signature.slice(0, 10);

    const username = user?.farcaster?.username;
    const fid = user?.farcaster?.fid?.toString() || '0';
    const idPart = username ? username : `fid${fid}`;

    const tag = `#coinclicker`;
    const text = `🎯 I just grew my portfolio to $${portfolio} in Coin Clicker!\nJoin me and grow yours too.\n\n${tag}`;
    openFarcasterComposer(text);
  };

  const handleConnect = async () => {
    await login();
  };

  const handleCommunity = () => {
    window.open('https://farcaster.xyz/~/search/recent?q=%23coinclicker', '_blank');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Coin Clicker</h1>
        <p>Grow your portfolio and share your success</p>
        {connected && <div className="wallet-address">{shortAddr}</div>}
      </header>

      <main className="main">
        <div className={`chart-wrap ${!connected ? 'locked' : ''}`}>
          <ChartCanvas isGrowing={growth} />
          <div ref={interactRef} className="interaction-box">
            <div
              className={`tap-circle ${!connected ? 'locked-circle' : ''}`}
              onClick={connected ? handleTap : handleConnect}
            >
              <div className="value-box">
                {!connected ? (
                  <h2>Connect Wallet</h2>
                ) : (
                  <>
                    <span>Portfolio Value</span>
                    <h2>${portfolio}</h2>
                  </>
                )}
              </div>
            </div>
            <CoinBurst trigger={tapTrigger} containerRef={interactRef} />
          </div>
          {!connected && <div className="overlay-block"></div>}
        </div>
      </main>

      <footer className="footer">
        <button className="primary" onClick={handleShare} disabled={!connected || portfolio < 1}>
          Challenge Friends
        </button>
        <button className="secondary" onClick={handleCommunity}>
          Community Results
        </button>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        embeddedWallets: { ethereum: { createOnLogin: 'users-without-wallets' } },
        loginMethods: ['farcaster', 'wallet'],
      }}
    >
      <MainApp />
    </PrivyProvider>
  );
}
