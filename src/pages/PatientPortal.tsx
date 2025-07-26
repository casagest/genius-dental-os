import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { usePatientData } from "@/hooks/usePatientData";
import { useCFOData } from "@/hooks/useCFOData";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, FileText, CreditCard, MessageSquare, Phone, MapPin, Camera, Download, Star, Bell, AlertCircle, CheckCircle2, XCircle, Eye, Send, DollarSign, TrendingUp, Wallet, Receipt, Heart, Shield, User, Settings, LogOut, Home, Activity, Users, Pill, Stethoscope, Calendar1 } from 'lucide-react';

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messagePriority, setMessagePriority] = useState('normal');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const { 
    patient, 
    appointments, 
    messages, 
    documents, 
    notifications,
    loading,
    error,
    sendMessage,
    markNotificationAsRead,
    cancelAppointment
  } = usePatientData();
  const { financialData } = useCFOData();
  
  const navigate = useNavigate();

  // Mock data pentru demonstrație
  const mockPayments = [
    { id: '1', date: '2024-01-15', amount: 2500, description: 'Implant dentar', status: 'paid', invoice: 'INV-001' },
    { id: '2', date: '2024-02-10', amount: 800, description: 'Consultație ortodontică', status: 'paid', invoice: 'INV-002' },
    { id: '3', date: '2024-03-05', amount: 1200, description: 'Curățare dentară', status: 'pending', invoice: 'INV-003' },
    { id: '4', date: '2024-03-20', amount: 3500, description: 'All-on-4 implants', status: 'pending', invoice: 'INV-004' }
  ];

  const mockTreatments = [
    { id: '1', name: 'Implant All-on-4', progress: 85, nextStep: 'Finalizare proteză', dueDate: '2024-04-15', doctor: 'Dr. Popescu' },
    { id: '2', name: 'Ortodontie Invisalign', progress: 45, nextStep: 'Schimbare aligner', dueDate: '2024-04-05', doctor: 'Dr. Ionescu' },
    { id: '3', name: 'Endodontie molar', progress: 100, nextStep: 'Completat', dueDate: '2024-03-30', doctor: 'Dr. Marinescu' }
  ];

  const mockInsurance = {
    provider: 'Casa de Asigurări',
    policyNumber: 'RO123456789',
    coverage: 80,
    remaining: 2500,
    totalLimit: 5000
  };

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Show loading while auth or data is loading
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-20 w-20 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-4 w-32 mx-auto mb-2" />
                  <Skeleton className="h-3 w-40 mx-auto mb-6" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-32 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error if there's a problem loading data
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // Don't render if no patient data
  if (!patient) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Profilul pacientului nu a fost găsit. Vă rugăm să contactați recepția pentru asistență.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const unreadNotifications = notifications.filter(n => !n.is_read).length;
  const nextAppointment = appointments
    .filter(apt => new Date(apt.appointment_date) >= new Date() && apt.status === 'confirmed')
    .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ro-RO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageSubject.trim() || !messageContent.trim()) return;
    
    await sendMessage(messageSubject, messageContent, messagePriority);
    setMessageSubject('');
    setMessageContent('');
    setActiveTab('communication'); // Stay on communication tab to see the message sent
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Bun venit, {patient.first_name}!</h2>
              <p className="opacity-90">Accesați toate serviciile clinicii dintr-un singur loc</p>
              {nextAppointment && (
                <div className="mt-4 bg-white/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar1 className="w-4 h-4" />
                    <span className="font-semibold">Următoarea programare:</span>
                  </div>
                  <p>{nextAppointment.appointment_type} - {formatDate(nextAppointment.appointment_date)} la {formatTime(nextAppointment.appointment_date)}</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{appointments.length}</p>
                      <p className="text-gray-600 text-sm">Programări</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">€{mockPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)}</p>
                      <p className="text-gray-600 text-sm">Plăți efectuate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockTreatments.length}</p>
                      <p className="text-gray-600 text-sm">Tratamente active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockInsurance.coverage}%</p>
                      <p className="text-gray-600 text-sm">Acoperire asigurare</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Treatments Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Progresul Tratamentelor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTreatments.map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{treatment.name}</h4>
                          <p className="text-sm text-gray-600">Dr. {treatment.doctor}</p>
                        </div>
                        <Badge variant={treatment.progress === 100 ? "default" : "secondary"}>
                          {treatment.progress}% complet
                        </Badge>
                      </div>
                      <Progress value={treatment.progress} className="mb-2" />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Următorul pas: {treatment.nextStep}</span>
                        <span>Scadență: {formatDate(treatment.dueDate)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activitate Recentă</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold">Consultație completată</p>
                        <p className="text-sm text-gray-600">Ieri la 14:30</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Receipt className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold">Factură plătită</p>
                        <p className="text-sm text-gray-600">Acum 2 zile</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-semibold">Programare confirmată</p>
                        <p className="text-sm text-gray-600">Acum 3 zile</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Asigurarea Medicală</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Furnizor:</span>
                      <span className="font-semibold">{mockInsurance.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Numărul poliței:</span>
                      <span className="font-semibold">{mockInsurance.policyNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Acoperire:</span>
                      <span className="font-semibold">{mockInsurance.coverage}%</span>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Rămas din limită:</span>
                        <span className="font-semibold text-green-600">€{mockInsurance.remaining}</span>
                      </div>
                      <Progress value={(mockInsurance.remaining / mockInsurance.totalLimit) * 100} />
                      <p className="text-xs text-gray-600">
                        €{mockInsurance.remaining} din €{mockInsurance.totalLimit} disponibili
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Programările Mele</h3>
              <Button onClick={() => setActiveTab('communication')}>
                <Phone className="w-4 h-4 mr-2" />
                Programează Consultație
              </Button>
            </div>
            
            {appointments.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nicio programare</h3>
                  <p className="text-gray-600 mb-4">Nu aveți programări în acest moment.</p>
                  <Button onClick={() => setActiveTab('communication')}>
                    <Phone className="w-4 h-4 mr-2" />
                    Programează o consultație
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {appointments.map((apt) => (
                  <Card key={apt.id} className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Stethoscope className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{apt.appointment_type}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(apt.appointment_date)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {formatTime(apt.appointment_date)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {apt.notes && (
                            <p className="text-gray-700 mb-2">{apt.notes}</p>
                          )}
                          
                          {apt.treatment_plan && (
                            <div className="bg-blue-50 p-3 rounded-lg mb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="font-semibold text-blue-900">Plan de tratament:</span>
                              </div>
                              <p className="text-blue-800">{apt.treatment_plan}</p>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-6 text-sm">
                            <span className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              Durată: {apt.duration_minutes || 60} min
                            </span>
                            {apt.cost && (
                              <span className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-gray-500" />
                                Cost: €{apt.cost}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right space-y-3">
                          <Badge className={getStatusColor(apt.status)}>
                            {apt.status === 'confirmed' ? 'Confirmată' : 
                             apt.status === 'scheduled' ? 'Programată' : 
                             apt.status === 'completed' ? 'Completată' :
                             apt.status === 'cancelled' ? 'Anulată' : 'În așteptare'}
                          </Badge>
                          
                          {apt.status === 'confirmed' && (
                            <div className="space-y-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="w-full"
                                onClick={() => setActiveTab('communication')}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Reprogramează
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="w-full"
                                onClick={() => cancelAppointment(apt.id)}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Anulează
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Facturare & Plăți</h3>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                Total: €{mockPayments.reduce((sum, p) => sum + p.amount, 0)}
              </Badge>
            </div>

            {/* Payment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        €{mockPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)}
                      </p>
                      <p className="text-gray-600 text-sm">Plăți efectuate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">
                        €{mockPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)}
                      </p>
                      <p className="text-gray-600 text-sm">În așteptare</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Receipt className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{mockPayments.length}</p>
                      <p className="text-gray-600 text-sm">Total facturi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Istoricul Plăților</CardTitle>
                <CardDescription>Toate facturile și plățile dvs.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPayments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${
                              payment.status === 'paid' ? 'bg-green-500' : 'bg-orange-500'
                            }`} />
                            <h4 className="font-semibold">{payment.description}</h4>
                            <Badge className={payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                              {payment.status === 'paid' ? 'Plătită' : 'În așteptare'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span>Factura: {payment.invoice}</span>
                            <span>Data: {formatDate(payment.date)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">€{payment.amount}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Vezi
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Descarcă
                            </Button>
                            {payment.status === 'pending' && (
                              <Button size="sm" onClick={() => setSelectedPayment(payment.id)}>
                                <CreditCard className="w-4 h-4 mr-2" />
                                Plătește
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            {selectedPayment && (
              <Card>
                <CardHeader>
                  <CardTitle>Opțiuni de Plată</CardTitle>
                  <CardDescription>Alegeți modalitatea de plată preferată</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <CreditCard className="w-8 h-8 mb-2" />
                      <span>Card Bancar</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Wallet className="w-8 h-8 mb-2" />
                      <span>PayPal</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <DollarSign className="w-8 h-8 mb-2" />
                      <span>Transfer Bancar</span>
                    </Button>
                  </div>
                  <Button className="w-full mt-4" onClick={() => setSelectedPayment(null)}>
                    Procesează Plata
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Documentele Mele</h3>
            {documents.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nu aveți documente încărcate încă.</p>
                </CardContent>
              </Card>
            ) : (
              documents.map((doc, index) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{doc.document_name}</h4>
                          <p className="text-gray-600 text-sm">
                            {formatDate(doc.created_at)} • {doc.document_type} • {doc.category}
                          </p>
                          {doc.file_size && (
                            <p className="text-xs text-gray-500">
                              {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Vizualizează
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Descarcă
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Comunicare cu Clinica</h3>
            
            {/* Send Message Form */}
            <Card>
              <CardHeader>
                <CardTitle>Trimite un Mesaj</CardTitle>
                <CardDescription>
                  Contactează echipa medicală pentru întrebări sau programări
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <Input 
                    placeholder="Subiectul mesajului"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    required
                  />
                  <Textarea 
                    placeholder="Descrie întrebarea sau solicitarea ta..."
                    rows={4}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    required
                  />
                  <div className="flex items-center gap-4">
                    <select 
                      value={messagePriority}
                      onChange={(e) => setMessagePriority(e.target.value)}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="normal">Prioritate normală</option>
                      <option value="high">Prioritate înaltă</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Trimite Mesaj
                    </Button>
                    <Button type="button" variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Atașează Foto
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Message History */}
            <Card>
              <CardHeader>
                <CardTitle>Istoricul Mesajelor</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-gray-600 text-center py-4">Nu aveți mesaje trimise încă.</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold">{msg.subject}</h5>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(msg.status)}>
                              {msg.status === 'pending' ? 'În așteptare' :
                               msg.status === 'answered' ? 'Răspuns' : msg.status}
                            </Badge>
                            {msg.priority === 'high' && (
                              <Badge variant="destructive">Prioritate înaltă</Badge>
                            )}
                            {msg.priority === 'urgent' && (
                              <Badge variant="destructive">Urgent</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{msg.message}</p>
                        <p className="text-xs text-gray-500">
                          Trimis pe {formatDate(msg.created_at)} la {formatTime(msg.created_at)}
                        </p>
                        {msg.response && (
                          <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                            <p className="font-semibold text-blue-900 mb-1">Răspuns:</p>
                            <p className="text-blue-800">{msg.response}</p>
                            {msg.responded_at && (
                              <p className="text-xs text-blue-600 mt-1">
                                Răspuns pe {formatDate(msg.responded_at)} la {formatTime(msg.responded_at)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Direct</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16">
                    <Phone className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Sună Clinica</div>
                      <div className="text-sm text-gray-600">+40 21 123 4567</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-16">
                    <MessageSquare className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">WhatsApp</div>
                      <div className="text-sm text-gray-600">Mesaj rapid</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Notificări</h3>
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nu aveți notificări noi.</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`cursor-pointer transition-all ${
                    notification.is_read ? 'bg-gray-50' : 'bg-white border-blue-200'
                  }`}
                  onClick={() => !notification.is_read && markNotificationAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        notification.is_read ? 'bg-gray-300' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          notification.is_read ? 'text-gray-600' : 'text-gray-900'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className={`text-sm ${
                          notification.is_read ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(notification.created_at)} la {formatTime(notification.created_at)}
                        </p>
                      </div>
                      <Badge variant={notification.type === 'urgent' ? 'destructive' : 'secondary'}>
                        {notification.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );

      case 'treatments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Planul de Tratament</h3>
              <Badge variant="secondary">
                {mockTreatments.filter(t => t.progress < 100).length} active
              </Badge>
            </div>

            <div className="grid gap-6">
              {mockTreatments.map((treatment) => (
                <Card key={treatment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-bold mb-1">{treatment.name}</h4>
                        <p className="text-gray-600">Medic responsabil: {treatment.doctor}</p>
                      </div>
                      <Badge variant={treatment.progress === 100 ? "default" : "secondary"}>
                        {treatment.progress === 100 ? 'Complet' : 'În progres'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold">Progres tratament</span>
                          <span className="text-lg font-bold">{treatment.progress}%</span>
                        </div>
                        <Progress value={treatment.progress} className="h-3" />
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold mb-2">Următorul pas:</h5>
                        <p className="text-blue-800">{treatment.nextStep}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          Scadență: {formatDate(treatment.dueDate)}
                        </p>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Vezi Detalii
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Programează
                        </Button>
                        {treatment.progress < 100 && (
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Întreabă Medicul
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Profilul Meu</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informații Personale</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {getInitials(patient.first_name, patient.last_name)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{patient.first_name} {patient.last_name}</h4>
                      <p className="text-gray-600">{patient.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Telefon</label>
                      <p className="text-lg">{patient.phone || 'Nu este specificat'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Data nașterii</label>
                      <p className="text-lg">{patient.date_of_birth ? formatDate(patient.date_of_birth) : 'Nu este specificată'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Asigurare medicală</label>
                      <p className="text-lg">{patient.insurance_provider || 'Nu este specificată'}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Editează Profilul
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Istoricul Medical</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Alergii</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.allergies && patient.allergies.length > 0 ? (
                        patient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="secondary">{allergy}</Badge>
                        ))
                      ) : (
                        <p className="text-gray-500">Nicio alergie cunoscută</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Condiții medicale</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.medical_conditions && patient.medical_conditions.length > 0 ? (
                        patient.medical_conditions.map((condition, index) => (
                          <Badge key={index} variant="secondary">{condition}</Badge>
                        ))
                      ) : (
                        <p className="text-gray-500">Nicio condiție medicală</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Medicația actuală</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {patient.current_medications && patient.current_medications.length > 0 ? (
                        patient.current_medications.map((medication, index) => (
                          <Badge key={index} variant="outline">
                            <Pill className="w-3 h-3 mr-1" />
                            {medication}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500">Nicio medicație</p>
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Contact de urgență</label>
                    <div className="mt-1">
                      <p className="font-semibold">{patient.emergency_contact_name || 'Nu este specificat'}</p>
                      <p className="text-gray-600">{patient.emergency_contact_phone || 'Nu este specificat'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Portal Pacient</h1>
              <p className="text-gray-600 mt-1">
                Bun venit, {patient.first_name} {patient.last_name}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                ID Pacient: {patient.medical_record_number || 'N/A'}
              </div>
              {nextAppointment && (
                <div className="text-sm font-semibold text-blue-600">
                  Următoarea programare: {formatDate(nextAppointment.appointment_date)} la {formatTime(nextAppointment.appointment_date)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {getInitials(patient.first_name, patient.last_name)}
                    </span>
                  </div>
                  <h3 className="font-semibold">{patient.first_name} {patient.last_name}</h3>
                  <p className="text-gray-600 text-sm">{patient.email}</p>
                  {patient.phone && (
                    <p className="text-gray-600 text-sm">{patient.phone}</p>
                  )}
                </div>
                
                <nav className="space-y-2">
                  {[
                    { id: 'overview', label: 'Privire Generală', icon: Home, count: 0 },
                    { id: 'appointments', label: 'Programări', icon: Calendar, count: appointments.length },
                    { id: 'billing', label: 'Facturare', icon: CreditCard, count: mockPayments.filter(p => p.status === 'pending').length },
                    { id: 'treatments', label: 'Tratamente', icon: Stethoscope, count: mockTreatments.filter(t => t.progress < 100).length },
                    { id: 'documents', label: 'Documente', icon: FileText, count: documents.length },
                    { id: 'communication', label: 'Mesaje', icon: MessageSquare, count: messages.filter(m => m.status === 'pending').length },
                    { id: 'notifications', label: 'Notificări', icon: Bell, count: unreadNotifications },
                    { id: 'profile', label: 'Profil', icon: User, count: 0 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-blue-100 text-blue-700 font-semibold' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon className="w-5 h-5" />
                        {tab.label}
                      </div>
                      {tab.count > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {tab.count}
                        </Badge>
                      )}
                    </button>
                   ))}
                 </nav>
                 
                 <Separator className="my-4" />
                 
                 <Button 
                   variant="ghost" 
                   className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                   onClick={() => {
                     logout();
                     navigate('/auth');
                   }}
                 >
                   <LogOut className="w-5 h-5 mr-3" />
                   Deconectare
                 </Button>
               </CardContent>
             </Card>
           </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;