const mods = import.meta.glob('./assets/icons/*.svg', { eager: true, import: 'default' }) as Record<string, string>;
const order = ["btc","eth","usdt","bnb","xrp","sol","usdc","trx","doge","ada","wbtc","link","bch","zec","xlm","leo","xmr","ltc","avax","dot","dai","icp","uni","aave","etc","fil","kcs","algo","vet","atom","paxg","qnt","sky"];
const entries = Object.entries(mods);

const byName = (p: string) => p.toLowerCase().split('/').pop()?.replace('.svg','') || '';

const prioritized = order
  .map(t => entries.find(([p]) => byName(p) === t))
  .filter(Boolean) as [string, string][];

const rest = entries
  .filter(([p]) => !order.includes(byName(p)))
  .sort((a, b) => a[0].localeCompare(b[0]));

const sorted = [...prioritized, ...rest];
export const ICONS: string[] = sorted.map(([, url]) => url);