import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Settings, CheckCircle, AlertCircle, Calendar, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClickUpTask {
  id: string;
  name: string;
  status: {
    status: string;
    color: string;
  };
  date_created: string;
  date_updated: string;
  due_date?: string;
  assignees: Array<{
    id: string;
    username: string;
    email: string;
  }>;
  custom_fields?: Array<{
    id: string;
    name: string;
    value: any;
  }>;
}

interface ClickUpSpace {
  id: string;
  name: string;
}

const ClickUpIntegration: React.FC = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('clickup_api_key') || '');
  const [isConnected, setIsConnected] = useState(false);
  const [spaces, setSpaces] = useState<ClickUpSpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState('');
  const [appointments, setAppointments] = useState<ClickUpTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const clickUpBaseUrl = 'https://api.clickup.com/api/v2';

  const connectToClickUp = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Eroare",
        description: "Introduceți API key-ul ClickUp",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`${clickUpBaseUrl}/team`, {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('API key invalid');
      }

      const data = await response.json();
      
      // Obține spaces
      const spacesResponse = await fetch(`${clickUpBaseUrl}/team/${data.teams[0].id}/space`, {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
      });

      const spacesData = await spacesResponse.json();
      setSpaces(spacesData.spaces);
      
      localStorage.setItem('clickup_api_key', apiKey);
      setIsConnected(true);

      toast({
        title: "Conectat cu succes",
        description: "ClickUp a fost conectat la sistemul medical",
      });
      
    } catch (error) {
      console.error('ClickUp connection error:', error);
      toast({
        title: "Eroare conexiune",
        description: "Verificați API key-ul ClickUp",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAppointments = async () => {
    if (!isConnected || !selectedSpace) return;

    setIsLoading(true);
    
    try {
      // Obține liste din space-ul selectat
      const listsResponse = await fetch(`${clickUpBaseUrl}/space/${selectedSpace}/list`, {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
      });

      const listsData = await listsResponse.json();
      const appointmentsList = listsData.lists.find((list: any) => 
        list.name.toLowerCase().includes('programari') || 
        list.name.toLowerCase().includes('appointments')
      );

      if (appointmentsList) {
        // Obține task-urile (programările)
        const tasksResponse = await fetch(`${clickUpBaseUrl}/list/${appointmentsList.id}/task`, {
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
        });

        const tasksData = await tasksResponse.json();
        setAppointments(tasksData.tasks);
      }

    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Eroare sincronizare",
        description: "Nu s-au putut obține programările din ClickUp",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createAppointment = async (patientName: string, datetime: string, service: string) => {
    if (!isConnected || !selectedSpace) return;

    try {
      const listsResponse = await fetch(`${clickUpBaseUrl}/space/${selectedSpace}/list`, {
        headers: {
          'Authorization': apiKey,
          'Content-Type': 'application/json',
        },
      });

      const listsData = await listsResponse.json();
      const appointmentsList = listsData.lists.find((list: any) => 
        list.name.toLowerCase().includes('programari')
      );

      if (appointmentsList) {
        const taskData = {
          name: `${patientName} - ${service}`,
          description: `Programare medicală: ${service}`,
          assignees: [],
          tags: ['programare'],
          status: 'to do',
          priority: 3,
          due_date: new Date(datetime).getTime(),
          due_date_time: true,
          custom_fields: [
            {
              id: 'patient_name',
              value: patientName
            },
            {
              id: 'service_type', 
              value: service
            }
          ]
        };

        const response = await fetch(`${clickUpBaseUrl}/list/${appointmentsList.id}/task`, {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        });

        if (response.ok) {
          toast({
            title: "Programare creată",
            description: "Programarea a fost adăugată în ClickUp",
          });
          fetchAppointments(); // Refresh appointments
        }
      }

    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: "Eroare creare",
        description: "Nu s-a putut crea programarea în ClickUp",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (apiKey) {
      setIsConnected(true);
    }
  }, []);

  useEffect(() => {
    if (selectedSpace) {
      fetchAppointments();
    }
  }, [selectedSpace]);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'to do': 'bg-slate-100 text-slate-700',
      'in progress': 'bg-blue-100 text-blue-700',
      'done': 'bg-green-100 text-green-700',
      'cancelled': 'bg-red-100 text-red-700',
    };
    return colors[status.toLowerCase()] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Integrare ClickUp</span>
            {isConnected && <CheckCircle className="w-4 h-4 text-green-600" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  API Key ClickUp
                </label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="pk_12345..."
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Obțineți API key-ul din Settings → Apps → API
                </p>
              </div>
              <Button 
                onClick={connectToClickUp}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Se conectează...' : 'Conectare ClickUp'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Conectat la ClickUp</span>
              </div>

              {spaces.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Selectați Space-ul pentru programări
                  </label>
                  <select
                    value={selectedSpace}
                    onChange={(e) => setSelectedSpace(e.target.value)}
                    className="mt-1 w-full p-2 border border-slate-300 rounded-md"
                  >
                    <option value="">Selectați space...</option>
                    {spaces.map((space) => (
                      <option key={space.id} value={space.id}>
                        {space.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <Button 
                onClick={() => setIsConnected(false)}
                variant="outline"
                size="sm"
              >
                Deconectare
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && selectedSpace && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Programări ClickUp</span>
              <Badge variant="outline">{appointments.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">Se încarcă programările...</div>
            ) : appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-slate-900">
                        {appointment.name}
                      </h3>
                      <Badge className={getStatusColor(appointment.status.status)}>
                        {appointment.status.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-slate-600">
                      {appointment.due_date && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>
                            {new Date(parseInt(appointment.due_date)).toLocaleString('ro-RO')}
                          </span>
                        </div>
                      )}
                      
                      {appointment.assignees.length > 0 && (
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>
                            {appointment.assignees.map(a => a.username).join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nu există programări în ClickUp</p>
                <p className="text-sm">Creați o listă "Programări" în space-ul selectat</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClickUpIntegration;