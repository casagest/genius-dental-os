import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, addMonths, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ro } from 'date-fns/locale';

interface Appointment {
  id: string;
  patient: string;
  time: string;
  service: string;
  doctor: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  duration: number;
}

interface AppointmentCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  viewMode: 'day' | 'week' | 'month';
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  selectedDate,
  onDateSelect,
  viewMode
}) => {
  // Mock appointments data
  const mockAppointments: Appointment[] = [
    {
      id: '1',
      patient: 'Maria Popescu',
      time: '09:00',
      service: 'Consultație',
      doctor: 'Dr. Ionescu',
      status: 'confirmed',
      duration: 30
    },
    {
      id: '2',
      patient: 'Ion Georgescu', 
      time: '10:30',
      service: 'Igienizare',
      doctor: 'Dr. Vasilescu',
      status: 'pending',
      duration: 60
    },
    {
      id: '3',
      patient: 'Ana Marinescu',
      time: '14:00',
      service: 'Implant consultație',
      doctor: 'Dr. Ionescu',
      status: 'confirmed',
      duration: 45
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    let newDate: Date;
    
    switch (viewMode) {
      case 'day':
        newDate = addDays(selectedDate, direction === 'next' ? 1 : -1);
        break;
      case 'week':
        newDate = addWeeks(selectedDate, direction === 'next' ? 1 : -1);
        break;
      case 'month':
        newDate = addMonths(selectedDate, direction === 'next' ? 1 : -1);
        break;
    }
    
    onDateSelect(newDate);
  };

  const getDateRangeText = () => {
    switch (viewMode) {
      case 'day':
        return format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: ro });
      case 'week':
        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const weekEnd = addDays(weekStart, 6);
        return `${format(weekStart, 'dd MMM', { locale: ro })} - ${format(weekEnd, 'dd MMM yyyy', { locale: ro })}`;
      case 'month':
        return format(selectedDate, 'MMMM yyyy', { locale: ro });
    }
  };

  const renderDayView = () => (
    <div className="space-y-3">
      {timeSlots.map((time) => {
        const appointment = mockAppointments.find(apt => apt.time === time);
        
        return (
          <div key={time} className="flex items-center space-x-4 p-2 border-b border-slate-100">
            <div className="w-16 text-sm font-medium text-slate-600">
              {time}
            </div>
            
            <div className="flex-1">
              {appointment ? (
                <div className={`p-3 rounded-lg border ${getStatusColor(appointment.status)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm opacity-75">{appointment.service}</p>
                      <p className="text-xs opacity-60">{appointment.doctor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{appointment.duration}min</p>
                      <Badge variant="outline" className="text-xs">
                        {appointment.status === 'confirmed' ? 'Confirmată' : 
                         appointment.status === 'pending' ? 'În așteptare' : 'Anulată'}
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Programare nouă
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    
    return (
      <div className="grid grid-cols-8 gap-2">
        <div className="text-center text-sm font-medium text-slate-600 p-2">Ora</div>
        
        {weekDays.map((day) => (
          <div key={day.toString()} className="text-center p-2">
            <p className="text-sm font-medium text-slate-900">
              {format(day, 'EEE', { locale: ro })}
            </p>
            <p className="text-lg font-bold text-slate-700">
              {format(day, 'dd')}
            </p>
          </div>
        ))}
        
        {timeSlots.slice(0, 12).map((time) => (
          <React.Fragment key={time}>
            <div className="text-xs text-slate-600 p-2 border-r border-slate-100">
              {time}
            </div>
            {weekDays.map((day) => (
              <div key={`${day}-${time}`} className="p-1 border border-slate-100 min-h-[50px]">
                {isSameDay(day, selectedDate) && mockAppointments.find(apt => apt.time === time) && (
                  <div className="bg-blue-100 text-blue-700 p-1 rounded text-xs">
                    {mockAppointments.find(apt => apt.time === time)?.patient}
                  </div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const firstWeekStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const paddedDays = eachDayOfInterval({ start: firstWeekStart, end: monthEnd });
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-slate-600 p-2">
            {day}
          </div>
        ))}
        
        {paddedDays.map((day) => {
          const isCurrentMonth = day >= monthStart && day <= monthEnd;
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const hasAppointments = isCurrentMonth && Math.random() > 0.7;
          
          return (
            <div 
              key={day.toString()}
              className={`
                p-2 cursor-pointer rounded-lg border transition-colors
                ${isCurrentMonth ? 'border-slate-200' : 'border-transparent'}
                ${isSelected ? 'bg-blue-100 border-blue-300' : 'hover:bg-slate-50'}
                ${isToday ? 'ring-2 ring-blue-400' : ''}
                ${!isCurrentMonth ? 'text-slate-400' : ''}
              `}
              onClick={() => onDateSelect(day)}
            >
              <div className="text-center">
                <p className={`text-sm ${isToday ? 'font-bold' : ''}`}>
                  {format(day, 'd')}
                </p>
                {hasAppointments && isCurrentMonth && (
                  <div className="flex justify-center mt-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <h3 className="text-lg font-semibold text-slate-900">
          {getDateRangeText()}
        </h3>
        
        <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="bg-white rounded-lg">
        {viewMode === 'day' && renderDayView()}
        {viewMode === 'week' && renderWeekView()}
        {viewMode === 'month' && renderMonthView()}
      </div>
    </div>
  );
};

export default AppointmentCalendar;