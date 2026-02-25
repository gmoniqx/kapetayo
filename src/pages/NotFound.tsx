import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/PageHeader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <MobilePageShell contentClassName="min-h-[calc(100dvh-3rem)]">
      <PageHeader
        title={<><span className="italic">Kape</span><span className="font-extrabold">Tayo!</span></>}
        action={(
          <Button asChild variant="outline" size="sm" className="rounded-full text-xs">
            <a href="/">Home</a>
          </Button>
        )}
      />
      <div className="flex min-h-[calc(100dvh-12rem)] items-center justify-center text-center">
        <div>
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
        </div>
      </div>
    </MobilePageShell>
  );
};

export default NotFound;
