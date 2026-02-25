import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, ArrowRight, Coffee, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Offer {
  id: string | number;
  tag: string;
  title: string;
  description: string;
  brandName: string;
  promoCode?: string;
}

interface OfferCardProps {
  offer: Offer;
  onClick?: (offer: Offer) => void;
}

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const OfferCard = React.forwardRef<HTMLButtonElement, OfferCardProps>(({ offer, onClick }, ref) => (
  <motion.button
    type="button"
    ref={ref}
    className="relative flex-shrink-0 w-[265px] h-[360px] md:w-[310px] md:h-[400px] rounded-3xl overflow-hidden group snap-start border border-border/70 bg-card"
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    onClick={() => onClick?.(offer)}
  >
    <div className="absolute inset-0 h-1/2 overflow-hidden bg-muted">
      <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-secondary/70" />
      <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-accent/40" />
      <div className="absolute bottom-3 left-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
        <Coffee className="h-3.5 w-3.5 text-primary" />
        <span>Cafe Card</span>
      </div>
      <div className="absolute right-4 bottom-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
        {getInitials(offer.title)}
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-card p-4 md:p-5 flex flex-col justify-between text-center">
      <div className="space-y-2">
        {offer.tag ? (
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <Tag className="w-4 h-4 mr-2 text-primary" />
            <span>{offer.tag}</span>
          </div>
        ) : null}
        <h3 className="text-lg md:text-xl font-bold text-card-foreground leading-tight">{offer.title}</h3>
        <p className="text-sm text-muted-foreground leading-snug line-clamp-3">{offer.description}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center gap-2 text-left">
          <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-semibold">
            {getInitials(offer.brandName)}
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground line-clamp-1">{offer.brandName}</p>
            {offer.promoCode ? <p className="text-xs text-muted-foreground line-clamp-1">{offer.promoCode}</p> : null}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground transform transition-transform duration-300 group-hover:rotate-[-45deg] group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.button>
));

OfferCard.displayName = "OfferCard";

export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
  onOfferClick?: (offer: Offer) => void;
}

const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, onOfferClick, className, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const isPausedRef = React.useRef(false);

    React.useEffect(() => {
      const scroller = scrollRef.current;
      if (!scroller || typeof window === "undefined") return;

      const mediaQuery = window.matchMedia("(min-width: 768px) and (pointer: fine)");
      let intervalId: number | null = null;

      const stopAutoScroll = () => {
        if (intervalId !== null) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
      };

      const startAutoScroll = () => {
        stopAutoScroll();
        if (!mediaQuery.matches) return;

        intervalId = window.setInterval(() => {
          if (!scrollRef.current || isPausedRef.current) return;

          const current = scrollRef.current;
          const maxLeft = current.scrollWidth - current.clientWidth;
          if (maxLeft <= 0) return;

          if (current.scrollLeft >= maxLeft - 1) {
            current.scrollTo({ left: 0, behavior: "auto" });
            return;
          }

          current.scrollBy({ left: 1.8, behavior: "auto" });
        }, 16);
      };

      const onMouseEnter = () => {
        isPausedRef.current = true;
      };

      const onMouseLeave = () => {
        isPausedRef.current = false;
      };

      scroller.addEventListener("mouseenter", onMouseEnter);
      scroller.addEventListener("mouseleave", onMouseLeave);
      scroller.addEventListener("focusin", onMouseEnter);
      scroller.addEventListener("focusout", onMouseLeave);
      mediaQuery.addEventListener("change", startAutoScroll);
      startAutoScroll();

      return () => {
        stopAutoScroll();
        scroller.removeEventListener("mouseenter", onMouseEnter);
        scroller.removeEventListener("mouseleave", onMouseLeave);
        scroller.removeEventListener("focusin", onMouseEnter);
        scroller.removeEventListener("focusout", onMouseLeave);
        mediaQuery.removeEventListener("change", startAutoScroll);
      };
    }, [offers.length]);

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      if (!scrollRef.current) return;

      if (Math.abs(event.deltaY) > 0) {
        event.preventDefault();
      }
    };

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex gap-4 overflow-x-auto md:overflow-x-hidden pb-3 snap-x snap-mandatory md:snap-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onClick={onOfferClick} />
          ))}
        </div>

        {offers.length > 1 ? (
          <motion.div
            className="pointer-events-none absolute bottom-0 right-1 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-[11px] text-muted-foreground shadow-sm md:hidden"
            initial={{ opacity: 0.45, x: 0 }}
            animate={{ opacity: [0.45, 1, 0.45], x: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowLeftRight className="h-3 w-3" />
            <span>Swipe to browse</span>
          </motion.div>
        ) : null}
      </div>
    );
  },
);

OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };