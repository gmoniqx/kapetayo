import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, GraduationCap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Offer {
  id: string | number;
  tag: string;
  title: string;
  description: string;
  /** Cafe address */
  brandName: string;
  /** Cafe hours */
  promoCode?: string;
  priceRange?: string;
  studentFriendly?: boolean;
  tags?: string[];
}

interface OfferCardProps extends React.ComponentPropsWithoutRef<"button"> {
  offer: Offer;
  colorIndex?: number;
  onOfferClick?: (offer: Offer) => void;
}

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const toPeso = (range: string) => range.replace(/\$/g, "₱");

/** Cycling gradient themes for card headers */
const HEADER_GRADIENTS = [
  "from-amber-100 via-orange-50 to-yellow-50 dark:from-amber-950/70 dark:via-orange-900/40 dark:to-yellow-900/20",
  "from-emerald-100 via-teal-50 to-cyan-50 dark:from-emerald-950/70 dark:via-teal-900/40 dark:to-cyan-900/20",
  "from-violet-100 via-purple-50 to-fuchsia-50 dark:from-violet-950/70 dark:via-purple-900/40 dark:to-fuchsia-900/20",
  "from-rose-100 via-pink-50 to-red-50 dark:from-rose-950/70 dark:via-pink-900/40 dark:to-red-900/20",
  "from-sky-100 via-blue-50 to-indigo-50 dark:from-sky-950/70 dark:via-blue-900/40 dark:to-indigo-900/20",
  "from-lime-100 via-green-50 to-emerald-50 dark:from-lime-950/70 dark:via-green-900/40 dark:to-emerald-900/20",
];

const INITIALS_COLORS = [
  "bg-amber-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-sky-500",
  "bg-lime-600",
];

