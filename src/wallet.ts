export const BASE_SEPOLIA = {
  chainIdHex: '0x14A34',
  chainIdDec: 84532,
  chainName: 'Base Sepolia',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://sepolia.base.org'],
  blockExplorerUrls: ['https://sepolia.basescan.org'],
};

export async function getEip1193Provider(privyWallet?: any): Promise<any> {
  const w: any = globalThis as any;
  if (w?.farcaster?.wallet?.getEthereumProvider) {
    const p = await w.farcaster.wallet.getEthereumProvider();
    if (p) return p;
  }
  if (privyWallet?.getEthereumProvider) {
    const p = await privyWallet.getEthereumProvider();
    if (p) return p;
  }
  if (w?.ethereum) return w.ethereum;
  throw new Error('No EIP-1193 provider available');
}

export async function ensureBaseSepolia(provider: any): Promise<void> {
  const current = await provider.request({ method: 'eth_chainId' });
  if (current === BASE_SEPOLIA.chainIdHex) return;
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: BASE_SEPOLIA.chainIdHex }],
    });
  } catch (e: any) {
    const code = e?.code ?? e?.data?.originalError?.code;
    if (code === 4902 || code === -32603) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: BASE_SEPOLIA.chainIdHex,
            chainName: BASE_SEPOLIA.chainName,
            nativeCurrency: BASE_SEPOLIA.nativeCurrency,
            rpcUrls: BASE_SEPOLIA.rpcUrls,
            blockExplorerUrls: BASE_SEPOLIA.blockExplorerUrls,
          },
        ],
      });
    } else {
      throw e;
    }
  }
}
