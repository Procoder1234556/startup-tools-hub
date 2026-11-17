"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { listCategories } from "@/lib/categories";
import { TOOLS } from "@/lib/tools";
import styles from "./performs.module.css";

const BOARD = [
  { slug: "runway-calculator", fact: "Cash divided by burn" },
  { slug: "safe-calculator", fact: "Notes at a cap" },
  { slug: "cap-table-lite", fact: "Founders and a pool" },
  { slug: "merge-pdf", fact: "Several files, one document" },
  { slug: "json-formatter", fact: "A payload, made readable" },
  { slug: "tam-sam-som-calculator", fact: "A market in three rings" },
  { slug: "jpg-to-pdf", fact: "Images turned into pages" },
  { slug: "ltv-cac-calculator", fact: "What a customer returns" },
] as const;

const FAQ = [
  {
    q: "Are these tools free?",
    a: "The catalog is free to use. There is no account and no daily task counter on the tools in this hub.",
  },
  {
    q: "Does the runway figure leave this browser?",
    a: "The number on this page is cash divided by monthly burn, computed here. The full runway tool runs in the browser as well.",
  },
  {
    q: "Do files get uploaded?",
    a: "Most tools run on this device. Server-side tools, such as some PDF jobs, upload only to process the file and then discard the input.",
  },
  {
    q: "How is this different from a PDF website with a signup wall?",
    a: "You can open a tool and use it. Browser-side work stays in the tab, and the page says when a job needs a server.",
  },
  {
    q: "Which tools work offline?",
    a: "Browser-side tools work offline after the page has loaded. Anything that needs a server also needs a network.",
  },
  {
    q: "What does the SAFE figure mean?",
    a: "Investment divided by the post-money cap is the ownership if the round prices at that cap. The SAFE calculator models a full conversion.",
  },
] as const;

const JSON_SAMPLE = `{
  "cash": 420000,
  "burn": 28000
}`;

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function monthsOf(cash: number, burn: number) {
  if (!Number.isFinite(cash) || !Number.isFinite(burn) || burn <= 0) return null;
  return cash / burn;
}

