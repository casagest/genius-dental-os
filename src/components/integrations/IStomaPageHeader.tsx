import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface IStomaPageHeaderProps {
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
}

export const IStomaPageHeader = ({ connectionStatus }: IStomaPageHeaderProps) => {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Conectat</Badge>;
      case 'connecting':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Conectez...</Badge>;
      default:
        return <Badge variant="outline"><AlertCircle className="w-3 h-3 mr-1" />Deconectat</Badge>;
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="p-2"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-2xl sm:text-3xl font-bold medical-text-primary">
          Integrare iStoma.ro
        </h1>
        <p className="text-muted-foreground mt-1">
          Extragere automată de date și sincronizare prin Web Scraping + Zapier
        </p>
      </div>
      {getStatusBadge()}
    </div>
  );
};