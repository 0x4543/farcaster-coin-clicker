// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Privy } from '../client';

export abstract class APIResource {
  protected _client: Privy;

  constructor(client: Privy) {
    this._client = client;
  }
}
