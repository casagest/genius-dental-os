import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Pagina nu există</h2>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Ne pare rău, pagina pe care o căutați nu a putut fi găsită.
          </p>
        </div>
        <div className="space-y-3">
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Înapoi la Dashboard
          </a>
          <p className="text-sm text-muted-foreground">
            Dacă problema persistă, contactați echipa de suport.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
