import { Heart, MapPin, Clock, ExternalLink } from "lucide-react";
import { Cafe } from "@/data/cafes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import cafePlaceholder from "@/assets/cafe-placeholder.webp";

interface CafeCardProps {
  cafe: Cafe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function CafeCard({ cafe, isFavorite, onToggleFavorite }: CafeCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="group rounded-lg border bg-card overflow-hidden transition-shadow hover:shadow-lg animate-fade-in">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={cafe.image || cafePlaceholder}
          alt={cafe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={() => onToggleFavorite(cafe.id)}
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors",
            isFavorite
              ? "bg-destructive/90 text-destructive-foreground"
              : "bg-background/70 text-muted-foreground hover:text-destructive"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2 text-center">
        <div className="flex flex-col items-center justify-center gap-1">
          <h3 className="text-lg font-semibold leading-tight">{cafe.name}</h3>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{cafe.description}</p>

        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{cafe.address}</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3 shrink-0" />
          <span>{cafe.hours}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <a href={cafe.mapUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs gap-1">
              <ExternalLink className="h-3 w-3" /> Directions
            </Button>
          </a>
          {cafe.menu && (
            <Button
              variant="secondary"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? "Hide Menu" : "View Menu"}
            </Button>
          )}
        </div>

        {/* Menu */}
        {showMenu && cafe.menu && (
          <div className="mt-2 rounded-md bg-muted p-3 space-y-1 animate-fade-in">
            <p className="text-xs font-semibold text-foreground mb-1">Menu</p>
            {cafe.menu.map((item) => (
              <div key={item.name} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium text-foreground">₱{item.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
