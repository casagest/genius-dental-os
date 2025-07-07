import React from 'react';
import { IStomaPageHeader } from '@/components/integrations/IStomaPageHeader';
import { IStomaStatusOverview } from '@/components/integrations/IStomaStatusOverview';
import { IStomaMainCard } from '@/components/integrations/IStomaMainCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useIStomaSync } from '@/hooks/useIStomaSync';

const IStomaIntegration = () => {
  const { connectionStatus, lastSync, handleFullSync } = useIStomaSync();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <DashboardHeader />
      
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <IStomaPageHeader connectionStatus={connectionStatus} />
        <IStomaStatusOverview connectionStatus={connectionStatus} lastSync={lastSync} />

        <IStomaMainCard 
          connectionStatus={connectionStatus}
          onFullSync={handleFullSync}
        />
      </main>
    </div>
  );
};

export default IStomaIntegration;