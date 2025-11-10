import fs from "fs";
import https from "https";
import { execSync } from "child_process";

const ICON_DIR = "src/assets/icons";
const COINGECKO_API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1";
const GITHUB_BASE = "https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/";

if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR, { recursive: true });

const fetchJson = url =>
  new Promise((res, rej) => {
    https.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; IconFetcher/2.0)" } },
      r => {
        let data = "";
        r.on("data", d => (data += d));
        r.on("end", () => {
          try {
            if (r.statusCode !== 200) throw new Error(`HTTP ${r.statusCode}`);
            res(JSON.parse(data));
          } catch (e) {
            rej(e);
          }
        });
      }
    ).on("error", rej);
  });

const downloadFile = (url, dest) =>
  new Promise((res, rej) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, r => {
        if (r.statusCode !== 200) {
          fs.unlinkSync(dest);
          rej(`Failed ${url} (${r.statusCode})`);
          return;
        }
        r.pipe(file);
        file.on("finish", () => file.close(res));
      })
      .on("error", err => {
        fs.unlink(dest, () => rej(err));
      });
  });

const convertToSvg = (src, dest) => {
  execSync(`npx sharp "${src}" --resize 128 --to-format svg -o "${dest}"`);
  fs.unlinkSync(src);
};

(async () => {
  try {
    console.log("Fetching top-200 coins from CoinGecko...");
    const coins = await fetchJson(COINGECKO_API);

    let success = 0;
    for (const coin of coins) {
      const symbol = coin.symbol.toLowerCase();
      const svgPath = `${ICON_DIR}/${symbol}.svg`;
      if (fs.existsSync(svgPath)) continue;

      const tryUrls = [
        `${GITHUB_BASE}${symbol}.png`,
        `${GITHUB_BASE}${symbol}.svg`,
        coin.image
      ];

      let found = false;
      for (const url of tryUrls) {
        try {
          const ext = url.endsWith(".svg") ? "svg" : "png";
          const temp = `${ICON_DIR}/${symbol}.${ext}`;
          await downloadFile(url, temp);
          if (ext === "png") convertToSvg(temp, svgPath);
          found = true;
          success++;
          break;
        } catch {
          continue;
        }
      }
    }

    console.log(`OK ${success}/${coins.length} icons downloaded to ${ICON_DIR}`);
  } catch (e) {
    console.error("Error:", e);
  }
})();