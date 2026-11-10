import { Link } from "react-router-dom"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { equities, byTicker, money } from "../lib/desk"
import { useDesk } from "../lib/workspace"
import { Intro, Panel, Spark, Move, Securities } from "../components/ResearchUI"
export function Dashboard() {
  const { desk } = useDesk(),
    [symbol, S] = useState("AAPL"),
    e = byTicker(symbol)!
  return (
    <>
      <Intro tag="Research desk   /   Edition 01" title="Morning briefing">
        A starting point for your next research question.
      </Intro>
      <div className="hero">
        <div>
          <div className="kicker">The lead / Business quality</div>
          <h2>
            Growth is only half
            <br />
            the story.
          </h2>
          <p>
            Apple sells hardware once, but earns services revenue over time. Can
            a richer services mix protect margins when device sales cool?
          </p>
          <Link className="hero-link" to="/company/AAPL">
            Read the Apple thesis <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="hero-chart">
          <div className="row">
            <span className="kicker">Price study · USD</span>
            <select
              aria-label="Featured chart company"
              value={symbol}
              onChange={(v) => S(v.target.value)}
            >
              {equities.map((v) => (
                <option key={v.ticker}>{v.ticker}</option>
              ))}
            </select>
          </div>
          <div className="quote">
            {money(e.price)} <Move value={e.change} />
          </div>
          <Spark values={e.trend} label={e.name + " sample price history"} />
          <div className="axis">
            <span>Session 01</span>
            <span>Session 08</span>
          </div>
        </div>
      </div>
      <div className="stats">
        {[
          [equities.length, "Companies covered", "/companies"],
          [desk.watch.length, "On your watchlist", "/watchlist"],
          [desk.notes.length, "Research notes", "/reports"],
        ].map(([v, label, url]) => (
          <Link key={label} to={String(url)}>
            <small>{label}</small>
            <b>{String(v).padStart(2, "0")}</b>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>
      <Panel tag="Your workspace" title="Watchlist snapshot">
        <Securities
          list={equities.filter((x) => desk.watch.includes(x.ticker))}
        />
      </Panel>
    </>
  )
}
