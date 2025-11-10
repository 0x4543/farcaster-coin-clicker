/**
 * Get a list of random numbers where each number is greater than or equal to `start` and less than `end`.
 *
 * The `end` of the range must be less than or equal to 2^16.
 *
 * Examples:
 *
 *     getRandomNumbersInRange(6, 0, 10) // [8, 2, 1, 3, 5, 0]
 *
 *     getRandomNumbersInRange(6, 10, 1000); // [111, 752, 41, 420, 360, 630]
 *
 * @param length The length of the resulting list of random numbers.
 * @param start The start of the range (inclusive).
 * @param end The end of the range (exclusive). Cannot exceed 2^16.
 * @returns A list of `length` random numbers in the desired range.
 */
export declare function getRandomNumbersInRange(length: number, start: number, end: number): number[];
/**
 * Randomize the ordering of the characters in the given string.
 *
 * Examples:
 *
 *     randomizeCharacters('randomize me');     // e znmaedimro
 *     randomizeCharacters('randomize me');     // arndimz moee
 *     randomizeCharacters('randomize me');     // ai emdonmrze
 *
 * @param characters A string of characters to randomize.
 * @returns A random ordering of the `characters` argument.
 */
export declare function randomizeCharacters(characters: string): string;
/**
 * Get random values between 0 and `rangeMax` (at most, 256 exclusive) from a CSPRNG.
 *
 * This is a helper function to safely filter random byte values into a desired range.
 * "safely" here meaning careful use of the modulo operator to avoid modulo bias.
 *
 * This is deprecated. Use `getRandomNumbersInRange` instead.
 *
 * Examples:
 *
 *     getRandomValues(6, 10); // Returns a Uint8Array of length 6 with values between 0-9 inclusive.
 *
 *     getRandomValues(12, 52); // Returns a Uint8Array of length 12 with values between 0-51 inclusive.
 *
 * @deprecated
 * @param numValues The number of random values to return.
 * @param rangeMax Values returned must be strictly less than this value.
 * @returns A random set of values between 0 (inclusive) and rangeMax (exclusive).
 */
export declare function getRandomValues(numValues: number, rangeMax?: number): Uint8Array;
