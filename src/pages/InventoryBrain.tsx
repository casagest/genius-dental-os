import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  QrCode, Package, AlertTriangle, TrendingDown, TrendingUp, 
  Mic, Camera, Search, RefreshCw, Plus, Minus, ShoppingCart,
  BarChart3, Volume2, CheckCircle, Clock, Truck, Settings
} from 'lucide-react';

// Simulare date inventar
const inventoryData = [
  {
    id: "IMPL-001",
    name: "Implant Nobel Replace 4.3x10mm",
    category: "Implanturi",
    stock: 7,
    minStock: 15,
    maxStock: 50,
    price: 850,
    supplier: "Nobel Biocare",
    location: "Dulap A3-Raft 2",
    lastOrdered: "2024-01-10",
    status: "low_stock",
    qrCode: "QR123456789"
  },
  {
    id: "ANAT-002", 
    name: "Analog Multi-Unit Straight",
    category: "Analoage",
    stock: 25,
    minStock: 10,
    maxStock: 40,
    price: 125,
    supplier: "Straumann",
    location: "Dulap B1-Raft 1", 
    lastOrdered: "2024-01-05",
    status: "optimal",
    qrCode: "QR987654321"
  },
  {
    id: "COMP-003",
    name: "Compozit Universal Tetric N-Ceram",
    category: "Materiale Restaurative",
    stock: 3,
    minStock: 8,
    maxStock: 20,
    price: 65,
    supplier: "Ivoclar Vivadent",
    location: "Dulap C2-Sertar 3",
    lastOrdered: "2024-01-12",
    status: "critical",
    qrCode: "QR456789123"
  },
  {
    id: "ANES-004",
    name: "Articain 4% cu Adrenalin",
    category: "Anestezice",
    stock: 45,
    minStock: 20,
    maxStock: 60,
    price: 12,
    supplier: "Septodont",
    location: "Frigider Medical A1",
    lastOrdered: "2024-01-08",
    status: "optimal",  
    qrCode: "QR789123456"
  }
];

