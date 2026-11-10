import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Bot, TrendingUp, TrendingDown, ArrowRight, Zap, AlertTriangle } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2.5">
        <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Daily Intelligence Synthesis</span>
        <h1 className="title-1 text-foreground">Morning Briefing</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">AI-synthesized view of macro conditions and your portfolio exposure.</p>
      </div>

      {/* Hero: The Synthesis */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="title-2 flex items-center gap-2.5 text-primary">
            <Bot className="w-5 h-5 text-muted-foreground" /> The Macro Narrative Today
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-display text-xl leading-relaxed text-foreground/95 font-light">
            Markets are pricing out aggressive rate cuts after yesterday's sticky CPI print, shifting the narrative from "soft landing" to "higher for longer." 
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-primary/10">
            <div className="space-y-2">
              <div className="text-sm font-semibold flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-500"/> Rate Sensitives</div>
              <p className="text-xs text-muted-foreground">Small caps (IWM) and highly levered tech are underperforming as the 10-year yield crosses 4.3%.</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500"/> Quality Bias</div>
              <p className="text-xs text-muted-foreground">Mega-cap tech (AAPL, MSFT) is holding up due to strong free cash flow and cash-rich balance sheets.</p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500"/> Portfolio Action</div>
              <p className="text-xs text-muted-foreground">No immediate rebalancing required. Wait for NVDA earnings next week before adjusting semiconductor exposure.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Watchlist Insight focus */}
        <Card>
          <CardHeader>
            <CardTitle className="title-2 flex items-center gap-2.5"><Zap className="w-4 h-4 text-muted-foreground" /> Watchlist Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">AAPL</Badge>
                    <span className="font-semibold text-sm">Approaching Support</span>
                  </div>
                  <NavLink to="/company/AAPL" className="text-xs text-primary flex items-center hover:underline">
                    View Thesis <ArrowRight className="w-3 h-3 ml-1" />
                  </NavLink>
                </div>
                <p className="text-xs text-muted-foreground">
                  Trading at $189.30, near the lower bound of its 6-month channel. Valuation remains stretched at 29x P/E, but technicals suggest short-term stabilization.
                </p>
              </div>

              <div className="p-4 border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono">TSLA</Badge>
                    <span className="font-semibold text-sm">Negative Sentiment Shift</span>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center"><TrendingDown className="w-3 h-3 text-red-500 mr-1"/> -2.4% Pre-market</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Overnight news out of Berlin regarding factory delays is amplifying concerns over Q1 deliveries. AI sentiment model has downgraded to "Bearish".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instead of pure numbers, show context */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="title-2">Market Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <div>
                    <div className="text-sm font-medium">S&P 500</div>
                    <div className="text-xs text-muted-foreground">Testing 5,000 psychological level</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">5,026.61</div>
                    <div className="text-xs text-green-500">+1.07%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                  <div>
                    <div className="text-sm font-medium">US 10-Year Treasury</div>
                    <div className="text-xs text-muted-foreground">Rising on sticky inflation data</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">4.31%</div>
                    <div className="text-xs text-red-500">+0.05</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">VIX (Volatility)</div>
                    <div className="text-xs text-muted-foreground">Remains historically subdued</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">13.82</div>
                    <div className="text-xs text-muted-foreground">-1.20%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader className="pb-2">
              <CardTitle className="title-2 text-muted-foreground">Quote of the Day</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-2 border-primary pl-4 py-1">
                <p className="font-display text-base font-normal italic leading-relaxed text-foreground/90">"In the short run, the market is a voting machine but in the long run, it is a weighing machine."</p>
                <footer className="text-xs text-muted-foreground mt-2">— Benjamin Graham</footer>
              </blockquote>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
