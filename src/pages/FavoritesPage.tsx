import { cafes } from "@/data/cafes";
import { CafeCard } from "@/components/CafeCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const favCafes = cafes.filter((c) => favorites.includes(c.id));

  return (
    <div className="container py-6 px-4 space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Your Favorites</h1>
        <p className="text-sm text-muted-foreground">{favCafes.length} saved cafe{favCafes.length !== 1 ? "s" : ""}</p>
      </div>

      {favCafes.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <p className="text-muted-foreground">No favorites yet</p>
          <Link to="/cafes">
            <Button variant="outline" size="sm">Browse Cafes</Button>
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favCafes.map((cafe) => (
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
