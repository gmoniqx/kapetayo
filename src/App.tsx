import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { useTheme } from "@/hooks/useTheme";
import Index from "./pages/Index";
import CafesPage from "./pages/CafesPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { dark, toggle } = useTheme();

  return (
    <BrowserRouter>
      <SiteHeader dark={dark} toggleTheme={toggle} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cafes" element={<CafesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
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
