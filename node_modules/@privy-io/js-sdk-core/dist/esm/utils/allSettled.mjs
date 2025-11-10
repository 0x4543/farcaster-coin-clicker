const e=Promise.allSettled.bind(Promise)??(e=>Promise.all(e.map((e=>e.then((e=>({status:"fulfilled",value:e}))).catch((e=>({status:"rejected",reason:e})))))));export{e as allSettled};
