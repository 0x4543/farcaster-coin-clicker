// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ClientAuthAPI from './client-auth';

export class Apps extends APIResource {}

/**
 * The response for getting an app.
 */
export interface AppResponse {
  id: string;

  accent_color: string | null;

  allowed_domains: Array<string>;

  allowed_native_app_ids: Array<string>;

  allowed_native_app_url_schemes: Array<string>;

  allowlist_config: AppResponse.AllowlistConfig;

  allowlist_enabled: boolean;

  apple_oauth: boolean;

  captcha_enabled: boolean;

  custom_api_url: string | null;

  custom_jwt_auth: boolean;

  custom_oauth_providers: Array<AppResponse.CustomOAuthProvider>;

  disable_plus_emails: boolean;

  discord_oauth: boolean;

  email_auth: boolean;

  embedded_wallet_config: AppResponse.EmbeddedWalletConfig;

  enforce_wallet_uis: boolean;

  farcaster_auth: boolean;

  farcaster_link_wallets_enabled: boolean;

  fiat_on_ramp_enabled: boolean;

  github_oauth: boolean;

  google_oauth: boolean;

  guest_auth: boolean;

  icon_url: string | null;

  instagram_oauth: boolean;

  legacy_wallet_ui_config: boolean;

  line_oauth: boolean;

  linkedin_oauth: boolean;

  logo_url: string | null;

  max_linked_wallets_per_user: number | null;

  mfa_methods: Array<'sms' | 'totp' | 'passkey'>;

  name: string;

  passkey_auth: boolean;

  passkeys_for_signup_enabled: boolean;

  privacy_policy_url: string | null;

  require_users_accept_terms: boolean | null;

  show_wallet_login_first: boolean;

  sms_auth: boolean;

  solana_wallet_auth: boolean;

  spotify_oauth: boolean;

  telegram_auth: boolean;

  terms_and_conditions_url: string | null;

  theme: string;

  tiktok_oauth: boolean;

  twitch_oauth: boolean;

  twitter_oauth: boolean;

  twitter_oauth_on_mobile_enabled: boolean;

  verification_key: string;

  wallet_auth: boolean;

  wallet_connect_cloud_project_id: string | null;

  whatsapp_enabled: boolean;

  captcha_site_key?: string;

  funding_config?: AppResponse.FundingConfig;

  telegram_auth_config?: AppResponse.TelegramAuthConfig;
}

export namespace AppResponse {
  export interface AllowlistConfig {
    cta_link: string | null;

    cta_text: string | null;

    error_detail: string | null;

    error_title: string | null;
  }

  export interface CustomOAuthProvider {
    enabled: boolean;

    /**
     * The ID of a custom OAuth provider, set up for this app. Must start with
     * "custom:".
     */
    provider: ClientAuthAPI.CustomOAuthProviderID;

    provider_display_name: string;

    provider_icon_url: string;
  }

  export interface EmbeddedWalletConfig {
    create_on_login: 'users-without-wallets' | 'all-users' | 'off';

    ethereum: EmbeddedWalletConfig.Ethereum;

    mode: 'legacy-embedded-wallets-only' | 'user-controlled-server-wallets-only';

    solana: EmbeddedWalletConfig.Solana;

    user_owned_recovery_options: Array<'user-passcode' | 'google-drive' | 'icloud'>;

    require_user_owned_recovery_on_create?: boolean;

    require_user_password_on_create?: boolean;
  }

  export namespace EmbeddedWalletConfig {
    export interface Ethereum {
      create_on_login: 'users-without-wallets' | 'all-users' | 'off';
    }

    export interface Solana {
      create_on_login: 'users-without-wallets' | 'all-users' | 'off';
    }
  }

  export interface FundingConfig {
    cross_chain_bridging_enabled: boolean;

    default_recommended_amount: string;

    default_recommended_currency: FundingConfig.DefaultRecommendedCurrency;

    methods: Array<'moonpay' | 'coinbase-onramp' | 'external'>;

    options: Array<FundingConfig.Option>;

    prompt_funding_on_wallet_creation: boolean;
  }

  export namespace FundingConfig {
    export interface DefaultRecommendedCurrency {
      chain: string;

      asset?: 'native-currency' | 'USDC';
    }

    export interface Option {
      method: string;

      provider: string;
    }
  }

  export interface TelegramAuthConfig {
    bot_id: string;

    bot_name: string;

    link_enabled: boolean;

    seamless_auth_enabled: boolean;
  }
}

export declare namespace Apps {
  export { type AppResponse as AppResponse };
}
