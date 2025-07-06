import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Appointments from "./pages/Appointments";
import Integrations from "./pages/Integrations";
import MedicalDashboard from "./pages/MedicalDashboard";
import LabSync from "./pages/LabSync";
import InventoryBrain from "./pages/InventoryBrain";
import ClinicalAgent from "./pages/ClinicalAgent";
import AIMarketing from "./pages/AIMarketing";
import AllOnXHub from "./pages/AllOnXHub";
import CFODashboard from "./pages/CFODashboard";
import IStomaIntegration from "./pages/IStomaIntegration";
import { AuthGuard } from "@/components/auth/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/appointments" element={<AuthGuard><Appointments /></AuthGuard>} />
              <Route path="/integrations" element={<AuthGuard><Integrations /></AuthGuard>} />
              <Route path="/dashboard" element={<AuthGuard><MedicalDashboard /></AuthGuard>} />
              <Route path="/labsync" element={<AuthGuard><LabSync /></AuthGuard>} />
              <Route path="/inventory" element={<AuthGuard><InventoryBrain /></AuthGuard>} />
              <Route path="/clinical" element={<AuthGuard><ClinicalAgent /></AuthGuard>} />
              <Route path="/marketing" element={<AuthGuard><AIMarketing /></AuthGuard>} />
              <Route path="/allonx" element={<AuthGuard><AllOnXHub /></AuthGuard>} />
              <Route path="/cfo" element={<AuthGuard><CFODashboard /></AuthGuard>} />
              <Route path="/istoma-integration" element={<AuthGuard><IStomaIntegration /></AuthGuard>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
