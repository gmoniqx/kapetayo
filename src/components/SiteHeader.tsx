import { Link, useLocation } from "react-router-dom";
import { Coffee, Heart, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  dark: boolean;
  toggleTheme: () => void;
}

export function SiteHeader({ dark, toggleTheme }: SiteHeaderProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/cafes", label: "Cafes" },
    { to: "/favorites", label: "Favorites" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container max-w-5xl mx-auto px-4 py-2">
        <div className="relative flex items-center justify-center py-1">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary">
            <Coffee className="h-5 w-5" />
            <span><span className="italic">Kape</span><span className="font-extrabold">Tayo!</span></span>
          </Link>

          <div className="absolute right-0 flex md:hidden items-center gap-1">
            <ThemeToggle dark={dark} toggle={toggleTheme} />
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <nav className="hidden md:flex items-center justify-center gap-1 pt-2 border-t">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                location.pathname === l.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {l.to === "/favorites" && <Heart className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />}
              {l.label}
            </Link>
          ))}
          <ThemeToggle dark={dark} toggle={toggleTheme} />
        </nav>

      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t bg-background px-4 pb-3 pt-2 space-y-1 animate-fade-in text-center">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium",
                location.pathname === l.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
