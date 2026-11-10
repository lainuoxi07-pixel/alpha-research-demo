import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { AIPanel } from '../components/AIPanel';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-[1600px] mx-auto p-8">
          <Outlet />
        </div>
      </main>
      <AIPanel />
    </div>
  );
}
