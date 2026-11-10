// Frozen, illustrative fixtures. No live prices or model calls.
export type Equity = {
  ticker: string
  name: string
  sector: string
  price: number
  change: number
  revenue: number[]
  margin: number
  pe: number
  bull: string
  risk: string
  cue: string
  event: string
  trend: number[]
}
export const equities: Equity[] = [
  {
    ticker: "AAPL",
    name: "Apple",
    sector: "Consumer technology",
    price: 189.3,
    change: 0.66,
    revenue: [82, 85, 89, 94],
    margin: 31,
    pe: 29,
    bull: "A larger services mix could support margins even if device upgrades slow.",
    risk: "App Store policy changes may weaken service revenue per device.",
    cue: "Track services growth alongside hardware units, not in isolation.",
    event: "Jun 05",
    trend: [177, 181, 179, 184, 182, 188, 186, 189.3],
  },
  {
    ticker: "MSFT",
    name: "Microsoft",
    sector: "Software",
    price: 415.2,
    change: 1.18,
    revenue: [52, 55, 58, 62],
    margin: 43,
    pe: 35,
    bull: "Recurring enterprise contracts could translate cloud demand into durable cash flow.",
    risk: "Datacenter investment can grow faster than cloud revenue.",
    cue: "Compare cloud growth with capital intensity.",
    event: "Jun 12",
    trend: [386, 390, 387, 402, 398, 406, 410, 415.2],
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    sector: "Semiconductors",
    price: 126.4,
    change: 2.34,
    revenue: [18, 21, 24, 28],
    margin: 51,
    pe: 44,
    bull: "Accelerator demand could sustain high utilization across new product cycles.",
    risk: "Customer concentration makes order timing unusually important.",
    cue: "Look for changes in order concentration and delivery lead times.",
    event: "Jun 18",
    trend: [102, 110, 107, 117, 113, 123, 119, 126.4],
  },
  {
    ticker: "GOOGL",
    name: "Alphabet",
    sector: "Internet services",
    price: 168.5,
    change: -0.42,
    revenue: [69, 72, 76, 81],
    margin: 30,
    pe: 23,
    bull: "Cloud operating leverage could offset slower advertising growth.",
    risk: "More expensive AI queries could pressure search margins.",
    cue: "Separate query growth from cost per query.",
    event: "Jun 19",
    trend: [163, 167, 165, 169, 166, 171, 170, 168.5],
  },
  {
    ticker: "TSLA",
    name: "Tesla",
    sector: "Automotive",
    price: 182.6,
    change: -2.4,
    revenue: [22, 24, 23, 25],
    margin: 9,
    pe: 48,
    bull: "Higher factory utilization could improve unit economics.",
    risk: "Price reductions can absorb the benefit of higher deliveries.",
    cue: "Compare delivery growth with gross profit per vehicle.",
    event: "Jun 24",
    trend: [202, 198, 200, 194, 190, 193, 187, 182.6],
  },
]
export const byTicker = (ticker = "") =>
  equities.find((x) => x.ticker === ticker.toUpperCase())
export const money = (v: number) =>
  v.toLocaleString("en-US", { style: "currency", currency: "USD" })
export const pct = (v: number) => (v > 0 ? "+" : "") + v.toFixed(2) + "%"
export type Note = { id: string; ticker: string; body: string }
export type Desk = { matrix: string[]; watch: string[]; notes: Note[]; compact: boolean }
export const initial: Desk = {
  matrix: [],
  watch: ["AAPL", "MSFT"],
  notes: [],
  compact: false,
}
export const storageKey = "alpha.research.desk.v2"
export function restore(raw: string | null): Desk {
  try {
    const v = JSON.parse(raw || "null")
    if (!v || !Array.isArray(v.watch) || !Array.isArray(v.notes)) return initial
    return {
      matrix: Array.isArray(v.matrix) ? v.matrix.filter((s:unknown)=>typeof s==='string' && byTicker(s)) : [],
      watch: [
        ...new Set<string>(
          v.watch.filter((s: unknown) => typeof s === "string" && byTicker(s)),
        ),
      ],
      notes: v.notes.filter(
        (n: Note) =>
          n &&
          typeof n.id === "string" &&
          typeof n.body === "string" &&
          typeof n.ticker === "string" &&
          byTicker(n.ticker),
      ),
      compact: v.compact === true,
    }
  } catch {
    return initial
  }
}
export function filterCompanies(query: string, sector: string) {
  const q = query.trim().toLowerCase()
  return equities.filter(
    (e) =>
      (sector === "All sectors" || sector === e.sector) &&
      (e.name + " " + e.ticker).toLowerCase().includes(q),
  )
}
