"use strict";exports.isCrossAppWalletSmart=function(s,t){return s.linked_accounts.filter((s=>"cross_app"===s.type)).flatMap((s=>s.smart_wallets)).some((s=>s.address===t))};
