import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import CafesPage from "./pages/CafesPage";
import BestMatchaPage from "./pages/BestMatchaPage";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import DeveloperPage from "./pages/DeveloperPage";
import WelcomePage from "./pages/WelcomePage";

const queryClient = new QueryClient();

const AppContent = () => {
  useTheme();
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    const isMarkedOnboarded = localStorage.getItem("kapetayo.account.onboarded") === "true";
    const hasSavedName = Boolean(localStorage.getItem("kapetayo.account.name")?.trim());
    return isMarkedOnboarded || hasSavedName;
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBootLoading(false);
    }, 3600);

    return () => window.clearTimeout(timer);
  }, []);

  if (isBootLoading) {
    return <LandingPage />;
  }

  const handleOnboardingComplete = (profile: { name: string; bio: string }) => {
    localStorage.setItem("kapetayo.account.name", profile.name);
    localStorage.setItem("kapetayo.account.bio", profile.bio);
    localStorage.setItem("kapetayo.account.visible", "true");
    localStorage.setItem("kapetayo.account.onboarded", "true");
    setHasCompletedOnboarding(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/welcome"
          element={
            hasCompletedOnboarding ? (
              <Navigate to="/" replace />
            ) : (
              <WelcomePage onComplete={handleOnboardingComplete} />
            )
          }
        />
        <Route path="/" element={hasCompletedOnboarding ? <CafesPage /> : <Navigate to="/welcome" replace />} />
        <Route path="/dashboard" element={hasCompletedOnboarding ? <CafesPage /> : <Navigate to="/welcome" replace />} />
        <Route path="/cafes" element={hasCompletedOnboarding ? <CafesPage /> : <Navigate to="/welcome" replace />} />
        <Route path="/matcha" element={hasCompletedOnboarding ? <BestMatchaPage /> : <Navigate to="/welcome" replace />} />
        <Route path="/developer" element={hasCompletedOnboarding ? <DeveloperPage /> : <Navigate to="/welcome" replace />} />
        <Route path="*" element={hasCompletedOnboarding ? <NotFound /> : <Navigate to="/welcome" replace />} />
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
