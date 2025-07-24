import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Stethoscope, 
  Monitor, 
  Users, 
  Calendar, 
  FileText, 
  Mic,
  Activity,
  Zap
} from "lucide-react";
import IntelligentVoiceInterface from "@/components/voice/IntelligentVoiceInterface";
import TreatmentPlanningModule from "@/components/medical/TreatmentPlanningModule";
import DigitalWorkflowHub from "@/components/medical/DigitalWorkflowHub";

const MedicalWorkflowDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const quickStats = [
    {
      title: 'Pacienți Activi',
      value: '147',
      change: '+12%',
      icon: <Users className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'Tratamente în Desfășurare',
      value: '23',
      change: '+5%',
      icon: <Stethoscope className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      title: 'Procesări AI Astăzi',
      value: '18',
      change: '+89%',
      icon: <Brain className="w-5 h-5" />,
      color: 'text-purple-600'
    },
    {
      title: 'Comenzi Vocale',
      value: '156',
      change: '+234%',
      icon: <Mic className="w-5 h-5" />,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            🧠 MEDICALCOR GENIUS 3.0
          </h1>
          <p className="text-gray-600 mt-1">
            Platforma AI pentru Medicină Dentară cu Control Vocal
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="animate-pulse bg-green-50 text-green-700">
            <Activity className="w-3 h-3 mr-1" />
            SISTEM ACTIV
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Zap className="w-3 h-3 mr-1" />
            AI READY
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className={`${stat.color} bg-gray-50 p-2 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <Monitor className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center space-x-2">
            <Mic className="w-4 h-4" />
            <span>Control Vocal</span>
          </TabsTrigger>
          <TabsTrigger value="treatments" className="flex items-center space-x-2">
            <Stethoscope className="w-4 h-4" />
            <span>Tratamente</span>
          </TabsTrigger>
          <TabsTrigger value="digital" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>Workflow Digital</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Programul de Astăzi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '09:00', patient: 'Ion Popescu', treatment: 'Consultație implant' },
                    { time: '10:30', patient: 'Maria Ionescu', treatment: 'Extracție molară' },
                    { time: '14:00', patient: 'Gheorghe Pop', treatment: 'Control post-op' },
                    { time: '15:30', patient: 'Ana Dumitrescu', treatment: 'Scalare & polish' }
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-blue-600">{appointment.time}</div>
                        <div>
                          <div className="font-medium">{appointment.patient}</div>
                          <div className="text-sm text-gray-600">{appointment.treatment}</div>
                        </div>
                      </div>
                      <Badge variant="outline">Programat</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent AI Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>Activități AI Recente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { 
                      type: 'scan_analysis', 
                      patient: 'Ion Popescu', 
                      result: 'CBCT analizat - Densitate osoasă optimă pentru implant',
                      time: '2 min'
                    },
                    { 
                      type: 'voice_command', 
                      patient: 'Maria Ionescu', 
                      result: 'Comandă vocală procesată - Programare consultație',
                      time: '5 min'
                    },
                    { 
                      type: 'treatment_plan', 
                      patient: 'Gheorghe Pop', 
                      result: 'Plan de tratament generat automat',
                      time: '8 min'
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <div className="flex-1">
                        <div className="font-medium text-purple-900">{activity.patient}</div>
                        <div className="text-sm text-purple-700">{activity.result}</div>
                      </div>
                      <div className="text-xs text-purple-600">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="voice" className="mt-6">
          <IntelligentVoiceInterface />
        </TabsContent>

        <TabsContent value="treatments" className="mt-6">
          <TreatmentPlanningModule />
        </TabsContent>

        <TabsContent value="digital" className="mt-6">
          <DigitalWorkflowHub />
        </TabsContent>
      </Tabs>

      {/* Quick Voice Access */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Mic className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-blue-900">Acces Rapid Vocal</div>
                <div className="text-sm text-blue-700">
                  Spune "Genius" pentru a activa asistentul vocal
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 animate-pulse">
              🎤 READY
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalWorkflowDashboard;