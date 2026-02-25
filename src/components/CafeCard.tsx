import { Heart, MapPin, Clock, ExternalLink, GraduationCap } from "lucide-react";
import { Cafe } from "@/data/cafes";
import { Badge } from "@/components/ui/badge";
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

  const priceLabel = {
    "$": "Budget (₱40–₱90)",
    "$$": "Moderate (₱100–₱160)",
    "$$$": "Premium (₱150+)",
  };

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
        {cafe.studentFriendly && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-student-friendly text-student-friendly-foreground text-xs gap-1">
              <GraduationCap className="h-3 w-3" />
              Student Friendly
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-tight">{cafe.name}</h3>
          <span className="shrink-0 text-sm font-bold text-primary">{cafe.priceRange}</span>
        </div>

        <p className="text-xs text-muted-foreground">{priceLabel[cafe.priceRange]}</p>

        <p className="text-sm text-muted-foreground line-clamp-2">{cafe.description}</p>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{cafe.address}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3 shrink-0" />
          <span>{cafe.hours}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {cafe.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
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
