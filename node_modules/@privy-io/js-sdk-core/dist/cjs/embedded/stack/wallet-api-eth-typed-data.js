"use strict";exports.toWalletApiTypedData=function(e){return"string"==typeof e&&(e=JSON.parse(e)),{types:e.types,primary_type:String(e.primaryType),domain:e.domain,message:e.message}};
