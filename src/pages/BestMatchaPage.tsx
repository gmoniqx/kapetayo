import { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cafes, type Cafe } from "@/data/cafes";
import { Button } from "@/components/ui/button";
import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { PageHeader } from "@/components/layout/PageHeader";

const getBestMatchaCafes = (): Cafe[] => {
  const scored = cafes
    .map((cafe) => {
      const combined = [
        cafe.name,
        cafe.description,
        ...cafe.tags,
        ...(cafe.menu?.map((item) => item.name) ?? []),
      ]
        .join(" ")
        .toLowerCase();

      if (!combined.includes("matcha")) return null;

      let score = 0;
      if (cafe.name.toLowerCase().includes("matcha")) score += 3;
      if (cafe.tags.some((tag) => tag.toLowerCase().includes("matcha"))) score += 2;
      score += (cafe.menu?.filter((item) => item.name.toLowerCase().includes("matcha")).length ?? 0) * 2;
      if (cafe.description.toLowerCase().includes("matcha")) score += 1;

      return { cafe, score };
    })
    .filter((entry): entry is { cafe: Cafe; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((entry) => entry.cafe);

  return scored;
};

export default function BestMatchaPage() {
  const navigate = useNavigate();
  const bestMatcha = useMemo(getBestMatchaCafes, []);

  return (
    <MobilePageShell>
      <motion.div className="space-y-4">
          <PageHeader
            title={(
              <>
                <span className="text-foreground">Best </span>
                <span className="text-primary">Matcha</span>
              </>
            )}
            action={(
              <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => navigate("/cafes")}>
                Back
              </Button>
            )}
          />

          {bestMatcha.length > 0 ? (
            <div className="grid gap-3">
              {bestMatcha.map((cafe) => (
                <div key={cafe.id} className="rounded-2xl border border-border/70 bg-card p-3">
                  <p className="text-base font-semibold text-card-foreground">{cafe.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{cafe.address}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{cafe.hours}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No matcha-focused cafes found.</p>
          )}
      </motion.div>
    </MobilePageShell>
  );
}
