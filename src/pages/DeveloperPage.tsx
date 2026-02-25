import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useNavigate } from "react-router-dom";

const DEFAULT_DEVELOPER_PHOTO = "/src/assets/developer-photo.jpg";

export default function DeveloperPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [developerPhoto, setDeveloperPhoto] = useState<string>("");

  useEffect(() => {
    const savedPhoto = localStorage.getItem("kapetayo.developer.photo");
    if (savedPhoto) {
      setDeveloperPhoto(savedPhoto);
      return;
    }

    setDeveloperPhoto(DEFAULT_DEVELOPER_PHOTO);
  }, []);

  const handlePickPhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = typeof fileReader.result === "string" ? fileReader.result : "";
      if (!result) return;

      setDeveloperPhoto(result);
      localStorage.setItem("kapetayo.developer.photo", result);
    };

    fileReader.readAsDataURL(selectedFile);
  };

  const handleRemovePhoto = () => {
    setDeveloperPhoto(DEFAULT_DEVELOPER_PHOTO);
    localStorage.removeItem("kapetayo.developer.photo");
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
            <button
              type="button"
              onClick={handlePickPhoto}
              className="h-20 w-20 overflow-hidden rounded-xl border border-border/70 bg-muted/60 p-1 shadow-sm"
              aria-label="Upload developer photo"
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg border border-dashed border-border/70">
                {developerPhoto ? (
                  <img src={developerPhoto} alt="Developer" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-1 text-center text-[10px] font-medium text-muted-foreground">
                    Add your photo
                  </div>
                )}
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </div>

          {developerPhoto && developerPhoto !== DEFAULT_DEVELOPER_PHOTO ? (
            <Button variant="ghost" size="sm" className="mx-auto block h-7 rounded-full px-3 text-[11px]" onClick={handleRemovePhoto}>
              Remove photo
            </Button>
          ) : null}

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
        </section>
      </div>
    </MobilePageShell>
  );
}
