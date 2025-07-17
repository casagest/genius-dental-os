import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, AlertTriangle, BarChart3, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SterilizationAI = () => {
  const [currentCycle, setCurrentCycle] = useState({
    id: 'STR-2024-001',
    status: 'in-progress',
    temperature: 134,
    pressure: 2.1,
    timeRemaining: 25,
    totalTime: 45
  });

  const recentCycles = [
    { id: 'STR-2024-001', status: 'completed', temperature: 134, duration: 45, items: 24, success: true },
    { id: 'STR-2024-002', status: 'completed', temperature: 134, duration: 45, items: 18, success: true },
    { id: 'STR-2024-003', status: 'completed', temperature: 134, duration: 45, items: 32, success: true },
    { id: 'STR-2024-004', status: 'completed', temperature: 134, duration: 45, items: 15, success: true }
  ];

  const instruments = [
    { name: 'Set Implantologie', status: 'sterilized', lastCycle: '2 ore', nextService: '5 zile' },
    { name: 'Instrumente Chirurgie', status: 'in-progress', lastCycle: 'În curs', nextService: '3 zile' },
    { name: 'Kit Endodonție', status: 'pending', lastCycle: '4 ore', nextService: '1 zi' },
    { name: 'Instrumente Profilaxie', status: 'sterilized', lastCycle: '1 oră', nextService: '7 zile' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sterilized': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sterilized': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Sterilizare AI</h1>
              <p className="text-muted-foreground">Urmărire și validare procese sterilizare</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="monitor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="monitor">Monitor Live</TabsTrigger>
            <TabsTrigger value="instruments">Instrumente</TabsTrigger>
            <TabsTrigger value="history">Istoric</TabsTrigger>
            <TabsTrigger value="settings">Setări</TabsTrigger>
          </TabsList>

          <TabsContent value="monitor" className="space-y-6">
            {/* Current Cycle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Ciclu Curent de Sterilizare
                </CardTitle>
                <CardDescription>Monitorizare în timp real</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progres</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round(((currentCycle.totalTime - currentCycle.timeRemaining) / currentCycle.totalTime) * 100)}%
                        </span>
                      </div>
                      <Progress value={((currentCycle.totalTime - currentCycle.timeRemaining) / currentCycle.totalTime) * 100} />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{currentCycle.timeRemaining} min</div>
                      <div className="text-sm text-muted-foreground">timp rămas</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{currentCycle.temperature}°C</div>
                      <div className="text-sm text-muted-foreground">temperatură</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{currentCycle.pressure} bar</div>
                      <div className="text-sm text-muted-foreground">presiune</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Badge className="w-full justify-center py-2 bg-blue-100 text-blue-800 border-blue-200">
                      <Clock className="w-4 h-4 mr-2" />
                      În progres
                    </Badge>
                    <Button className="w-full" variant="outline">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Vezi Grafice
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Cicluri Astăzi</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rata Succes</p>
                      <p className="text-2xl font-bold">100%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Timp Mediu</p>
                      <p className="text-2xl font-bold">45min</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Alerte</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="instruments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status Instrumente</CardTitle>
                <CardDescription>Urmărire stare sterilizare pentru toate instrumentele</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instruments.map((instrument, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(instrument.status)}
                        <div>
                          <h3 className="font-medium">{instrument.name}</h3>
                          <p className="text-sm text-muted-foreground">Ultimul ciclu: {instrument.lastCycle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(instrument.status)}>
                          {instrument.status === 'sterilized' ? 'Sterilizat' : 
                           instrument.status === 'in-progress' ? 'În progres' : 'În așteptare'}
                        </Badge>
                        <Button variant="outline" size="sm">Detalii</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Istoric Cicluri</CardTitle>
                <CardDescription>Ultimele cicluri de sterilizare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCycles.map((cycle, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">{cycle.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {cycle.temperature}°C • {cycle.duration} min • {cycle.items} instrumente
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Complet
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configurări Sterilizare
                </CardTitle>
                <CardDescription>Parametri și setări pentru procesele de sterilizare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3">Parametri Temperatură</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Temperatură țintă</span>
                          <span className="text-sm font-medium">134°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Toleranță</span>
                          <span className="text-sm font-medium">±2°C</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3">Parametri Presiune</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Presiune țintă</span>
                          <span className="text-sm font-medium">2.1 bar</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Toleranță</span>
                          <span className="text-sm font-medium">±0.1 bar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Salvează Configurări
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SterilizationAI;