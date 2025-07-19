import React, { useState } from 'react';
import { DollarSign, CreditCard, Receipt, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const PaymentManagement = () => {
  const [todayStats] = useState({
    totalIncome: 2450,
    cashPayments: 650,
    cardPayments: 1200,
    transfers: 600,
    pendingPayments: 3,
    completedPayments: 25
  });

  const recentPayments = [
    { id: 'PAY-001', patient: 'Maria Popescu', amount: 350, method: 'Card', status: 'completed', time: '14:30' },
    { id: 'PAY-002', patient: 'Ion Marinescu', amount: 120, method: 'Cash', status: 'completed', time: '13:45' },
    { id: 'PAY-003', patient: 'Ana Georgescu', amount: 480, method: 'Transfer', status: 'pending', time: '13:15' },
    { id: 'PAY-004', patient: 'Mihai Ionescu', amount: 200, method: 'Card', status: 'completed', time: '12:30' }
  ];

  const pendingInvoices = [
    { id: 'INV-001', patient: 'Elena Vasilescu', amount: 750, dueDate: '2024-01-20', days: 2 },
    { id: 'INV-002', patient: 'Radu Popa', amount: 320, dueDate: '2024-01-22', days: 4 },
    { id: 'INV-003', patient: 'Carmen Dumitrescu', amount: 580, dueDate: '2024-01-25', days: 7 }
  ];

  const monthlyData = [
    { month: 'Ian', income: 45200, target: 50000 },
    { month: 'Feb', income: 48300, target: 50000 },
    { month: 'Mar', income: 52100, target: 50000 },
    { month: 'Apr', income: 47800, target: 50000 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Card': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cash': return 'bg-green-100 text-green-800 border-green-200';
      case 'Transfer': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestionare Plăți</h1>
              <p className="text-muted-foreground">Facturare și urmărire încasări</p>
            </div>
          </div>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Astăzi</p>
                  <p className="text-2xl font-bold">€{todayStats.totalIncome}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Plăți Card</p>
                  <p className="text-2xl font-bold">€{todayStats.cardPayments}</p>
                </div>
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cash</p>
                  <p className="text-2xl font-bold">€{todayStats.cashPayments}</p>
                </div>
                <Receipt className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">În așteptare</p>
                  <p className="text-2xl font-bold">{todayStats.pendingPayments}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payments">Plăți Recente</TabsTrigger>
            <TabsTrigger value="invoices">Facturi</TabsTrigger>
            <TabsTrigger value="analytics">Analiză</TabsTrigger>
            <TabsTrigger value="reports">Rapoarte</TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plăți Recente</CardTitle>
                <CardDescription>Ultimele tranzacții din această zi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{payment.patient}</h3>
                          <p className="text-sm text-muted-foreground">{payment.id} • {payment.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-lg font-bold">€{payment.amount}</div>
                          <Badge className={getMethodColor(payment.method)}>
                            {payment.method}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status === 'completed' ? 'Complet' : 'În așteptare'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Facturi în Așteptare</CardTitle>
                <CardDescription>Facturi neachitate și termene de plată</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingInvoices.map((invoice, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Receipt className="w-5 h-5 text-orange-600" />
                        <div>
                          <h3 className="font-medium">{invoice.patient}</h3>
                          <p className="text-sm text-muted-foreground">{invoice.id} • Scadență: {invoice.dueDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-lg font-bold">€{invoice.amount}</div>
                          <div className="text-sm text-muted-foreground">{invoice.days} zile</div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => console.log(`Send invoice ${invoice.id}`)}
                          className="hover:scale-105 transition-transform"
                        >
                          <Receipt className="w-4 h-4 mr-2" />
                          Trimite
                        </Button>
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
                  <CardTitle>Progres Lunar</CardTitle>
                  <CardDescription>Progres către obiectivul lunar de €50,000</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{data.month}</span>
                          <span className="text-sm text-muted-foreground">
                            €{data.income.toLocaleString()} / €{data.target.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(data.income / data.target) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribuție Metode Plată</CardTitle>
                  <CardDescription>Astăzi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Card</span>
                      </div>
                      <span className="text-sm font-medium">€{todayStats.cardPayments} (49%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Cash</span>
                      </div>
                      <span className="text-sm font-medium">€{todayStats.cashPayments} (27%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Transfer</span>
                      </div>
                      <span className="text-sm font-medium">€{todayStats.transfers} (24%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Generare Rapoarte
                </CardTitle>
                <CardDescription>Rapoarte financiare detaliate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    className="h-20 flex flex-col items-center justify-center hover:scale-105 transition-transform"
                    onClick={() => console.log('Generate daily report')}
                  >
                    <Receipt className="w-6 h-6 mb-2" />
                    Raport Zilnic
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center hover:scale-105 transition-transform"
                    onClick={() => console.log('Generate monthly report')}
                  >
                    <TrendingUp className="w-6 h-6 mb-2" />
                    Raport Lunar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center hover:scale-105 transition-transform"
                    onClick={() => console.log('Generate annual report')}
                  >
                    <CheckCircle className="w-6 h-6 mb-2" />
                    Raport Anual
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center hover:scale-105 transition-transform"
                    onClick={() => console.log('Generate overdue invoices report')}
                  >
                    <AlertCircle className="w-6 h-6 mb-2" />
                    Facturi Restante
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

export default PaymentManagement;