
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus } from "lucide-react";

const AppointmentCalendar = () => {
  const appointments = [
    {
      time: "09:00",
      patient: "Ana Popescu",
      treatment: "Consultație All-on-6",
      status: "confirmed",
      duration: "60 min",
      ai_notes: "Caz complex - CBCT review necesar"
    },
    {
      time: "10:30",
      patient: "Gheorghe Ionescu", 
      treatment: "Implant placement",
      status: "in-progress",
      duration: "90 min",
      ai_notes: "Planning 3D completat cu AI"
    },
    {
      time: "14:00",
      patient: "Maria Dumitrescu",
      treatment: "Consult ortodontic",
      status: "pending",
      duration: "45 min", 
      ai_notes: "Lead nou - probabilitate acceptare: 85%"
    },
    {
      time: "15:30",
      patient: "Slot liber",
      treatment: "Disponibil",
      status: "available",
      duration: "60 min",
      ai_notes: "AI sugerează promovare last-minute"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'available': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <Card className="border-2 hover:border-blue-200 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-slate-800">Programări Astăzi</CardTitle>
              <CardDescription>Miercuri, 27 Iunie 2025 - 24 total appointments</CardDescription>
            </div>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Programare Nouă
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((apt, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-800">{apt.time}</div>
                  <div className="text-xs text-slate-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {apt.duration}
                  </div>
                </div>
                <div className="border-l border-slate-300 pl-4">
                  <div className="font-semibold text-slate-800">{apt.patient}</div>
                  <div className="text-sm text-slate-600">{apt.treatment}</div>
                  <div className="text-xs text-blue-600 italic mt-1">{apt.ai_notes}</div>
                </div>
              </div>
              <Badge className={`border ${getStatusColor(apt.status)}`}>
                {apt.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCalendar;
