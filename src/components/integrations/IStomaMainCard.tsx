import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from 'lucide-react';
import { IStomaIntegrationTabs } from './IStomaIntegrationTabs';

interface IStomaMainCardProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  onFullSync: () => Promise<void>;
}

export const IStomaMainCard = ({ connectionStatus, onFullSync }: IStomaMainCardProps) => {
  return (
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
        <IStomaIntegrationTabs 
          connectionStatus={connectionStatus}
          onFullSync={onFullSync}
        />
      </CardContent>
    </Card>
  );
};