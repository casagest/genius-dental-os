import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Zap, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IStomaScraper } from '@/components/integrations/IStomaScraper';
import { ZapierIntegration } from '@/components/integrations/ZapierIntegration';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const IStomaIntegration = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <DashboardHeader />
      
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
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

        {/* Status Overview */}
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="scraper" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Web Scraping
                </TabsTrigger>
                <TabsTrigger value="zapier" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Zapier
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

              <TabsContent value="automation" className="mt-6">
                <div className="space-y-6">
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
                        onClick={handleFullSync}
                        disabled={connectionStatus === 'connecting'}
                        className="w-full medical-button"
                        size="lg"
                      >
                        <RefreshCw className={`w-5 h-5 mr-2 ${connectionStatus === 'connecting' ? 'animate-spin' : ''}`} />
                        {connectionStatus === 'connecting' ? 'Sincronizez...' : 'Începe Sincronizarea Completă'}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monitorizare și Raportare</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold text-green-600">245</p>
                          <p className="text-sm text-green-700">Programări Sincronizate</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold text-blue-600">89</p>
                          <p className="text-sm text-blue-700">Pacienți Actualizați</p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold text-purple-600">12</p>
                          <p className="text-sm text-purple-700">Rapoarte Generate</p>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-lg text-center">
                          <p className="text-2xl font-bold text-orange-600">156</p>
                          <p className="text-sm text-orange-700">Facturi Procesate</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IStomaIntegration;