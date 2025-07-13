import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, Target } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

const BusinessMetrics = () => {
  const { currentRole } = useRole();

  // CEO sees revenue metrics, others see role-specific KPIs
  const getMetrics = () => {
    if (currentRole === 'ceo') {
      return [
        {
          title: "Progres către 20M€",
          value: "€12.4M",
          change: "+24% YTD",
          trend: "up",
          target: "€20M obiectiv 2025",
          icon: Target,
          color: "text-red-600"
        },
        {
          title: "Profit Lunar",
          value: "€1.2M",
          change: "+18% vs luna trecută", 
          trend: "up",
          target: "Marja 32%",
          icon: DollarSign,
          color: "text-green-600"
        },
        {
          title: "Pacienți Noi/Lună",
          value: "342",
          change: "+28% vs anul trecut",
          trend: "up", 
          target: "CAC €45",
          icon: Users,
          color: "text-blue-600"
        },
        {
          title: "LTV Pacient",
          value: "€2,850",
          change: "+15% improvement",
          trend: "up",
          target: "ROI 6.3x",
          icon: TrendingUp,
          color: "text-purple-600"
        }
      ];
    }

    return [
      {
        title: "Eficiență Astăzi",
        value: "94%",
        change: "+8% vs media",
        trend: "up",
        target: "Performanță optimă",
        icon: TrendingUp,
        color: "text-green-600"
      },
      {
        title: "Obiective Zilnice",
        value: "7/8",
        change: "87.5% completare",
        trend: "up", 
        target: "1 rămas activ",
        icon: Target,
        color: "text-blue-600"
      }
    ];
  };

  const metrics = getMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card key={index} className="medical-card hover-lift cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">
                  {metric.title}
                </h3>
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {metric.target}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BusinessMetrics;