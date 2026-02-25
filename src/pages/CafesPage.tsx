import { useState, useMemo } from "react";
import { Search, Filter, GraduationCap } from "lucide-react";
import { cafes, PriceRange } from "@/data/cafes";
import { CafeCard } from "@/components/CafeCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CafesPage() {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceRange | null>(null);
  const [studentOnly, setStudentOnly] = useState(false);

  const filtered = useMemo(() => {
    return cafes.filter((c) => {
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
      if (priceFilter && c.priceRange !== priceFilter) return false;
      if (studentOnly && !c.studentFriendly) return false;
      return true;
    });
  }, [search, priceFilter, studentOnly]);

  const prices: PriceRange[] = ["$", "$$", "$$$"];

  return (
    <div className="container py-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Explore Cafes</h1>
        <p className="text-sm text-muted-foreground">Browse {cafes.length} cafes in Marikina City</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cafes or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {prices.map((p) => (
            <Button
              key={p}
              variant={priceFilter === p ? "default" : "outline"}
              size="sm"
              onClick={() => setPriceFilter(priceFilter === p ? null : p)}
              className="text-xs"
            >
              {p}
            </Button>
          ))}
          <Button
            variant={studentOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setStudentOnly(!studentOnly)}
            className={cn("text-xs gap-1", studentOnly && "bg-student-friendly hover:bg-student-friendly/90 text-student-friendly-foreground")}
          >
            <GraduationCap className="h-3.5 w-3.5" /> Student
          </Button>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No cafes found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              isFavorite={isFavorite(cafe.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
