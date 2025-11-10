import { type Address, type CaipNetwork, type ChainNamespace } from '@reown/appkit-common';
import type { PaymentOptions } from '../types/options.js';
interface EnsureNetworkOptions {
    paymentAssetNetwork: string;
    activeCaipNetwork: CaipNetwork;
    approvedCaipNetworkIds: string[] | undefined;
    requestedCaipNetworks: CaipNetwork[] | undefined;
}
export declare function ensureCorrectNetwork(options: EnsureNetworkOptions): Promise<void>;
interface EvmPaymentParams {
    recipient: Address;
    amount: number | string;
    fromAddress?: Address;
}
export declare function processEvmNativePayment(paymentAsset: PaymentOptions['paymentAsset'], chainNamespace: ChainNamespace, params: EvmPaymentParams): Promise<string | undefined>;
export declare function processEvmErc20Payment(paymentAsset: PaymentOptions['paymentAsset'], params: EvmPaymentParams): Promise<string | undefined>;
interface SolanaPaymentParams {
    recipient: string;
    amount: number | string;
    fromAddress?: string;
    tokenMint?: string;
}
export declare function processSolanaPayment(chainNamespace: ChainNamespace, params: SolanaPaymentParams): Promise<string | undefined>;
export {};
