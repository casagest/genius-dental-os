import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Stethoscope, Wrench, DollarSign, Clock } from "lucide-react";
import { useRealData } from "@/hooks/useRealData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RealDataDisplay = () => {
  const { data, stats, isLoading } = useRealData();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Programări Astăzi",
      value: stats.appointmentsToday,
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      action: () => navigate('/appointments')
    },
    {
      title: "Total Pacienți",
      value: stats.totalPatients,
      icon: <Users className="w-5 h-5" />,
      color: "text-green-600", 
      bgColor: "bg-green-100",
      action: () => navigate('/patient-portal')
    },
    {
      title: "Tratamente Active",
      value: stats.activeTreatments,
      icon: <Stethoscope className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      action: () => navigate('/clinical')
    },
    {
      title: "Comenzi Lab Pendinte",
      value: stats.pendingLabOrders,
      icon: <Wrench className="w-5 h-5" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      action: () => navigate('/labsync')
    },
    {
      title: "Venituri Totale",
      value: `€${stats.totalRevenue}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-100", 
      action: () => navigate('/cfo')
    },
    {
      title: "Total Tratamente",
      value: stats.totalTreatments,
      icon: <Clock className="w-5 h-5" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      action: () => navigate('/dashboard')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Date în Timp Real din Supabase</h3>
        <Badge variant="default" className="bg-green-100 text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live Data
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={card.action}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-lg ${card.bgColor} ${card.color} flex items-center justify-center`}>
                  {card.icon}
                </div>
                <Button variant="ghost" size="sm" className="text-xs opacity-60 hover:opacity-100">
                  Vezi →
                </Button>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {card.value}
                </div>
                <div className="text-sm font-medium text-foreground">{card.title}</div>
                <div className="text-xs text-muted-foreground">Date actualizate în timp real</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Data Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Programări Recente</CardTitle>
          </CardHeader>
          <CardContent>
            {data.appointments.slice(0, 3).map((apt, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <div className="text-sm font-medium">{apt.appointment_type}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(apt.appointment_date).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant={apt.status === 'scheduled' ? 'default' : 'secondary'}>
                  {apt.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Comenzi Lab Recente</CardTitle>
          </CardHeader>
          <CardContent>
            {data.labOrders.slice(0, 3).map((order, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <div className="text-sm font-medium">{order.order_type}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Badge variant={order.status === 'pending' ? 'destructive' : 'default'}>
                  {order.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealDataDisplay;