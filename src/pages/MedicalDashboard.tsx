import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock,
  Heart,
  Brain,
  FileText,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { useRealData } from "@/hooks/useRealData";
import { useNavigate } from "react-router-dom";

const MedicalDashboard = () => {
  const { data, stats, isLoading, refreshData } = useRealData();
  const navigate = useNavigate();
  const [isAddTreatmentOpen, setIsAddTreatmentOpen] = useState(false);
  const [treatmentForm, setTreatmentForm] = useState({
    treatment_name: '',
    description: '',
    estimated_cost: '',
    status: 'planned'
  });

  const handleAddTreatment = async () => {
    // In a real app, this would make an API call to add the treatment
    console.log('Adding treatment:', treatmentForm);
    setIsAddTreatmentOpen(false);
    setTreatmentForm({
      treatment_name: '',
      description: '',
      estimated_cost: '',
      status: 'planned'
    });
    refreshData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const quickStats = [
    {
      title: "Pacienți Activi",
      value: stats.totalPatients,
      change: "+12%",
      changeType: "positive",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: () => navigate('/patient-portal')
    },
    {
      title: "Tratamente în Curs",
      value: stats.activeTreatments,
      change: "+8%",
      changeType: "positive", 
      icon: <Stethoscope className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: () => navigate('/clinical')
    },
    {
      title: "Programări Astăzi",
      value: stats.appointmentsToday,
      change: "La timp",
      changeType: "neutral",
      icon: <Calendar className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: () => navigate('/appointments')
    }
  ];

  const recentTreatments = data.treatments.slice(0, 5);
  const upcomingAppointments = data.appointments
    .filter(apt => new Date(apt.appointment_date) >= new Date())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Medical Dashboard</h1>
            <p className="text-muted-foreground">Monitorizare completă a activității medicale</p>
          </div>
          <Badge variant="default" className="bg-green-100 text-green-700">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live Data
          </Badge>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
              onClick={stat.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <Badge variant={stat.changeType === 'positive' ? 'default' : 'secondary'}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Prezentare Generală</TabsTrigger>
            <TabsTrigger value="treatments">Tratamente</TabsTrigger>
            <TabsTrigger value="appointments">Programări</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Treatments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5" />
                    <span>Tratamente Recente</span>
                  </CardTitle>
                  <CardDescription>Ultimele tratamente inițiate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTreatments.length > 0 ? recentTreatments.map((treatment, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Heart className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{treatment.treatment_name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(treatment.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge variant={treatment.status === 'completed' ? 'default' : 'secondary'}>
                          {treatment.status}
                        </Badge>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Nu sunt tratamente disponibile</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Programări Viitoare</span>
                  </CardTitle>
                  <CardDescription>Următoarele programări</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.length > 0 ? upcomingAppointments.map((appointment, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{appointment.appointment_type}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(appointment.appointment_date).toLocaleDateString()} - {new Date(appointment.appointment_date).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'outline'}>
                          {appointment.status}
                        </Badge>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Nu sunt programări viitoare</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="treatments">
            <Card>
              <CardHeader>
                <CardTitle>Toate Tratamentele</CardTitle>
                <CardDescription>Gestionare completă a tratamentelor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.treatments.length > 0 ? data.treatments.map((treatment, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{treatment.treatment_name}</div>
                          <div className="text-sm text-muted-foreground">{treatment.description}</div>
                          <div className="text-xs text-muted-foreground">
                            Creat: {new Date(treatment.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {treatment.estimated_cost && (
                          <span className="font-medium">€{treatment.estimated_cost}</span>
                        )}
                        <Badge variant={treatment.status === 'completed' ? 'default' : 'outline'}>
                          {treatment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Detalii
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <Stethoscope className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Nu sunt tratamente</h3>
                      <p className="text-muted-foreground">Începe prin a adăuga primul tratament</p>
                      <Dialog open={isAddTreatmentOpen} onOpenChange={setIsAddTreatmentOpen}>
                        <DialogTrigger asChild>
                          <Button className="mt-4">Adaugă Tratament</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Adaugă Tratament Nou</DialogTitle>
                            <DialogDescription>
                              Completează detaliile pentru noul tratament.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nume
                              </Label>
                              <Input
                                id="name"
                                value={treatmentForm.treatment_name}
                                onChange={(e) => setTreatmentForm({...treatmentForm, treatment_name: e.target.value})}
                                className="col-span-3"
                                placeholder="ex. Implant dentar"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                                Descriere
                              </Label>
                              <Textarea
                                id="description"
                                value={treatmentForm.description}
                                onChange={(e) => setTreatmentForm({...treatmentForm, description: e.target.value})}
                                className="col-span-3"
                                placeholder="Detalii despre tratament..."
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="cost" className="text-right">
                                Cost (€)
                              </Label>
                              <Input
                                id="cost"
                                type="number"
                                value={treatmentForm.estimated_cost}
                                onChange={(e) => setTreatmentForm({...treatmentForm, estimated_cost: e.target.value})}
                                className="col-span-3"
                                placeholder="1500"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="status" className="text-right">
                                Status
                              </Label>
                              <Select 
                                value={treatmentForm.status} 
                                onValueChange={(value) => setTreatmentForm({...treatmentForm, status: value})}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Selectează statusul" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="planned">Planificat</SelectItem>
                                  <SelectItem value="in_progress">În Curs</SelectItem>
                                  <SelectItem value="completed">Completat</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setIsAddTreatmentOpen(false)}>
                              Anulează
                            </Button>
                            <Button onClick={handleAddTreatment}>
                              Adaugă Tratament
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Toate Programările</CardTitle>
                <CardDescription>Management complet al programărilor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.appointments.length > 0 ? data.appointments.map((appointment, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{appointment.appointment_type}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(appointment.appointment_date).toLocaleDateString()} la {new Date(appointment.appointment_date).toLocaleTimeString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Durată: {appointment.duration_minutes} minute
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {appointment.cost && (
                          <span className="font-medium">€{appointment.cost}</span>
                        )}
                        <Badge variant={appointment.status === 'completed' ? 'default' : 'outline'}>
                          {appointment.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Editează
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <h3 className="text-lg font-medium mb-2">Nu sunt programări</h3>
                      <p className="text-muted-foreground">Programările vor apărea aici</p>
                      <Button className="mt-4">Adaugă Programare</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Statistici Rapide</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Pacienți</span>
                      <span className="font-bold">{stats.totalPatients}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tratamente Active</span>
                      <span className="font-bold">{stats.activeTreatments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Venituri Totale</span>
                      <span className="font-bold">€{stats.totalRevenue}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Comenzi Lab Pendinte</span>
                      <span className="font-bold">{stats.pendingLabOrders}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Performanță Excelentă</div>
                        <div className="text-sm text-muted-foreground">
                          Rata de succes a tratamentelor este peste media
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Optimizare Necesară</div>
                        <div className="text-sm text-muted-foreground">
                          Timpul mediu per pacient poate fi îmbunătățit
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium">Creștere Pozitivă</div>
                        <div className="text-sm text-muted-foreground">
                          Numărul pacienților noi crește lunar
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MedicalDashboard;