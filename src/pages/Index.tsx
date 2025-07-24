import React from 'react';
import StatsGrid from "@/components/dashboard/StatsGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import AIInsights from "@/components/dashboard/AIInsights";

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Header simplu și curat */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-2">🦷 DENTAL OS</h1>
        <p className="text-lg opacity-90">Sistem Medical Integrat</p>
      </div>

      {/* Dashboard principal cu 2 coloane */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coloana stânga - Statistici și acțiuni */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4">📊 Statistici</h2>
            <StatsGrid />
          </div>
          
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4">⚡ Acțiuni Rapide</h2>
            <QuickActions />
          </div>
        </div>

        {/* Coloana dreapta - Activitate și AI */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4">📋 Activitate Recentă</h2>
            <RecentActivity />
          </div>
          
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4">🧠 AI Insights</h2>
            <AIInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
