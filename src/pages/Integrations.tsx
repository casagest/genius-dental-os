import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Zap, Calendar, Book, MessageCircle } from "lucide-react";
import ClickUpIntegration from "@/components/integrations/ClickUpIntegration";
import NotionIntegration from "@/components/integrations/NotionIntegration";
import DiscordIntegration from "@/components/integrations/DiscordIntegration";

const Integrations = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Integrări MedicalCor</h1>
          <p className="text-slate-600">
            Conectați sistemul medical cu platformele pe care le folosiți deja
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">ClickUp</p>
                  <p className="text-sm text-slate-600">Task management și calendar</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Book className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Notion</p>
                  <p className="text-sm text-slate-600">Documentație și procese</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Discord</p>
                  <p className="text-sm text-slate-600">Comunicarea echipei</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Tabs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configurare Integrări</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="clickup" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="clickup" className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>ClickUp</span>
                </TabsTrigger>
                <TabsTrigger value="notion" className="flex items-center space-x-2">
                  <Book className="w-4 h-4" />
                  <span>Notion</span>
                </TabsTrigger>
                <TabsTrigger value="discord" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Discord</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="clickup" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">ClickUp Integration</h3>
                  <p className="text-slate-600 text-sm">
                    Sincronizați calendarul de programări cu ClickUp pentru a gestiona task-urile și programările 
                    în același loc. Fiecare programare va deveni un task cu toate detaliile necesare.
                  </p>
                </div>
                <ClickUpIntegration />
              </TabsContent>

              <TabsContent value="notion" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Notion Integration</h3>
                  <p className="text-slate-600 text-sm">
                    Conectați sistemul cu bazele de date Notion pentru a sincroniza informațiile pacienților, 
                    protocoalele medicale și documentația clinicii.
                  </p>
                </div>
                <NotionIntegration />
              </TabsContent>

              <TabsContent value="discord" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Discord Integration</h3>
                  <p className="text-slate-600 text-sm">
                    Configurați notificări Discord pentru echipa medicală. Primiți alerte pentru programări noi, 
                    anulări, confirmări și situații de urgență direct în canalele Discord.
                  </p>
                </div>
                <DiscordIntegration />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Beneficiile Integrărilor</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">🔄 Sincronizare Automată</h4>
                <p className="text-sm text-slate-600">
                  Toate programările și datele se sincronizează automat între platforme, 
                  eliminând munca duplicată.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">📱 Notificări în Timp Real</h4>
                <p className="text-sm text-slate-600">
                  Echipa primește notificări instant pe Discord pentru toate evenimentele 
                  importante din clinică.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">📊 Centralizare Date</h4>
                <p className="text-sm text-slate-600">
                  Toate informațiile pacienților și programărilor sunt centralizate și 
                  accesibile din orice platformă.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;