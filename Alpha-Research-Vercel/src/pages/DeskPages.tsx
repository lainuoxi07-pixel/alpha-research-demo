import { useState } from "react"
import { Link } from "react-router-dom"
import { equities, byTicker, money, type Equity } from "../lib/desk"
import { useDesk } from "../lib/workspace"
import {
  Intro,
  Panel,
  Securities,
  Selector,
  Notes,
  Move,
} from "../components/ResearchUI"
export const sections: Record<string, [string, string]> = {
  companies: [
    "Company directory",
    "Search the coverage universe by company name or ticker.",
  ],
  markets: [
    "Market overview",
    "Compare the largest moves across this sample universe.",
  ],
  financials: [
    "Financial statements",
    "Compare four illustrative quarters of revenue and operating profitability.",
  ],
  filings: [
    "Filings desk",
    "Read company-specific worksheets for an annual filing review.",
  ],
  earnings: [
    "Earnings calendar",
    "Open an event to see the next question to ask management.",
  ],
  macro: [
    "Macro scenarios",
    "Trace one economic assumption through to a company research question.",
  ],
  watchlist: [
    "My watchlist",
    "Keep the names you want to revisit in one place.",
  ],
  portfolio: [
    "Portfolio tracker",
    "Explore the weights of a fixed sample portfolio, priced at the demo snapshot.",
  ],
  ai: [
    "Research assistant",
    "Explore structured prompts using the bundled company briefs. No live AI connection.",
  ],
  reports: [
    "Research notebook",
    "Collect research questions across companies and export your notes.",
  ],
  settings: [
    "Desk settings",
    "Choose how this workspace appears on this device.",
  ],
}
const scenarios = [
  [
    "Rates stay high",
    "Financing costs",
    "Higher borrowing costs can delay discretionary upgrades.",
    "AAPL",
  ],
  [
    "Cloud investment accelerates",
    "Capital spending",
    "Infrastructure orders can lift chip demand before recurring software revenue catches up.",
    "NVDA",
  ],
  [
    "Consumer demand softens",
    "Pricing power",
    "Discounts may protect volume while reducing profit on each vehicle.",
    "TSLA",
  ],
]
function ReportExport() {
  const { desk } = useDesk()
  return (
    <button
      className="pill"
      disabled={!desk.notes.length}
      onClick={() => {
        const url = URL.createObjectURL(
          new Blob(
            [
              "Alpha Research · Personal notebook\n\n" +
                desk.notes.map((n) => n.ticker + "\n" + n.body).join("\n\n"),
            ],
            { type: "text/plain;charset=utf-8" },
          ),
        )
        const a = document.createElement("a")
        a.href = url
        a.download = "alpha-research-notes.txt"
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }}
    >
      Export notes (.txt)
    </button>
  )
}
function Assistant({ e }: { e: Equity }) {
  const [topic, T] = useState("Thesis")
  return (
    <>
      <div className="tabs">
        {["Thesis", "Key risk", "Next question"].map((t) => (
          <button key={t} aria-pressed={topic === t} onClick={() => T(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className="entry">
        <div className="kicker">Preset response / {e.ticker}</div>
        <h3>{topic}</h3>
        <p>
          {topic === "Thesis" ? e.bull : topic === "Key risk" ? e.risk : e.cue}
        </p>
      </div>
      <Link to={"/company/" + e.ticker + "?tab=notes"} className="link">
        Start a note for {e.name} →
      </Link>
    </>
  )
}
export function DeskPage({ page }: { page: string }) {
  const { desk, compact } = useDesk(),
    [ticker, T] = useState("AAPL"),
    [scenario, S] = useState(0),
    [order, O] = useState("Gainers first")
  const e = byTicker(ticker)!,
    sc = scenarios[scenario]
  const [title, desc] = sections[page]
  const selected = equities.filter((x) => desk.watch.includes(x.ticker))
  const holdings = [
    { e: equities[0], qty: 12 },
    { e: equities[1], qty: 8 },
    { e: equities[2], qty: 10 },
  ]
  const total = holdings.reduce((a, h) => a + h.qty * h.e.price, 0)
  return (
    <>
      <Intro
        tag={
          "Research desk / " +
          (page === "settings" ? "Preferences" : "Workspace")
        }
        title={title}
      >
        {desc}
      </Intro>
      {page === "companies" && (
        <Panel title="Coverage universe">
          <Securities search />
        </Panel>
      )}
      {page === "watchlist" && (
        <Panel
          title={
            selected.length +
            " saved " +
            (selected.length === 1 ? "company" : "companies")
          }
        >
          <Link className="link" to="/companies">
            Find a company →
          </Link>
          <Securities list={selected} />
        </Panel>
      )}
      {page === "markets" && (
        <Panel tag="Session close" title="Market movers">
          <label className="picker">
            Rank by{" "}
            <select value={order} onChange={(ev) => O(ev.target.value)}>
              <option>Gainers first</option>
              <option>Decliners first</option>
            </select>
          </label>
          {[...equities]
            .sort(
              (a, b) =>
                (order === "Gainers first" ? -1 : 1) * (a.change - b.change),
            )
            .map((x) => (
              <Link
                className="listrow"
                key={x.ticker}
                to={"/company/" + x.ticker}
              >
                <span>
                  {x.name}
                  <small>{x.sector}</small>
                </span>
                <Move value={x.change} />
              </Link>
            ))}
        </Panel>
      )}
      {page === "financials" && (
        <Panel tag="USD billions · illustrative" title="Quarterly comparison">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  {["Company", "Q1", "Q2", "Q3", "Q4", "Op. margin"].map(
                    (t) => (
                      <th key={t}>{t}</th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {equities.map((x) => (
                  <tr key={x.ticker}>
                    <td>
                      <Link
                        className="link"
                        to={"/company/" + x.ticker + "?tab=financials"}
                      >
                        {x.ticker}
                      </Link>
                    </td>
                    {x.revenue.map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                    <td>{x.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
      {(page === "filings" || page === "earnings") && (
        <Panel
          tag={
            page === "filings"
              ? "Sample reading guides · not original filings"
              : "Sample June schedule · not actual reporting dates"
          }
          title={
            page === "filings" ? "Annual review worksheets" : "Upcoming reviews"
          }
        >
          {equities.map((x) => (
            <Link
              className="listrow"
              key={x.ticker}
              to={"/company/" + x.ticker + "?tab=" + page}
            >
              <span>
                {x.name}
                <small>{x.cue}</small>
              </span>
              <b>{page === "filings" ? "Open →" : x.event + " →"}</b>
            </Link>
          ))}
        </Panel>
      )}
      {page === "macro" && (
        <Panel tag="Scenario lab" title="Follow the transmission">
          <label className="picker">
            Assumption{" "}
            <select
              value={scenario}
              onChange={(ev) => S(Number(ev.target.value))}
            >
              {scenarios.map((x, i) => (
                <option key={i} value={i}>
                  {x[0]}
                </option>
              ))}
            </select>
          </label>
          <div className="entry">
            <div className="kicker">Transmission channel</div>
            <h3>{sc[1]}</h3>
            <p>{sc[2]}</p>
          </div>
          <Link className="link" to={"/company/" + sc[3]}>
            Investigate {sc[3]} →
          </Link>
        </Panel>
      )}
      {page === "portfolio" && (
        <Panel tag="Paper portfolio · fixed example" title={money(total)}>
          {holdings.map((h) => (
            <div key={h.e.ticker} className="holding">
              <div className="row">
                <Link className="link" to={"/company/" + h.e.ticker}>
                  {h.e.ticker} · {h.qty} shares
                </Link>
                <span>
                  {money(h.qty * h.e.price)} ·{" "}
                  {((100 * h.qty * h.e.price) / total).toFixed(1)}%
                </span>
              </div>
              <progress value={h.qty * h.e.price} max={total} />
            </div>
          ))}
        </Panel>
      )}
      {page === "ai" && (
        <Panel tag="Guided demo" title="Ask the brief">
          <Selector value={ticker} onChange={T} />
          <Assistant e={e} />
        </Panel>
      )}
      {page === "reports" && (
        <Panel tag="Saved on this device" title="Research notes">
          <ReportExport />
          <Notes />
        </Panel>
      )}
      {page === "settings" && (
        <Panel title="Display & storage">
          <label className="listrow">
            <span>
              Compact tables
              <small>
                Reduce row spacing on lists and financial statements.
              </small>
            </span>
            <input type="checkbox" checked={desk.compact} onChange={compact} />
          </label>
          <p>
            Watchlists, notes and display preferences stay in this browser. This
            demo does not connect to a brokerage or market data feed.
          </p>
        </Panel>
      )}
    </>
  )
}
