"use strict";exports.getPathWithParams=(e,t)=>t?Object.entries(t).reduce(((e,[t,r])=>e.replace(`:${t}`,`${r}`)),e):e;
