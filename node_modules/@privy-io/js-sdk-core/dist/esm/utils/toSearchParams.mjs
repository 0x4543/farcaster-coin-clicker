function r(r){let n=new URLSearchParams;for(let t in r)null!=r[t]&&n.append(t,String(r[t]));return Array.from(n).length?"?"+n.toString():""}export{r as toSearchParams};
