import React, { useState, useEffect } from 'react';
import { Activity, Database, Cpu, Shield, Wifi, HardDrive, MonitorSpeaker, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SystemMetric {
  name: string;
  value: number;
  status: 'optimal' | 'warning' | 'critical';
  unit: string;
  icon: React.ElementType;
}

export function SystemHealthMonitor() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 45, status: 'optimal', unit: '%', icon: Cpu },
    { name: 'Memory Usage', value: 67, status: 'warning', unit: '%', icon: MonitorSpeaker },
    { name: 'Database Performance', value: 92, status: 'optimal', unit: '%', icon: Database },
    { name: 'Network Latency', value: 23, status: 'optimal', unit: 'ms', icon: Network },
    { name: 'Storage Usage', value: 78, status: 'warning', unit: '%', icon: HardDrive },
    { name: 'Security Status', value: 100, status: 'optimal', unit: '%', icon: Shield }
  ]);

  const [systemStatus, setSystemStatus] = useState('operational');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10))
      })));
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'status-optimal';
      case 'warning': return 'status-warning';
      case 'critical': return 'status-critical';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getOverallStatus = () => {
    const criticalCount = systemMetrics.filter(m => m.status === 'critical').length;
    const warningCount = systemMetrics.filter(m => m.status === 'warning').length;
    
    if (criticalCount > 0) return 'critical';
    if (warningCount > 2) return 'warning';
    return 'optimal';
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health Monitor
            </CardTitle>
            <CardDescription>
              Real-time system performance and health metrics
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={getStatusColor(getOverallStatus())}>
              <Wifi className="w-3 h-3 mr-1" />
              {getOverallStatus().toUpperCase()}
            </Badge>
            <div className="text-xs text-muted-foreground">
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{metric.name}</span>
                  </div>
                  <Badge variant="outline" className={getStatusColor(metric.status)}>
                    {metric.value.toFixed(0)}{metric.unit}
                  </Badge>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                  style={{
                    background: `linear-gradient(90deg, 
                      ${metric.status === 'optimal' ? '#22c55e' : 
                        metric.status === 'warning' ? '#f59e0b' : '#ef4444'} 0%, 
                      ${metric.status === 'optimal' ? '#22c55e' : 
                        metric.status === 'warning' ? '#f59e0b' : '#ef4444'} ${metric.value}%, 
                      hsl(var(--muted)) ${metric.value}%)`
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>100{metric.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Alerts */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            System Alerts
          </h4>
          <div className="space-y-2">
            {systemMetrics
              .filter(m => m.status === 'warning' || m.status === 'critical')
              .map((metric, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {metric.status === 'warning' ? 'Monitoring required' : 'Immediate attention needed'}
                    </p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
              ))}
            {systemMetrics.filter(m => m.status === 'warning' || m.status === 'critical').length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <p className="text-sm">All systems operating normally</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}