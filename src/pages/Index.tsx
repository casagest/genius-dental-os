
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, Clock, Plus, Search } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickActions from "@/components/dashboard/QuickActions";
import AIInsights from "@/components/dashboard/AIInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            MedicalCor GENIUS v1.0 - AI Operating System
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 bg-clip-text text-transparent leading-tight">
            România's Most Advanced
            <br />
            <span className="text-slate-800">Dental Intelligence</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ecosistem AI complet pentru clinică și laborator - automatizează, optimizează, crește profitabilitatea cu 120%
          </p>
        </div>

        {/* Stats Overview */}
        <StatsGrid />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calendar & Appointments */}
          <div className="lg:col-span-2 space-y-6">
            <AppointmentCalendar />
            <RecentActivity />
          </div>

          {/* Right Column - Quick Actions & AI Insights */}
          <div className="space-y-6">
            <QuickActions />
            <AIInsights />
          </div>
        </div>

        {/* AI Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <ModuleCard
            title="GENIUS Hub"
            description="Scheduling 24/7 + Chatbot AI"
            status="LIVE"
            progress={100}
            icon={<Calendar className="w-6 h-6" />}
            color="bg-green-500"
          />
          <ModuleCard
            title="LabSync"
            description="Exocad ↔ Medit ↔ ERP"
            status="DEVELOPMENT"
            progress={75}
            icon={<Clock className="w-6 h-6" />}
            color="bg-blue-500"
          />
          <ModuleCard
            title="InventoryBrain"
            description="Auto-reorder + QR Scan"
            status="PLANNING"
            progress={25}
            icon={<Search className="w-6 h-6" />}
            color="bg-orange-500"
          />
          <ModuleCard
            title="Clinical Agent"
            description="AI Diagnostics + Plans"
            status="CONCEPT"
            progress={10}
            icon={<MessageSquare className="w-6 h-6" />}
            color="bg-purple-500"
          />
          <ModuleCard
            title="AI Marketing"
            description="Lead Scoring + Campaigns"
            status="ROADMAP"
            progress={0}
            icon={<Plus className="w-6 h-6" />}
            color="bg-indigo-500"
          />
          <ModuleCard
            title="CFO Dashboard"
            description="Analytics + ANAF Sync"
            status="ROADMAP"
            progress={0}
            icon={<Plus className="w-6 h-6" />}
            color="bg-slate-500"
          />
        </div>
      </main>
    </div>
  );
};

interface ModuleCardProps {
  title: string;
  description: string;
  status: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
}

const ModuleCard = ({ title, description, status, progress, icon, color }: ModuleCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-green-100 text-green-800 border-green-200';
      case 'DEVELOPMENT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PLANNING': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'CONCEPT': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg ${color} text-white`}>
            {icon}
          </div>
          <Badge className={`text-xs font-medium border ${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
        <CardTitle className="text-lg font-bold text-slate-800">{title}</CardTitle>
        <CardDescription className="text-sm text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-semibold text-slate-800">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${color}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
          >
            {progress === 100 ? 'Access Module' : progress > 0 ? 'View Progress' : 'Learn More'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Index;
