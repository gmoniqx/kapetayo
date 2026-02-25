import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import CafesPage from "./pages/CafesPage";
import BestMatchaPage from "./pages/BestMatchaPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import DeveloperPage from "./pages/DeveloperPage";

const queryClient = new QueryClient();

const AppContent = () => {
  useTheme();
  const [isBootLoading, setIsBootLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBootLoading(false);
    }, 3600);

    return () => window.clearTimeout(timer);
  }, []);

  if (isBootLoading) {
    return <LandingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CafesPage />} />
        <Route path="/dashboard" element={<CafesPage />} />
        <Route path="/cafes" element={<CafesPage />} />
        <Route path="/matcha" element={<BestMatchaPage />} />
        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
