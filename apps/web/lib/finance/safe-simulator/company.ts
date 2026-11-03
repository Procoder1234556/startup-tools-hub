/**
 * Cap table timeline engine — ported from fl0wo/safe-cap-table-simulator (Apache-2.0).
 * Node canvas plotting removed; use getHistory() in the browser UI.
 */
import type {
  CapTableEntry,
  CompanyConfig,
  EquitySnapshot,
  Safe,
  SafeType,
  ShareType,
} from "./types";

export class Company {
  private capTable: CapTableEntry[];
  private totalShares: number;
  private safes: Safe[];
  private history: EquitySnapshot[] = [];

  constructor({ founders = [], pools = [] }: CompanyConfig, initialShareCount: number = 1_000_000) {
    this.capTable = [];
    this.totalShares = 0;
    const base = initialShareCount;
    founders.forEach((f) => {
      const shares = Math.round((f.ownership / 100) * base);
      this._addEntity(f.name, shares, "common");
    });
    pools.forEach((p) => {
      const shares = Math.round((p.ownership / 100) * base);
      this._addEntity(p.note, shares, "option");
    });
    this.safes = [];
    this._saveSnapshot("Initial cap table");
  }

  getHistory(): EquitySnapshot[] {
    return this.history.map((s) => ({
      ...s,
      entries: s.entries.map((e) => ({ ...e })),
    }));
  }

  private _addEntity(name: string, shares: number, type: ShareType = "common"): void {
    this.capTable.push({ name, shares, type });
    this.totalShares += shares;
  }

  private _saveSnapshot(label: string): void {
    const snapshot: EquitySnapshot = {
      label,
      entries: this.capTable.map((entry) => ({
        name: entry.name,
        shares: entry.shares,
        type: entry.type,
        percentage: (entry.shares / this.totalShares) * 100,
      })),
      totalShares: this.totalShares,
    };
    this.history.push(snapshot);
  }

  public giveEquity(percent: number, name: string, type: ShareType = "common"): Company {
    const newShares = Math.round((percent / (100 - percent)) * this.totalShares);
    this._addEntity(name, newShares, type);
    this._saveSnapshot(`Equity grant: ${name} (${percent}%)`);
    return this;
  }

  public signSafe(
    cap: number | "uncapped",
    amount: number,
    name: string,
    discount?: number,
    safeType: SafeType = "post-money",
  ): Company {
    this.safes.push({
      cap,
      amount,
      name,
      converted: false,
      discount,
      type: safeType,
    });

    const capStr = cap === "uncapped" ? "uncapped" : `$${(cap / 1_000_000).toFixed(1)}M cap`;
    const discountStr = discount ? ` with ${discount}% discount` : "";
    this._saveSnapshot(`SAFE: ${name} ($${amount.toLocaleString()}, ${capStr}${discountStr})`);

    return this;
  }

  public pricedRound(preMoneyValuation: number, newMoney: number, name: string = "Series A"): Company {
    const pricePerShare = preMoneyValuation / this.totalShares;
    let postMoneySafeShares = 0;

    this.safes.forEach((s) => {
      if (!s.converted && s.type === "post-money") {
        if (s.cap === "uncapped") {
          const effectivePrice = s.discount ? pricePerShare * (1 - s.discount / 100) : pricePerShare;
          postMoneySafeShares += Math.round(s.amount / effectivePrice);
        } else {
          const capPricePerShare = s.cap / (this.totalShares + postMoneySafeShares);
          const effectivePrice = s.discount
            ? Math.min(capPricePerShare, pricePerShare * (1 - s.discount / 100))
            : Math.min(capPricePerShare, pricePerShare);
          postMoneySafeShares += Math.round(s.amount / effectivePrice);
        }
      }
    });

    this.safes.forEach((s) => {
      if (!s.converted) {
        let shares = 0;

        if (s.type === "post-money") {
          if (s.cap === "uncapped") {
            const effectivePrice = s.discount ? pricePerShare * (1 - s.discount / 100) : pricePerShare;
            shares = Math.round(s.amount / effectivePrice);
          } else {
            const capPricePerShare = s.cap / (this.totalShares + postMoneySafeShares);
            const effectivePrice = s.discount
              ? Math.min(capPricePerShare, pricePerShare * (1 - s.discount / 100))
              : Math.min(capPricePerShare, pricePerShare);
            shares = Math.round(s.amount / effectivePrice);
          }
        } else {
          if (s.cap === "uncapped") {
            const effectivePrice = s.discount ? pricePerShare * (1 - s.discount / 100) : pricePerShare;
            shares = Math.round(s.amount / effectivePrice);
          } else {
            const capPricePerShare = s.cap / this.totalShares;
            const effectivePrice = s.discount
              ? Math.min(capPricePerShare, pricePerShare * (1 - s.discount / 100))
              : Math.min(capPricePerShare, pricePerShare);
            shares = Math.round(s.amount / effectivePrice);
          }
        }

        if (shares > 0) {
          this._addEntity(`${s.name} (SAFE)`, shares, "preferred");
          s.converted = true;
        }
      }
    });

    const seriesShares = Math.round(newMoney / pricePerShare);
    this._addEntity(name, seriesShares, "preferred");

    this._saveSnapshot(
      `${name}: $${(preMoneyValuation / 1_000_000).toFixed(1)}M pre-money, $${(newMoney / 1_000_000).toFixed(1)}M raised`,
    );

    return this;
  }
}

/** Example from upstream README — angel + SAFEs + seed + A + B */
export function buildExampleScenario(): Company {
  const c = new Company({
    founders: [
      { name: "Founder A", ownership: 50 },
      { name: "Founder B", ownership: 40 },
    ],
    pools: [{ note: "Option pool", ownership: 10 }],
  });
  c.giveEquity(5, "Angel investor");
  c.signSafe(4_000_000, 500_000, "Pre-seed SAFE", 20, "post-money");
  c.signSafe(6_000_000, 1_000_000, "Super-angel SAFE", 15, "post-money");
  c.pricedRound(8_000_000, 1_500_000, "Seed round");
  c.pricedRound(30_000_000, 6_000_000, "Series A");
  c.pricedRound(120_000_000, 25_000_000, "Series B");
  return c;
}
