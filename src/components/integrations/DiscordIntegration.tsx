import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send, Users, Bell, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiscordWebhook {
  name: string;
  url: string;
  description: string;
}

const DiscordIntegration: React.FC = () => {
  const [webhooks, setWebhooks] = useState<DiscordWebhook[]>(() => {
    const saved = localStorage.getItem('discord_webhooks');
    return saved ? JSON.parse(saved) : [];
  });
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    description: ''
  });
  const [testMessage, setTestMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const saveWebhooks = (updatedWebhooks: DiscordWebhook[]) => {
    setWebhooks(updatedWebhooks);
    localStorage.setItem('discord_webhooks', JSON.stringify(updatedWebhooks));
  };

  const addWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast({
        title: "Eroare",
        description: "Completați numele și URL-ul webhook-ului",
        variant: "destructive",
      });
      return;
    }

    const updatedWebhooks = [...webhooks, { ...newWebhook }];
    saveWebhooks(updatedWebhooks);
    
    setNewWebhook({ name: '', url: '', description: '' });
    
    toast({
      title: "Webhook adăugat",
      description: "Webhook-ul Discord a fost configurat cu succes",
    });
  };

  const removeWebhook = (index: number) => {
    const updatedWebhooks = webhooks.filter((_, i) => i !== index);
    saveWebhooks(updatedWebhooks);
    
    toast({
      title: "Webhook șters",
      description: "Webhook-ul a fost eliminat",
    });
  };

  const sendDiscordMessage = async (webhookUrl: string, message: string, title?: string) => {
    try {
      const payload = {
        embeds: [
          {
            title: title || "📅 Notificare Clinică MedicalCor",
            description: message,
            color: 3066993, // Verde
            timestamp: new Date().toISOString(),
            footer: {
              text: "Sistema Medicală MedicalCor"
            }
          }
        ]
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return response.ok;
    } catch (error) {
      console.error('Error sending Discord message:', error);
      return false;
    }
  };

  const testWebhook = async (webhookUrl: string, webhookName: string) => {
    setIsLoading(true);
    
    const message = testMessage || `Test notificare din sistemul medical MedicalCor la ${new Date().toLocaleString('ro-RO')}`;
    
    const success = await sendDiscordMessage(
      webhookUrl, 
      message,
      "🔬 Test Webhook Clinică"
    );

    if (success) {
      toast({
        title: "Mesaj trimis",
        description: `Notificarea a fost trimisă pe ${webhookName}`,
      });
    } else {
      toast({
        title: "Eroare trimitere",
        description: "Nu s-a putut trimite mesajul pe Discord",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  // Funcții pentru notificări specifice clinicii
  const sendAppointmentNotification = async (webhookUrl: string, appointment: {
    patient: string;
    time: string;
    service: string;
    doctor: string;
    type: 'created' | 'cancelled' | 'confirmed' | 'reminder';
  }) => {
    let title = "";
    let message = "";
    let color = 3066993; // Verde default

    switch (appointment.type) {
      case 'created':
        title = "📅 Programare Nouă Creată";
        message = `**Pacient:** ${appointment.patient}\n**Ora:** ${appointment.time}\n**Serviciu:** ${appointment.service}\n**Doctor:** ${appointment.doctor}`;
        color = 3066993; // Verde
        break;
      case 'cancelled':
        title = "❌ Programare Anulată";
        message = `**Pacient:** ${appointment.patient}\n**Ora:** ${appointment.time}\n**Serviciu:** ${appointment.service}`;
        color = 15158332; // Roșu
        break;
      case 'confirmed':
        title = "✅ Programare Confirmată";
        message = `**Pacient:** ${appointment.patient}\n**Ora:** ${appointment.time}\n**Doctor:** ${appointment.doctor}`;
        color = 3066993; // Verde
        break;
      case 'reminder':
        title = "⏰ Reminder Programare";
        message = `**Pacient:** ${appointment.patient}\n**Ora:** ${appointment.time} (în 1 oră)\n**Serviciu:** ${appointment.service}`;
        color = 16776960; // Galben
        break;
    }

    return await sendDiscordMessage(webhookUrl, message, title);
  };

  const sendEmergencyAlert = async (webhookUrl: string, alert: {
    message: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }) => {
    const colors = {
      low: 3066993,      // Verde
      medium: 16776960,  // Galben
      high: 16753920,    // Portocaliu
      critical: 15158332 // Roșu
    };

    const icons = {
      low: "ℹ️",
      medium: "⚠️",
      high: "🚨",
      critical: "🔴"
    };

    return await sendDiscordMessage(
      webhookUrl,
      alert.message,
      `${icons[alert.priority]} Alertă ${alert.priority.toUpperCase()} - Clinică`
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Integrare Discord</span>
            <Badge variant="outline">{webhooks.length} webhook(s)</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Nume webhook
              </label>
              <Input
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                placeholder="ex: Programări"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Descriere (opțional)
              </label>
              <Input
                value={newWebhook.description}
                onChange={(e) => setNewWebhook({ ...newWebhook, description: e.target.value })}
                placeholder="ex: Notificări pentru programări"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              URL Webhook Discord
            </label>
            <Input
              value={newWebhook.url}
              onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
              placeholder="https://discord.com/api/webhooks/..."
              className="mt-1"
            />
            <p className="text-xs text-slate-500 mt-1">
              Obțineți webhook-ul din Server Settings → Integrations → Webhooks
            </p>
          </div>

          <Button onClick={addWebhook} className="w-full">
            Adaugă Webhook
          </Button>
        </CardContent>
      </Card>

      {webhooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Webhook-uri Configurate</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {webhooks.map((webhook, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-slate-900">{webhook.name}</h3>
                    {webhook.description && (
                      <p className="text-sm text-slate-600">{webhook.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testWebhook(webhook.url, webhook.name)}
                      disabled={isLoading}
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Test
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeWebhook(index)}
                    >
                      Șterge
                    </Button>
                  </div>
                </div>
                
                <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2 rounded">
                  {webhook.url.substring(0, 50)}...
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {webhooks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Test Notificări</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Mesaj test (opțional)
              </label>
              <Textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="Introduceți un mesaj personalizat pentru test..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  webhooks.forEach(webhook => {
                    sendAppointmentNotification(webhook.url, {
                      patient: "Ion Popescu",
                      time: "14:30",
                      service: "Consultație",
                      doctor: "Dr. Ionescu",
                      type: 'created'
                    });
                  });
                }}
                className="w-full"
              >
                <Bell className="w-4 h-4 mr-2" />
                Test Programare Nouă
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  webhooks.forEach(webhook => {
                    sendEmergencyAlert(webhook.url, {
                      message: "Test alertă pentru sistemul medical",
                      priority: 'medium'
                    });
                  });
                }}
                className="w-full"
              >
                <Bell className="w-4 h-4 mr-2" />
                Test Alertă
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DiscordIntegration;