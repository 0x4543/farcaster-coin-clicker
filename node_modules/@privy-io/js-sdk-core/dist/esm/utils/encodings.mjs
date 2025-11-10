const t=t=>/^0x[0-9a-fA-F]*$/.test(t),f=t=>Buffer.from(t,"utf8"),e=t=>`0x${t.toString("hex")}`;export{e as bytesToHex,t as isHexEncoded,f as utf8ToBytes};
