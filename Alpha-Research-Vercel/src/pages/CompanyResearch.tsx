import React, { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { useDesk } from '../lib/workspace';
import { equities } from '../lib/desk';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  Building, 
  BrainCircuit,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Scale,
  ShieldAlert,
  Lightbulb,
  ArrowRight,
  Zap,
  Target
} from 'lucide-react';

export function CompanyResearch() {
  const { ticker = 'AAPL' } = useParams();
  const [q,setQ]=useSearchParams();
  const activeTab=q.get('tab')||'thesis';
  const setActiveTab=(tab:string)=>setQ({tab});
  const {desk,matrixToggle}=useDesk();
  const [doc,setDoc]=useState('');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header - Shifted to insight focus */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border/50">
        <div className="flex gap-6 items-start">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-sm shrink-0">
            <svg viewBox="0 0 384 512" className="w-8 h-8 text-black fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 22.8 181 22.8 243.6c0 25.3 12.1 63.6 28 89.2 14.5 23.3 35.3 54.7 59.5 54.7 22.8 0 32.1-12.7 62.8-12.7 30 0 38.3 12.7 62.1 12.7 25 0 43.1-28.7 56.6-48.4 17.2-25.2 24.3-49.4 24.6-50.6-1.5-.7-37.4-13.8-37.7-69.8zm-93.6-218c31.1-38 30.5-80.1 29.5-84.7-33.6 1.3-70.1 21.8-91.8 54.7-22.3 33.6-29.2 73.6-25 80.1 35.6 2.7 73.1-15.5 87.3-50.1z"/></svg>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="title-1 text-foreground">Apple Inc.</h1>
              <Badge variant="outline" className="font-mono text-sm border-muted-foreground/30">{ticker}</Badge>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20">Consumer Tech</Badge>
            </div>
            <div className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
              <span className="font-semibold text-foreground">AI Consensus: </span> 
              Transitioning from a hardware supercycle dependency into a high-margin services ecosystem. Core risk remains smartphone market saturation and regulatory scrutiny on the App Store.
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
           <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono font-medium tracking-tight">$189.30</span>
              <span className="text-sm font-medium text-green-500 flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> 0.66%</span>
           </div>
           <Button onClick={()=>matrixToggle("AAPL")} aria-pressed={desk.matrix.includes("AAPL")} className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"><Target className="w-4 h-4" /> {desk.matrix.includes("AAPL") ? "Added to Decision Matrix" : "Add to Decision Matrix"}</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start border-b border-border/50 rounded-none h-12 bg-transparent p-0">
          <TabsTrigger value="thesis" active={activeTab === 'thesis'} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4">Investment Thesis</TabsTrigger>
          <TabsTrigger value="filings" active={activeTab === 'filings'} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4">Filings Synthesis</TabsTrigger>
          <TabsTrigger value="earnings" active={activeTab === 'earnings'} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4">Earnings Breakdown</TabsTrigger>
          <TabsTrigger value="peers" active={activeTab === 'peers'} className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4">Peer Context</TabsTrigger>
        </TabsList>

        {/* THESIS TAB - Decision Workflow Focus */}
        <TabsContent value="thesis" activeValue={activeTab}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bull vs Bear */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="title-2 flex items-center gap-2.5 text-green-400">
                      <TrendingUp className="w-5 h-5" /> The Bull Case
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span><strong className="text-foreground">Services Margin Expansion:</strong> Services revenue hit all-time highs with 71% gross margins, structurally lifting Apple's overall profitability even on flat hardware sales.</span>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span><strong className="text-foreground">Installed Base Monetization:</strong> Active devices crossed 2.2 billion. Ecosystem stickiness allows price increases on subscriptions (Apple One) with minimal churn.</span>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                        <span><strong className="text-foreground">On-Device AI Advantage:</strong> Custom silicon (M-series, A-series) positions them perfectly for privacy-first, on-device edge AI, driving a potential upgrade supercycle.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-red-500/20 bg-red-500/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="title-2 flex items-center gap-2.5 text-red-400">
                      <TrendingDown className="w-5 h-5" /> The Bear Case
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        <span><strong className="text-foreground">China Market Erosion:</strong> Increased competition from Huawei and geopolitical tensions are eroding market share in their 3rd largest region.</span>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        <span><strong className="text-foreground">Regulatory Threats:</strong> DOJ antitrust suit and EU Digital Markets Act threaten the lucrative 30% App Store take rate and default search engine payments from Google.</span>
                      </li>
                      <li className="flex gap-3">
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        <span><strong className="text-foreground">Valuation Stretch:</strong> Trading at ~29x forward P/E despite single-digit revenue growth expectations requires flawless execution.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Key Catalysts */}
              <Card>
                <CardHeader>
                  <CardTitle className="title-2 flex items-center gap-2.5"><Zap className="w-5 h-5 text-yellow-500" /> Upcoming Catalysts</CardTitle>
                  <CardDescription>Events likely to materially impact the thesis in the next 6-12 months.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">WWDC (June) - "Apple Intelligence" Unveil</h4>
                        <p className="text-sm text-muted-foreground">Expectation is integration of generative AI into iOS 18. Success here neutralizes the "lagging in AI" bear argument and could trigger an iPhone 16 upgrade cycle.</p>
                      </div>
                      <Badge>High Impact</Badge>
                    </div>
                    <div className="flex gap-4 items-start p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">EU DMA Enforcement Initial Results</h4>
                        <p className="text-sm text-muted-foreground">First data on whether European consumers are actually utilizing third-party app stores or alternative billing. Will quantify the regulatory revenue hit.</p>
                      </div>
                      <Badge variant="outline">Medium Impact</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Risk Scorecard */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="title-2 flex items-center gap-2.5"><Scale className="w-5 h-5 text-muted-foreground" /> Fundamental Quality</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <QualityMetric label="Moat / Competitive Adv." score={95} desc="Ecosystem lock-in is arguably the strongest globally." />
                  <QualityMetric label="Balance Sheet Health" score={88} desc="Net cash positive, massive free cash flow generation." />
                  <QualityMetric label="Growth Trajectory" score={45} desc="Law of large numbers; relying on margin expansion." />
                  <QualityMetric label="Valuation Safety" score={30} desc="Priced for perfection; minimal margin of safety." />
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="title-2 flex items-center gap-2.5"><Lightbulb className="w-5 h-5 text-primary" /> AI Conclusion</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-3">
                  <p>
                    <strong className="text-foreground">Hold / Accumulate on Dips.</strong>
                  </p>
                  <p>
                    Apple is transitioning into a consumer utility. While hyper-growth is likely over, the durability of its cash flows justifies a premium. The primary decision factor for retail investors should be timeline: it is a poor 1-year trade due to valuation and China risks, but remains a foundational 5-10 year portfolio anchor.
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </TabsContent>

        {/* FILINGS SYNTHESIS TAB */}
        <TabsContent value="filings" activeValue={activeTab}>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-1 space-y-4">
               <Card className="bg-secondary">
                 <CardHeader>
                   <CardTitle className="title-2">Latest: Q1 2024 10-Q</CardTitle>
                   <CardDescription>Filed Feb 2, 2024</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <p className="text-sm text-muted-foreground">
                     AI analyzed 145 pages. Identified 3 critical changes in language compared to the previous quarter.
                   </p>
                 </CardContent>
               </Card>
               <Button variant="outline" className="w-full justify-between" onClick={()=>setDoc("Annual report")}>View Q4 2023 10-K <ArrowRight className="w-4 h-4"/></Button>
               <Button variant="outline" className="w-full justify-between" onClick={()=>setDoc("Current reports")}>View Recent 8-Ks <ArrowRight className="w-4 h-4"/></Button>
               {doc && <Card><CardHeader><CardTitle>{doc}</CardTitle><CardDescription>Sample reading guide</CardDescription></CardHeader><CardContent>{doc==='Annual report'?'Compare Services margins with hardware profitability and note changes in geographic concentration.':'Identify any material events since the last quarter, then check whether they change the original thesis.'}</CardContent></Card>}
             </div>
             
             <div className="lg:col-span-2 space-y-6">
               <Card>
                 <CardHeader>
                   <CardTitle className="title-2 flex items-center gap-2.5"><ShieldAlert className="w-5 h-5 text-orange-500" /> Delta Analysis: Risk Factors</CardTitle>
                   <CardDescription>How Apple altered their risk disclosures this quarter</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="bg-orange-500/10 text-orange-500 border-orange-500/20">NEW ADDITION</Badge>
                        <h4 className="font-semibold text-sm">Language around App Store Legislation</h4>
                      </div>
                      <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded border border-border/50">
                        "The Company’s business may be materially impacted by new legislative and regulatory initiatives, including the EU’s Digital Markets Act..." 
                        <br/><br/>
                        <span className="text-foreground font-medium">AI Translation:</span> Apple is explicitly warning that alternative app stores and billing methods in the EU are no longer a theoretical risk, but an active headwind to Services revenue.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">ELEVATED SEVERITY</Badge>
                        <h4 className="font-semibold text-sm">Geopolitical Tensions</h4>
                      </div>
                      <p className="text-sm text-muted-foreground p-3 bg-muted/30 rounded border border-border/50">
                        They expanded the section detailing trade restrictions and supply chain dependencies in Asia.
                        <br/><br/>
                        <span className="text-foreground font-medium">AI Translation:</span> The risk of China imposing soft-bans on iPhones for government workers or domestic preference for Huawei is intensifying in management's view.
                      </p>
                    </div>
                 </CardContent>
               </Card>
             </div>
           </div>
        </TabsContent>
        
        {/* Placeholder for Earnings - demonstrating structure */}
        <TabsContent value="earnings" activeValue={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Q1 2024 Earnings Call Transcript Synthesis</CardTitle>
              <CardDescription>Analysis of management tone and Q&A focus areas.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground border-t">
              <div className="space-y-3 px-6"><Badge variant="outline">Sample analysis</Badge><p>Does a growing services mix offset slower device upgrades?</p><Link className="underline" to="/company/AAPL?tab=financials">Compare quarterly revenue →</Link></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="peers" activeValue={activeTab}><Card><CardHeader><CardTitle>Peer Context</CardTitle><CardDescription>Sample coverage · select a company to compare its thesis.</CardDescription></CardHeader><CardContent className="space-y-3">{equities.filter(e=>e.ticker!=='AAPL').map(e=><Link key={e.ticker} className="flex justify-between border-b py-2" to={'/company/'+e.ticker}><span>{e.name} · {e.ticker}</span><span>{e.pe}× P/E →</span></Link>)}</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}

function QualityMetric({ label, score, desc }: { label: string, score: number, desc: string }) {
  // Determine color based on score
  let colorClass = "bg-green-500";
  if (score < 70) colorClass = "bg-yellow-500";
  if (score < 40) colorClass = "bg-red-500";

  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-foreground">{label}</span>
        <span className="font-mono">{score}/100</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden mb-2">
        <div className={`h-full ${colorClass}`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}
