import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Globe2,
  Building2,
  FileText,
  Library,
  CalendarDays,
  Activity,
  Bookmark,
  Briefcase,
  BookOpen,
  Settings,
  Menu,
  Sparkles,
} from "lucide-react"
import { useState } from "react"
import { useDesk } from "../lib/workspace"
const groups = [
  {
    title: "Research desk",
    items: [
      ["/", "Briefing", LayoutDashboard],
      ["/companies", "Companies", Building2],
      ["/markets", "Markets", Globe2],
      ["/financials", "Financials", FileText],
      ["/filings", "Filings", Library],
      ["/earnings", "Earnings", CalendarDays],
      ["/macro", "Macro lab", Activity],
    ],
  },
  {
    title: "My workspace",
    items: [
      ["/watchlist", "Watchlist", Bookmark],
      ["/portfolio", "Portfolio", Briefcase],
      ["/reports", "Notebook", BookOpen],
      ["/ai", "Research assistant", Sparkles],
      ["/settings", "Settings", Settings],
    ],
  },
] as const
export function MainLayout() {
  const [menu, M] = useState(false),
    { desk, persisted } = useDesk(),
    { pathname } = useLocation()
  return (
    <div className={"shell " + (desk.compact ? "dense" : "")}>
      <aside className="rail">
        <div className="brandrow">
          <Link to="/" className="brand" onClick={() => M(false)}>
            <b>α</b> Alpha Research
          </Link>
          <button
            className="mobile"
            aria-expanded={menu}
            aria-controls="desk-nav"
            onClick={() => M(!menu)}
          >
            <Menu size={18} /> Menu
          </button>
        </div>
        <nav id="desk-nav" className={menu ? "open" : ""}>
          {groups.map((g) => (
            <div key={g.title}>
              <div className="kicker">{g.title}</div>
              {g.items.map(([p, l, Icon]) => (
                <NavLink
                  end
                  to={p}
                  key={p}
                  onClick={() => M(false)}
                  className={({ isActive }) =>
                    isActive ||
                    (p === "/companies" && pathname.startsWith("/company/"))
                      ? "sel"
                      : ""
                  }
                >
                  <Icon size={16} />
                  {l}
                  {p === "/watchlist" && <em>{desk.watch.length}</em>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main className="workspace">
        <div className="topline">
          <span>ALPHA / EQUITY RESEARCH</span>
          <span className="sample">● Sample data</span>
        </div>
        {!persisted && (
          <p role="alert">
            Browser storage is unavailable. Changes will last for this session
            only.
          </p>
        )}
        <Outlet />
        <footer className="foot">
          Alpha Research · Portfolio demo{" "}
          <span>Illustrative data, not live quotes.</span>
        </footer>
      </main>
    </div>
  )
}