export default function PerformsLanding() {
  const categories = listCategories();
  const [cash, setCash] = useState(420000);
  const [burn, setBurn] = useState(28000);
  const [open, setOpen] = useState(3);
  const [copied, setCopied] = useState(false);
  const [investment, setInvestment] = useState(500000);
  const [cap, setCap] = useState(10000000);
  const [query, setQuery] = useState("runway");
  const [bench, setBench] = useState<"finance" | "documents">("finance");

  const rows = useMemo(
    () =>
      BOARD.map((item) => {
        const tool = TOOLS.find((entry) => entry.slug === item.slug && entry.available);
        return tool ? { ...item, tool } : null;
      }).filter((item): item is NonNullable<typeof item> => item !== null),
    [],
  );

  const months = monthsOf(cash, burn);
  const ownership = cap > 0 ? (investment / cap) * 100 : null;
  const destination =
    bench === "documents"
      ? "/tools/pdf/merge-pdf/"
      : query.toLowerCase().includes("safe")
        ? "/tools/finance/safe-calculator/"
        : query.toLowerCase().includes("cap")
          ? "/tools/finance/cap-table-lite/"
          : "/tools/finance/runway-calculator/";

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="runway-title">
        <div className={styles.copyHalf}>
          <div>
            <h1 id="runway-title" className={styles.h1}>
              <span className={styles.mask}>
                <span className={styles.line}>Count the runway</span>
              </span>
              <span className={styles.mask}>
                <span className={`${styles.line} ${styles.line2}`}>before you leave</span>
              </span>
            </h1>
            <p className={styles.lead}>
              Type the cash in the bank and what leaves each month. This page divides them.
            </p>
            <Link className={styles.btn} href="/tools/finance/runway-calculator/">
              Open the runway tool
            </Link>
          </div>
        </div>
        <div className={styles.stage}>
          <form className={styles.instrument} data-ui onSubmit={(event) => event.preventDefault()}>
            <div className={styles.fields}>
              <label>
                Cash in the bank
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={cash}
                  onChange={(event) => setCash(Number(event.target.value))}
                />
              </label>
              <label>
                Monthly burn
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={burn}
                  onChange={(event) => setBurn(Number(event.target.value))}
                />
              </label>
            </div>
            <div>
              <p className={styles.readout}>
                <span className={styles.months}>{months == null ? "—" : months.toFixed(1)}</span>
                <span className={styles.unit}>months</span>
              </p>
              <p className={styles.sample}>
                {months == null
                  ? "Burn has to be above zero."
                  : `${money(cash)} ÷ ${money(burn)} on a #222427 stage.`}
              </p>
            </div>
          </form>
        </div>
      </section>

      <section className={styles.benches} aria-labelledby="benches-title">
        <h2 id="benches-title" className={styles.enter}>
          The benches
        </h2>
        {categories.map((category) => {
          const count = TOOLS.filter((tool) => tool.category === category.id && tool.available).length;
          return (
            <Link key={category.id} className={`${styles.poster} ${styles.enter}`} href={`/tools/${category.slug}/`}>
              <span className={styles.posterName}>{category.shortLabel}</span>
              <span className={styles.posterDetail}>{count} tools</span>
            </Link>
          );
        })}
      </section>

      <section className={styles.boardSection} aria-labelledby="board-title">
        <h2 id="board-title" className={styles.enter}>
          The board
        </h2>
        <div className={styles.boardClip}>
          <div className={styles.board} data-ui>
            {rows.map((row, index) => {
              const isOpen = open === index;
              return (
                <div key={row.slug} className={`${styles.row} ${isOpen ? styles.rowOpen : ""} ${styles.enter}`}>
                  <button type="button" className={styles.rowHit} aria-expanded={isOpen} onClick={() => setOpen(index)}>
                    <span>{row.tool.name}</span>
                    <span className={styles.fact}>{row.fact}</span>
                    <span className={styles.status}>{row.tool.category}</span>
                  </button>
                  {isOpen ? (
                    <p className={styles.detail}>
                      {row.tool.description}{" "}
                      <Link href={`/tools/${row.tool.category}/${row.tool.slug}/`}>Open it</Link>
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.sky} aria-labelledby="sky-title">
        <h2 id="sky-title" className={styles.skyTitle}>
          After hours
        </h2>
        <div className={styles.skyFrame}>
          <img
            className={styles.drift}
            src="/landing/twilight.jpg"
            width={1800}
            height={1000}
            alt="Twilight sky fading from deep blue toward an orange horizon. Photograph by Jeremy Ricketts."
          />
        </div>
        <p className={styles.caption}>Twilight over the horizon. Photograph by Jeremy Ricketts.</p>
      </section>

      <section className={styles.work} aria-labelledby="work-title">
        <figure className={styles.ridge}>
          <img
            src="/landing/ridge.jpg"
            width={1200}
            height={1500}
            alt="A small figure on a dark ridge under a twilight sky. Photograph by lee Scott."
          />
        </figure>
        <div>
          <h2 id="work-title" className={styles.enter}>
            Give and return
          </h2>
          <div className={`${styles.exchange} ${styles.enter}`}>
            <p>Cash and burn go in.</p>
            <div className={styles.call} data-ui>
              {money(cash)} in the bank, {money(burn)} leaving each month.
            </div>
            <div className={styles.response} data-ui>
              <p className={styles.figure}>
                {months == null ? "—" : months.toFixed(1)}
                <span>months until the cash is gone</span>
              </p>
            </div>
          </div>
          <div className={`${styles.exchange} ${styles.enter}`}>
            <p>A payload goes in.</p>
            <div className={styles.call}>
              <pre>
                <code>{JSON_SAMPLE}</code>
              </pre>
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(JSON_SAMPLE);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1600);
                }}
              >
                {copied ? "Copied" : "Copy the payload"}
              </button>
            </div>
            <div className={styles.response} data-ui>
              <pre>
                <code>{`cash: number\nburn: number`}</code>
              </pre>
            </div>
          </div>
          <div className={`${styles.exchange} ${styles.enter}`}>
            <p>A SAFE cap goes in.</p>
            <div className={styles.call} data-ui>
              <div className={styles.pair}>
                <label>
                  Investment
                  <input
                    type="number"
                    min={0}
                    step={50000}
                    value={investment}
                    onChange={(event) => setInvestment(Number(event.target.value))}
                  />
                </label>
                <label>
                  Post-money cap
                  <input
                    type="number"
                    min={1}
                    step={500000}
                    value={cap}
                    onChange={(event) => setCap(Number(event.target.value))}
                  />
                </label>
              </div>
            </div>
            <div className={`${styles.response} ${styles.wide}`} data-ui>
              <p className={styles.figure}>
                {ownership == null ? "—" : `${ownership.toFixed(1)}%`}
                <span>ownership if the round prices at the cap. The SAFE tool models the conversion.</span>
              </p>
              <Link className={styles.btn} href="/tools/finance/safe-calculator/">
                Open the SAFE tool
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.questions} aria-labelledby="questions-title">
        <h2 id="questions-title">Plain answers</h2>
        <div className={styles.tiles}>
          {FAQ.map((item) => (
            <details key={item.q} className={`${styles.tile} ${styles.enter}`} name="hub-faq">
              <summary>
                {item.q}
                <span className={styles.plus} aria-hidden>
                  <span />
                  <span />
                </span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="cta-title">
        <div>
          <h2 id="cta-title">
            Open a tool
            <br />
            already running
          </h2>
          <p className={styles.lead}>The catalog opens on the words you type. There is no account to create.</p>
        </div>
        <form className={styles.dialog} data-ui onSubmit={(event) => event.preventDefault()}>
          <h3>Find a tool</h3>
          <label>
            What you need
            <input value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <div className={styles.segment} role="group" aria-label="Bench">
            <button type="button" className={bench === "finance" ? styles.on : ""} onClick={() => setBench("finance")}>
              Finance
            </button>
            <button
              type="button"
              className={bench === "documents" ? styles.on : ""}
              onClick={() => setBench("documents")}
            >
              Documents
            </button>
          </div>
          <Link className={styles.btn} href={destination}>
            Open that tool
          </Link>
        </form>
      </section>

      <p className={styles.credits}>
        Photographs: Jeremy Ricketts, twilight sky; lee Scott, ridge at dusk. Unsplash, via picsum.photos.
      </p>
    </div>
  );
}
