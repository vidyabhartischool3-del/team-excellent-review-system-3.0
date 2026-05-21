import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";
import { Atom, Stethoscope, Copy, Star, ArrowRight, RefreshCw, Check } from "lucide-react";
import { generateReview, copyToClipboard, getReviewUrl, type Category } from "@/lib/reviews";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rate Us — Team Excellent Career Institute | JEE & NEET Coaching Patna" },
      { name: "description", content: "Share your experience with Team Excellent Career Institute, Patna. Quick one-tap Google review for JEE and NEET aspirants." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0B0B0B" },
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
      className="relative min-h-[100dvh] overflow-hidden text-foreground"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Toaster theme="dark" position="top-center" richColors />

      {/* Ambient glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground font-black">
              T
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Team Excellent</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Career Institute
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/40 px-3 py-1.5 backdrop-blur">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
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
              <div className="mt-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> 30 second review
                </span>
                <h1 className="mt-5 text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
                  Preparing
                  <br />
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                    for?
                  </span>
                </h1>
                <p className="mt-4 max-w-sm text-base text-muted-foreground">
                  Pick your exam — we'll draft your honest review in one tap.
                </p>
              </div>

              <div className="mt-10 grid gap-4">
                <CategoryCard
                  label="NEET"
                  sub="Medical aspirants"
                  icon={<Stethoscope className="h-7 w-7" />}
                  onClick={() => chooseCategory("NEET")}
                />
                <CategoryCard
                  label="JEE"
                  sub="Engineering aspirants"
                  icon={<Atom className="h-7 w-7" />}
                  onClick={() => chooseCategory("JEE")}
                />
              </div>

              <p className="mt-8 text-center text-xs text-muted-foreground">
                Your support helps fellow aspirants find the right coaching.
              </p>
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
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {category} aspirant
                  </span>
                  <button
                    onClick={regenerate}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur transition hover:text-foreground active:scale-95"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> New
                  </button>
                </div>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  Your review is ready.
                </h2>
              </div>

              <motion.div
                key={review}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-5 rounded-2xl border border-border bg-card p-5 backdrop-blur-xl"
                style={{ boxShadow: "var(--shadow-glow)" }}
              >
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/90">
                  {review}
                </p>
              </motion.div>

              <div className="mt-auto pt-6">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopyAndReview}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-5 text-base font-bold text-primary-foreground"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    Copy & Review on Google Maps
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                  </span>
                </motion.button>
                <p className="mt-3 text-center text-[11px] text-muted-foreground">
                  We'll copy the review and open Google Maps — just paste & post.
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
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 text-left backdrop-blur-xl transition hover:border-primary/60"
    >
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-black tracking-tight">{label}</div>
          <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{sub}</div>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary" />
    </motion.button>
  );
}
