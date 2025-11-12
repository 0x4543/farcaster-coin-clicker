import React, { useEffect, useRef, useState } from 'react';
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';
import ChartCanvas from './components/ChartCanvas';
import CoinBurst from './components/CoinBurst';
import { sdk } from '@farcaster/miniapp-sdk';
import { ethers } from 'ethers';
import './styles.css';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

function MainApp() {
  const { ready, authenticated, login } = usePrivy();

  const [portfolio, setPortfolio] = useState(0);
  const [growth, setGrowth] = useState(false);
  const [tapTrigger, setTapTrigger] = useState(0);
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [walletAddr, setWalletAddr] = useState('');

  const interactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const inMini = await sdk.isInMiniApp();
      if (inMini) {
        await sdk.actions.ready();
        const provider = await sdk.wallet.getEthereumProvider();
        if (provider) {
          const ethersProvider = new ethers.BrowserProvider(provider as any);
          const signer = await ethersProvider.getSigner();
          const addr = await signer.getAddress();
          setWalletAddr(addr);
          setConnected(true);
        }
      }
    })();
  }, []);

  const shortAddr = walletAddr ? `${walletAddr.slice(0, 6)}...${walletAddr.slice(-4)}` : '';

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
    if (authenticated) {
      setConnected(true);
      return;
    }
    await login();
  };

  const handleCommunity = () => {
    alert('Community feature coming soon!');
  };

  const handleMint = async () => {
    try {
      setMinting(true);

      const rawProvider = await sdk.wallet.getEthereumProvider();
      if (!rawProvider) throw new Error('Farcaster provider not available');

      const provider = new ethers.BrowserProvider(rawProvider as any);
      const network = await provider.getNetwork();

      if (network.chainId !== 8453n) {
        throw new Error('Please switch to Base network inside Farcaster');
      }

      const signer = await provider.getSigner();
      const contractAddress = ethers.getAddress('0xa95ac67fdec773af78c380f3bbff82e4c1011c2e');
      const abi = ['function mint() public'];
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const inMini = await sdk.isInMiniApp();
      const tx = inMini ? await contract.mint({ gasLimit: 150000 }) : await contract.mint();

      if (tx?.hash) {
        setMinted(true);
        alert('NFT minted successfully!');
      } else {
        throw new Error('Transaction did not return a hash');
      }
    } catch (err: any) {
      console.error('Mint error:', err);
      if (err.code === 'ACTION_REJECTED') {
        alert('Transaction cancelled by user.');
        return;
      }
      alert(`Mint failed:\n${err.reason || err.message || err}`);
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
        loginMethods: ['farcaster', 'wallet'],
      }}
    >
      <MainApp />
    </PrivyProvider>
  );
}
