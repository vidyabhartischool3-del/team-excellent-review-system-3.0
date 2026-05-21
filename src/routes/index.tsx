import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";
import { Atom, Stethoscope, Copy, Star, ArrowRight, RefreshCw, Check, ShieldCheck, Sparkles, Quote } from "lucide-react";
import { generateReview, copyToClipboard, getReviewUrl, type Category } from "@/lib/reviews";
import logoUrl from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rate Us — Team Excellent Career Institute | JEE & NEET Coaching Patna" },
      { name: "description", content: "Share your experience with Team Excellent Career Institute, Patna. Quick one-tap Google review for JEE and NEET aspirants." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#F7F4FB" },
    ],
  }),
});

function Index() {
  const [category, setCategory] = useState<Category | null>(null);
  const [review, setReview] = useState<string>("");
  const [copied, setCopied] = useState(false);

  function chooseCategory(c: Category) {
    setCategory(c);
    setReview(generateReview(c));
    setCopied(false);
  }

  function regenerate() {
    if (!category) return;
    setReview(generateReview(category));
    setCopied(false);
  }

  async function handleCopyAndReview() {
    const ok = await copyToClipboard(review);
    setCopied(ok);
    if (ok) {
      toast.success("Review copied! Paste it on Google Maps.", { duration: 2500 });
    } else {
      toast.message("Couldn't auto-copy — please copy manually after Google Maps opens.");
    }
    setTimeout(() => {
      window.location.href = getReviewUrl();
    }, 600);
  }

  return (
    <main
      className="noise relative min-h-[100dvh] overflow-hidden text-foreground"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Toaster theme="light" position="top-center" richColors />

      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="float-slow absolute -top-40 -left-28 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="float-slow absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-accent/20 blur-[120px]" style={{ animationDelay: "2s" }} />
        <div className="float-slow absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-sm">
              <img src={logoUrl} alt="Team Excellent" className="h-10 w-10 object-contain" />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[15px] font-extrabold tracking-tight text-foreground">Team Excellent</span>
              <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Career Institute
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1.5 shadow-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/80">Verified</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!category ? (
            <motion.section
              key="select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-1 flex-col justify-center"
            >
              {/* Hero logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 140, damping: 14 }}
                className="relative mx-auto mt-6 h-28 w-28"
              >
                <div aria-hidden className="absolute inset-0 rounded-[32px] bg-primary/25 blur-2xl" />
                <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-[28px] bg-card ring-1 ring-border" style={{ boxShadow: "var(--shadow-card)" }}>
                  <img src={logoUrl} alt="Team Excellent logo" className="h-24 w-24 object-contain" />
                </div>
              </motion.div>

              <div className="mt-8">
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/80 shadow-sm"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>30-second review</span>
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-5 text-[42px] font-black leading-[0.95] tracking-[-0.035em]"
                >
                  What are you
                  <br />
                  <span className="text-gradient">preparing for?</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted-foreground"
                >
                  Tap your exam — we'll craft an honest review and open Google Maps in one go.
                </motion.p>
              </div>

              <div className="mt-9 grid gap-3.5">
                <CategoryCard
                  label="NEET"
                  sub="Medical aspirants"
                  icon={<Stethoscope className="h-7 w-7" />}
                  onClick={() => chooseCategory("NEET")}
                  delay={0.2}
                />
                <CategoryCard
                  label="JEE"
                  sub="Engineering aspirants"
                  icon={<Atom className="h-7 w-7" />}
                  onClick={() => chooseCategory("JEE")}
                  delay={0.28}
                />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center justify-center gap-4 text-[11px] text-muted-foreground"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">4.9</span>
                </div>
                <span className="h-3 w-px bg-border" />
                <span>2,400+ reviews</span>
                <span className="h-3 w-px bg-border" />
                <span>Patna</span>
              </motion.div>
            </motion.section>
          ) : (
            <motion.section
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-1 flex-col"
            >
              <div className="mt-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px] shadow-primary" />
                    {category} aspirant
                  </span>
                  <button
                    onClick={regenerate}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-medium text-muted-foreground shadow-sm transition hover:text-foreground active:scale-95"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> New
                  </button>
                </div>
                <h2 className="mt-4 text-[32px] font-black leading-[0.98] tracking-[-0.025em]">
                  Your review<br />
                  <span className="text-gradient">is ready.</span>
                </h2>
              </div>

              <motion.div
                key={review}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative mt-5 overflow-hidden rounded-3xl border border-border bg-card p-5"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-px left-6 right-6 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, oklch(0.52 0.24 295 / 0.35), transparent)" }}
                />
                <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/15" />
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    >
                      <Star className="h-[18px] w-[18px] fill-primary text-primary drop-shadow-[0_0_8px_oklch(0.72_0.21_45_/_0.5)]" />
                    </motion.div>
                  ))}
                </div>
                <p className="whitespace-pre-line text-[15px] leading-[1.65] text-foreground/85">
                  {review}
                </p>
              </motion.div>

              <div className="mt-auto pt-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyAndReview}
                  className="shimmer group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-[20px] px-6 py-[18px] text-[15px] font-bold tracking-tight text-primary-foreground"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "var(--shadow-3d-btn)",
                  }}
                >
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[20px] bg-gradient-to-b from-white/25 to-transparent" />
                  <span className="relative z-10 flex items-center gap-2">
                    {copied ? <Check className="h-[18px] w-[18px]" /> : <Copy className="h-[18px] w-[18px]" />}
                    {copied ? "Copied — opening Maps" : "Copy & Post on Google"}
                    <ArrowRight className="h-[18px] w-[18px] transition group-active:translate-x-1" />
                  </span>
                </motion.button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
                  <ShieldCheck className="h-3 w-3 text-primary/70" />
                  Auto-copied. Paste with long-press on Google Maps.
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function CategoryCard({
  label,
  sub,
  icon,
  onClick,
  delay = 0,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group relative flex items-center justify-between overflow-hidden rounded-[22px] border border-border bg-card p-[18px] text-left transition active:border-primary/60"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px left-6 right-6 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.52 0.24 295 / 0.3), transparent)" }}
      />
      <div className="flex items-center gap-4">
        <div
          className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-[18px] text-primary-foreground"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-icon-3d)" }}
        >
          {icon}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/20" />
        </div>
        <div>
          <div className="text-[26px] font-black leading-none tracking-[-0.02em]">{label}</div>
          <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {sub}
          </div>
        </div>
      </div>
      <div
        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary text-foreground/80 transition group-active:bg-primary group-active:text-primary-foreground"
      >
        <ArrowRight className="h-4 w-4" />
      </div>
    </motion.button>
  );
}
