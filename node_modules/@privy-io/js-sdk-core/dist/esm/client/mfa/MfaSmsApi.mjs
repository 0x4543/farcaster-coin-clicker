import{MfaPasswordlessSmsInit as r}from"@privy-io/routes";class t{async sendCode(t){return await this._privyInternal.fetch(r,{body:t})}constructor(r){this._privyInternal=r}}export{t as default};
