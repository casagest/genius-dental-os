import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { RoleProvider } from "@/contexts/RoleContext";
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
import PatientPortal from "./pages/PatientPortal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <RoleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/dashboard" element={<MedicalDashboard />} />
          <Route path="/labsync" element={<LabSync />} />
          <Route path="/inventory" element={<InventoryBrain />} />
          <Route path="/clinical" element={<ClinicalAgent />} />
          <Route path="/marketing" element={<AIMarketing />} />
          <Route path="/allonx" element={<AllOnXHub />} />
          <Route path="/cfo" element={<CFODashboard />} />
          <Route path="/istoma-integration" element={<IStomaIntegration />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </RoleProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
