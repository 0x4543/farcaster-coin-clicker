import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = '0x69cc7429b12587a700c52197ad2f296f9aaa9ffd';

export const CONTRACT_ABI = [
  { inputs: [], name: 'mint', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const getContract = (signer: ethers.Signer) =>
  new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

export const getReadContract = (provider: ethers.Provider) =>
  new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
