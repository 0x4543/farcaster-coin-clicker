import type { ConnectMethod, Connector, Features, WcWallet } from '@reown/appkit-controllers';
interface AppKitWallet extends WcWallet {
    installed: boolean;
}
export declare const WalletUtil: {
    filterOutDuplicatesByRDNS(wallets: WcWallet[]): WcWallet[];
    filterOutDuplicatesByIds(wallets: WcWallet[]): WcWallet[];
    filterOutDuplicateWallets(wallets: WcWallet[]): WcWallet[];
    markWalletsAsInstalled(wallets: WcWallet[]): AppKitWallet[];
    getConnectOrderMethod(_features: Features | undefined, _connectors: Connector[]): ConnectMethod[];
    isExcluded(wallet: WcWallet): boolean;
    markWalletsWithDisplayIndex(wallets: WcWallet[]): {
        display_index: number;
        id: string;
        name: string;
        badge_type?: import("@reown/appkit-controllers").BadgeType;
        chains?: import("@reown/appkit-common").CaipNetworkId[];
        homepage?: string;
        image_id?: string;
        image_url?: string;
        order?: number;
        link_mode?: string | null;
        mobile_link?: string | null;
        desktop_link?: string | null;
        webapp_link?: string | null;
        app_store?: string | null;
        play_store?: string | null;
        chrome_store?: string | null;
        rdns?: string | null;
        injected?: {
            namespace?: string;
            injected_id?: string;
        }[] | null;
    }[];
};
export {};
