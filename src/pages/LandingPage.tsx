import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export default function LandingPage() {
  return (
    <MobilePageShell contentClassName="min-h-[calc(100dvh-3rem)] flex items-center justify-center">
      <div className="flex min-h-[calc(100dvh-12rem)] flex-col items-center justify-center gap-4 text-center">
        <div className="h-[6.5rem] flex items-center justify-center">
          <GooeyText
            texts={["Kape", "KapeTayo!"]}
            morphTime={2.4}
            cooldownTime={0.9}
            className="font-bold"
            textClassName="text-5xl text-primary"
          />
        </div>
        <p className="text-sm text-muted-foreground">Brewing your cafe guide...</p>
      </div>
    </MobilePageShell>
  );
}
