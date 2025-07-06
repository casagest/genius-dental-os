import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Zap, Send, Database, Clock, Users, DollarSign, CheckCircle } from 'lucide-react';

interface ZapierWebhook {
  id: string;
  name: string;
  url: string;
  dataType: 'programari' | 'pacienti' | 'rapoarte' | 'facturi';
  lastTriggered?: string;
  isActive: boolean;
}

export const ZapierIntegration = () => {
  const { toast } = useToast();
  const [webhooks, setWebhooks] = useState<ZapierWebhook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    dataType: 'programari' as const
  });
  const [testData, setTestData] = useState('');

  const handleAddWebhook = () => {
    if (!newWebhook.name.trim() || !newWebhook.url.trim()) {
      toast({
        title: "Eroare",
        description: "Vă rog completați numele și URL-ul webhook-ului",
        variant: "destructive",
      });
      return;
    }

    const webhook: ZapierWebhook = {
      id: Date.now().toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      dataType: newWebhook.dataType,
      isActive: true
    };

    setWebhooks(prev => [...prev, webhook]);
    setNewWebhook({ name: '', url: '', dataType: 'programari' });
    
    toast({
      title: "Succes",
      description: "Webhook-ul Zapier a fost adăugat",
    });
  };

  const handleTriggerWebhook = async (webhook: ZapierWebhook, data?: any) => {
    setIsLoading(true);
    
    try {
      const payload = {
        timestamp: new Date().toISOString(),
        dataType: webhook.dataType,
        source: 'iStoma Integration',
        data: data || {
          // Sample data based on type
          ...(webhook.dataType === 'programari' && {
            programari: [
              { pacient: 'Ion Popescu', data: '2024-01-15', ora: '10:00', tip: 'Consultatie' },
              { pacient: 'Maria Ionescu', data: '2024-01-15', ora: '11:30', tip: 'Tratament' }
            ]
          }),
          ...(webhook.dataType === 'pacienti' && {
            pacienti: [
              { nume: 'Ana Georgescu', telefon: '0722123456', email: 'ana@email.com', ultimaVizita: '2024-01-10' }
            ]
          }),
          ...(webhook.dataType === 'rapoarte' && {
            raport: { perioada: 'Ianuarie 2024', incasari: 15000, cheltuieli: 8000, profit: 7000 }
          }),
          ...(webhook.dataType === 'facturi' && {
            facturi: [
              { numar: 'F001', suma: 500, data: '2024-01-15', status: 'platita' }
            ]
          })
        }
      };

      console.log('Triggering Zapier webhook:', webhook.url);
      
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      // Update webhook with last triggered time
      setWebhooks(prev => 
        prev.map(w => 
          w.id === webhook.id 
            ? { ...w, lastTriggered: new Date().toISOString() }
            : w
        )
      );

      toast({
        title: "Webhook Trimis",
        description: `Datele ${webhook.dataType} au fost trimise către Zapier. Verificați istoricul Zap-ului pentru confirmare.`,
      });

    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: "Eroare",
        description: "A apărut o eroare la trimiterea către Zapier",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestWithCustomData = async (webhook: ZapierWebhook) => {
    if (!testData.trim()) {
      toast({
        title: "Eroare",
        description: "Vă rog introduceți date de test",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsedData = JSON.parse(testData);
      await handleTriggerWebhook(webhook, parsedData);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Datele de test nu sunt în format JSON valid",
        variant: "destructive",
      });
    }
  };

  const getDataTypeIcon = (type: string) => {
    switch (type) {
      case 'programari': return <Clock className="w-4 h-4" />;
      case 'pacienti': return <Users className="w-4 h-4" />;
      case 'rapoarte': return <Database className="w-4 h-4" />;
      case 'facturi': return <DollarSign className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const removeWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(w => w.id !== id));
    toast({
      title: "Webhook Șters",
      description: "Webhook-ul a fost eliminat din listă",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Integrare Zapier
          </CardTitle>
          <CardDescription>
            Configurați webhook-uri Zapier pentru automatizarea datelor din iStoma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="setup">Configurare</TabsTrigger>
              <TabsTrigger value="webhooks">Webhook-uri Active ({webhooks.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Cum să configurez?</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal ml-4">
                  <li>Creați un Zap nou în Zapier</li>
                  <li>Alegeți "Webhooks by Zapier" ca trigger</li>
                  <li>Selectați "Catch Hook" ca eveniment</li>
                  <li>Copiați URL-ul webhook generat</li>
                  <li>Adăugați-l mai jos și testați conexiunea</li>
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookName">Nume Webhook</Label>
                  <Input
                    id="webhookName"
                    value={newWebhook.name}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Programări iStoma"
                    className="medical-focus"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataType">Tip Date</Label>
                  <select
                    id="dataType"
                    value={newWebhook.dataType}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, dataType: e.target.value as any }))}
                    className="w-full p-2 border border-input rounded-md bg-background medical-focus"
                  >
                    <option value="programari">Programări</option>
                    <option value="pacienti">Pacienți</option>
                    <option value="rapoarte">Rapoarte</option>
                    <option value="facturi">Facturi</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">URL Webhook Zapier</Label>
                <Input
                  id="webhookUrl"
                  type="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  className="medical-focus"
                />
              </div>

              <Button
                onClick={handleAddWebhook}
                className="w-full medical-button"
              >
                <Zap className="w-4 h-4 mr-2" />
                Adaugă Webhook
              </Button>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4">
              {webhooks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nu aveți webhook-uri configurate încă</p>
                  <p className="text-sm">Adăugați primul webhook în tab-ul "Configurare"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <Card key={webhook.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getDataTypeIcon(webhook.dataType)}
                            <div>
                              <h4 className="font-medium">{webhook.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Tip: {webhook.dataType.charAt(0).toUpperCase() + webhook.dataType.slice(1)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={webhook.isActive ? "default" : "secondary"}>
                              {webhook.isActive ? "Activ" : "Inactiv"}
                            </Badge>
                            {webhook.lastTriggered && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {new Date(webhook.lastTriggered).toLocaleString('ro-RO')}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground mb-3 break-all">
                          {webhook.url}
                        </p>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleTriggerWebhook(webhook)}
                            disabled={isLoading}
                            className="flex-1"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Test cu Date Sample
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeWebhook(webhook.id)}
                          >
                            Șterge
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {webhooks.length > 0 && (
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Test cu Date Personalizate
            </CardTitle>
            <CardDescription>
              Testați webhook-urile cu date personalizate în format JSON
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testData">Date Test (JSON)</Label>
              <Textarea
                id="testData"
                value={testData}
                onChange={(e) => setTestData(e.target.value)}
                placeholder={`{
  "programari": [
    {
      "pacient": "Ion Popescu",
      "data": "2024-01-15",
      "ora": "10:00",
      "tip": "Consultatie"
    }
  ]
}`}
                rows={8}
                className="font-mono text-sm medical-focus"
              />
            </div>
            <div className="flex gap-2">
              {webhooks.map((webhook) => (
                <Button
                  key={webhook.id}
                  size="sm"
                  variant="outline"
                  onClick={() => handleTestWithCustomData(webhook)}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  {getDataTypeIcon(webhook.dataType)}
                  {webhook.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};