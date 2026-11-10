import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { initial, restore, storageKey, type Desk } from "./desk"
const Context = createContext<ReturnType<typeof useModel> | null>(null)
function useModel() {
  const [desk, set] = useState<Desk>(() => {
    try {
      return restore(localStorage.getItem(storageKey))
    } catch {
      return initial
    }
  })
  const [persisted, save] = useState(true)
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(desk))
      save(true)
    } catch {
      save(false)
    }
  }, [desk])
  return {
    desk,
    persisted,
    toggle: (ticker: string) =>
      set((x) => ({
        ...x,
        watch: x.watch.includes(ticker)
          ? x.watch.filter((t) => t !== ticker)
          : [...x.watch, ticker],
      })),
    addNote: (ticker: string, body: string) => {
      if (!body.trim()) return
      const id = Array.from(crypto.getRandomValues(new Uint32Array(4)), (n) =>
        n.toString(16).padStart(8, "0"),
      ).join("")
      set((x) => ({
        ...x,
        notes: [{ id, ticker, body: body.trim() }, ...x.notes],
      }))
    },
    removeNote: (id: string) =>
      set((x) => ({ ...x, notes: x.notes.filter((n) => n.id !== id) })),
    compact: () => set((x) => ({ ...x, compact: !x.compact })),
  }
}
export function Workspace({ children }: { children: ReactNode }) {
  return <Context.Provider value={useModel()}>{children}</Context.Provider>
}
export function useDesk() {
  const v = useContext(Context)
  if (!v) throw Error("Missing workspace")
  return v
}
