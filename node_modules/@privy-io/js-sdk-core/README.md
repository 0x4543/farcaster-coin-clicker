# @privy-io/js-sdk-core

> 🔧 The Privy JS SDK is a low-level library and **not intended for general consumption.**
>
> **Before building, please reach out to the Privy team** to discuss your project and which Privy SDK options may be better suited to it.

## Usage

### Auth

```tsx
const privy = new Privy({appId: '<your-app-id-here>'});

await privy.auth.sms.sendCode('+1 555 555 5555');
const {user} = await privy.auth.sms.loginWithCode('+1 555 555 5555', '123123');
```

### Embedded Wallets

```tsx
// Or use the embedded wallet with viem
import {createWalletClient, custom} from 'viem';

// Initialize the client
const privy = new Privy({appId: '<your-app-id-here>'});

// Log in
await privy.auth.sms.sendCode('+1 555 555 5555');
const {user} = await privy.auth.sms.loginWithCode('+1 555 555 5555', '123123');

// Create an embedded wallet
const wallet = await privy.embeddedWallet.create();

// Use the embedded wallet
const accounts = await wallet.request({method: 'eth_requestAccounts'});
const response = await wallet.request({
  method: 'eth_sendTransaction',
  params: [
    {
      from: accounts[0],
      to: '0x0000000000000000000000000000000000000000',
      value: '1',
    },
  ],
});

// create a viem client from the privy embedded wallet
const viemWalletClient = createWalletClient({
  chain: mainnet,
  transport: custom(wallet),
});

// use viem to sign a message
await viemWalletClient.signMessage({
  message: 'Hello from Privy!!',
  account: wallet.address,
});
```

## Changelog

Our [changelog](https://docs.privy.io/changelogs/js-sdk-core) contains the latest information about new releases, including features, fixes, and upcoming changes.

We use [Semantic Versioning](https://semver.org/) to track changes.
