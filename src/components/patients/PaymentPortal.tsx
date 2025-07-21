import React, { useState, useEffect } from 'react';
import { CreditCard, DollarSign, Clock, CheckCircle, AlertTriangle, Download, Calendar, Receipt } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  dueDate: string;
  paidAmount?: number;
  treatmentCode?: string;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'insurance';
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
  provider: string;
}

interface TreatmentCost {
  id: string;
  treatment: string;
  estimatedCost: number;
  insuranceCoverage: number;
  patientResponsibility: number;
  status: 'estimate' | 'approved' | 'completed';
}

export function PaymentPortal() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 'INV-001',
      date: '2024-01-15',
      description: 'Dental Cleaning & Examination',
      amount: 250.00,
      status: 'paid',
      dueDate: '2024-02-15',
      paidAmount: 250.00,
      treatmentCode: 'D1110'
    },
    {
      id: 'INV-002',
      date: '2024-01-20',
      description: 'Dental Implant Consultation',
      amount: 150.00,
      status: 'pending',
      dueDate: '2024-02-20',
      treatmentCode: 'D6010'
    },
    {
      id: 'INV-003',
      date: '2024-01-10',
      description: 'Crown Preparation',
      amount: 1200.00,
      status: 'partial',
      dueDate: '2024-02-10',
      paidAmount: 600.00,
      treatmentCode: 'D2740'
    },
    {
      id: 'INV-004',
      date: '2023-12-15',
      description: 'Root Canal Treatment',
      amount: 800.00,
      status: 'overdue',
      dueDate: '2024-01-15',
      treatmentCode: 'D3310'
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4532',
      expiryDate: '12/26',
      isDefault: true,
      provider: 'Visa'
    },
    {
      id: '2',
      type: 'insurance',
      last4: '8901',
      isDefault: false,
      provider: 'Delta Dental'
    }
  ]);

  const [treatmentCosts, setTreatmentCosts] = useState<TreatmentCost[]>([
    {
      id: '1',
      treatment: 'Dental Implant (Single)',
      estimatedCost: 3500.00,
      insuranceCoverage: 1200.00,
      patientResponsibility: 2300.00,
      status: 'approved'
    },
    {
      id: '2',
      treatment: 'Crown Restoration',
      estimatedCost: 1200.00,
      insuranceCoverage: 600.00,
      patientResponsibility: 600.00,
      status: 'completed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': case 'completed': return 'status-optimal';
      case 'pending': case 'approved': return 'status-warning';
      case 'overdue': return 'status-critical';
      case 'partial': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'estimate': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': case 'approved': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalBalance = invoices
    .filter(inv => inv.status !== 'paid')
    .reduce((sum, inv) => sum + (inv.amount - (inv.paidAmount || 0)), 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold medical-gradient">Payment Portal</h2>
          <p className="text-muted-foreground">Manage billing and payments</p>
        </div>
        <Button className="neural-pulse">
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                <p className="text-2xl font-bold text-red-600">
                  ${totalBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalPaid.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Invoices</p>
                <p className="text-2xl font-bold">
                  {invoices.filter(inv => inv.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Payment Methods</p>
                <p className="text-2xl font-bold">{paymentMethods.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="estimates">Estimates</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Recent Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border border-border/50 rounded-lg p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(invoice.status)}
                        <div>
                          <h4 className="font-medium">{invoice.description}</h4>
                          <p className="text-sm text-muted-foreground">
                            Invoice #{invoice.id} • {invoice.treatmentCode}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-semibold">${invoice.amount.toFixed(2)}</p>
                      </div>
                      
                      {invoice.paidAmount && (
                        <div>
                          <p className="text-sm text-muted-foreground">Paid</p>
                          <p className="font-semibold text-green-600">${invoice.paidAmount.toFixed(2)}</p>
                        </div>
                      )}
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Due Date</p>
                        <p className="font-semibold">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {invoice.status !== 'paid' && (
                          <Button size="sm" className="flex-1">
                            Pay Now
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {invoice.status === 'partial' && invoice.paidAmount && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Payment Progress</span>
                          <span className="text-sm">
                            ${invoice.paidAmount.toFixed(2)} / ${invoice.amount.toFixed(2)}
                          </span>
                        </div>
                        <Progress value={(invoice.paidAmount / invoice.amount) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estimates" className="space-y-6">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Treatment Cost Estimates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatmentCosts.map((cost) => (
                  <div key={cost.id} className="border border-border/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{cost.treatment}</h4>
                      <Badge className={getStatusColor(cost.status)}>
                        {cost.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Cost</p>
                        <p className="text-lg font-semibold">${cost.estimatedCost.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Insurance Coverage</p>
                        <p className="text-lg font-semibold text-green-600">
                          ${cost.insuranceCoverage.toFixed(2)}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Your Responsibility</p>
                        <p className="text-lg font-semibold text-primary">
                          ${cost.patientResponsibility.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your saved payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">
                          {method.provider} •••• {method.last4}
                        </p>
                        {method.expiryDate && (
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiryDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="insurance-provider">Insurance Provider</Label>
                  <Input id="insurance-provider" defaultValue="Delta Dental" />
                </div>
                
                <div>
                  <Label htmlFor="member-id">Member ID</Label>
                  <Input id="member-id" defaultValue="DD123456789" />
                </div>
                
                <div>
                  <Label htmlFor="group-number">Group Number</Label>
                  <Input id="group-number" defaultValue="GRP001" />
                </div>
                
                <div>
                  <Label htmlFor="coverage-amount">Annual Maximum</Label>
                  <Input id="coverage-amount" defaultValue="$1,500" />
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Coverage Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Preventive Care</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic Services</span>
                    <span className="font-medium">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Major Services</span>
                    <span className="font-medium">50%</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Update Insurance Information</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}