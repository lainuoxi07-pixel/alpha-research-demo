import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Workspace } from "./lib/workspace"
import { Dashboard } from "./pages/Dashboard"
import { CompanyResearch } from "./pages/CompanyResearch"
import { DeskPage, sections } from "./pages/DeskPages"
import { MainLayout } from "./layouts/MainLayout"
export default function App() {
  return (
    <Workspace>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="company/:ticker" element={<CompanyResearch />} />
            {Object.keys(sections).map((p) => (
              <Route key={p} path={p} element={<DeskPage key={p} page={p} />} />
            ))}
            <Route
              path="*"
              element={
                <section className="panel">
                  <h1>Page not found</h1>
                  <Link className="link" to="/">
                    Return to briefing →
                  </Link>
                </section>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Workspace>
  )
}
