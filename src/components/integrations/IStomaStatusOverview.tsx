import { Card, CardContent } from "@/components/ui/card";
import { Globe, RefreshCw, Zap } from 'lucide-react';

interface IStomaStatusOverviewProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  lastSync: string | null;
}

export const IStomaStatusOverview = ({ connectionStatus, lastSync }: IStomaStatusOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="medical-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Status Conexiune</p>
              <p className="font-semibold">
                {connectionStatus === 'connected' ? 'Conectat' : 
                 connectionStatus === 'connecting' ? 'Conectez...' : 'Deconectat'}
              </p>
            </div>
            <Globe className={`w-8 h-8 ${
              connectionStatus === 'connected' ? 'text-green-500' : 
              connectionStatus === 'connecting' ? 'text-yellow-500' : 'text-slate-400'
            }`} />
          </div>
        </CardContent>
      </Card>

      <Card className="medical-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ultima Sincronizare</p>
              <p className="font-semibold">
                {lastSync ? new Date(lastSync).toLocaleString('ro-RO') : 'Niciodată'}
              </p>
            </div>
            <RefreshCw className={`w-8 h-8 text-blue-500 ${connectionStatus === 'connecting' ? 'animate-spin' : ''}`} />
          </div>
        </CardContent>
      </Card>

      <Card className="medical-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Webhook-uri Active</p>
              <p className="font-semibold">2 configurate</p>
            </div>
            <Zap className="w-8 h-8 text-orange-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};