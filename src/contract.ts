import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xbf584627d7050e9c3c34ed9bdeb404b2db6d97a1';
const ABI = [
  'function mint() public',
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  'function uri(uint256 id) view returns (string)',
];

export function getContract(signer: ethers.Signer) {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

export function getReadContract(provider: ethers.BrowserProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}
