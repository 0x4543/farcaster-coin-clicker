const e=(e,s)=>e.linked_accounts.filter((e=>"cross_app"===e.type)).find((({embedded_wallets:e,smart_wallets:t})=>[...e,...t].some((e=>e.address===s))));export{e as getCrossAppAccountByWalletAddress};
