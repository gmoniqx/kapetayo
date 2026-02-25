import { Link } from "react-router-dom";
import { ArrowRight, Coffee, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCafe from "@/assets/hero-cafe.webp";

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroCafe}
          alt="Cozy cafe interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative z-10 container text-center px-4 py-20 space-y-6 max-w-2xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Discover the Best Cafes in{" "}
            <span className="text-gradient">Marikina City</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mx-auto">
            Find your perfect study spot, hangout place, or specialty coffee fix — with menus, prices, and student-friendly picks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/cafes">
              <Button size="lg" className="gap-2 font-semibold">
                <Coffee className="h-4 w-4" /> Explore Cafes <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 px-4">
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            {
              icon: MapPin,
              title: "Exact Locations",
              desc: "Get Google Maps directions to every cafe.",
            },
            {
              icon: Coffee,
              title: "Menus & Prices",
              desc: "Browse menus and know costs before you go.",
            },
            {
              icon: GraduationCap,
              title: "Student Budget",
              desc: "Filter for affordable, student-friendly cafes.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-lg border bg-card p-5 text-center space-y-2 hover:shadow-md transition-shadow"
            >
              <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <p>© 2026 KapeMarikina — Made for Marikina coffee lovers ☕</p>
      </footer>
    </div>
  );
};

export default Index;
