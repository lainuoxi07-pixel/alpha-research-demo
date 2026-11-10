import { Link } from "react-router-dom"
import { useState, type ReactNode } from "react"
import { Bookmark, Check, Search } from "lucide-react"
import { equities, filterCompanies, pct, money, type Equity } from "../lib/desk"
import { useDesk } from "../lib/workspace"
export function Intro({
  tag,
  title,
  children,
}: {
  tag: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="intro">
      <div className="kicker">{tag}</div>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </header>
  )
}
export function Panel({
  title,
  tag,
  children,
}: {
  title: string
  tag?: string
  children: ReactNode
}) {
  return (
    <section className="panel">
      {tag && <div className="kicker">{tag}</div>}
      <h2>{title}</h2>
      {children}
    </section>
  )
}
export function Save({ ticker }: { ticker: string }) {
  const { desk, toggle } = useDesk()
  const on = desk.watch.includes(ticker)
  return (
    <button
      className={"pill " + (on ? "on" : "")}
      aria-pressed={on}
      aria-label={
        (on ? "Remove " : "Save ") +
        ticker +
        (on ? " from" : " to") +
        " watchlist"
      }
      onClick={() => toggle(ticker)}
    >
      {on ? <Check size={14} /> : <Bookmark size={14} />}{" "}
      {on ? "Saved" : "Save"}
    </button>
  )
}
export function Spark({ values, label }: { values: number[]; label: string }) {
  const lo = Math.min(...values),
    hi = Math.max(...values)
  const d = values
    .map(
      (n, i) =>
        (i ? "L" : "M") +
        (3 + (i * 194) / (values.length - 1)) +
        " " +
        (52 - ((n - lo) * 44) / (hi - lo || 1)),
    )
    .join(" ")
  return (
    <svg
      className="spark"
      viewBox="0 0 200 60"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
    >
      <path d="M0 55H200" fill="none" stroke="#38443f" strokeDasharray="2 3" />
      <path
        d={d}
        fill="none"
        stroke={values.at(-1)! >= values[0] ? "#a7dcc1" : "#efa891"}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
export function Move({ value }: { value: number }) {
  return <span className={value >= 0 ? "up" : "down"}>{pct(value)}</span>
}
export function Selector({
  value,
  onChange,
}: {
  value: string
  onChange: (s: string) => void
}) {
  return (
    <label className="picker">
      Company{" "}
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {equities.map((x) => (
          <option key={x.ticker} value={x.ticker}>
            {x.name} · {x.ticker}
          </option>
        ))}
      </select>
    </label>
  )
}
export function Securities({
  list = equities,
  search = false,
}: {
  list?: Equity[]
  search?: boolean
}) {
  const [q, Q] = useState(""),
    [s, S] = useState("All sectors")
  const shown = filterCompanies(q, s).filter((e) => list.includes(e))
  return (
    <>
      {search && (
        <div className="controls">
          <label className="find">
            <Search size={16} />
            <input
              aria-label="Search companies"
              placeholder="Search name or ticker…"
              value={q}
              onChange={(e) => Q(e.target.value)}
            />
          </label>
          <select
            aria-label="Filter sector"
            value={s}
            onChange={(e) => S(e.target.value)}
          >
            {["All sectors", ...equities.map((e) => e.sector)].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      )}
      {!shown.length ? (
        <div className="empty">
          {search
            ? "No matches. Try another ticker or sector."
            : "Your list is empty."}{" "}
          {!search && (
            <Link className="link" to="/companies">
              Explore companies →
            </Link>
          )}
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Last · USD</th>
                <th>Change</th>
                <th>Watchlist</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((e) => (
                <tr key={e.ticker}>
                  <td>
                    <Link className="company" to={"/company/" + e.ticker}>
                      {e.name}
                      <small>
                        {e.ticker} · {e.sector}
                      </small>
                    </Link>
                  </td>
                  <td>{money(e.price)}</td>
                  <td>
                    <Move value={e.change} />
                  </td>
                  <td>
                    <Save ticker={e.ticker} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
export function Notes({ ticker }: { ticker?: string }) {
  const { desk, addNote, removeNote } = useDesk(),
    [body, B] = useState(""),
    [symbol, S] = useState("AAPL"),
    [status, M] = useState("")
  const selected = ticker || symbol
  const notes = desk.notes.filter((n) => !ticker || n.ticker === ticker)
  return (
    <>
      <form
        className="noteform"
        onSubmit={(e) => {
          e.preventDefault()
          if (!body.trim()) return
          addNote(selected, body)
          B("")
          M("Note saved.")
        }}
      >
        {!ticker && <Selector value={symbol} onChange={S} />}
        <label>
          Research note
          <textarea
            maxLength={2000}
            value={body}
            onChange={(e) => {
              B(e.target.value)
              M("")
            }}
            placeholder="What changed your thesis? What would you check next?"
          />
        </label>
        <button className="primary" disabled={!body.trim()}>
          Save note
        </button>
        <span role="status">{status}</span>
      </form>
      {notes.length ? (
        notes.map((n) => (
          <article className="entry" key={n.id}>
            <div className="row">
              <Link to={"/company/" + n.ticker} className="link">
                {n.ticker}
              </Link>
              <button
                className="textbtn"
                onClick={() => {
                  removeNote(n.id)
                  M("Note removed.")
                }}
              >
                Remove
              </button>
            </div>
            <p>{n.body}</p>
          </article>
        ))
      ) : (
        <p className="muted">
          No notes yet. Save a question or observation above.
        </p>
      )}
    </>
  )
}
