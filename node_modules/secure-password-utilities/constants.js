"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYMBOL_CHARSET = exports.UPPERCASE_CHARSET = exports.LOWERCASE_CHARSET = exports.DIGIT_CHARSET = void 0;
exports.DIGIT_CHARSET = '0123456789';
exports.LOWERCASE_CHARSET = 'abcdefghijklmnopqrstuvwxyz';
exports.UPPERCASE_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// OWASP password special characters except space and backslash. Has the benefit of evenly dividing 256.
//
//     See https://owasp.org/www-community/password-special-characters
//
exports.SYMBOL_CHARSET = '!"#$%&\'()*+,-./:;<=>?@[]{}^_`|~';
//# sourceMappingURL=constants.js.map