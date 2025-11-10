import { Hex } from 'viem';

type Quantity = Hex | number | bigint;
type BytesLike = ArrayLike<number> | Hex;
type AccessList = readonly {
    address: Hex;
    storageKeys: readonly Hex[];
}[];
type AccessListish = AccessList | Array<[Hex, readonly Hex[]]> | Record<Hex, readonly Hex[]>;
/**
 * Similar to our base UnsignedTransactionRequest type but with stricter
 * types (e.g. Hex for strings and readonly for arrays) which match the Viem expected
 * types.
 */
type StrictUnsignedTransactionRequest = {
    to?: Hex | null | undefined;
    from?: Hex;
    nonce?: Quantity;
    gasLimit?: Quantity;
    gasPrice?: Quantity;
    data?: BytesLike;
    /** Integer of the value sent with this transaction, in Wei. */
    value?: Quantity;
    chainId?: number;
    type?: 0 | 1 | 2 | 3 | 4 | undefined;
    gas?: Quantity;
    accessList?: AccessListish;
    maxPriorityFeePerGas?: Quantity;
    maxFeePerGas?: Quantity;
};
/**
 * Similar to our base UnsignedTransactionRequestWithChainId type but with stricter
 * types (e.g. Hex for strings and readonly for arrays) which match the Viem expected
 * types.
 */
type StrictUnsignedTransactionRequestWithChainId = StrictUnsignedTransactionRequest & {
    chainId: number;
};
/**
 * Maps the string transaction types from viem to the numeric transaction types
 * used in our wallet interface.
 */
declare const STRING_TO_NUMBER_TXN_TYPE: {
    readonly legacy: 0;
    readonly eip2930: 1;
    readonly eip1559: 2;
    readonly eip4844: 3;
    readonly eip7702: 4;
};
/**
 * Convert a `StrictUnsignedTransactionRequest` to a viem `TransactionSerializable`
 *
 * This is necessary since viem is strict with the types it accepts and requires correctly formed
 * requests to be signed.
 *
 * > Note:
 * > - JSON.parse is primarily used as a safe way to access `chainId`
 * > - ^ The same thing could be accomplished using some regex replacing, but would much more error prone
 *
 * @example
 * const tx: StrictUnsignedTransactionRequest = { chainId: '0x1', ... }
 * const result = toViemTransactionSerializable(tx) // => { chainId: 1, ... }
 *
 * const tx: StrictUnsignedTransactionRequest = { chainId: 1, ... }
 * const result = toViemTransactionSerializable(tx) // => { chainId: 1, ... }
 */
declare function toViemTransactionSerializable(input: StrictUnsignedTransactionRequest | string): PrivyTransactionSerializable;
type PrivyTransactionSerializable = {
    readonly gasPrice: bigint | undefined;
    readonly accessList: undefined;
    readonly maxFeePerGas: undefined;
    readonly maxPriorityFeePerGas: undefined;
    readonly chainId: number;
    readonly data: `0x${string}` | undefined;
    readonly nonce: number | undefined;
    readonly value: bigint | undefined;
    readonly gas: bigint | undefined;
    readonly type: 'legacy';
    readonly from?: Hex;
    readonly gasLimit?: Quantity;
    readonly to?: `0x${string}` | null;
} | {
    readonly gasPrice: bigint | undefined;
    readonly accessList: AccessList | undefined;
    readonly maxFeePerGas: undefined;
    readonly maxPriorityFeePerGas: undefined;
    readonly chainId: number;
    readonly data: `0x${string}` | undefined;
    readonly nonce: number | undefined;
    readonly value: bigint | undefined;
    readonly gas: bigint | undefined;
    readonly type: 'eip2930';
    readonly from?: Hex;
    readonly gasLimit?: Quantity;
    readonly to?: `0x${string}` | null;
} | {
    readonly nonce: number | undefined;
    readonly accessList: AccessList | undefined;
    readonly maxFeePerGas: bigint | undefined;
    readonly maxPriorityFeePerGas: bigint | undefined;
    readonly gasPrice: undefined;
    readonly maxFeePerBlobGas: undefined;
    readonly chainId: number;
    readonly data: `0x${string}` | undefined;
    readonly value: bigint | undefined;
    readonly gas: bigint | undefined;
    readonly type: 'eip1559';
    readonly from?: Hex;
    readonly gasLimit?: Quantity;
    readonly to?: `0x${string}` | null;
};

declare const VERSION = "__VERSION__";

export { STRING_TO_NUMBER_TXN_TYPE, type StrictUnsignedTransactionRequest, type StrictUnsignedTransactionRequestWithChainId, VERSION, toViemTransactionSerializable };
