import React from 'react';
import StatsGrid from "@/components/dashboard/StatsGrid";
import RealDataDisplay from "@/components/dashboard/RealDataDisplay";
import QuickActions from "@/components/dashboard/QuickActions";
import { useRole } from "@/contexts/RoleContext";

const Index = () => {
  const { currentRole, getRoleConfig } = useRole();
  const roleConfig = getRoleConfig();

  return (
    <div className="space-y-6 p-6">
      {/* Header dinamic bazat pe rol */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">🦷 DENTAL OS - {roleConfig.name}</h1>
        <p className="text-lg opacity-90">{roleConfig.description}</p>
      </div>

      {/* Dashboard principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Coloana principală - Date în timp real */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4">📊 Date în Timp Real</h2>
            <RealDataDisplay />
          </div>
        </div>

        {/* Coloana secundară - Acțiuni și statistici */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4">⚡ Acțiuni Rapide</h2>
            <QuickActions />
          </div>
          
          <div className="bg-card p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4">📈 Statistici Role</h2>
            <StatsGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
