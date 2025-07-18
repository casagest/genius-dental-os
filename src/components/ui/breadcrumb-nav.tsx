import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BreadcrumbNavProps {
  title?: string;
  showBackButton?: boolean;
  customActions?: React.ReactNode;
}

const BreadcrumbNav = ({ title, showBackButton = true, customActions }: BreadcrumbNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    const routes: Record<string, string> = {
      '/': 'Dashboard Principal',
      '/appointments': 'Programări',
      '/clinical': 'AI Clinical Agent',
      '/allonx': 'AllOnX Hub',
      '/labsync': 'Lab Sync',
      '/inventory': 'Inventory Brain',
      '/cfo': 'CFO Dashboard',
      '/marketing': 'AI Marketing',
      '/integrations': 'Integrări',
      '/sterilization': 'Sterilizare AI',
      '/payments': 'Gestionare Plăți',
      '/materials': 'Urmărire Materiale',
      '/staff': 'Management Personal',
      '/business-intelligence': 'Business Intelligence',
      '/patient-acquisition': 'Achiziție Pacienți',
      '/social-media': 'Social Media AI',
      '/istoma-integration': 'iStoma Integration',
      '/native-features': 'Native Features'
    };
    return routes[pathname] || 'Pagină Necunoscută';
  };

  const currentTitle = title || getPageTitle(location.pathname);
  const isHomePage = location.pathname === '/';

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card/50 border-b border-border/50 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {!isHomePage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHome}
              className="text-muted-foreground hover:text-foreground"
            >
              <Home className="w-4 h-4" />
            </Button>
          )}
          
          {showBackButton && !isHomePage && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
              Înapoi
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-foreground">{currentTitle}</h1>
          {!isHomePage && (
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {customActions}
        
        {!isHomePage && (
          <div className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded">
            {location.pathname}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbNav;