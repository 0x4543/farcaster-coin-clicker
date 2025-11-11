import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xbf584627d7050e9c3c34ed9bdeb404b2db6d97a1';
const ABI = ['function mint() public', 'function tokenURI(uint256 tokenId) view returns (string)'];

export function getContract(signer: ethers.Signer): ethers.Contract {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

export function getReadContract(provider: ethers.BrowserProvider): ethers.Contract {
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}
