import{WalletGet as t}from"@privy-io/routes";async function r(r,{wallet_id:i}){return await r.fetchPrivyRoute(t,{params:{wallet_id:i}})}export{r as getWallet};
