import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FirecrawlService } from '@/utils/FirecrawlService';
import { Globe, Key, Play, Database, Clock, Users, DollarSign } from 'lucide-react';

interface ScrapedData {
  url: string;
  content: string;
  metadata: any;
  timestamp: string;
}

export const IStomaScraper = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrapedData, setScrapedData] = useState<ScrapedData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Specific iStoma URLs
  const [iStomaUrl, setIStomaUrl] = useState('');
  const [selectedDataType, setSelectedDataType] = useState<'programari' | 'pacienti' | 'rapoarte' | 'facturi'>('programari');

  // Initialize API key state
  const initializeApiKey = async () => {
    const existingKey = await FirecrawlService.getApiKey();
    if (existingKey) {
      setApiKey(existingKey);
      setIsApiKeySet(true);
    }
    setIsInitialized(true);
  };

  // Initialize on component mount
  useEffect(() => {
    initializeApiKey();
  }, []);

  const handleApiKeySave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Eroare",
        description: "Vă rog introduceți cheia API Firecrawl",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const isValid = await FirecrawlService.testApiKey(apiKey);
    
    if (isValid) {
      const success = await FirecrawlService.saveApiKey(apiKey);
      if (success) {
        setIsApiKeySet(true);
        toast({
          title: "Succes",
          description: "Cheia API a fost salvată securizat în Supabase",
        });
      } else {
        toast({
          title: "Eroare",
          description: "Nu s-a putut salva cheia API în Supabase",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Eroare",
        description: "Cheia API nu este validă",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleScrapeData = async () => {
    if (!iStomaUrl.trim()) {
      toast({
        title: "Eroare",
        description: "Vă rog introduceți URL-ul iStoma",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgress(0);
    
    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 20, 80));
      }, 500);

      const result = await FirecrawlService.scrapeIStoma(iStomaUrl);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (result.success && result.data) {
        const newData: ScrapedData = {
          url: iStomaUrl,
          content: result.data.markdown || result.data.html || 'No content extracted',
          metadata: result.data.metadata || {},
          timestamp: new Date().toISOString()
        };
        
        setScrapedData(prev => [newData, ...prev]);
        
        toast({
          title: "Succes",
          description: `Date extrase cu succes din iStoma (${selectedDataType})`,
        });
      } else {
        toast({
          title: "Eroare",
          description: result.error || "Failed to scrape iStoma data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error scraping iStoma:', error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la extragerea datelor",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case 'programari': return <Clock className="w-4 h-4" />;
      case 'pacienti': return <Users className="w-4 h-4" />;
      case 'rapoarte': return <Database className="w-4 h-4" />;
      case 'facturi': return <DollarSign className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getDataTypeDescription = (type: string) => {
    switch (type) {
      case 'programari': return 'Extrage programările pacienților din iStoma';
      case 'pacienti': return 'Extrage datele pacienților și fișele medicale';
      case 'rapoarte': return 'Extrage rapoartele financiare și statisticile';
      case 'facturi': return 'Extrage facturile și documentele fiscale';
      default: return 'Extrage conținutul general';
    }
  };

  if (!isInitialized) {
    return (
      <Card className="medical-card">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Se încarcă...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isApiKeySet) {
    return (
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            Configurare Firecrawl API
          </CardTitle>
          <CardDescription>
            Pentru a începe extragerea datelor din iStoma, vă rog introduceți cheia dvs. API Firecrawl
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Cheie API Firecrawl</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="fc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="medical-focus"
            />
          </div>
          <Button 
            onClick={handleApiKeySave}
            disabled={isLoading}
            className="w-full medical-button"
          >
            {isLoading ? "Validez..." : "Salvează și Validează"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Obțineți cheia API de la <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">firecrawl.dev</a>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Extragere Date iStoma.ro
          </CardTitle>
          <CardDescription>
            Extrageți automat date din sistemul iStoma pentru sincronizare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedDataType} onValueChange={(value) => setSelectedDataType(value as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="programari" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Programări</span>
              </TabsTrigger>
              <TabsTrigger value="pacienti" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Pacienți</span>
              </TabsTrigger>
              <TabsTrigger value="rapoarte" className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                <span className="hidden sm:inline">Rapoarte</span>
              </TabsTrigger>
              <TabsTrigger value="facturi" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Facturi</span>
              </TabsTrigger>
            </TabsList>

            {['programari', 'pacienti', 'rapoarte', 'facturi'].map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    {getDataTypeIcon(type)}
                    <h4 className="font-medium text-blue-900">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    {getDataTypeDescription(type)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="iStomaUrl">URL iStoma ({type})</Label>
                  <Input
                    id="iStomaUrl"
                    type="url"
                    value={iStomaUrl}
                    onChange={(e) => setIStomaUrl(e.target.value)}
                    placeholder={`https://istoma.ro/${type}/...`}
                    className="medical-focus"
                  />
                </div>

                {isLoading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Extrag date din iStoma...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>
                )}

                <Button
                  onClick={handleScrapeData}
                  disabled={isLoading}
                  className="w-full medical-button"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isLoading ? "Extrag Date..." : `Extrage ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {scrapedData.length > 0 && (
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Date Extrase ({scrapedData.length})
            </CardTitle>
            <CardDescription>
              Vizualizați și procesați datele extrase din iStoma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scrapedData.map((data, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {new Date(data.timestamp).toLocaleString('ro-RO')}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {selectedDataType}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      Procesează
                    </Button>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">URL: {data.url}</p>
                    <div className="bg-slate-50 p-3 rounded border max-h-40 overflow-y-auto">
                      <pre className="text-xs whitespace-pre-wrap">
                        {data.content.substring(0, 500)}
                        {data.content.length > 500 && '...'}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};