function OfferCard({ offer, colorIndex = 0, onOfferClick, className, ...rest }: OfferCardProps) {
  const gradient = HEADER_GRADIENTS[colorIndex % HEADER_GRADIENTS.length];
  const initialsColor = INITIALS_COLORS[colorIndex % INITIALS_COLORS.length];
  const visibleTags = offer.tags?.slice(0, 2) ?? [];

  return (
    <motion.button
      type="button"
      className={cn(
        "relative flex-shrink-0 w-[255px] h-[330px] md:w-[285px] md:h-[355px] rounded-3xl overflow-hidden group snap-start border border-border/70 bg-card text-left",
        className,
      )}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      onClick={() => onOfferClick?.(offer)}
      {...(rest as object)}
    >
      {/* Gradient header */}
      <div className={cn("absolute inset-x-0 top-0 h-[42%] bg-gradient-to-br overflow-hidden", gradient)}>
        <div className="absolute -left-5 -top-5 h-16 w-16 rounded-full bg-white/20 dark:bg-white/5" />
        <div className="absolute -right-7 -top-3 h-20 w-20 rounded-full bg-white/15 dark:bg-white/5" />
        <div className="absolute right-5 bottom-3 h-8 w-8 rounded-full bg-white/20 dark:bg-white/5" />

        {/* Centered initials avatar */}
        <div
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-md",
            initialsColor,
          )}
        >
          {getInitials(offer.title)}
        </div>

        {/* Price badge */}
        {offer.priceRange ? (
          <div className="absolute top-2.5 right-2.5 rounded-full bg-background/80 backdrop-blur-sm px-2 py-0.5 text-[11px] font-semibold text-foreground">
            {toPeso(offer.priceRange)}
          </div>
        ) : null}
      </div>

      {/* Info area */}
      <div className="absolute inset-x-0 bottom-0 top-[42%] bg-card px-3.5 pt-2.5 pb-3 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-sm font-bold text-card-foreground leading-snug line-clamp-1 flex-1">{offer.title}</h3>
            {offer.studentFriendly ? (
              <span
                title="Student Friendly"
                className="shrink-0 ml-1 flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary"
              >
                <GraduationCap className="h-2.5 w-2.5" />
              </span>
            ) : null}
          </div>
          <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">{offer.description}</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0 mt-0.5 text-primary/70" />
            <span className="line-clamp-1">{offer.brandName}</span>
          </div>

          {offer.promoCode ? (
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3 shrink-0 text-primary/70" />
              <span className="line-clamp-1">{offer.promoCode}</span>
            </div>
          ) : null}

          <div className="flex items-center justify-between pt-1.5 border-t border-border/60">
            <div className="flex gap-1">
              {visibleTags.map((tag) => (
                <span key={tag} className="rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:-rotate-45">
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export interface OfferCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  offers: Offer[];
  onOfferClick?: (offer: Offer) => void;
}

const OfferCarousel = React.forwardRef<HTMLDivElement, OfferCarouselProps>(
  ({ offers, onOfferClick, className, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const isPausedRef = React.useRef(false);
    const [activeIndex, setActiveIndex] = React.useState(0);

    /** Track which card is centred for dot indicators */
    React.useEffect(() => {
      const scroller = scrollRef.current;
      if (!scroller) return;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const idx = Number((entry.target as HTMLElement).dataset.index ?? 0);
              setActiveIndex(idx);
            }
          }
        },
        { root: scroller, threshold: 0.55 },
      );

      scroller.querySelectorAll("[data-index]").forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    }, [offers.length]);

    /** Auto-scroll on desktop pointer devices */
    React.useEffect(() => {
      const scroller = scrollRef.current;
      if (!scroller || typeof window === "undefined") return;

      const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
      let intervalId: number | null = null;

      const stop = () => {
        if (intervalId !== null) { window.clearInterval(intervalId); intervalId = null; }
      };

      const start = () => {
        stop();
        if (!mq.matches) return;
        intervalId = window.setInterval(() => {
          if (!scrollRef.current || isPausedRef.current) return;
          const el = scrollRef.current;
          const max = el.scrollWidth - el.clientWidth;
          if (max <= 0) return;
          if (el.scrollLeft >= max - 1) { el.scrollTo({ left: 0, behavior: "auto" }); return; }
          el.scrollBy({ left: 1.8, behavior: "auto" });
        }, 16);
      };

      const pause = () => { isPausedRef.current = true; };
      const resume = () => { isPausedRef.current = false; };

      scroller.addEventListener("mouseenter", pause);
      scroller.addEventListener("mouseleave", resume);
      scroller.addEventListener("focusin", pause);
      scroller.addEventListener("focusout", resume);
      mq.addEventListener("change", start);
      start();

      return () => {
        stop();
        scroller.removeEventListener("mouseenter", pause);
        scroller.removeEventListener("mouseleave", resume);
        scroller.removeEventListener("focusin", pause);
        scroller.removeEventListener("focusout", resume);
        mq.removeEventListener("change", start);
      };
    }, [offers.length]);

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      if (!window.matchMedia("(min-width: 768px)").matches || !scrollRef.current) return;
      if (Math.abs(e.deltaY) > 0) e.preventDefault();
    };

    const scrollToIndex = (index: number) => {
      const cards = scrollRef.current?.querySelectorAll("[data-index]");
      cards?.[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    };

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex gap-3 overflow-x-auto md:overflow-x-hidden pb-2 snap-x snap-mandatory md:snap-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {offers.map((offer, index) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              colorIndex={index}
              onOfferClick={onOfferClick}
              data-index={String(index)}
            />
          ))}
        </div>

        {/* Dot indicators (mobile only) */}
        {offers.length > 1 ? (
          <div className="flex justify-center gap-1.5 pt-2 md:hidden">
            {offers.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to card ${index + 1}`}
                className={cn(
                  "rounded-full transition-all duration-200",
                  index === activeIndex ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-muted-foreground/30",
                )}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  },
);

OfferCarousel.displayName = "OfferCarousel";

export { OfferCarousel, OfferCard };