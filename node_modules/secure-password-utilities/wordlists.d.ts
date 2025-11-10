/**
 * This is the EFF long word list. More details here:
 *
 *     * https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases
 *     * https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt
 */
export declare const EFF_LONG_WORDLIST: readonly string[];
/**
 * This is the EFF long wordlist, but with the following entries removed:
 *
 *     * drop-down
 *     * flet-tip
 *     * t-shirt
 *     * yo-yo
 *
 * The original list is 7776 entries, and thus the list here is 7772 entries.
 *
 * The reason for this is that a frequent passphrase separator is the "-" which can
 * then result in ambiguous word separations. This keeps the resulting passphrase
 * prettier (in the case where it's joined by dashes) with an unambiguous and
 * deterministic number of dashes.
 *
 * More details can be found here:
 *
 *     * https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases
 *     * https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt
 *
 */
export declare const DEFAULT_WORDLIST: readonly string[];
