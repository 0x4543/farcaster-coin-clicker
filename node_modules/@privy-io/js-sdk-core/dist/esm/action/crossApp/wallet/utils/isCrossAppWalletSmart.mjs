function t(t,e){return t.linked_accounts.filter((t=>"cross_app"===t.type)).flatMap((t=>t.smart_wallets)).some((t=>t.address===e))}export{t as isCrossAppWalletSmart};