const InventoryBrain = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [voiceCommand, setVoiceCommand] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Simulare QR Scanner
  const startQRScan = () => {
    setIsScanning(true);
    
    // Simulare scan QR după 3 secunde
    setTimeout(() => {
      const randomItem = inventoryData[Math.floor(Math.random() * inventoryData.length)];
      setScannedCode(randomItem.qrCode);
      setSelectedItem(randomItem.id);
      setIsScanning(false);
      
      toast({
        title: "QR Code Scanat",
        description: `Produs găsit: ${randomItem.name}`,
      });
    }, 3000);
  };

  // Simulare comenzi vocale
  const startVoiceCommand = () => {
    setIsListening(true);
    
    setTimeout(() => {
      const commands = [
        "Scanează QR implant Nobel", 
        "Comandă urgent compozit Tetric",
        "Verifică stoc anestezic articain",
        "Afișează produse cu stoc scăzut"
      ];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];
      setVoiceCommand(randomCommand);
      setIsListening(false);
      
      toast({
        title: "Comandă Vocală Recunoscută",
        description: `"${randomCommand}"`,
      });
    }, 2500);
  };

  // Auto-reorder logic
  const autoReorder = (itemId: string) => {
    const item = inventoryData.find(i => i.id === itemId);
    if (item) {
      toast({
        title: "Auto-Reorder Activat",
        description: `Comandă automată pentru ${item.name} - Cantitate: ${item.maxStock - item.stock}`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'low_stock': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'optimal': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const filteredInventory = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent">
              InventoryBrain - QR Scan & Voice Control
            </h1>
            <p className="text-slate-600 mt-2">
              Auto-reorder + QR Scan + AI Analytics
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={startQRScan}
              disabled={isScanning}
              className={`space-x-2 ${isScanning ? 'bg-blue-600' : 'bg-purple-600 hover:bg-purple-700'}`}
            >
              {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
              <span>{isScanning ? 'Scanez...' : 'Scan QR'}</span>
            </Button>
            
            <Button
              onClick={startVoiceCommand}
              disabled={isListening}
              className={`space-x-2 ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isListening ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
              <span>{isListening ? 'Ascult...' : 'Voice Control'}</span>
            </Button>
          </div>
        </div>

        {/* Scan Results & Voice Commands */}
        {(scannedCode || voiceCommand) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {scannedCode && (
              <Alert className="border-purple-200 bg-purple-50">
                <QrCode className="h-4 w-4" />
                <AlertDescription>
                  <strong>QR Scanat:</strong> {scannedCode}
                </AlertDescription>
              </Alert>
            )}
            
            {voiceCommand && (
              <Alert className="border-green-200 bg-green-50">
                <Mic className="h-4 w-4" />
                <AlertDescription>
                  <strong>Comandă Vocală:</strong> "{voiceCommand}"
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-fit grid-cols-4 bg-white border-2">
            <TabsTrigger value="inventory">Inventar Live</TabsTrigger>
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="auto-order">Auto-Order</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Package className="w-8 h-8 text-blue-600" />
                    <Badge className="text-xs bg-blue-100 text-blue-700">Total</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">{inventoryData.length}</h3>
                  <p className="text-sm text-slate-600">Produse Gestionate</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <Badge className="text-xs bg-red-100 text-red-700">Alert</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {inventoryData.filter(item => item.status === 'critical').length}
                  </h3>
                  <p className="text-sm text-slate-600">Stoc Critic</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingDown className="w-8 h-8 text-orange-600" />
                    <Badge className="text-xs bg-orange-100 text-orange-700">Low</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {inventoryData.filter(item => item.status === 'low_stock').length}
                  </h3>
                  <p className="text-sm text-slate-600">Stoc Scăzut</p>
                </CardContent>
              </Card>
              
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <Badge className="text-xs bg-green-100 text-green-700">OK</Badge>
                  </div>
                  <h3 className="text-2xl font-bold">
                    {inventoryData.filter(item => item.status === 'optimal').length}
                  </h3>
                  <p className="text-sm text-slate-600">Stoc Optimal</p>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card className="border-2">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Search className="w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Caută produs sau categorie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => setSearchTerm('')} variant="outline">
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inventory List */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  <span>Inventar în Timp Real</span>
                </CardTitle>
                <CardDescription>Gestionare completă stocuri cu QR scan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredInventory.map((item) => (
                    <div 
                      key={item.id}
                      className={`p-4 border-2 rounded-lg hover:shadow-lg transition-all cursor-pointer ${
                        selectedItem === item.id ? 'border-blue-300 bg-blue-50' : 'border-slate-200'
                      }`}
                      onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                            {item.id}
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-slate-600">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace('_', ' ')}
                          </Badge>
                          <div className="text-right">
                            <div className="font-bold text-lg">{item.stock}</div>
                            <div className="text-xs text-slate-500">din {item.maxStock}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-slate-500">Preț:</span>
                          <div className="font-medium">{item.price} RON</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Furnizor:</span>
                          <div className="font-medium">{item.supplier}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Locație:</span>
                          <div className="font-medium">{item.location}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Ultima comandă:</span>
                          <div className="font-medium">{item.lastOrdered}</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-slate-600">Nivel stoc</span>
                          <span className="text-sm font-semibold">
                            {getStockPercentage(item.stock, item.maxStock)}%
                          </span>
                        </div>
                        <Progress 
                          value={getStockPercentage(item.stock, item.maxStock)} 
                          className={`h-2 ${
                            item.status === 'critical' ? '[&>.bg-primary]:bg-red-500' :
                            item.status === 'low_stock' ? '[&>.bg-primary]:bg-orange-500' :
                            '[&>.bg-primary]:bg-green-500'
                          }`}
                        />
                      </div>

                      {selectedItem === item.id && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => autoReorder(item.id)}>
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Auto-Order
                            </Button>
                            <Button size="sm" variant="outline">
                              <QrCode className="w-4 h-4 mr-1" />
                              View QR
                            </Button>
                            <Button size="sm" variant="outline">
                              <Plus className="w-4 h-4 mr-1" />
                              Add Stock
                            </Button>
                            <Button size="sm" variant="outline">
                              <Minus className="w-4 h-4 mr-1" />
                              Remove Stock
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scanner">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-5 h-5 text-purple-600" />
                    <span>QR Scanner Live</span>
                  </CardTitle>
                  <CardDescription>Scanează QR pentru identificare rapidă</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                    {isScanning ? (
                      <div className="text-center">
                        <RefreshCw className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-2" />
                        <p className="text-slate-600">Scanez QR code...</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <QrCode className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600">Click pentru a începe scanarea</p>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={startQRScan} 
                    disabled={isScanning}
                    className="w-full"
                  >
                    {isScanning ? 'Scanez...' : 'Start QR Scan'}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Istoric Scanări</CardTitle>
                  <CardDescription>Ultimele produse scanate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inventoryData.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-slate-600">{item.qrCode}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(item.status)} variant="secondary">
                            Stock: {item.stock}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <span>Performanță Stocuri</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventoryData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <Progress 
                            value={getStockPercentage(item.stock, item.maxStock)} 
                            className="h-2 mt-1"
                          />
                        </div>
                        <div className="ml-4 text-right">
                          <div className="font-bold">{getStockPercentage(item.stock, item.maxStock)}%</div>
                          <div className="text-xs text-slate-500">{item.stock}/{item.maxStock}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Categorii Inventar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: 'Implanturi', count: 15, value: 45000 },
                      { name: 'Materiale Restaurative', count: 28, value: 8500 },
                      { name: 'Anestezice', count: 12, value: 2400 },
                      { name: 'Consumabile', count: 45, value: 3200 }
                    ].map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-slate-600">{category.count} produse</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{category.value.toLocaleString()} RON</div>
                          <div className="text-xs text-slate-500">Valoare totală</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="auto-order">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Sistem Auto-Order</span>
                </CardTitle>
                <CardDescription>Configurare comenzi automate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Auto-Order Rules */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Reguli Automate</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="font-medium">Stoc Critic</div>
                        <div className="text-sm text-slate-600">Comandă automată la &lt; 20% stoc</div>
                        <Badge className="bg-green-100 text-green-700 text-xs mt-1">Active</Badge>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="font-medium">Predicție Consum</div>
                        <div className="text-sm text-slate-600">AI predicție bazată pe istoric</div>
                        <Badge className="bg-blue-100 text-blue-700 text-xs mt-1">Learning</Badge>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="font-medium">Perioade Speciale</div>
                        <div className="text-sm text-slate-600">Stoc suplimentar în perioade aglomerate</div>
                        <Badge className="bg-orange-100 text-orange-700 text-xs mt-1">Seasonal</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Pending Orders */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Comenzi Pendinte</h3>
                    <div className="space-y-3">
                      {[
                        { product: 'Implant Nobel Replace', qty: 20, status: 'processing', eta: '2 zile' },
                        { product: 'Compozit Tetric', qty: 15, status: 'ordered', eta: '1 săptămână' },
                        { product: 'Anestezic Articain', qty: 30, status: 'shipping', eta: '3 zile' }
                      ].map((order, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg">
                          <div className="font-medium">{order.product}</div>
                          <div className="text-sm text-slate-600">Cantitate: {order.qty}</div>
                          <div className="flex justify-between items-center mt-2">
                            <Badge className={
                              order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'ordered' ? 'bg-orange-100 text-orange-700' :
                              'bg-green-100 text-green-700'
                            }>
                              {order.status}
                            </Badge>
                            <span className="text-xs text-slate-500">ETA: {order.eta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Voice Commands */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Comenzi Vocale</h3>
                    <div className="space-y-2">
                      {[
                        '"Comandă urgent implant Nobel"',
                        '"Verifică stoc compozit"',
                        '"Afișează comenzi pendinte"',
                        '"Activează auto-order"',
                        '"Status inventar critic"'
                      ].map((command, index) => (
                        <div key={index} className="p-2 bg-slate-100 rounded font-mono text-sm">
                          {command}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" onClick={startVoiceCommand}>
                      <Mic className="w-4 h-4 mr-2" />
                      Test Voice Command
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InventoryBrain;