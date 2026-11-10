import { Link, useParams, useSearchParams } from "react-router-dom"
import { byTicker, equities, money } from "../lib/desk"
import {
  Intro,
  Panel,
  Save,
  Spark,
  Move,
  Securities,
  Notes,
} from "../components/ResearchUI"
export function CompanyResearch() {
  const { ticker } = useParams(),
    e = byTicker(ticker)
  const [params, set] = useSearchParams()
  const names = [
    "Thesis",
    "Financials",
    "Filings",
    "Earnings",
    "Peers",
    "Notes",
  ]
  const tab =
    names.find((t) => t.toLowerCase() === params.get("tab")) || "Thesis"
  if (!e)
    return (
      <>
        <Intro tag="Coverage" title="Company not covered">
          This ticker is not in the sample research universe.
        </Intro>
        <Link className="link" to="/companies">
          Browse coverage →
        </Link>
      </>
    )
  return (
    <>
      <Link className="back" to="/companies">
        ← Company directory
      </Link>
      <div className="row">
        <Intro tag={e.ticker + " / " + e.sector} title={e.name}>
          {e.cue}
        </Intro>
        <Save ticker={e.ticker} />
      </div>
      <div className="tabs" aria-label="Company sections">
        {names.map((n) => (
          <button
            key={n}
            aria-pressed={n === tab}
            onClick={() => set({ tab: n.toLowerCase() })}
          >
            {n}
          </button>
        ))}
      </div>
      {tab === "Thesis" && (
        <>
          <div className="twocol">
            <Panel tag="01  /  Upside" title="The bull case">
              <p>{e.bull}</p>
            </Panel>
            <Panel tag="02  /  Downside" title="What could break">
              <p>{e.risk}</p>
            </Panel>
          </div>
          <Panel tag="Snapshot · eight sample sessions" title={money(e.price)}>
            <Move value={e.change} />
            <Spark values={e.trend} label={e.name + " sample price history"} />
            <div className="axis">
              <span>Session 01</span>
              <span>Session 08</span>
            </div>
          </Panel>
        </>
      )}
      {tab === "Financials" && (
        <Panel
          tag="Illustrative fiscal year · USD billions"
          title="Revenue by quarter"
        >
          <div className="bars">
            {e.revenue.map((n, i) => (
              <div key={i}>
                <strong>{n}</strong>
                <i
                  style={{ height: (100 * n) / Math.max(...e.revenue) + "px" }}
                />
                <small>Q{i + 1}</small>
              </div>
            ))}
          </div>
          <div className="metrics">
            <span>
              Operating margin <b>{e.margin}%</b>
            </span>
            <span>
              Price / earnings <b>{e.pe}×</b>
            </span>
          </div>
        </Panel>
      )}
      {tab === "Filings" && (
        <Panel
          tag="Analyst worksheet · not an SEC excerpt"
          title="Reading the annual filing"
        >
          <h3>Business drivers</h3>
          <p>{e.bull}</p>
          <h3>Risk to investigate</h3>
          <p>{e.risk}</p>
          <Link className="link" to={"/company/" + e.ticker + "?tab=notes"}>
            Record a filing question →
          </Link>
        </Panel>
      )}
      {tab === "Earnings" && (
        <Panel
          tag="Illustrative calendar"
          title={e.event + " · Earnings review"}
        >
          <p>{e.cue}</p>
          <div className="metrics">
            <span>
              Previous quarter revenue <b>${e.revenue[2]}B</b>
            </span>
            <span>
              Latest sample quarter <b>${e.revenue[3]}B</b>
            </span>
          </div>
          <p>
            Call question: what evidence would distinguish a lasting change from
            a one-quarter effect?
          </p>
        </Panel>
      )}
      {tab === "Peers" && (
        <Panel
          tag="Cross-sector reference set"
          title="Compare other covered names"
        >
          <Securities list={equities.filter((x) => x !== e)} />
        </Panel>
      )}
      {tab === "Notes" && (
        <Panel tag="Personal workspace" title="Thesis notebook">
          <Notes key={e.ticker} ticker={e.ticker} />
        </Panel>
      )}
    </>
  )
}
