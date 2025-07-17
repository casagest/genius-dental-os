import React, { useState } from 'react';
import { Database, Package, TrendingDown, AlertTriangle, BarChart3, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const MaterialTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const materials = [
    { name: 'Rășină Composită A2', category: 'Materiale Obturație', stock: 85, minLevel: 20, cost: 45, usage: 15, status: 'normal' },
    { name: 'Implant Titanium 4.2mm', category: 'Implantologie', stock: 12, minLevel: 15, cost: 120, usage: 8, status: 'low' },
    { name: 'Ceramică E.max Press', category: 'Protetică', stock: 95, minLevel: 25, cost: 85, usage: 20, status: 'normal' },
    { name: 'Adeziv Universal', category: 'Materiale Obturație', stock: 8, minLevel: 10, cost: 35, usage: 12, status: 'critical' },
    { name: 'Zirconiu CAD/CAM', category: 'Protetică', stock: 45, minLevel: 20, cost: 95, usage: 18, status: 'normal' },
    { name: 'Lac Fluorurat', category: 'Profilaxie', stock: 15, minLevel: 12, cost: 25, usage: 6, status: 'low' }
  ];

  const recentConsumption = [
    { material: 'Rășină Composită A2', quantity: 3, cost: 135, date: '15/01/2024', project: 'Obturație molari' },
    { material: 'Implant Titanium 4.2mm', quantity: 2, cost: 240, date: '15/01/2024', project: 'Implant premolar' },
    { material: 'Ceramică E.max Press', quantity: 1, cost: 85, date: '14/01/2024', project: 'Coroană incisiv' },
    { material: 'Adeziv Universal', quantity: 2, cost: 70, date: '14/01/2024', project: 'Restaurări multiple' }
  ];

  const monthlyConsumption = [
    { month: 'Oct', cost: 2450, volume: 48 },
    { month: 'Nov', cost: 2780, volume: 52 },
    { month: 'Dec', cost: 3120, volume: 58 },
    { month: 'Ian', cost: 2890, volume: 54 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <Package className="w-4 h-4" />;
      case 'low': return <TrendingDown className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStockValue = materials.reduce((sum, material) => sum + (material.stock * material.cost), 0);
  const lowStockItems = materials.filter(m => m.status === 'low' || m.status === 'critical').length;
  const avgConsumption = materials.reduce((sum, material) => sum + material.usage, 0) / materials.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Urmărire Materiale</h1>
              <p className="text-muted-foreground">Stoc materie primă și consum</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valoare Stoc</p>
                  <p className="text-2xl font-bold">€{totalStockValue.toLocaleString()}</p>
                </div>
                <Database className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alerte Stoc</p>
                  <p className="text-2xl font-bold">{lowStockItems}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Consum Mediu</p>
                  <p className="text-2xl font-bold">{avgConsumption.toFixed(1)}%</p>
                </div>
                <TrendingDown className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Materiale</p>
                  <p className="text-2xl font-bold">{materials.length}</p>
                </div>
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inventory">Inventar</TabsTrigger>
            <TabsTrigger value="consumption">Consum</TabsTrigger>
            <TabsTrigger value="analytics">Analiză</TabsTrigger>
            <TabsTrigger value="orders">Comenzi</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Stoc Materiale</CardTitle>
                <CardDescription>Monitorizare stoc și nivele minime</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Caută materiale..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button>
                    <Package className="w-4 h-4 mr-2" />
                    Adaugă Material
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredMaterials.map((material, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(material.status)}
                          <div>
                            <h3 className="font-medium">{material.name}</h3>
                            <p className="text-sm text-muted-foreground">{material.category}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(material.status)}>
                          {material.status === 'normal' ? 'Normal' : 
                           material.status === 'low' ? 'Stoc redus' : 'Critic'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Stoc curent</p>
                          <p className="font-medium">{material.stock} unități</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Nivel minim</p>
                          <p className="font-medium">{material.minLevel} unități</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Cost/unitate</p>
                          <p className="font-medium">€{material.cost}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Consum/lună</p>
                          <p className="font-medium">{material.usage}%</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Nivel stoc</span>
                          <span>{((material.stock - material.minLevel) / material.minLevel * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={Math.min(100, (material.stock / (material.minLevel * 2)) * 100)} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consumption" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Consum Recent</CardTitle>
                <CardDescription>Utilizarea materialelor în ultimele zile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentConsumption.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{item.material}</h3>
                          <p className="text-sm text-muted-foreground">{item.project} • {item.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">€{item.cost}</div>
                        <div className="text-sm text-muted-foreground">{item.quantity} unități</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consum Lunar</CardTitle>
                  <CardDescription>Evoluția costurilor și volumului</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyConsumption.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{data.month}</p>
                          <p className="text-sm text-muted-foreground">{data.volume} unități</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€{data.cost}</p>
                          <p className="text-sm text-muted-foreground">
                            {index > 0 ? (
                              <span className={data.cost > monthlyConsumption[index - 1].cost ? 'text-red-600' : 'text-green-600'}>
                                {((data.cost - monthlyConsumption[index - 1].cost) / monthlyConsumption[index - 1].cost * 100).toFixed(1)}%
                              </span>
                            ) : '-'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Materiale Consumate</CardTitle>
                  <CardDescription>Cele mai utilizate materiale</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {materials
                      .sort((a, b) => b.usage - a.usage)
                      .slice(0, 5)
                      .map((material, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-muted-foreground">{material.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{material.usage}%</p>
                            <Progress value={material.usage} className="w-20 h-2" />
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Comenzi Recomandate
                </CardTitle>
                <CardDescription>Materiale care trebuie reaprovizionate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {materials
                    .filter(m => m.status === 'low' || m.status === 'critical')
                    .map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <div>
                            <h3 className="font-medium">{material.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Stoc curent: {material.stock} • Minim: {material.minLevel}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-medium">Comandă: {material.minLevel * 2} unități</div>
                            <div className="text-sm text-muted-foreground">
                              Cost: €{(material.minLevel * 2 * material.cost).toFixed(0)}
                            </div>
                          </div>
                          <Button size="sm">
                            <Package className="w-4 h-4 mr-2" />
                            Comandă
                          </Button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MaterialTracking;