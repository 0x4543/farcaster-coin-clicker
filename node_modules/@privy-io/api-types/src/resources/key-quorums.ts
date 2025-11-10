// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class KeyQuorums extends APIResource {
  /**
   * Create a new key quorum.
   *
   * @example
   * ```ts
   * const keyQuorum = await client.keyQuorums.create();
   * ```
   */
  create(body: KeyQuorumCreateParams, options?: RequestOptions): APIPromise<KeyQuorum> {
    return this._client.post('/v1/key_quorums', { body, ...options });
  }

  /**
   * Delete a key quorum by key quorum ID.
   *
   * @example
   * ```ts
   * const response = await client.keyQuorums._delete(
   *   'key_quorum_id',
   * );
   * ```
   */
  _delete(
    keyQuorumID: string,
    params: KeyQuorumDeleteParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<KeyQuorumDeleteResponse> {
    const { 'privy-authorization-signature': privyAuthorizationSignature } = params ?? {};
    return this._client.delete(path`/v1/key_quorums/${keyQuorumID}`, {
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
   * Update a key quorum by key quorum ID.
   *
   * @example
   * ```ts
   * const keyQuorum = await client.keyQuorums._update(
   *   'key_quorum_id',
   * );
   * ```
   */
  _update(
    keyQuorumID: string,
    params: KeyQuorumUpdateParams,
    options?: RequestOptions,
  ): APIPromise<KeyQuorum> {
    const { 'privy-authorization-signature': privyAuthorizationSignature, ...body } = params;
    return this._client.patch(path`/v1/key_quorums/${keyQuorumID}`, {
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
   * Get a key quorum by ID.
   *
   * @example
   * ```ts
   * const keyQuorum = await client.keyQuorums.get(
   *   'key_quorum_id',
   * );
   * ```
   */
  get(keyQuorumID: string, options?: RequestOptions): APIPromise<KeyQuorum> {
    return this._client.get(path`/v1/key_quorums/${keyQuorumID}`, options);
  }
}

export interface KeyQuorum {
  id: string;

  authorization_keys: Array<KeyQuorum.AuthorizationKey>;

  authorization_threshold?: number;

  display_name?: string;

  user_ids?: Array<string>;
}

export namespace KeyQuorum {
  export interface AuthorizationKey {
    display_name: string | null;

    public_key: string;
  }
}

export interface KeyQuorumDeleteResponse {
  /**
   * Whether the key quorum was deleted successfully.
   */
  success: boolean;
}

export interface KeyQuorumCreateParams {
  authorization_threshold?: number;

  display_name?: string;

  public_keys?: Array<string>;

  user_ids?: Array<string>;
}

export interface KeyQuorumDeleteParams {
  /**
   * Request authorization signature. If multiple signatures are required, they
   * should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export interface KeyQuorumUpdateParams {
  /**
   * Body param:
   */
  authorization_threshold?: number;

  /**
   * Body param:
   */
  display_name?: string;

  /**
   * Body param:
   */
  public_keys?: Array<string>;

  /**
   * Body param:
   */
  user_ids?: Array<string>;

  /**
   * Header param: Request authorization signature. If multiple signatures are
   * required, they should be comma separated.
   */
  'privy-authorization-signature'?: string;
}

export declare namespace KeyQuorums {
  export {
    type KeyQuorum as KeyQuorum,
    type KeyQuorumDeleteResponse as KeyQuorumDeleteResponse,
    type KeyQuorumCreateParams as KeyQuorumCreateParams,
    type KeyQuorumDeleteParams as KeyQuorumDeleteParams,
    type KeyQuorumUpdateParams as KeyQuorumUpdateParams,
  };
}
