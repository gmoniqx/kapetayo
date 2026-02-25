import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { PageHeader } from "@/components/layout/PageHeader";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      navigate("/cafes", { replace: true });
    }, 900);

    return () => window.clearTimeout(timeout);
  }, [navigate]);

  return (
    <MobilePageShell contentClassName="min-h-[calc(100dvh-3rem)]">
      <PageHeader title={<><span className="italic">Kape</span><span className="font-extrabold">Tayo!</span></>} />
      <div className="flex min-h-[calc(100dvh-12rem)] items-center justify-center text-center">
        <h2 className="text-base text-muted-foreground">Loading cafes...</h2>
      </div>
    </MobilePageShell>
  );
};

export default Index;
