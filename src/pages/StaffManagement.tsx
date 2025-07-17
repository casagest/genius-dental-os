import React, { useState } from 'react';
import { Users, TrendingUp, Clock, Award, Calendar, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const StaffManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Maria Popescu',
      role: 'Medic Stomatolog',
      avatar: 'MP',
      performance: 95,
      patientsToday: 12,
      satisfaction: 4.9,
      workload: 85,
      specialties: ['Implantologie', 'Chirurgie'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Ana Georgescu',
      role: 'Asistent Medical',
      avatar: 'AG',
      performance: 92,
      patientsToday: 18,
      satisfaction: 4.8,
      workload: 78,
      specialties: ['Asistență', 'Sterilizare'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Elena Ionescu',
      role: 'Recepționer',
      avatar: 'EI',
      performance: 88,
      patientsToday: 28,
      satisfaction: 4.7,
      workload: 82,
      specialties: ['Programări', 'Comunicare'],
      status: 'active'
    },
    {
      id: 4,
      name: 'Mihai Vasile',
      role: 'Tehnician Laborator',
      avatar: 'MV',
      performance: 91,
      patientsToday: 15,
      satisfaction: 4.6,
      workload: 75,
      specialties: ['Proteze', 'CAD/CAM'],
      status: 'active'
    }
  ];

  const performanceMetrics = [
    { metric: 'Productivitate Echipă', value: 92, target: 90, trend: '+5%', color: 'green' },
    { metric: 'Satisfacție Pacienți', value: 4.8, target: 4.5, trend: '+0.3', color: 'blue' },
    { metric: 'Timp Mediu/Pacient', value: 42, target: 45, trend: '-6%', color: 'green' },
    { metric: 'Absențe', value: 2, target: 5, trend: '-40%', color: 'green' }
  ];

  const upcomingSchedule = [
    { name: 'Dr. Maria Popescu', shift: '08:00 - 16:00', patients: 12, status: 'normal' },
    { name: 'Ana Georgescu', shift: '08:30 - 16:30', patients: 15, status: 'normal' },
    { name: 'Elena Ionescu', shift: '08:00 - 17:00', patients: 25, status: 'busy' },
    { name: 'Mihai Vasile', shift: '09:00 - 17:00', patients: 10, status: 'light' }
  ];

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 90) return 'bg-red-100 text-red-800 border-red-200';
    if (workload >= 75) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  const getScheduleStatus = (status: string) => {
    switch (status) {
      case 'busy': return 'bg-red-100 text-red-800 border-red-200';
      case 'normal': return 'bg-green-100 text-green-800 border-green-200';
      case 'light': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Management Personal</h1>
              <p className="text-muted-foreground">Performanță echipă și planificare resurse</p>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {performanceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                  <span className={`text-sm font-medium ${metric.color === 'green' ? 'text-green-600' : 'text-blue-600'}`}>
                    {metric.trend}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{metric.value}{metric.metric.includes('Satisfacție') ? '/5' : metric.metric.includes('Timp') ? 'min' : metric.metric.includes('Absențe') ? '' : '%'}</p>
                    <p className="text-xs text-muted-foreground">Obiectiv: {metric.target}{metric.metric.includes('Satisfacție') ? '/5' : metric.metric.includes('Timp') ? 'min' : '%'}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="team" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="team">Echipa</TabsTrigger>
            <TabsTrigger value="performance">Performanță</TabsTrigger>
            <TabsTrigger value="schedule">Program</TabsTrigger>
            <TabsTrigger value="analytics">Analiză</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.role}</CardDescription>
                      </div>
                      <Badge className={getWorkloadColor(member.workload)}>
                        {member.workload >= 90 ? 'Ocupat' : member.workload >= 75 ? 'Normal' : 'Liber'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{member.patientsToday}</p>
                          <p className="text-xs text-muted-foreground">Pacienți astăzi</p>
                        </div>
                        <div>
                          <p className={`text-2xl font-bold ${getPerformanceColor(member.performance)}`}>
                            {member.performance}%
                          </p>
                          <p className="text-xs text-muted-foreground">Performanță</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-yellow-600">{member.satisfaction}</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Încărcare lucru</span>
                          <span>{member.workload}%</span>
                        </div>
                        <Progress value={member.workload} />
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Mesaj
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          Program
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evaluare Performanță Individuală</CardTitle>
                <CardDescription>Analiza detaliată a performanței fiecărui membru</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Productivitate</p>
                          <div className="flex items-center gap-2">
                            <Progress value={member.performance} className="flex-1" />
                            <span className="text-sm font-medium">{member.performance}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Calitate</p>
                          <div className="flex items-center gap-2">
                            <Progress value={member.satisfaction * 20} className="flex-1" />
                            <span className="text-sm font-medium">{member.satisfaction}/5</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Încărcare</p>
                          <div className="flex items-center gap-2">
                            <Progress value={member.workload} className="flex-1" />
                            <span className="text-sm font-medium">{member.workload}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Colaborare</p>
                          <div className="flex items-center gap-2">
                            <Progress value={85} className="flex-1" />
                            <span className="text-sm font-medium">85%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Echipă - Astăzi</CardTitle>
                <CardDescription>Planificare zilnică și distribuția pacienților</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{schedule.name}</h3>
                          <p className="text-sm text-muted-foreground">{schedule.shift}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-medium">{schedule.patients} pacienți</div>
                          <Badge className={getScheduleStatus(schedule.status)}>
                            {schedule.status === 'busy' ? 'Ocupat' : 
                             schedule.status === 'normal' ? 'Normal' : 'Ușor'}
                          </Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Editează
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
                  <CardTitle>Tendințe Performanță</CardTitle>
                  <CardDescription>Evoluția în ultimele 3 luni</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Octombrie</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20" />
                        <span className="text-sm font-medium">88%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Noiembrie</span>
                      <div className="flex items-center gap-2">
                        <Progress value={90} className="w-20" />
                        <span className="text-sm font-medium">90%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Decembrie</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recunoașteri</CardTitle>
                  <CardDescription>Realizări și premii ale echipei</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Award className="w-6 h-6 text-yellow-600" />
                      <div>
                        <p className="font-medium">Echipa Lunii</p>
                        <p className="text-sm text-muted-foreground">Decembrie 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="font-medium">100% Satisfacție</p>
                        <p className="text-sm text-muted-foreground">Săptămâna 15-22 Dec</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="font-medium">Record Productivitate</p>
                        <p className="text-sm text-muted-foreground">95% în ultima lună</p>
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

export default StaffManagement;