const e=(e,c)=>c?Object.entries(c).reduce(((e,[c,r])=>e.replace(`:${c}`,`${r}`)),e):e;export{e as getPathWithParams};
