import React, { useEffect, useRef, useState } from 'react';
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
import ChartCanvas from './components/ChartCanvas';
import CoinBurst from './components/CoinBurst';
import { getContract } from './contract';
import { sdk } from '@farcaster/miniapp-sdk';
import { ethers } from 'ethers';
import './styles.css';

function MainApp() {
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();

  const [portfolio, setPortfolio] = useState(0);
  const [growth, setGrowth] = useState(false);
  const [tapTrigger, setTapTrigger] = useState(0);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);

  const interactRef = useRef<HTMLDivElement>(null);

  const connected = ready && authenticated && wallets.length > 0;
  const walletAddr = connected ? wallets[0].address : '';
  const shortAddr = walletAddr ? `${walletAddr.slice(0, 6)}...${walletAddr.slice(-4)}` : '';

  useEffect(() => {
    (async () => {
      const inMini = await sdk.isInMiniApp();
      if (inMini) {
        await sdk.actions.ready();
      }
    })();
  }, []);

  const handleTap = () => {
    if (!connected) return;
    setPortfolio((p) => p + 1);
    setGrowth(true);
    setTapTrigger((t) => t + 1);
    setTimeout(() => setGrowth(false), 300);
  };

  const openFarcasterComposer = (text: string, embedUrl: string) => {
    const base = 'https://warpcast.com/~/compose';
    const url = `${base}?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(embedUrl)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    const tag = '#coinclicker';
    const text = `🎯 I just grew my portfolio to $${portfolio} in Coin Clicker!\n${tag}`;
    openFarcasterComposer(text, 'https://farcaster.xyz/miniapps/DUHyXvDOjMVR/coin-clicker');
  };

  const handleConnect = async () => {
    await login();
  };

  const handleCommunity = async () => {
    const url = 'https://farcaster.xyz/~/search?query=%23coinclicker';
    try {
      const inMini = await sdk.isInMiniApp();
      if (inMini) {
        await sdk.actions.openUrl(url);
      } else {
        window.open(url, '_blank');
      }
    } catch {
      window.open(url, '_blank');
    }
  };

  const handleMint = async () => {
    try {
      if (!connected || !wallets[0]) return;
      setMinting(true);
      const wallet = wallets[0];
      const eipProvider = await wallet.getEthereumProvider();
      let provider = new ethers.BrowserProvider(eipProvider);
      let network = await provider.getNetwork();
      const isFarcasterWallet = wallet.walletClientType === 'privy';

      if (!isFarcasterWallet && network.chainId !== 8453n) {
        await eipProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x2105' }],
        });
        provider = new ethers.BrowserProvider(eipProvider);
      }

      const signer = await provider.getSigner();
      const contract = getContract(signer);
      const tx = await contract.mint();
      await tx.wait();
      setMinted(true);
      alert('NFT minted successfully!');
    } catch (err: any) {
      const msg = String(err?.reason || err?.message || err);
      if (msg.toLowerCase().includes('already minted')) {
        setMinted(true);
      }
      console.error(err);
      alert(`Mint failed:\n${msg}`);
    } finally {
      setMinting(false);
    }
  };

  if (!ready) {
    return (
      <div className="app">
        <p>Loading...</p>
      </div>
    );
  }

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
        </div>
      </main>

      <footer className="footer">
        <button className="secondary" onClick={handleShare}>
          Share
        </button>
        <button
          className="primary"
          onClick={handleMint}
          disabled={!connected || portfolio < 1 || minted || minting}
        >
          {minted ? 'Minted' : minting ? 'Minting...' : 'Mint'}
        </button>
        <button className="secondary" onClick={handleCommunity}>
          Community
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
        loginMethods: ['farcaster'],
      }}
    >
      <MainApp />
    </PrivyProvider>
  );
}
