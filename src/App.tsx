import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import CrisLab from "./pages/research/CrisLab.tsx";
import AgentOlympiad from "./pages/research/AgentOlympiad.tsx";
import PraiseLab from "./pages/research/PraiseLab.tsx";
import Todi from "./pages/work/Todi.tsx";
import Savanah from "./pages/work/Savanah.tsx";
import PatternRealism from "./pages/projects/PatternRealism.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/research/cris-lab" element={<CrisLab />} />
          <Route path="/research/agent-olympiad" element={<AgentOlympiad />} />
          <Route path="/research/praise-lab" element={<PraiseLab />} />
          <Route path="/work/todi" element={<Todi />} />
          <Route path="/work/savanah" element={<Savanah />} />
          <Route path="/projects/pattern-realism" element={<PatternRealism />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
