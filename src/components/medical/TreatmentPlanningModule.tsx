import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Plus,
  FileText,
  Activity
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Treatment {
  id: string;
  patient_id: string;
  treatment_name: string;
  specialization: string;
  description?: string;
  estimated_duration: number;
  estimated_cost: number;
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled' | 'follow_up_required';
  priority: number;
  notes: any;
  created_at: string;
}

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const TreatmentPlanningModule: React.FC = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Load treatments
      const { data: treatmentsData, error: treatmentsError } = await supabase
        .from('treatments')
        .select(`
          *,
          patients (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (treatmentsError) throw treatmentsError;

      // Load patients
      const { data: patientsData, error: patientsError } = await supabase
        .from('patients')
        .select('id, first_name, last_name, email')
        .order('first_name')
        .limit(20);

      if (patientsError) throw patientsError;

      setTreatments(treatmentsData || []);
      setPatients(patientsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Eroare la încărcarea datelor');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'follow_up_required': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned': return 'Planificat';
      case 'in_progress': return 'În desfășurare';
      case 'completed': return 'Finalizat';
      case 'cancelled': return 'Anulat';
      case 'follow_up_required': return 'Follow-up necesar';
      default: return status;
    }
  };

  const getPriorityIcon = (priority: number) => {
    if (priority >= 4) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (priority >= 3) return <Clock className="w-4 h-4 text-yellow-500" />;
    return <CheckCircle2 className="w-4 h-4 text-green-500" />;
  };

  const getSpecializationText = (specialization: string) => {
    const specializations = {
      'oral_surgery': 'Chirurgie Orală',
      'orthodontics': 'Ortodonție',
      'periodontics': 'Parodontologie',
      'endodontics': 'Endodonție',
      'prosthodontics': 'Protetică',
      'pedodontics': 'Pedodonție',
      'oral_pathology': 'Patologie Orală',
      'general_dentistry': 'Medicină Dentară Generală'
    };
    return specializations[specialization as keyof typeof specializations] || specialization;
  };

  const addNewTreatment = async (treatmentData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Nu sunteți autentificat');

      const { error } = await supabase.from('treatments').insert({
        ...treatmentData,
        created_by: user.id
      });

      if (error) throw error;

      toast.success('Tratament adăugat cu succes');
      loadData();
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding treatment:', error);
      toast.error('Eroare la adăugarea tratamentului');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Se încarcă...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="w-6 h-6 text-primary" />
              <span>Planificare Tratamente</span>
            </CardTitle>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Adaugă Tratament</span>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {treatments.filter(t => t.status === 'planned').length}
                </div>
                <div className="text-sm text-gray-600">Planificate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {treatments.filter(t => t.status === 'in_progress').length}
                </div>
                <div className="text-sm text-gray-600">În desfășurare</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {treatments.filter(t => t.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Finalizate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {treatments.reduce((sum, t) => sum + (t.estimated_cost || 0), 0).toLocaleString()} RON
                </div>
                <div className="text-sm text-gray-600">Valoare totală</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Treatments List */}
      <Card>
        <CardHeader>
          <CardTitle>Tratamente Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nu există tratamente înregistrate</p>
              </div>
            ) : (
              treatments.map((treatment) => (
                <div key={treatment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getPriorityIcon(treatment.priority)}
                        <h3 className="font-semibold text-lg">{treatment.treatment_name}</h3>
                        <Badge className={getStatusColor(treatment.status)}>
                          {getStatusText(treatment.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                        <div>Pacient: {(treatment as any).patients?.first_name} {(treatment as any).patients?.last_name}</div>
                        <div>Specializare: {getSpecializationText(treatment.specialization)}</div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{treatment.estimated_duration} minute</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{treatment.estimated_cost?.toLocaleString()} RON</span>
                        </div>
                      </div>
                      
                      {treatment.description && (
                        <p className="text-sm text-gray-700">{treatment.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm">
                        Editează
                      </Button>
                      <Button variant="default" size="sm">
                        Detalii
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voice Commands Help */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">🎤 Comenzi Vocale Disponibile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-600 space-y-1">
            <div>• "Genius, adaugă tratament implant pentru pacientul [Nume]"</div>
            <div>• "Genius, programează extracție pentru [Nume] mâine la [oră]"</div>
            <div>• "Genius, finalizează tratamentul pentru [Nume]"</div>
            <div>• "Genius, arată tratamentele în desfășurare"</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TreatmentPlanningModule;