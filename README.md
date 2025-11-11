# 🪙 Farcaster Coin Clicker

<p>
  <a href="https://farcaster.xyz/miniapps/DUHyXvDOjMVR/coin-clicker">
    <img src="https://img.shields.io/badge/Farcaster-Miniapp-6C47FF?logo=farcaster&logoColor=white" alt="Farcaster Miniapp">
  </a>
  <a href="https://github.com/0x4543/farcaster-coin-clicker">
    <img src="https://img.shields.io/github/stars/0x4543/farcaster-coin-clicker?style=flat&color=gold" alt="GitHub stars">
  </a>
  <a href="https://github.com/0x4543/farcaster-coin-clicker/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  </a>
  <img src="https://img.shields.io/badge/framework-React-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/built%20with-Privy%20SDK-orange.svg" alt="Privy SDK">
  <img src="https://img.shields.io/badge/network-Base-0052FF.svg" alt="Base Network">
</p>

**Farcaster Coin Clicker** is a playful Farcaster Mini App where users grow their virtual portfolio and mint an NFT on the **Base** network. Built for fun, engagement, and to explore the creative potential of Farcaster Mini Apps.

<p align="center">
  <img src="./public/screenshot.png" alt="Preview" width="280" style="border-radius:12px;box-shadow:0 0 10px rgba(0,0,0,0.15);" />
</p>

---

## ✨ Overview

Coin Clicker lets you tap to grow your portfolio, share progress to Farcaster, and mint your portfolio NFT directly on Base. Designed for smooth mobile experience inside the Farcaster app and works standalone on web.

---

## ⚙️ Features

- Farcaster Mini App integration via `@farcaster/miniapp-sdk`
- Wallet authentication using **Privy**
- On-chain NFT minting on **Base Mainnet**
- Animated tap interaction and coin burst effect
- Seamless UI for both standalone and embedded modes

---

## 🧩 Tech Stack

- **React + Vite** frontend
- **Ethers.js v6** for blockchain interactions
- **Privy** for wallet and Farcaster login
- **Farcaster Mini App SDK** for in-app actions
- **Base** network for NFT minting

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/0x4543/farcaster-coin-clicker.git
cd farcaster-coin-clicker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file based on the provided example:

```bash
cp .env.example .env
```

Edit `.env` with your Privy app ID:

```
VITE_PRIVY_APP_ID=your_privy_app_id
```

### 4. Run locally

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## ☁️ Deployment

The project is optimized for **Vercel** deployment.

1. Push your repo to GitHub.
2. Connect it to Vercel.
3. Add your environment variables in Vercel settings.
4. Deploy 🚀

Live demo: _(add your Vercel link here)_

---

## 🔗 Useful Links

- **Farcaster:** [https://farcaster.xyz](https://farcaster.xyz)
- **Base Network:** [https://base.org](https://base.org)
- **Privy:** [https://www.privy.io](https://www.privy.io)

---

## 🧠 Future Plans

- Community search integration inside Farcaster app
- Portfolio-based NFT metadata
- Extended miniapp features (leaderboard, rewards)

---

## 📄 License

[MIT License](./LICENSE)

---

## 🧑‍💻 Author

**0x4543**  
Farcaster: [@0x4543](https://warpcast.com/0x4543)  
GitHub: [https://github.com/0x4543](https://github.com/0x4543)
