import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Zap, RefreshCw, Key } from 'lucide-react';
import { IStomaScraper } from '@/components/integrations/IStomaScraper';
import { ZapierIntegration } from '@/components/integrations/ZapierIntegration';
import { ApiKeyManager } from '@/components/ui/ApiKeyManager';
import { IStomaAutomationSection } from '@/components/integrations/IStomaAutomationSection';

interface IStomaIntegrationTabsProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  onFullSync: () => Promise<void>;
}

export const IStomaIntegrationTabs = ({ connectionStatus, onFullSync }: IStomaIntegrationTabsProps) => {
  return (
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
          onFullSync={onFullSync} 
        />
      </TabsContent>
    </Tabs>
  );
};