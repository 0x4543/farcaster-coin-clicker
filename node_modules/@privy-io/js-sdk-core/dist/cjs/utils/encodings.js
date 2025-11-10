"use strict";exports.bytesToHex=t=>`0x${t.toString("hex")}`,exports.isHexEncoded=t=>/^0x[0-9a-fA-F]*$/.test(t),exports.utf8ToBytes=t=>Buffer.from(t,"utf8");
