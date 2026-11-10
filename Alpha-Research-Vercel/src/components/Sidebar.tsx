import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Globe2, 
  Building2, 
  FileText, 
  Library, 
  CalendarDays, 
  LineChart, 
  Eye, 
  Briefcase, 
  Bot, 
  FileOutput, 
  Settings 
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Globe2, label: 'Markets', path: '/markets' },
  { icon: Building2, label: 'Companies', path: '/company/AAPL' }, // Defaulting to AAPL for demo
  { icon: FileText, label: 'Financial Statements', path: '/financials' },
  { icon: Library, label: 'SEC Filings', path: '/filings' },
  { icon: CalendarDays, label: 'Earnings', path: '/earnings' },
  { icon: LineChart, label: 'Macro Economy', path: '/macro' },
  { icon: Eye, label: 'Watchlist', path: '/watchlist' },
  { icon: Briefcase, label: 'Portfolio', path: '/portfolio' },
  { icon: Bot, label: 'AI Research', path: '/ai' },
  { icon: FileOutput, label: 'Reports', path: '/reports' },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-display text-lg font-bold italic">
            α
          </div>
          <span className="font-display text-xl tracking-tight font-bold text-foreground">Alpha Research</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        <div className="text-[11px] font-medium text-muted-foreground/80 uppercase tracking-[0.14em] mb-2 px-3">Research Desk</div>
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive 
                ? "bg-secondary text-secondary-foreground" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive 
              ? "bg-secondary text-secondary-foreground" 
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Settings className="w-4 h-4" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
