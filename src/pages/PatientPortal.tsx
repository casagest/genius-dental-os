import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { usePatientData } from "@/hooks/usePatientData";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, FileText, CreditCard, MessageSquare, Phone, MapPin, Camera, Download, Star, Bell, AlertCircle, CheckCircle2, XCircle, Eye, Send } from 'lucide-react';

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messagePriority, setMessagePriority] = useState('normal');
  
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
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
  
  const navigate = useNavigate();

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
      case 'appointments':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Programările Mele</h3>
              {unreadNotifications > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <Bell className="w-3 h-3" />
                  {unreadNotifications} notificări
                </Badge>
              )}
            </div>
            
            {appointments.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Nu aveți programări în acest moment.</p>
                  <Button className="mt-4" onClick={() => setActiveTab('communication')}>
                    <Phone className="w-4 h-4 mr-2" />
                    Programează o consultație
                  </Button>
                </CardContent>
              </Card>
            ) : (
              appointments.map((apt, index) => (
                <Card key={apt.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">{formatDate(apt.appointment_date)}</span>
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600">{formatTime(apt.appointment_date)}</span>
                        </div>
                        <h4 className="font-semibold text-lg text-blue-900 mb-1">{apt.appointment_type}</h4>
                        {apt.notes && (
                          <p className="text-gray-600 mb-2">{apt.notes}</p>
                        )}
                        {apt.treatment_plan && (
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">{apt.treatment_plan}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Durată: {apt.duration_minutes || 60} min</span>
                          {apt.cost && <span>Cost: €{apt.cost}</span>}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(apt.status)}>
                          {apt.status === 'confirmed' ? 'Confirmată' : 
                           apt.status === 'scheduled' ? 'Programată' : 
                           apt.status === 'completed' ? 'Completată' :
                           apt.status === 'cancelled' ? 'Anulată' : 'În așteptare'}
                        </Badge>
                        {apt.status === 'confirmed' && (
                          <div className="mt-3 space-y-2">
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
              ))
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
                    { id: 'appointments', label: 'Programări', icon: Calendar, count: appointments.length },
                    { id: 'documents', label: 'Documente', icon: FileText, count: documents.length },
                    { id: 'communication', label: 'Mesaje', icon: MessageSquare, count: messages.filter(m => m.status === 'pending').length },
                    { id: 'notifications', label: 'Notificări', icon: Bell, count: unreadNotifications }
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