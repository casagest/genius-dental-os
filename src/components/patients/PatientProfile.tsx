import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, CreditCard, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  medical_record_number?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  insurance_provider?: string;
  insurance_id?: string;
}

interface PatientProfileProps {
  patient: Patient | null;
  onUpdate: () => void;
}

export function PatientProfile({ patient, onUpdate }: PatientProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    first_name: patient?.first_name || '',
    last_name: patient?.last_name || '',
    phone: patient?.phone || '',
    date_of_birth: patient?.date_of_birth || '',
    emergency_contact_name: patient?.emergency_contact_name || '',
    emergency_contact_phone: patient?.emergency_contact_phone || '',
    insurance_provider: patient?.insurance_provider || '',
    insurance_id: patient?.insurance_id || ''
  });

  React.useEffect(() => {
    if (patient) {
      setFormData({
        first_name: patient.first_name || '',
        last_name: patient.last_name || '',
        phone: patient.phone || '',
        date_of_birth: patient.date_of_birth || '',
        emergency_contact_name: patient.emergency_contact_name || '',
        emergency_contact_phone: patient.emergency_contact_phone || '',
        insurance_provider: patient.insurance_provider || '',
        insurance_id: patient.insurance_id || ''
      });
    }
  }, [patient]);

  const handleSave = async () => {
    if (!patient?.id) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('patients')
        .update(formData)
        .eq('id', patient.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your information has been successfully updated."
      });

      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (patient) {
      setFormData({
        first_name: patient.first_name || '',
        last_name: patient.last_name || '',
        phone: patient.phone || '',
        date_of_birth: patient.date_of_birth || '',
        emergency_contact_name: patient.emergency_contact_name || '',
        emergency_contact_phone: patient.emergency_contact_phone || '',
        insurance_provider: patient.insurance_provider || '',
        insurance_id: patient.insurance_id || ''
      });
    }
    setIsEditing(false);
  };

  if (!patient) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Loading profile...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              My Profile
            </CardTitle>
            <CardDescription>
              Manage your personal information
            </CardDescription>
          </div>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            {isEditing ? (
              <Input
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            ) : (
              <p className="text-sm py-2">{patient.first_name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            {isEditing ? (
              <Input
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            ) : (
              <p className="text-sm py-2">{patient.last_name}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </Label>
          <p className="text-sm py-2 text-muted-foreground">{patient.email}</p>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Phone
          </Label>
          {isEditing ? (
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          ) : (
            <p className="text-sm py-2">{patient.phone || 'Not provided'}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date of Birth
          </Label>
          {isEditing ? (
            <Input
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
            />
          ) : (
            <p className="text-sm py-2">
              {patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString() : 'Not provided'}
            </p>
          )}
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">Emergency Contact</h4>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Name</Label>
              {isEditing ? (
                <Input
                  value={formData.emergency_contact_name}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                  placeholder="Emergency contact name"
                />
              ) : (
                <p className="text-sm py-2">{patient.emergency_contact_name || 'Not provided'}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              {isEditing ? (
                <Input
                  type="tel"
                  value={formData.emergency_contact_phone}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                  placeholder="Emergency contact phone"
                />
              ) : (
                <p className="text-sm py-2">{patient.emergency_contact_phone || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Insurance Information
          </h4>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Provider</Label>
              {isEditing ? (
                <Input
                  value={formData.insurance_provider}
                  onChange={(e) => setFormData({ ...formData, insurance_provider: e.target.value })}
                  placeholder="Insurance provider"
                />
              ) : (
                <p className="text-sm py-2">{patient.insurance_provider || 'Not provided'}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Policy ID</Label>
              {isEditing ? (
                <Input
                  value={formData.insurance_id}
                  onChange={(e) => setFormData({ ...formData, insurance_id: e.target.value })}
                  placeholder="Insurance policy ID"
                />
              ) : (
                <p className="text-sm py-2">{patient.insurance_id || 'Not provided'}</p>
              )}
            </div>
          </div>
        </div>

        {patient.medical_record_number && (
          <div className="pt-4 border-t">
            <Label>Medical Record Number</Label>
            <p className="text-sm py-2 font-mono">{patient.medical_record_number}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}