import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, CreditCard, MessageSquare, Phone, MapPin, Camera, Download, Star } from 'lucide-react';

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState('appointments');

  // Simulare date pacient
  const patientData = {
    name: "Maria Popescu",
    id: "PAC-2024-001",
    phone: "+40 723 456 789",
    email: "maria.popescu@email.com",
    nextAppointment: "Miercuri, 15 Mai 2024, 09:00",
    treatmentPlan: "All-on-4 Superior",
    progress: 75
  };

  const appointments = [
    {
      date: "15 Mai 2024",
      time: "09:00",
      type: "All-on-4 Surgery",
      doctor: "Dr. Ionescu Alexandru",
      status: "confirmed",
      location: "Cabinet 1"
    },
    {
      date: "22 Mai 2024", 
      time: "16:30",
      type: "Post-op Control",
      doctor: "Dr. Ionescu Alexandru",
      status: "scheduled",
      location: "Cabinet 1"
    },
    {
      date: "5 Iunie 2024",
      time: "14:00", 
      type: "Prosthetic Fitting",
      doctor: "Dr. Marinescu Elena",
      status: "pending",
      location: "Cabinet 2"
    }
  ];

  const treatments = [
    {
      phase: "Consultație Inițială",
      date: "1 Martie 2024",
      status: "completed",
      description: "Evaluare clinică completă, CBCT, plan de tratament"
    },
    {
      phase: "Extracții + All-on-4",
      date: "15 Mai 2024",
      status: "in-progress", 
      description: "Extracții dentare, plasare 4 implanturi, proteza temporară"
    },
    {
      phase: "Cicatrizare",
      date: "15 Mai - 15 Aug 2024",
      status: "scheduled",
      description: "Perioada de vindecare și integrare implanturilor"
    },
    {
      phase: "Proteza Finală",
      date: "20 August 2024",
      status: "pending",
      description: "Confecționare și montare proteza definitivă"
    }
  ];

  const documents = [
    { name: "Plan de Tratament All-on-4", date: "1 Mar 2024", type: "PDF" },
    { name: "Radiografie CBCT", date: "1 Mar 2024", type: "DICOM" },
    { name: "Consimțământ Informat", date: "1 Mar 2024", type: "PDF" },
    { name: "Instrucțiuni Post-Operatorii", date: "15 Mai 2024", type: "PDF" }
  ];

  const bills = [
    { id: "F-2024-001", date: "1 Mar 2024", amount: 2500, description: "Consultație + CBCT", status: "paid" },
    { id: "F-2024-015", date: "15 Mai 2024", amount: 8500, description: "All-on-4 Surgery", status: "partial", paid: 5000 },
    { id: "F-2024-032", date: "20 Aug 2024", amount: 3500, description: "Proteza Finală", status: "pending" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Programările Mele</h3>
            {appointments.map((apt, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">{apt.date}</span>
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{apt.time}</span>
                      </div>
                      <h4 className="font-semibold text-lg text-blue-900 mb-1">{apt.type}</h4>
                      <p className="text-gray-600 mb-2">{apt.doctor}</p>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{apt.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(apt.status)}>
                        {apt.status === 'confirmed' ? 'Confirmată' : 
                         apt.status === 'scheduled' ? 'Programată' : 'În așteptare'}
                      </Badge>
                      <div className="mt-3 space-y-2">
                        <Button size="sm" variant="outline" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Reschedule
                        </Button>
                        <Button size="sm" variant="destructive" className="w-full">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'treatment':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Planul Meu de Tratament</h3>
              <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                {patientData.treatmentPlan}
              </Badge>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Progres Tratament</span>
                <span className="text-blue-600 font-bold">{patientData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${patientData.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              {treatments.map((treatment, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          treatment.status === 'completed' ? 'bg-green-500' :
                          treatment.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}>
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-lg">{treatment.phase}</h4>
                          <Badge className={getStatusColor(treatment.status)}>
                            {treatment.status === 'completed' ? 'Completată' :
                             treatment.status === 'in-progress' ? 'În desfășurare' :
                             treatment.status === 'scheduled' ? 'Programată' : 'În așteptare'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{treatment.description}</p>
                        <p className="text-sm text-gray-500">{treatment.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Documentele Mele</h3>
            {documents.map((doc, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{doc.name}</h4>
                        <p className="text-gray-600 text-sm">{doc.date} • {doc.type}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Situația Financiară</h3>
            {bills.map((bill, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Factura #{bill.id}</h4>
                        <p className="text-gray-600">{bill.description}</p>
                        <p className="text-sm text-gray-500">{bill.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900 mb-2">
                        €{bill.amount.toLocaleString()}
                      </div>
                      {bill.status === 'partial' && (
                        <div className="text-sm text-gray-600 mb-2">
                          Plătit: €{bill.paid?.toLocaleString()}
                        </div>
                      )}
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status === 'paid' ? 'Plătită' :
                         bill.status === 'partial' ? 'Parțial plătită' : 'Neplătită'}
                      </Badge>
                      {bill.status !== 'paid' && (
                        <Button size="sm" className="mt-2 w-full">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Plătește
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'communication':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Comunicare cu Clinica</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>Trimite un Mesaj</CardTitle>
                <CardDescription>
                  Contactează echipa medicală pentru întrebări sau programări
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Subiectul mesajului" />
                <Textarea 
                  placeholder="Descrie întrebarea sau solicitarea ta..."
                  rows={4}
                />
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Trimite Mesaj
                  </Button>
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Atașează Foto
                  </Button>
                </div>
              </CardContent>
            </Card>

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
              <p className="text-gray-600 mt-1">Bun venit, {patientData.name}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Pacient ID: {patientData.id}</div>
              <div className="text-sm font-semibold text-blue-600">
                Următoarea programare: {patientData.nextAppointment}
              </div>
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
                    <span className="text-2xl font-bold text-blue-600">MP</span>
                  </div>
                  <h3 className="font-semibold">{patientData.name}</h3>
                  <p className="text-gray-600 text-sm">{patientData.email}</p>
                </div>
                
                <nav className="space-y-2">
                  {[
                    { id: 'appointments', label: 'Programări', icon: Calendar },
                    { id: 'treatment', label: 'Plan Tratament', icon: FileText },
                    { id: 'documents', label: 'Documente', icon: FileText },
                    { id: 'billing', label: 'Facturare', icon: CreditCard },
                    { id: 'communication', label: 'Mesaje', icon: MessageSquare }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-blue-100 text-blue-700 font-semibold' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
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