import React, { useState } from 'react';
import { Users, Target, TrendingUp, MousePointer, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const PatientAcquisition = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const leadSources = [
    { source: 'Google Ads', leads: 124, conversions: 28, cost: 1250, roi: 340 },
    { source: 'Facebook Ads', leads: 89, conversions: 19, cost: 890, roi: 285 },
    { source: 'SEO Organic', leads: 76, conversions: 23, cost: 0, roi: 'infinit' },
    { source: 'Recomandări', leads: 45, conversions: 31, cost: 0, roi: 'infinit' },
    { source: 'Instagram', leads: 67, conversions: 12, cost: 450, roi: 180 }
  ];

  const activeCampaigns = [
    {
      name: 'Implantologie Premium',
      status: 'active',
      budget: 2500,
      spent: 1850,
      leads: 45,
      conversions: 12,
      cpl: 41.1,
      target: 'Adulți 35-55 ani'
    },
    {
      name: 'Ortodonție Invizibil',
      status: 'active',
      budget: 1800,
      spent: 1200,
      leads: 38,
      conversions: 8,
      cpl: 31.6,
      target: 'Adulți 25-40 ani'
    },
    {
      name: 'Albire Dentară',
      status: 'paused',
      budget: 800,
      spent: 650,
      leads: 28,
      conversions: 15,
      cpl: 23.2,
      target: 'Adulți 20-35 ani'
    }
  ];

  const leadPipeline = [
    { stage: 'Leads Noi', count: 47, value: 18800, conversion: 100 },
    { stage: 'Contactați', count: 35, value: 14000, conversion: 74 },
    { stage: 'Consultație Programată', count: 28, value: 11200, conversion: 60 },
    { stage: 'Consultație Realizată', count: 22, value: 8800, conversion: 47 },
    { stage: 'Tratament Acceptat', count: 16, value: 6400, conversion: 34 }
  ];

  const topPerformers = [
    { metric: 'Cea mai bună sursă', value: 'Google Ads', performance: '28 conversii' },
    { metric: 'Cel mai bun ROI', value: 'SEO Organic', performance: 'Infinit' },
    { metric: 'Cost per Lead', value: 'Instagram', performance: '€6.7' },
    { metric: 'Rata conversie', value: 'Recomandări', performance: '68.9%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getROIColor = (roi: number | string) => {
    if (roi === 'infinit') return 'text-green-600';
    if (typeof roi === 'number') {
      if (roi >= 300) return 'text-green-600';
      if (roi >= 200) return 'text-blue-600';
      if (roi >= 100) return 'text-yellow-600';
    }
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Achiziție Pacienți</h1>
              <p className="text-muted-foreground">Lead generation și conversie online</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Leads Total</p>
                  <p className="text-2xl font-bold">401</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">+18% vs luna trecută</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversii</p>
                  <p className="text-2xl font-bold">113</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">+22% vs luna trecută</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cost/Lead</p>
                  <p className="text-2xl font-bold">€8.7</p>
                </div>
                <MousePointer className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-xs text-red-600 mt-1">+5% vs luna trecută</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ROI Mediu</p>
                  <p className="text-2xl font-bold">285%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-xs text-green-600 mt-1">+12% vs luna trecută</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sources">Surse Lead</TabsTrigger>
            <TabsTrigger value="campaigns">Campanii</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="analytics">Analiză</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performanța Surselor de Lead</CardTitle>
                <CardDescription>Analiză detaliată a fiecărei surse de achiziție</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadSources.map((source, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{source.source}</h3>
                        <Badge className={getROIColor(source.roi)}>
                          ROI: {source.roi === 'infinit' ? '∞' : `${source.roi}%`}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Leads</p>
                          <p className="text-lg font-bold">{source.leads}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversii</p>
                          <p className="text-lg font-bold text-green-600">{source.conversions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cost</p>
                          <p className="text-lg font-bold">€{source.cost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cost/Lead</p>
                          <p className="text-lg font-bold">
                            {source.cost === 0 ? '€0' : `€${(source.cost / source.leads).toFixed(1)}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Rata Conversie</p>
                          <p className="text-lg font-bold">{((source.conversions / source.leads) * 100).toFixed(1)}%</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Performanță conversie</span>
                          <span>{((source.conversions / source.leads) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(source.conversions / source.leads) * 100} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campanii Active</CardTitle>
                <CardDescription>Monitorizare și optimizare campanii de marketing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCampaigns.map((campaign, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">Target: {campaign.target}</p>
                        </div>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status === 'active' ? 'Activă' : 'Pauzată'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="text-lg font-bold">€{campaign.budget}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cheltuit</p>
                          <p className="text-lg font-bold">€{campaign.spent}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Leads</p>
                          <p className="text-lg font-bold">{campaign.leads}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cost/Lead</p>
                          <p className="text-lg font-bold">€{campaign.cpl}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Utilizare budget</span>
                          <span>{((campaign.spent / campaign.budget) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(campaign.spent / campaign.budget) * 100} />
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Target className="w-4 h-4 mr-2" />
                          Optimizează
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          {campaign.status === 'active' ? 'Pauzează' : 'Activează'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Conversie</CardTitle>
                <CardDescription>Urmărirea procesului de conversie de la lead la pacient</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadPipeline.map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium">{stage.stage}</h3>
                            <p className="text-sm text-muted-foreground">
                              Valoare potențială: €{stage.value.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{stage.count}</div>
                          <div className="text-sm text-muted-foreground">{stage.conversion}%</div>
                        </div>
                      </div>
                      
                      {index < leadPipeline.length - 1 && (
                        <div className="absolute left-6 top-full w-0.5 h-4 bg-border"></div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Rata de Conversie Globală</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={34} className="flex-1" />
                    <span className="text-sm font-medium">34%</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    16 din 47 leads au devenit pacienți plătitori
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performeri</CardTitle>
                  <CardDescription>Cele mai eficiente canale și metrici</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div>
                          <p className="font-medium text-green-800">{performer.metric}</p>
                          <p className="text-lg font-bold">{performer.value}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-600">{performer.performance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Acțiuni Recomandate</CardTitle>
                  <CardDescription>Optimizări pentru îmbunătățirea ROI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">Optimizează Google Ads</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Crește bugetul cu 30% pentru cele mai performante keyword-uri
                      </p>
                      <Button size="sm" className="w-full">
                        <Target className="w-4 h-4 mr-2" />
                        Implementează
                      </Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">Îmbunătățește Follow-up</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Automatizează urmărirea lead-urilor necontactate
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Phone className="w-4 h-4 mr-2" />
                        Configurează
                      </Button>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-2">Email Marketing</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Lansează campanie de nurturing pentru lead-uri reci
                      </p>
                      <Button size="sm" variant="outline" className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Creează Campanie
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientAcquisition;