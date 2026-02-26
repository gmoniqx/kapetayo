import { Button } from "@/components/ui/button";
import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigate } from "react-router-dom";
import developerPhoto from "@/assets/developer-photo.jpg";

export default function DeveloperPage() {
  const navigate = useNavigate();

  const handleResetOnboarding = () => {
    localStorage.removeItem("kapetayo.account.name");
    localStorage.removeItem("kapetayo.account.bio");
    localStorage.removeItem("kapetayo.account.visible");
    localStorage.removeItem("kapetayo.account.bookmarks");
    localStorage.removeItem("kapetayo.account.visited");
    localStorage.removeItem("kapetayo.account.avatarConfirmedId");
    localStorage.removeItem("kapetayo.account.onboarded");
    window.location.assign("/welcome");
  };

  return (
    <MobilePageShell>
      <div className="space-y-4">
        <PageHeader
          title="About the developer"
          action={
            <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => navigate("/")}>
              Back
            </Button>
          }
        />

        <section className="space-y-3 rounded-2xl border border-border/70 bg-card p-4 text-left">
          <div className="flex justify-center">
            <div className="h-20 w-20 overflow-hidden rounded-xl border border-border/70 bg-muted/60 p-1 shadow-sm">
              <div className="relative h-full w-full overflow-hidden rounded-lg border border-dashed border-border/70">
                <img src={developerPhoto} alt="Developer" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold">KapeTayo!</h2>
          <p className="text-sm text-muted-foreground">is built for discovering coffee spots in Marikina with a mobile-first experience.</p>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Developer:</span> Gayle Monique</p>
            <p>
              <span className="font-medium">Portfolio:</span>{" "}
              <a
                href="https://portfolio-gayle.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-2 hover:underline"
              >
                portfolio-gayle.vercel.app
              </a>
            </p>
            <p><span className="font-medium">Focus:</span> Made for coffee lovers.</p>
            <p><span className="font-medium">Version:</span> 1.0</p>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={handleResetOnboarding}>
              Reset onboarding
            </Button>
          </div>
        </section>
      </div>
    </MobilePageShell>
  );
}
