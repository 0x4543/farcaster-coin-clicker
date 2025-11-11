import React, { useEffect, useRef, useState } from 'react';
import { PrivyProvider, usePrivy, useWallets } from '@privy-io/react-auth';
import ChartCanvas from './components/ChartCanvas';
import CoinBurst from './components/CoinBurst';
import { getContract, getReadContract } from './contract';
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
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    if (!ready || !connected || !wallets[0]) return;
    (async () => {
      try {
        const eip = await wallets[0].getEthereumProvider();
        const provider = new ethers.BrowserProvider(eip);
        const network = await provider.getNetwork();
        if (network.chainId !== 8453n) return;
        const rc = getReadContract(provider);
        const bal: bigint = await rc.balanceOf(walletAddr);
        setMinted(bal > 0n);
      } catch {}
    })();
  }, [ready, connected, wallets, walletAddr]);

  const handleTap = () => {
    if (!connected) return;
    setPortfolio((p) => p + 1);
    setGrowth(true);
    setTapTrigger((t) => t + 1);
    setTimeout(() => setGrowth(false), 300);
  };

  const openFarcasterComposer = (text: string) => {
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    const tag = '#coinclicker';
    const text = `🎯 I just grew my portfolio to $${portfolio} in Coin Clicker!\nJoin me and grow yours too.\n\n${tag}`;
    openFarcasterComposer(text);
  };

  const handleConnect = async () => {
    await login();
  };

  const handleCommunity = () => {
    window.open('https://warpcast.com/~/search?query=%23coinclicker', '_blank');
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
        network = await provider.getNetwork();
      }

      const signer = await provider.getSigner();
      const rc = getReadContract(provider);
      const bal: bigint = await rc.balanceOf(walletAddr);
      if (bal > 0n) {
        setMinted(true);
        setMinting(false);
        return;
      }

      const contract = getContract(signer);
      const tx = await contract.mint();
      await tx.wait();
      setMinted(true);
      alert('NFT minted successfully!');
    } catch (err: any) {
      const msg = String(err?.reason || err?.message || err);
      if (msg.toLowerCase().includes('already minted')) setMinted(true);
      console.error(err);
      alert('Mint failed. Check console for details.');
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
