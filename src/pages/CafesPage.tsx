import { useState, useMemo, useEffect } from "react";
import { Search, Coffee, House, Bookmark, Clock3, Info, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { cafes, type Cafe } from "@/data/cafes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OfferCarousel, type Offer } from "@/components/ui/offer-carousel";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuBar, type MenuBarItem } from "@/components/ui/bottom-menu";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { avatarOptions, AvatarPicker } from "@/components/ui/avatar-picker";

const normalizeSearch = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const isOneEditAway = (source: string, target: string) => {
  if (Math.abs(source.length - target.length) > 1) return false;

  let i = 0;
  let j = 0;
  let edits = 0;

  while (i < source.length && j < target.length) {
    if (source[i] === target[j]) {
      i += 1;
      j += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) return false;

    if (source.length > target.length) {
      i += 1;
    } else if (source.length < target.length) {
      j += 1;
    } else {
      i += 1;
      j += 1;
    }
  }

  if (i < source.length || j < target.length) edits += 1;
  return edits <= 1;
};

export default function CafesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [accountBio, setAccountBio] = useState("Marikina Explorer");
  const [isAccountVisible, setIsAccountVisible] = useState(true);
  const [chosenAvatarId, setChosenAvatarId] = useState<number | null>(() => {
    const savedAvatarId = localStorage.getItem("kapetayo.account.avatarConfirmedId");
    if (!savedAvatarId) return null;

    const parsedAvatarId = Number(savedAvatarId);
    return Number.isFinite(parsedAvatarId) ? parsedAvatarId : null;
  });
  const [hasChosenAvatar, setHasChosenAvatar] = useState(
    () => localStorage.getItem("kapetayo.account.avatarConfirmedId") !== null,
  );
  const [bookmarkedCafeIds, setBookmarkedCafeIds] = useState<string[]>(["2", "14", "1"]);
  const [visitedCafeIds, setVisitedCafeIds] = useState<string[]>(["3", "5"]);
  const isHomePage = location.pathname === "/";
  const isDashboardPage = location.pathname === "/dashboard";
  const isCafesPage = location.pathname === "/cafes";
  const hasSearch = search.trim().length > 0;
  const displayName = accountName.trim() || "Coffee Lover";
  const hasSetName = accountName.trim().length > 0;
  const dashboardTitle = `Hi ${displayName}, kape tayo!`;

  useEffect(() => {
    const savedName = localStorage.getItem("kapetayo.account.name");
    const savedBio = localStorage.getItem("kapetayo.account.bio");
    const savedAccountVisible = localStorage.getItem("kapetayo.account.visible");
    const savedAvatarId = localStorage.getItem("kapetayo.account.avatarConfirmedId");
    const savedBookmarks = localStorage.getItem("kapetayo.account.bookmarks");
    const savedVisited = localStorage.getItem("kapetayo.account.visited");

    if (savedName !== null) setAccountName(savedName);
    if (savedBio !== null) setAccountBio(savedBio);
    if (savedAccountVisible !== null) setIsAccountVisible(savedAccountVisible === "true");
    if (savedAvatarId !== null) {
      const parsedAvatarId = Number(savedAvatarId);
      if (Number.isFinite(parsedAvatarId)) {
        setChosenAvatarId(parsedAvatarId);
        setHasChosenAvatar(true);
      }
    }

    if (savedBookmarks) {
      try {
        const parsedBookmarks = JSON.parse(savedBookmarks) as unknown;
        if (Array.isArray(parsedBookmarks) && parsedBookmarks.every((value) => typeof value === "string")) {
          setBookmarkedCafeIds(parsedBookmarks);
        }
      } catch {
        localStorage.removeItem("kapetayo.account.bookmarks");
      }
    }

    if (savedVisited) {
      try {
        const parsedVisited = JSON.parse(savedVisited) as unknown;
        if (Array.isArray(parsedVisited) && parsedVisited.every((value) => typeof value === "string")) {
          setVisitedCafeIds(parsedVisited);
        }
      } catch {
        localStorage.removeItem("kapetayo.account.visited");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kapetayo.account.name", accountName);
  }, [accountName]);

  useEffect(() => {
    localStorage.setItem("kapetayo.account.bio", accountBio);
  }, [accountBio]);

  useEffect(() => {
    localStorage.setItem("kapetayo.account.visible", String(isAccountVisible));
  }, [isAccountVisible]);

  useEffect(() => {
    localStorage.setItem("kapetayo.account.bookmarks", JSON.stringify(bookmarkedCafeIds));
  }, [bookmarkedCafeIds]);

  useEffect(() => {
    localStorage.setItem("kapetayo.account.visited", JSON.stringify(visitedCafeIds));
  }, [visitedCafeIds]);

  const chosenAvatar = useMemo(() => {
    if (chosenAvatarId === null) return null;
    return avatarOptions.find((avatar) => avatar.id === chosenAvatarId) ?? null;
  }, [chosenAvatarId]);

  const filtered = useMemo(() => {
    return cafes.filter((c) => {
      if (search.trim()) {
        const queryTokens = normalizeSearch(search).split(" ").filter(Boolean);

        const searchableContent = [
          c.name,
          c.address,
          c.description,
          c.hours,
          c.priceRange,
          ...c.tags,
          ...(c.menu?.map((item) => item.name) ?? []),
        ].join(" ");

        const normalizedContent = normalizeSearch(searchableContent);
        const words = normalizedContent.split(" ").filter(Boolean);

        const matchesToken = (token: string) => {
          if (normalizedContent.includes(token)) return true;

          return words.some((word) => {
            if (word.startsWith(token) || token.startsWith(word)) return true;
            if (token.length >= 4 && word.length >= 4) {
              return isOneEditAway(word, token);
            }
            return false;
          });
        };

        if (!queryTokens.every(matchesToken)) return false;
      }
      return true;
    });
  }, [search]);

  const mustVisit = cafes.slice(0, 3);
  const bookmarkedCafes = useMemo(() => cafes.filter((cafe) => bookmarkedCafeIds.includes(cafe.id)), [bookmarkedCafeIds]);
  const visitedCafes = useMemo(() => cafes.filter((cafe) => visitedCafeIds.includes(cafe.id)), [visitedCafeIds]);

  const toggleBookmark = (cafeId: string) => {
    setBookmarkedCafeIds((currentIds) =>
      currentIds.includes(cafeId) ? currentIds.filter((id) => id !== cafeId) : [...currentIds, cafeId],
    );
  };

  const markVisited = (cafeId: string) => {
    setVisitedCafeIds((currentIds) => (currentIds.includes(cafeId) ? currentIds : [...currentIds, cafeId]));
  };

  const toggleVisited = (cafeId: string) => {
    setVisitedCafeIds((currentIds) =>
      currentIds.includes(cafeId) ? currentIds.filter((id) => id !== cafeId) : [...currentIds, cafeId],
    );
  };

  const offers: Offer[] = filtered.map((cafe) => ({
    id: cafe.id,
    tag: "",
    title: cafe.name,
    description: cafe.description,
    brandName: cafe.address,
    promoCode: cafe.hours,
  }));
  const menuItems: MenuBarItem[] = [
    { icon: House, label: "Home" },
    { icon: Coffee, label: "Cafes" },
  ];
  const selectedIndex = location.pathname === "/dashboard" || location.pathname === "/cafes" ? 1 : 0;

  const fadeUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: "easeOut" as const },
  };

  return (
    <MobilePageShell>
      <motion.div className="space-y-4" {...fadeUp}>
          <motion.div {...fadeUp}>
            <PageHeader
              title={
                isDashboardPage || (isCafesPage && hasSetName) ? (
                  <span className="text-xl font-semibold leading-tight sm:text-2xl">{dashboardTitle}</span>
                ) : (
                  <>
                    <span className="italic">Kape</span>
                    <span className="font-extrabold">Tayo!</span>
                  </>
                )
              }
              action={(
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                    onClick={() => navigate("/developer")}
                    aria-label="Open developer page"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <AnimatedThemeToggle className="h-9 rounded-full soft-transition" />
                </div>
              )}
            />
          </motion.div>

          {!isHomePage ? (
            <motion.div className="w-full" whileFocus={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cafes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 rounded-2xl border-border/70 bg-card pl-9 soft-transition"
                />
              </div>
            </motion.div>
          ) : null}

          <motion.div className="flex items-center justify-center gap-2" whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
            <MenuBar
              items={menuItems}
              selectedIndex={selectedIndex}
              onItemClick={(index) => navigate(index === 0 ? "/" : "/cafes")}
            />
            {!isHomePage ? (
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.15 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/matcha")}
                  className="rounded-full text-xs soft-transition"
                >
                  For Matcha Lovers
                </Button>
              </motion.div>
            ) : null}
          </motion.div>

          {isHomePage ? (
            <motion.section
              className="space-y-2 rounded-2xl border border-border/70 bg-card p-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-muted-foreground">Account</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-full px-2 text-[11px]"
                  onClick={() => setIsAccountVisible((currentValue) => !currentValue)}
                >
                  {isAccountVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  <span className="ml-1">{isAccountVisible ? "Hide" : "Show"}</span>
                </Button>
              </div>
              {isAccountVisible ? (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{displayName} • {accountBio}</p>
                    {chosenAvatar ? (
                      <div className="h-8 w-8 overflow-hidden rounded-full border border-border/70 bg-muted/40" aria-label="Chosen avatar">
                        <div className="h-full w-full scale-[1.85]">{chosenAvatar.svg}</div>
                      </div>
                    ) : null}
                  </div>
                  {!hasChosenAvatar ? <AvatarPicker /> : null}
                </>
              ) : (
                <p className="text-xs text-muted-foreground">Account section hidden. Tap Show to expand.</p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full text-xs"
                onClick={() => setIsAccountOpen(true)}
              >
                Tap to view account
              </Button>
            </motion.section>
          ) : null}

          {!isHomePage ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-lg font-semibold">{hasSearch ? "Results" : "Popular Cafes"}</h2>
                <p className="text-sm text-muted-foreground">Tap card for details</p>
              </div>

              {filtered.length === 0 ? (
                <motion.div
                  className="rounded-2xl bg-card py-12 text-muted-foreground"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="text-lg">No cafes found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </motion.div>
              ) : (
                <motion.div
                  className="w-full rounded-2xl bg-card p-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <OfferCarousel offers={offers} onOfferClick={(offer) => {
                    const cafe = cafes.find((item) => item.id === String(offer.id));
                    if (cafe) {
                      markVisited(cafe.id);
                    }
                    setSelectedCafe(cafe ?? null);
                  }} />
                </motion.div>
              )}
            </div>
          ) : null}

          {isHomePage ? (
            <>
              <motion.section
                className="space-y-3 text-left rounded-2xl border border-border/70 bg-card p-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-primary" />
                  <h2 className="text-lg font-semibold">Your Bookmarks</h2>
                </div>
                {bookmarkedCafes.length > 0 ? (
                  <div className="grid gap-3">
                    {bookmarkedCafes.map((cafe) => (
                      <div key={cafe.id} className="rounded-2xl border border-border/70 bg-card p-3">
                        <p className="text-base font-semibold text-card-foreground">{cafe.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{cafe.address}</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <p className="text-xs text-muted-foreground">{cafe.hours}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 rounded-full px-3 text-[11px]"
                            onClick={() => toggleBookmark(cafe.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No bookmarks yet. Tap cafes to save them.</p>
                )}
              </motion.section>

              <motion.section
                className="space-y-3 text-left rounded-2xl border border-border/70 bg-card p-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  <h2 className="text-lg font-semibold">Visited Cafes</h2>
                </div>
                {visitedCafes.length > 0 ? (
                  <div className="grid gap-3">
                    {visitedCafes.map((cafe) => (
                      <div key={cafe.id} className="rounded-2xl border border-border/70 bg-card p-3">
                        <p className="text-base font-semibold text-card-foreground">{cafe.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{cafe.address}</p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <p className="text-xs text-muted-foreground">{cafe.hours}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 rounded-full px-3 text-[11px]"
                            onClick={() => toggleVisited(cafe.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No visited cafes yet. Opening cafe details marks them as visited.</p>
                )}
              </motion.section>
            </>
          ) : null}

          {!isHomePage ? (
            <>
              <motion.section
                className="space-y-3 text-left rounded-2xl border border-border/70 bg-card p-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h2 className="text-lg font-semibold">Must Visit</h2>
                <div className="grid gap-3">
                  {mustVisit.map((cafe) => (
                    <div key={cafe.id} className="rounded-2xl border border-border/70 bg-card p-3">
                      <p className="text-base font-semibold text-card-foreground">{cafe.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{cafe.address}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground">{cafe.hours}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={bookmarkedCafeIds.includes(cafe.id) ? "default" : "outline"}
                            className="h-7 rounded-full px-3 text-[11px]"
                            onClick={() => toggleBookmark(cafe.id)}
                          >
                            {bookmarkedCafeIds.includes(cafe.id) ? "Saved" : "Save"}
                          </Button>
                          <Button
                            size="sm"
                            variant={visitedCafeIds.includes(cafe.id) ? "default" : "outline"}
                            className="h-7 rounded-full px-3 text-[11px]"
                            onClick={() => toggleVisited(cafe.id)}
                          >
                            {visitedCafeIds.includes(cafe.id) ? "Visited" : "Mark Visited"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              <footer className="rounded-2xl bg-secondary px-4 py-3 text-center text-xs text-secondary-foreground">
                <p>KapeTayo! • Discover your next coffee stop in Marikina</p>
              </footer>
            </>
          ) : null}
      </motion.div>

      <Dialog open={Boolean(selectedCafe)} onOpenChange={(open) => !open && setSelectedCafe(null)}>
        <DialogContent className="sm:max-w-xl text-left">
          {selectedCafe ? (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>{selectedCafe.name}</DialogTitle>
                <DialogDescription>{selectedCafe.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Exact location:</span> {selectedCafe.address}</p>
                <p><span className="font-medium">Hours:</span> {selectedCafe.hours}</p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Menu</h3>
                {selectedCafe.menu?.length ? (
                  <ul className="space-y-1 text-sm">
                    {selectedCafe.menu.map((item) => (
                      <li key={item.name} className="flex items-center justify-between border-b border-border/60 pb-1">
                        <span>{item.name}</span>
                        {typeof item.price === "number" ? (
                          <span className="text-muted-foreground">₱{item.price}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Menu not available.</p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <Button
                  size="sm"
                  variant={visitedCafeIds.includes(selectedCafe.id) ? "default" : "outline"}
                  className="rounded-full text-xs"
                  onClick={() => toggleVisited(selectedCafe.id)}
                >
                  {visitedCafeIds.includes(selectedCafe.id) ? "Remove from visited" : "Add to visited"}
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog open={isAccountOpen} onOpenChange={setIsAccountOpen}>
        <DialogContent className="sm:max-w-md text-left">
          <div className="space-y-4">
            <DialogHeader>
              <DialogTitle>My Account</DialogTitle>
              <DialogDescription>Edit your profile details. Changes are auto-saved.</DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Display Name</p>
              <Input
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
                placeholder="Enter your name"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Bio</p>
              <Input
                value={accountBio}
                onChange={(event) => setAccountBio(event.target.value)}
                placeholder="Add a short bio"
                className="h-10 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Button size="sm" className="rounded-full text-xs" onClick={() => setIsAccountOpen(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MobilePageShell>
  );
}
