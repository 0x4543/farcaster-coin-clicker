export type PasswordOptionType = boolean | number | {
    min: number;
};
export type PasswordOptionsType = {
    digits?: PasswordOptionType;
    symbols?: PasswordOptionType;
    lowercase?: PasswordOptionType;
    uppercase?: PasswordOptionType;
    charset?: {
        digits?: string;
        symbols?: string;
        lowercase?: string;
        uppercase?: string;
    };
};
/**
 * Generate a random password.
 *
 * Examples:
 *
 *     generatePassword(12); // l[Nz8UfU.o4g
 *     generatePassword(8, { symbols: false, digits: 2 }); // k9WTkaP6
 *     generatePassword(8, { digits: {min: 2} }); // 0(c67+.f
 *
 * @param length The length of the resulting password.
 * @param options
 * @param options.digits Include or exclude digits.
 * @param options.symbols Include or exclude symbols.
 * @param options.lowercase Include or exclude lowercase.
 * @param options.uppercase Include or exclude uppercase.
 * @param options.charset
 * @param options.charset.digits Override the character set for digits.
 * @param options.charset.symbols Override the character set for symbols.
 * @param options.charset.lowercase Override the character set for lowercase.
 * @param options.charset.uppercase Override the character set for uppercase.
 * @returns A random password.
 */
export declare function generatePassword(length: number, options?: PasswordOptionsType): string;
/**
 * Generate a random digit pin.
 *
 * Examples:
 *
 *     generatePin(6); // 036919
 *     generatePin(8); // 45958396
 *
 * @param length The length of the resulting pin.
 * @returns A random digit pin.
 */
export declare function generatePin(length: number): string;
/**
 * Generate a string of `length` characters chosen randomly from the given `charset`.
 *
 * Examples:
 *
 *     generateCharacters(4, '$%^&');                          // &$&^
 *     generateCharacters(6, '0123456789');                    // 947682
 *     generateCharacters(6, 'abcdefghijklmnopqrstuvwxyz');    // ihdrnn
 *
 * @param length The number of random characters to generate.
 * @param charset The set of characters to randomly sample from.
 * @returns A random string of `length` characters from `charset`.
 */
export declare function generateCharacters(length: number, charset: string): string;
/**
 * Generate a memorable passphrase comprised of words chosen randomly from the given `wordlist`.
 *
 * There are wordlists available in the wordlists module, or you can provide your own.
 *
 * The word separator defaults to a dash (`-`), but you can customize this behavior using the third argument. "-"
 *
 * Examples:
 *
 *     generatePassphrase(6, DEFAULT_WORDLIST); // canopener-uncanny-hatchet-murky-agony-traitor
 *     generatePassphrase(6, DEFAULT_WORDLIST); // backpack-craftwork-sweat-postcard-imaging-litter
 *     generatePassphrase(6, DEFAULT_WORDLIST, '_'); // goldfish_scorpion_antiviral_pursuit_demanding_motto
 *
 * @param length The number of words selected at random.
 * @param wordlist The list of words to sample from.
 * @param sep The separator to use when joining the words in the passphrase. Defaults to '-'.
 * @returns A memorable passphrase.
 */
export declare function generatePassphrase(length: number, wordlist: readonly string[], sep?: string): string;
