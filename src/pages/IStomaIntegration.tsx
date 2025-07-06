import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Zap, RefreshCw, Key } from 'lucide-react';
import { IStomaScraper } from '@/components/integrations/IStomaScraper';
import { ZapierIntegration } from '@/components/integrations/ZapierIntegration';
import { ApiKeyManager } from '@/components/ui/ApiKeyManager';
import { IStomaPageHeader } from '@/components/integrations/IStomaPageHeader';
import { IStomaStatusOverview } from '@/components/integrations/IStomaStatusOverview';
import { IStomaAutomationSection } from '@/components/integrations/IStomaAutomationSection';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const IStomaIntegration = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [lastSync, setLastSync] = useState<string | null>(null);

  const handleFullSync = async () => {
    setConnectionStatus('connecting');
    
    // Simulate sync process
    setTimeout(() => {
      setConnectionStatus('connected');
      setLastSync(new Date().toISOString());
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <DashboardHeader />
      
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <IStomaPageHeader connectionStatus={connectionStatus} />
        <IStomaStatusOverview connectionStatus={connectionStatus} lastSync={lastSync} />

        {/* Main Integration Tabs */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Configurare Integrare iStoma
            </CardTitle>
            <CardDescription>
              Configurați extragerea automată de date din iStoma.ro folosind Web Scraping și automatizarea prin Zapier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="scraper" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="scraper" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Web Scraping
                </TabsTrigger>
                <TabsTrigger value="zapier" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Zapier
                </TabsTrigger>
                <TabsTrigger value="api-keys" className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  API Keys
                </TabsTrigger>
                <TabsTrigger value="automation" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Automatizare
                </TabsTrigger>
              </TabsList>

              <TabsContent value="scraper" className="mt-6">
                <IStomaScraper />
              </TabsContent>

              <TabsContent value="zapier" className="mt-6">
                <ZapierIntegration />
              </TabsContent>

              <TabsContent value="api-keys" className="mt-6">
                <ApiKeyManager />
              </TabsContent>

              <TabsContent value="automation" className="mt-6">
                <IStomaAutomationSection 
                  connectionStatus={connectionStatus} 
                  onFullSync={handleFullSync} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IStomaIntegration;