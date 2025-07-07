import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Key } from 'lucide-react';
import { ApiKeyManager } from '@/components/ui/ApiKeyManager';
import { IStomaAutomationStats } from './IStomaAutomationStats';

interface IStomaAutomationSectionProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  onFullSync: () => Promise<void>;
}

export const IStomaAutomationSection = ({ connectionStatus, onFullSync }: IStomaAutomationSectionProps) => {
  return (
    <div className="space-y-6">
      {/* API Keys Management Section */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Key className="w-5 h-5 text-green-600" />
            Gestionare Chei API
          </CardTitle>
          <CardDescription>
            Administrați securizat cheile API pentru serviciile externe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApiKeyManager />
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-lg">Automatizare Completă</CardTitle>
          <CardDescription>
            Combinați Web Scraping cu Zapier pentru sincronizare automată
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Workflow Automated:</h4>
            <ol className="text-sm text-blue-700 space-y-2 list-decimal ml-4">
              <li>Firecrawl extrage datele din iStoma la intervale regulate</li>
              <li>Datele sunt procesate și formatate automat</li>
              <li>Zapier primește datele prin webhook și le distribuie</li>
              <li>Sincronizarea se face în timp real în toate sistemele conectate</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium">Configurare Rapidă:</h5>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✓ API Key Firecrawl configurat</li>
                <li>✓ Webhook-uri Zapier active</li>
                <li>✓ URL-uri iStoma identificate</li>
                <li>✓ Procesare automată activă</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium">Date Sincronizate:</h5>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Programări pacienți</li>
                <li>• Fișe medicale</li>
                <li>• Rapoarte financiare</li>
                <li>• Facturi și plăți</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={onFullSync}
            disabled={connectionStatus === 'connecting'}
            className="w-full medical-button"
            size="lg"
          >
            <RefreshCw className={`w-5 h-5 mr-2 ${connectionStatus === 'connecting' ? 'animate-spin' : ''}`} />
            {connectionStatus === 'connecting' ? 'Sincronizez...' : 'Începe Sincronizarea Completă'}
          </Button>
        </CardContent>
      </Card>

      <IStomaAutomationStats />
    </div>
  );
};