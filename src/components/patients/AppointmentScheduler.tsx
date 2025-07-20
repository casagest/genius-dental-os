import React, { useState } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AppointmentSchedulerProps {
  patientId?: string;
  onAppointmentScheduled: () => void;
}

export function AppointmentScheduler({ patientId, onAppointmentScheduled }: AppointmentSchedulerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [appointmentData, setAppointmentData] = useState({
    type: '',
    date: '',
    time: '',
    notes: ''
  });

  const appointmentTypes = [
    { value: 'consultation', label: 'Initial Consultation', duration: 60 },
    { value: 'cleaning', label: 'Routine Cleaning', duration: 45 },
    { value: 'filling', label: 'Dental Filling', duration: 90 },
    { value: 'extraction', label: 'Tooth Extraction', duration: 120 },
    { value: 'implant', label: 'Dental Implant', duration: 180 },
    { value: 'crown', label: 'Crown Placement', duration: 120 },
    { value: 'checkup', label: 'Regular Checkup', duration: 30 },
    { value: 'emergency', label: 'Emergency Visit', duration: 60 }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientId) {
      toast({
        title: "Error",
        description: "Patient information not found",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const selectedType = appointmentTypes.find(type => type.value === appointmentData.type);
      const appointmentDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);

      const { error } = await supabase
        .from('patient_appointments')
        .insert({
          patient_id: patientId,
          appointment_date: appointmentDateTime.toISOString(),
          appointment_type: selectedType?.label || appointmentData.type,
          duration_minutes: selectedType?.duration || 60,
          notes: appointmentData.notes,
          status: 'scheduled'
        });

      if (error) throw error;

      toast({
        title: "Appointment scheduled!",
        description: `Your ${selectedType?.label} has been scheduled for ${new Date(appointmentDateTime).toLocaleDateString()}`
      });

      setAppointmentData({ type: '', date: '', time: '', notes: '' });
      setIsOpen(false);
      onAppointmentScheduled();
    } catch (error: any) {
      toast({
        title: "Scheduling failed",
        description: error.message || "Unable to schedule appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedule Appointment
        </CardTitle>
        <CardDescription>
          Book your next dental appointment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>
                Choose your preferred appointment type, date, and time.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-type">Appointment Type</Label>
                <Select 
                  value={appointmentData.type} 
                  onValueChange={(value) => setAppointmentData({ ...appointmentData, type: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label} ({type.duration} mins)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-date">Date</Label>
                <Input
                  id="appointment-date"
                  type="date"
                  min={getTomorrowDate()}
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-time">Time</Label>
                <Select 
                  value={appointmentData.time} 
                  onValueChange={(value) => setAppointmentData({ ...appointmentData, time: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-notes">Notes (Optional)</Label>
                <Textarea
                  id="appointment-notes"
                  placeholder="Any specific concerns or requests?"
                  value={appointmentData.notes}
                  onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Scheduling..." : "Schedule Appointment"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Available Hours</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}