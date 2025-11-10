"use strict";exports.getCrossAppAccountByWalletAddress=(s,e)=>s.linked_accounts.filter((s=>"cross_app"===s.type)).find((({embedded_wallets:s,smart_wallets:t})=>[...s,...t].some((s=>s.address===e))));
