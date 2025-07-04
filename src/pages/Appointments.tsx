import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Users, Plus, Filter, Search, Mic } from "lucide-react";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');

  // Mock data pentru demonstrație
  const todayStats = {
    total: 12,
    completed: 8,
    pending: 3,
    cancelled: 1
  };

  const upcomingAppointments = [
    {
      id: '1',
      patient: 'Maria Popescu',
      time: '09:00',
      service: 'Consultație',
      doctor: 'Dr. Ionescu',
      status: 'confirmed',
      phone: '0740-123-456'
    },
    {
      id: '2', 
      patient: 'Ion Georgescu',
      time: '10:30',
      service: 'Igienizare',
      doctor: 'Dr. Vasilescu',
      status: 'pending',
      phone: '0741-234-567'
    },
    {
      id: '3',
      patient: 'Ana Marinescu',
      time: '14:00',
      service: 'Implant consultație',
      doctor: 'Dr. Ionescu',
      status: 'confirmed',
      phone: '0742-345-678'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmată';
      case 'pending': return 'În așteptare';
      case 'cancelled': return 'Anulată';
      default: return 'Necunoscută';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Programări MedicalCor</h1>
            <p className="text-slate-600 mt-1">Gestiunea programărilor și calendarul medical</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="space-x-2">
              <Mic className="w-4 h-4" />
              <span>Comandă vocală</span>
            </Button>
            <Button className="space-x-2">
              <Plus className="w-4 h-4" />
              <span>Programare nouă</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total astăzi</p>
                  <p className="text-2xl font-bold text-slate-900">{todayStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Completate</p>
                  <p className="text-2xl font-bold text-slate-900">{todayStats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">În așteptare</p>
                  <p className="text-2xl font-bold text-slate-900">{todayStats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Anulate</p>
                  <p className="text-2xl font-bold text-slate-900">{todayStats.cancelled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Calendar Programări</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'day' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('day')}
                    >
                      Zi
                    </Button>
                    <Button
                      variant={viewMode === 'week' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('week')}
                    >
                      Săptămână
                    </Button>
                    <Button
                      variant={viewMode === 'month' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('month')}
                    >
                      Lună
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AppointmentCalendar 
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  viewMode={viewMode}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acțiuni rapide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start space-x-2" variant="outline">
                  <Plus className="w-4 h-4" />
                  <span>Programare nouă</span>
                </Button>
                <Button className="w-full justify-start space-x-2" variant="outline">
                  <Search className="w-4 h-4" />
                  <span>Caută pacient</span>
                </Button>
                <Button className="w-full justify-start space-x-2" variant="outline">
                  <Filter className="w-4 h-4" />
                  <span>Filtrează programări</span>
                </Button>
                <Button className="w-full justify-start space-x-2" variant="outline">
                  <Mic className="w-4 h-4" />
                  <span>"Genius, programează..."</span>
                </Button>
              </CardContent>
            </Card>

            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Programări astăzi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-slate-900">{appointment.patient}</p>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p>⏰ {appointment.time}</p>
                      <p>🦷 {appointment.service}</p>
                      <p>👨‍⚕️ {appointment.doctor}</p>
                      <p>📞 {appointment.phone}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Voice Commands Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comenzi vocale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>• "Genius, programează pe Maria mâine la 10"</p>
                <p>• "Genius, anulează programarea de la 14:00"</p>
                <p>• "Genius, modifică ora pentru Ionescu"</p>
                <p>• "Genius, confirmă toate programările"</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;