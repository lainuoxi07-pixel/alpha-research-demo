import { BrowserRouter, Routes, Route, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { CompanyResearch } from './pages/CompanyResearch';
import { CompanyResearch as CoveredCompany } from './pages/CoveredCompany';
import { DeskPage, sections } from './pages/DeskPages';
import { Workspace, useDesk } from './lib/workspace';
import './features.css';

function Feature({ children }: { children: React.ReactNode }) {
  const {desk}=useDesk();
  return <div className={'feature space-y-8 max-w-6xl mx-auto'+(desk.compact?' compact':'')}>{children}</div>
}
function ResearchRoute(){
  const {ticker='AAPL'}=useParams(), [q]=useSearchParams();
  if(ticker.toUpperCase()==='AAPL' && !['notes','financials'].includes(q.get('tab')||'')) return <CompanyResearch/>;
  return <Feature><CoveredCompany key={ticker}/></Feature>;
}
export default function App() {
  return <Workspace><BrowserRouter><Routes><Route path="/" element={<MainLayout/>}>
    <Route index element={<Dashboard/>}/>
    <Route path="company/:ticker" element={<ResearchRoute/>}/>
    {Object.keys(sections).map(p=><Route key={p} path={p} element={<Feature><DeskPage key={p} page={p}/></Feature>}/>)}
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Route></Routes></BrowserRouter></Workspace>;
}
