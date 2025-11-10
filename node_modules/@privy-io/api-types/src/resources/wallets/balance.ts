// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Balance extends APIResource {
  /**
   * Get the balance of a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const balance = await client.wallets.balance.get(
   *   'wallet_id',
   *   { asset: 'usdc', chain: 'ethereum' },
   * );
   * ```
   */
  get(walletID: string, query: BalanceGetParams, options?: RequestOptions): APIPromise<BalanceGetResponse> {
    return this._client.get(path`/v1/wallets/${walletID}/balance`, { query, ...options });
  }
}

export interface BalanceGetResponse {
  balances: Array<BalanceGetResponse.Balance>;
}

export namespace BalanceGetResponse {
  export interface Balance {
    asset: 'usdc' | 'eth' | 'pol' | 'usdt' | 'sol';

    chain:
      | 'ethereum'
      | 'arbitrum'
      | 'base'
      | 'linea'
      | 'optimism'
      | 'polygon'
      | 'solana'
      | 'zksync_era'
      | 'sepolia'
      | 'arbitrum_sepolia'
      | 'base_sepolia'
      | 'linea_testnet'
      | 'optimism_sepolia'
      | 'polygon_amoy'
      | 'solana_devnet'
      | 'solana_testnet';

    display_values: { [key: string]: string };

    raw_value: string;

    raw_value_decimals: number;
  }
}

export interface BalanceGetParams {
  asset: 'usdc' | 'eth' | 'pol' | 'usdt' | 'sol' | Array<'usdc' | 'eth' | 'pol' | 'usdt' | 'sol'>;

  chain:
    | 'ethereum'
    | 'arbitrum'
    | 'base'
    | 'linea'
    | 'optimism'
    | 'polygon'
    | 'solana'
    | 'zksync_era'
    | 'sepolia'
    | 'arbitrum_sepolia'
    | 'base_sepolia'
    | 'linea_testnet'
    | 'optimism_sepolia'
    | 'polygon_amoy'
    | 'solana_devnet'
    | 'solana_testnet'
    | Array<
        | 'ethereum'
        | 'arbitrum'
        | 'base'
        | 'linea'
        | 'optimism'
        | 'polygon'
        | 'solana'
        | 'zksync_era'
        | 'sepolia'
        | 'arbitrum_sepolia'
        | 'base_sepolia'
        | 'linea_testnet'
        | 'optimism_sepolia'
        | 'polygon_amoy'
        | 'solana_devnet'
        | 'solana_testnet'
      >;

  include_currency?: 'usd';
}

export declare namespace Balance {
  export { type BalanceGetResponse as BalanceGetResponse, type BalanceGetParams as BalanceGetParams };
}
