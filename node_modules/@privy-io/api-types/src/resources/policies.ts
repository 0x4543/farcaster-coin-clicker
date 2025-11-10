// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Policies extends APIResource {
  /**
   * Create a new policy.
   *
   * @example
   * ```ts
   * const policy = await client.policies.create({
   *   chain_type: 'ethereum',
   *   name: 'x',
   *   rules: [
   *     {
   *       action: 'ALLOW',
   *       conditions: [
   *         {
   *           field: 'to',
   *           field_source: 'ethereum_transaction',
   *           operator: 'eq',
   *           value: 'string',
   *         },
   *       ],
   *       method: 'eth_sendTransaction',
   *       name: 'x',
   *     },
   *   ],
   *   version: '1.0',
   * });
   * ```
   */
  create(params: PolicyCreateParams, options?: RequestOptions): APIPromise<Policy> {
    const { 'privy-idempotency-key': privyIdempotencyKey, ...body } = params;
    return this._client.post('/v1/policies', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(privyIdempotencyKey != null ? { 'privy-idempotency-key': privyIdempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Create a new rule for a policy.
   *
   * @example
   * ```ts
   * const response = await client.policies._createRule(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   {
   *     action: 'ALLOW',
   *     conditions: [
   *       {
   *         field: 'to',
   *         field_source: 'ethereum_transaction',
   *         operator: 'eq',
   *         value: 'string',
   *       },
   *     ],
   *     method: 'eth_sendTransaction',
   *     name: 'x',
   *   },
   * );
   * ```
   */
  _createRule(
    policyID: string,
    params: PolicyCreateRuleParams,
    options?: RequestOptions,
  ): APIPromise<PolicyCreateRuleResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.post(path`/v1/policies/${policyID}/rules`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete a policy by policy ID.
   *
   * @example
   * ```ts
   * const response = await client.policies._delete(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  _delete(
    policyID: string,
    params: PolicyDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PolicyDeleteResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature } = params ?? {};
    return this._client.delete(path`/v1/policies/${policyID}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Delete a rule by policy ID and rule ID.
   *
   * @example
   * ```ts
   * const response = await client.policies._deleteRule(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   { policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx' },
   * );
   * ```
   */
  _deleteRule(
    ruleID: string,
    params: PolicyDeleteRuleParams,
    options?: RequestOptions,
  ): APIPromise<PolicyDeleteRuleResponse> {
    const { policy_id, 'privy-authorization-signature': privyAuthorizationSignature } = params;
    return this._client.delete(path`/v1/policies/${policy_id}/rules/${ruleID}`, {
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a policy by policy ID.
   *
   * @example
   * ```ts
   * const policy = await client.policies._update(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  _update(policyID: string, params: PolicyUpdateParams, options?: RequestOptions): APIPromise<Policy> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.patch(path`/v1/policies/${policyID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Update a rule by policy ID and rule ID.
   *
   * @example
   * ```ts
   * const response = await client.policies._updateRule(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   {
   *     policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx',
   *     action: 'ALLOW',
   *     conditions: [
   *       {
   *         field: 'to',
   *         field_source: 'ethereum_transaction',
   *         operator: 'eq',
   *         value: 'string',
   *       },
   *     ],
   *     method: 'eth_sendTransaction',
   *     name: 'x',
   *   },
   * );
   * ```
   */
  _updateRule(
    ruleID: string,
    params: PolicyUpdateRuleParams,
    options?: RequestOptions,
  ): APIPromise<PolicyUpdateRuleResponse> {
    const { policy_id, 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.patch(path`/v1/policies/${policy_id}/rules/${ruleID}`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(privyAuthorizationSignature != null ?
            { 'privy-authorization-signature': privyAuthorizationSignature }
          : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a policy by policy ID.
   *
   * @example
   * ```ts
   * const policy = await client.policies.get(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   * );
   * ```
   */
  get(policyID: string, options?: RequestOptions): APIPromise<Policy> {
    return this._client.get(path`/v1/policies/${policyID}`, options);
  }

  /**
   * Get a rule by policy ID and rule ID.
   *
   * @example
   * ```ts
   * const response = await client.policies.getRule(
   *   'xxxxxxxxxxxxxxxxxxxxxxxx',
   *   { policy_id: 'xxxxxxxxxxxxxxxxxxxxxxxx' },
   * );
   * ```
   */
  getRule(
    ruleID: string,
    params: PolicyGetRuleParams,
    options?: RequestOptions,
  ): APIPromise<PolicyGetRuleResponse> {
    const { policy_id } = params;
    return this._client.get(path`/v1/policies/${policy_id}/rules/${ruleID}`, options);
  }
}

export interface Policy {
  /**
   * Unique ID of the created policy. This will be the primary identifier when using
   * the policy in the future.
   */
  id: string;

  /**
   * The chain type the policy applies to.
   */
  chain_type: 'ethereum' | 'solana';

  /**
   * Unix timestamp of when the policy was created in milliseconds.
   */
  created_at: number;

  /**
   * Name to assign to policy.
   */
  name: string;

  /**
   * The key quorum ID of the owner of the policy.
   */
  owner_id: string | null;

  rules: Array<Policy.Rule>;

  /**
   * Version of the policy. Currently, 1.0 is the only version.
   */
  version: '1.0';
}

export namespace Policy {
  /**
   * A rule that defines the conditions and action to take if the conditions are
   * true.
   */
  export interface Rule {
    id: string;

    /**
     * Action to take if the conditions are true.
     */
    action: 'ALLOW' | 'DENY';

    conditions: Array<
      | Rule.EthereumTransactionCondition
      | Rule.EthereumCalldataCondition
      | Rule.EthereumTypedDataDomainCondition
      | Rule.EthereumTypedDataMessageCondition
      | Rule.Ethereum7702AuthorizationCondition
      | Rule.SolanaProgramInstructionCondition
      | Rule.SolanaSystemProgramInstructionCondition
      | Rule.SolanaTokenProgramInstructionCondition
      | Rule.SystemCondition
    >;

    /**
     * Method the rule applies to.
     */
    method:
      | 'eth_sendTransaction'
      | 'eth_signTransaction'
      | 'eth_signTypedData_v4'
      | 'eth_sign7702Authorization'
      | 'signTransaction'
      | 'signAndSendTransaction'
      | 'exportPrivateKey'
      | '*';

    name: string;
  }

  export namespace Rule {
    /**
     * The verbatim Ethereum transaction object in an eth_signTransaction or
     * eth_sendTransaction request.
     */
    export interface EthereumTransactionCondition {
      field: 'to' | 'value';

      field_source: 'ethereum_transaction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * The decoded calldata in a smart contract interaction as the smart contract
     * method's parameters. Note that that 'ethereum_calldata' conditions must contain
     * an abi parameter with the JSON ABI of the smart contract.
     */
    export interface EthereumCalldataCondition {
      abi: unknown;

      field: string;

      field_source: 'ethereum_calldata';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Attributes from the signing domain that will verify the signature.
     */
    export interface EthereumTypedDataDomainCondition {
      field: 'chainId' | 'verifyingContract';

      field_source: 'ethereum_typed_data_domain';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
     * EIP-712.
     */
    export interface EthereumTypedDataMessageCondition {
      field: string;

      field_source: 'ethereum_typed_data_message';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      typed_data: EthereumTypedDataMessageCondition.TypedData;

      value: string | Array<string>;
    }

    export namespace EthereumTypedDataMessageCondition {
      export interface TypedData {
        primary_type: string;

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
      }
    }

    /**
     * Allowed contract addresses for eth_signAuthorization requests.
     */
    export interface Ethereum7702AuthorizationCondition {
      field: 'contract';

      field_source: 'ethereum_7702_authorization';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana Program attributes, enables allowlisting Solana Programs.
     */
    export interface SolanaProgramInstructionCondition {
      field: 'programId';

      field_source: 'solana_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana System Program attributes, including more granular Transfer instruction
     * fields.
     */
    export interface SolanaSystemProgramInstructionCondition {
      field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

      field_source: 'solana_system_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana Token Program attributes, including more granular TransferChecked
     * instruction fields.
     */
    export interface SolanaTokenProgramInstructionCondition {
      field:
        | 'instructionName'
        | 'TransferChecked.source'
        | 'TransferChecked.destination'
        | 'TransferChecked.authority'
        | 'TransferChecked.amount'
        | 'TransferChecked.mint';

      field_source: 'solana_token_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * System attributes, including current unix timestamp (in seconds).
     */
    export interface SystemCondition {
      field: 'current_unix_timestamp';

      field_source: 'system';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }
  }
}

/**
 * A rule that defines the conditions and action to take if the conditions are
 * true.
 */
export interface PolicyCreateRuleResponse {
  id: string;

  /**
   * Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  conditions: Array<
    | PolicyCreateRuleResponse.EthereumTransactionCondition
    | PolicyCreateRuleResponse.EthereumCalldataCondition
    | PolicyCreateRuleResponse.EthereumTypedDataDomainCondition
    | PolicyCreateRuleResponse.EthereumTypedDataMessageCondition
    | PolicyCreateRuleResponse.Ethereum7702AuthorizationCondition
    | PolicyCreateRuleResponse.SolanaProgramInstructionCondition
    | PolicyCreateRuleResponse.SolanaSystemProgramInstructionCondition
    | PolicyCreateRuleResponse.SolanaTokenProgramInstructionCondition
    | PolicyCreateRuleResponse.SystemCondition
  >;

  /**
   * Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  name: string;
}

export namespace PolicyCreateRuleResponse {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * The decoded calldata in a smart contract interaction as the smart contract
   * method's parameters. Note that that 'ethereum_calldata' conditions must contain
   * an abi parameter with the JSON ABI of the smart contract.
   */
  export interface EthereumCalldataCondition {
    abi: unknown;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    typed_data: EthereumTypedDataMessageCondition.TypedData;

    value: string | Array<string>;
  }

  export namespace EthereumTypedDataMessageCondition {
    export interface TypedData {
      primary_type: string;

      types: { [key: string]: Array<TypedData.Type> };
    }

    export namespace TypedData {
      export interface Type {
        name: string;

        type: string;
      }
    }
  }

  /**
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Token Program attributes, including more granular TransferChecked
   * instruction fields.
   */
  export interface SolanaTokenProgramInstructionCondition {
    field:
      | 'instructionName'
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint';

    field_source: 'solana_token_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * System attributes, including current unix timestamp (in seconds).
   */
  export interface SystemCondition {
    field: 'current_unix_timestamp';

    field_source: 'system';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }
}

export interface PolicyDeleteResponse {
  /**
   * Whether the policy was deleted successfully.
   */
  success: boolean;
}

export interface PolicyDeleteRuleResponse {
  /**
   * Whether the rule was deleted successfully.
   */
  success: boolean;
}

export interface PolicyUpdateRuleResponse {
  id: string;

  /**
   * Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  conditions: Array<
    | PolicyUpdateRuleResponse.EthereumTransactionCondition
    | PolicyUpdateRuleResponse.EthereumCalldataCondition
    | PolicyUpdateRuleResponse.EthereumTypedDataDomainCondition
    | PolicyUpdateRuleResponse.EthereumTypedDataMessageCondition
    | PolicyUpdateRuleResponse.Ethereum7702AuthorizationCondition
    | PolicyUpdateRuleResponse.SolanaProgramInstructionCondition
    | PolicyUpdateRuleResponse.SolanaSystemProgramInstructionCondition
    | PolicyUpdateRuleResponse.SolanaTokenProgramInstructionCondition
    | PolicyUpdateRuleResponse.SystemCondition
  >;

  /**
   * Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  name: string;
}

export namespace PolicyUpdateRuleResponse {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * The decoded calldata in a smart contract interaction as the smart contract
   * method's parameters. Note that that 'ethereum_calldata' conditions must contain
   * an abi parameter with the JSON ABI of the smart contract.
   */
  export interface EthereumCalldataCondition {
    abi: unknown;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    typed_data: EthereumTypedDataMessageCondition.TypedData;

    value: string | Array<string>;
  }

  export namespace EthereumTypedDataMessageCondition {
    export interface TypedData {
      primary_type: string;

      types: { [key: string]: Array<TypedData.Type> };
    }

    export namespace TypedData {
      export interface Type {
        name: string;

        type: string;
      }
    }
  }

  /**
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Token Program attributes, including more granular TransferChecked
   * instruction fields.
   */
  export interface SolanaTokenProgramInstructionCondition {
    field:
      | 'instructionName'
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint';

    field_source: 'solana_token_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * System attributes, including current unix timestamp (in seconds).
   */
  export interface SystemCondition {
    field: 'current_unix_timestamp';

    field_source: 'system';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }
}

/**
 * A rule that defines the conditions and action to take if the conditions are
 * true.
 */
export interface PolicyGetRuleResponse {
  id: string;

  /**
   * Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  conditions: Array<
    | PolicyGetRuleResponse.EthereumTransactionCondition
    | PolicyGetRuleResponse.EthereumCalldataCondition
    | PolicyGetRuleResponse.EthereumTypedDataDomainCondition
    | PolicyGetRuleResponse.EthereumTypedDataMessageCondition
    | PolicyGetRuleResponse.Ethereum7702AuthorizationCondition
    | PolicyGetRuleResponse.SolanaProgramInstructionCondition
    | PolicyGetRuleResponse.SolanaSystemProgramInstructionCondition
    | PolicyGetRuleResponse.SolanaTokenProgramInstructionCondition
    | PolicyGetRuleResponse.SystemCondition
  >;

  /**
   * Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  name: string;
}

export namespace PolicyGetRuleResponse {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * The decoded calldata in a smart contract interaction as the smart contract
   * method's parameters. Note that that 'ethereum_calldata' conditions must contain
   * an abi parameter with the JSON ABI of the smart contract.
   */
  export interface EthereumCalldataCondition {
    abi: unknown;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    typed_data: EthereumTypedDataMessageCondition.TypedData;

    value: string | Array<string>;
  }

  export namespace EthereumTypedDataMessageCondition {
    export interface TypedData {
      primary_type: string;

      types: { [key: string]: Array<TypedData.Type> };
    }

    export namespace TypedData {
      export interface Type {
        name: string;

        type: string;
      }
    }
  }

  /**
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Token Program attributes, including more granular TransferChecked
   * instruction fields.
   */
  export interface SolanaTokenProgramInstructionCondition {
    field:
      | 'instructionName'
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint';

    field_source: 'solana_token_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * System attributes, including current unix timestamp (in seconds).
   */
  export interface SystemCondition {
    field: 'current_unix_timestamp';

    field_source: 'system';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }
}

export interface PolicyCreateParams {
  /**
   * Body param: The chain type the policy applies to.
   */
  chain_type: 'ethereum' | 'solana';

  /**
   * Body param: Name to assign to policy.
   */
  name: string;

  /**
   * Body param:
   */
  rules: Array<PolicyCreateParams.Rule>;

  /**
   * Body param: Version of the policy. Currently, 1.0 is the only version.
   */
  version: '1.0';

  /**
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: PolicyCreateParams.PublicKeyOwner | PolicyCreateParams.UserOwner | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: string | null;

  /**
   * Header param: Idempotency keys ensure API requests are executed only once within
   * a 24-hour window.
   */
  'privy-idempotency-key'?: string;
}

export namespace PolicyCreateParams {
  /**
   * The rules that apply to each method the policy covers.
   */
  export interface Rule {
    /**
     * Action to take if the conditions are true.
     */
    action: 'ALLOW' | 'DENY';

    conditions: Array<
      | Rule.EthereumTransactionCondition
      | Rule.EthereumCalldataCondition
      | Rule.EthereumTypedDataDomainCondition
      | Rule.EthereumTypedDataMessageCondition
      | Rule.Ethereum7702AuthorizationCondition
      | Rule.SolanaProgramInstructionCondition
      | Rule.SolanaSystemProgramInstructionCondition
      | Rule.SolanaTokenProgramInstructionCondition
      | Rule.SystemCondition
    >;

    /**
     * Method the rule applies to.
     */
    method:
      | 'eth_sendTransaction'
      | 'eth_signTransaction'
      | 'eth_signTypedData_v4'
      | 'eth_sign7702Authorization'
      | 'signTransaction'
      | 'signAndSendTransaction'
      | 'exportPrivateKey'
      | '*';

    name: string;
  }

  export namespace Rule {
    /**
     * The verbatim Ethereum transaction object in an eth_signTransaction or
     * eth_sendTransaction request.
     */
    export interface EthereumTransactionCondition {
      field: 'to' | 'value';

      field_source: 'ethereum_transaction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * The decoded calldata in a smart contract interaction as the smart contract
     * method's parameters. Note that that 'ethereum_calldata' conditions must contain
     * an abi parameter with the JSON ABI of the smart contract.
     */
    export interface EthereumCalldataCondition {
      abi: unknown;

      field: string;

      field_source: 'ethereum_calldata';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Attributes from the signing domain that will verify the signature.
     */
    export interface EthereumTypedDataDomainCondition {
      field: 'chainId' | 'verifyingContract';

      field_source: 'ethereum_typed_data_domain';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
     * EIP-712.
     */
    export interface EthereumTypedDataMessageCondition {
      field: string;

      field_source: 'ethereum_typed_data_message';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      typed_data: EthereumTypedDataMessageCondition.TypedData;

      value: string | Array<string>;
    }

    export namespace EthereumTypedDataMessageCondition {
      export interface TypedData {
        primary_type: string;

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
      }
    }

    /**
     * Allowed contract addresses for eth_signAuthorization requests.
     */
    export interface Ethereum7702AuthorizationCondition {
      field: 'contract';

      field_source: 'ethereum_7702_authorization';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana Program attributes, enables allowlisting Solana Programs.
     */
    export interface SolanaProgramInstructionCondition {
      field: 'programId';

      field_source: 'solana_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana System Program attributes, including more granular Transfer instruction
     * fields.
     */
    export interface SolanaSystemProgramInstructionCondition {
      field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

      field_source: 'solana_system_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana Token Program attributes, including more granular TransferChecked
     * instruction fields.
     */
    export interface SolanaTokenProgramInstructionCondition {
      field:
        | 'instructionName'
        | 'TransferChecked.source'
        | 'TransferChecked.destination'
        | 'TransferChecked.authority'
        | 'TransferChecked.amount'
        | 'TransferChecked.mint';

      field_source: 'solana_token_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * System attributes, including current unix timestamp (in seconds).
     */
    export interface SystemCondition {
      field: 'current_unix_timestamp';

      field_source: 'system';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }
  }

  /**
   * The P-256 public key of the owner of the resource. If you provide this, do not
   * specify an owner_id as it will be generated automatically.
   */
  export interface PublicKeyOwner {
    public_key: string;
  }

  /**
   * The user ID of the owner of the resource. The user must already exist, and this
   * value must start with "did:privy:". If you provide this, do not specify an
   * owner_id as it will be generated automatically.
   */
  export interface UserOwner {
    user_id: string;
  }
}

export interface PolicyCreateRuleParams {
  /**
   * Body param: Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  /**
   * Body param:
   */
  conditions: Array<
    | PolicyCreateRuleParams.EthereumTransactionCondition
    | PolicyCreateRuleParams.EthereumCalldataCondition
    | PolicyCreateRuleParams.EthereumTypedDataDomainCondition
    | PolicyCreateRuleParams.EthereumTypedDataMessageCondition
    | PolicyCreateRuleParams.Ethereum7702AuthorizationCondition
    | PolicyCreateRuleParams.SolanaProgramInstructionCondition
    | PolicyCreateRuleParams.SolanaSystemProgramInstructionCondition
    | PolicyCreateRuleParams.SolanaTokenProgramInstructionCondition
    | PolicyCreateRuleParams.SystemCondition
  >;

  /**
   * Body param: Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  /**
   * Body param:
   */
  name: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace PolicyCreateRuleParams {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * The decoded calldata in a smart contract interaction as the smart contract
   * method's parameters. Note that that 'ethereum_calldata' conditions must contain
   * an abi parameter with the JSON ABI of the smart contract.
   */
  export interface EthereumCalldataCondition {
    abi: unknown;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    typed_data: EthereumTypedDataMessageCondition.TypedData;

    value: string | Array<string>;
  }

  export namespace EthereumTypedDataMessageCondition {
    export interface TypedData {
      primary_type: string;

      types: { [key: string]: Array<TypedData.Type> };
    }

    export namespace TypedData {
      export interface Type {
        name: string;

        type: string;
      }
    }
  }

  /**
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Token Program attributes, including more granular TransferChecked
   * instruction fields.
   */
  export interface SolanaTokenProgramInstructionCondition {
    field:
      | 'instructionName'
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint';

    field_source: 'solana_token_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * System attributes, including current unix timestamp (in seconds).
   */
  export interface SystemCondition {
    field: 'current_unix_timestamp';

    field_source: 'system';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }
}

export interface PolicyDeleteParams {
  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export interface PolicyDeleteRuleParams {
  /**
   * Path param:
   */
  policy_id: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export interface PolicyUpdateParams {
  /**
   * Body param: Name to assign to policy.
   */
  name?: string;

  /**
   * Body param: The owner of the resource. If you provide this, do not specify an
   * owner_id as it will be generated automatically. When updating a wallet, you can
   * set the owner to null to remove the owner.
   */
  owner?: PolicyUpdateParams.PublicKeyOwner | PolicyUpdateParams.UserOwner | null;

  /**
   * Body param: The key quorum ID to set as the owner of the resource. If you
   * provide this, do not specify an owner.
   */
  owner_id?: string | null;

  /**
   * Body param:
   */
  rules?: Array<PolicyUpdateParams.Rule>;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace PolicyUpdateParams {
  /**
   * The P-256 public key of the owner of the resource. If you provide this, do not
   * specify an owner_id as it will be generated automatically.
   */
  export interface PublicKeyOwner {
    public_key: string;
  }

  /**
   * The user ID of the owner of the resource. The user must already exist, and this
   * value must start with "did:privy:". If you provide this, do not specify an
   * owner_id as it will be generated automatically.
   */
  export interface UserOwner {
    user_id: string;
  }

  /**
   * The rules that apply to each method the policy covers.
   */
  export interface Rule {
    /**
     * Action to take if the conditions are true.
     */
    action: 'ALLOW' | 'DENY';

    conditions: Array<
      | Rule.EthereumTransactionCondition
      | Rule.EthereumCalldataCondition
      | Rule.EthereumTypedDataDomainCondition
      | Rule.EthereumTypedDataMessageCondition
      | Rule.Ethereum7702AuthorizationCondition
      | Rule.SolanaProgramInstructionCondition
      | Rule.SolanaSystemProgramInstructionCondition
      | Rule.SolanaTokenProgramInstructionCondition
      | Rule.SystemCondition
    >;

    /**
     * Method the rule applies to.
     */
    method:
      | 'eth_sendTransaction'
      | 'eth_signTransaction'
      | 'eth_signTypedData_v4'
      | 'eth_sign7702Authorization'
      | 'signTransaction'
      | 'signAndSendTransaction'
      | 'exportPrivateKey'
      | '*';

    name: string;
  }

  export namespace Rule {
    /**
     * The verbatim Ethereum transaction object in an eth_signTransaction or
     * eth_sendTransaction request.
     */
    export interface EthereumTransactionCondition {
      field: 'to' | 'value';

      field_source: 'ethereum_transaction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * The decoded calldata in a smart contract interaction as the smart contract
     * method's parameters. Note that that 'ethereum_calldata' conditions must contain
     * an abi parameter with the JSON ABI of the smart contract.
     */
    export interface EthereumCalldataCondition {
      abi: unknown;

      field: string;

      field_source: 'ethereum_calldata';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Attributes from the signing domain that will verify the signature.
     */
    export interface EthereumTypedDataDomainCondition {
      field: 'chainId' | 'verifyingContract';

      field_source: 'ethereum_typed_data_domain';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
     * EIP-712.
     */
    export interface EthereumTypedDataMessageCondition {
      field: string;

      field_source: 'ethereum_typed_data_message';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      typed_data: EthereumTypedDataMessageCondition.TypedData;

      value: string | Array<string>;
    }

    export namespace EthereumTypedDataMessageCondition {
      export interface TypedData {
        primary_type: string;

        types: { [key: string]: Array<TypedData.Type> };
      }

      export namespace TypedData {
        export interface Type {
          name: string;

          type: string;
        }
      }
    }

    /**
     * Allowed contract addresses for eth_signAuthorization requests.
     */
    export interface Ethereum7702AuthorizationCondition {
      field: 'contract';

      field_source: 'ethereum_7702_authorization';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana Program attributes, enables allowlisting Solana Programs.
     */
    export interface SolanaProgramInstructionCondition {
      field: 'programId';

      field_source: 'solana_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana System Program attributes, including more granular Transfer instruction
     * fields.
     */
    export interface SolanaSystemProgramInstructionCondition {
      field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

      field_source: 'solana_system_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * Solana Token Program attributes, including more granular TransferChecked
     * instruction fields.
     */
    export interface SolanaTokenProgramInstructionCondition {
      field:
        | 'instructionName'
        | 'TransferChecked.source'
        | 'TransferChecked.destination'
        | 'TransferChecked.authority'
        | 'TransferChecked.amount'
        | 'TransferChecked.mint';

      field_source: 'solana_token_program_instruction';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }

    /**
     * System attributes, including current unix timestamp (in seconds).
     */
    export interface SystemCondition {
      field: 'current_unix_timestamp';

      field_source: 'system';

      operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

      value: string | Array<string>;
    }
  }
}

export interface PolicyUpdateRuleParams {
  /**
   * Path param:
   */
  policy_id: string;

  /**
   * Body param: Action to take if the conditions are true.
   */
  action: 'ALLOW' | 'DENY';

  /**
   * Body param:
   */
  conditions: Array<
    | PolicyUpdateRuleParams.EthereumTransactionCondition
    | PolicyUpdateRuleParams.EthereumCalldataCondition
    | PolicyUpdateRuleParams.EthereumTypedDataDomainCondition
    | PolicyUpdateRuleParams.EthereumTypedDataMessageCondition
    | PolicyUpdateRuleParams.Ethereum7702AuthorizationCondition
    | PolicyUpdateRuleParams.SolanaProgramInstructionCondition
    | PolicyUpdateRuleParams.SolanaSystemProgramInstructionCondition
    | PolicyUpdateRuleParams.SolanaTokenProgramInstructionCondition
    | PolicyUpdateRuleParams.SystemCondition
  >;

  /**
   * Body param: Method the rule applies to.
   */
  method:
    | 'eth_sendTransaction'
    | 'eth_signTransaction'
    | 'eth_signTypedData_v4'
    | 'eth_sign7702Authorization'
    | 'signTransaction'
    | 'signAndSendTransaction'
    | 'exportPrivateKey'
    | '*';

  /**
   * Body param:
   */
  name: string;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export namespace PolicyUpdateRuleParams {
  /**
   * The verbatim Ethereum transaction object in an eth_signTransaction or
   * eth_sendTransaction request.
   */
  export interface EthereumTransactionCondition {
    field: 'to' | 'value';

    field_source: 'ethereum_transaction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * The decoded calldata in a smart contract interaction as the smart contract
   * method's parameters. Note that that 'ethereum_calldata' conditions must contain
   * an abi parameter with the JSON ABI of the smart contract.
   */
  export interface EthereumCalldataCondition {
    abi: unknown;

    field: string;

    field_source: 'ethereum_calldata';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Attributes from the signing domain that will verify the signature.
   */
  export interface EthereumTypedDataDomainCondition {
    field: 'chainId' | 'verifyingContract';

    field_source: 'ethereum_typed_data_domain';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * 'types' and 'primary_type' attributes of the TypedData JSON object defined in
   * EIP-712.
   */
  export interface EthereumTypedDataMessageCondition {
    field: string;

    field_source: 'ethereum_typed_data_message';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    typed_data: EthereumTypedDataMessageCondition.TypedData;

    value: string | Array<string>;
  }

  export namespace EthereumTypedDataMessageCondition {
    export interface TypedData {
      primary_type: string;

      types: { [key: string]: Array<TypedData.Type> };
    }

    export namespace TypedData {
      export interface Type {
        name: string;

        type: string;
      }
    }
  }

  /**
   * Allowed contract addresses for eth_signAuthorization requests.
   */
  export interface Ethereum7702AuthorizationCondition {
    field: 'contract';

    field_source: 'ethereum_7702_authorization';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Program attributes, enables allowlisting Solana Programs.
   */
  export interface SolanaProgramInstructionCondition {
    field: 'programId';

    field_source: 'solana_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana System Program attributes, including more granular Transfer instruction
   * fields.
   */
  export interface SolanaSystemProgramInstructionCondition {
    field: 'instructionName' | 'Transfer.from' | 'Transfer.to' | 'Transfer.lamports';

    field_source: 'solana_system_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * Solana Token Program attributes, including more granular TransferChecked
   * instruction fields.
   */
  export interface SolanaTokenProgramInstructionCondition {
    field:
      | 'instructionName'
      | 'TransferChecked.source'
      | 'TransferChecked.destination'
      | 'TransferChecked.authority'
      | 'TransferChecked.amount'
      | 'TransferChecked.mint';

    field_source: 'solana_token_program_instruction';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }

  /**
   * System attributes, including current unix timestamp (in seconds).
   */
  export interface SystemCondition {
    field: 'current_unix_timestamp';

    field_source: 'system';

    operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'in_condition_set';

    value: string | Array<string>;
  }
}

export interface PolicyGetRuleParams {
  policy_id: string;
}

export declare namespace Policies {
  export {
    type Policy as Policy,
    type PolicyCreateRuleResponse as PolicyCreateRuleResponse,
    type PolicyDeleteResponse as PolicyDeleteResponse,
    type PolicyDeleteRuleResponse as PolicyDeleteRuleResponse,
    type PolicyUpdateRuleResponse as PolicyUpdateRuleResponse,
    type PolicyGetRuleResponse as PolicyGetRuleResponse,
    type PolicyCreateParams as PolicyCreateParams,
    type PolicyCreateRuleParams as PolicyCreateRuleParams,
    type PolicyDeleteParams as PolicyDeleteParams,
    type PolicyDeleteRuleParams as PolicyDeleteRuleParams,
    type PolicyUpdateParams as PolicyUpdateParams,
    type PolicyUpdateRuleParams as PolicyUpdateRuleParams,
    type PolicyGetRuleParams as PolicyGetRuleParams,
  };
}
