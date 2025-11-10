// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Transactions extends APIResource {
  /**
   * Get incoming and outgoing transactions of a wallet by wallet ID.
   *
   * @example
   * ```ts
   * const transaction = await client.wallets.transactions.get(
   *   'wallet_id',
   *   { asset: 'usdc', chain: 'base' },
   * );
   * ```
   */
  get(
    walletID: string,
    query: TransactionGetParams,
    options?: RequestOptions,
  ): APIPromise<TransactionGetResponse> {
    return this._client.get(path`/v1/wallets/${walletID}/transactions`, { query, ...options });
  }
}

export interface TransactionGetResponse {
  next_cursor: string | null;

  transactions: Array<TransactionGetResponse.Transaction>;
}

export namespace TransactionGetResponse {
  export interface Transaction {
    caip2: string;

    created_at: number;

    details: Transaction.UnionMember0 | Transaction.UnionMember1 | null;

    privy_transaction_id: string;

    status:
      | 'broadcasted'
      | 'confirmed'
      | 'execution_reverted'
      | 'failed'
      | 'replaced'
      | 'finalized'
      | 'provider_error'
      | 'pending';

    transaction_hash: string | null;

    wallet_id: string;

    sponsored?: boolean;
  }

  export namespace Transaction {
    export interface UnionMember0 {
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

      recipient: string;

      recipient_privy_user_id: string | null;

      sender: string;

      sender_privy_user_id: string | null;

      type: 'transfer_sent';
    }

    export interface UnionMember1 {
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

      recipient: string;

      recipient_privy_user_id: string | null;

      sender: string;

      sender_privy_user_id: string | null;

      type: 'transfer_received';
    }
  }
}

export interface TransactionGetParams {
  asset: 'usdc' | 'eth' | 'pol' | 'usdt' | 'sol' | Array<'usdc' | 'eth' | 'pol' | 'usdt' | 'sol'>;

  chain: 'base';

  cursor?: string;

  limit?: number | null;
}

export declare namespace Transactions {
  export {
    type TransactionGetResponse as TransactionGetResponse,
    type TransactionGetParams as TransactionGetParams,
  };
}
