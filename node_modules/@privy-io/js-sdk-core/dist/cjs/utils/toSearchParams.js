"use strict";exports.toSearchParams=function(r){let t=new URLSearchParams;for(let e in r)null!=r[e]&&t.append(e,String(r[e]));return Array.from(t).length?"?"+t.toString():""};
