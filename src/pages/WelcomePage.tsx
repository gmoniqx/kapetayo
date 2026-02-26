import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MobilePageShell } from "@/components/layout/MobilePageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarPicker } from "@/components/ui/avatar-picker";

type WelcomePageProps = {
  onComplete: (profile: { name: string; bio: string }) => void;
};

export default function WelcomePage({ onComplete }: WelcomePageProps) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("Marikina Explorer");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedBio = bio.trim() || "Marikina Explorer";

    if (!trimmedName) {
      setErrorMessage("Please enter your display name.");
      return;
    }

    onComplete({ name: trimmedName, bio: trimmedBio });
    navigate("/");
  };

  return (
    <MobilePageShell>
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <PageHeader
          title={(
            <>
              <span className="italic">Welcome to </span>
              <span className="font-extrabold">KapeTayo!</span>
            </>
          )}
        />

        <section className="space-y-3 rounded-2xl border border-border/70 bg-card p-3 text-left">
          <p className="text-sm text-muted-foreground">Set up your profile to personalize your coffee journey.</p>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Display Name</p>
              <Input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                placeholder="Enter your name"
                className="h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Bio</p>
              <Input
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Add a short bio"
                className="h-11 rounded-xl"
              />
            </div>

            {errorMessage ? <p className="text-xs text-destructive">{errorMessage}</p> : null}

            <Button type="submit" className="w-full rounded-full text-xs">
              Create Account
            </Button>
          </form>
        </section>

        <section className="space-y-2 rounded-2xl border border-border/70 bg-card p-3 text-left">
          <h2 className="text-sm font-semibold text-muted-foreground">Choose an Avatar</h2>
          <AvatarPicker />
        </section>
      </motion.div>
    </MobilePageShell>
  );
}