import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";
import { 
  Atom, 
  Stethoscope, 
  Copy, 
  Star, 
  ArrowRight, 
  RefreshCw, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Quote, 
  Terminal, 
  Flame, 
  ArrowUpRight 
} from "lucide-react";
import { generateReview, copyToClipboard, getReviewUrl, type Category } from "@/lib/reviews";
import logoUrl from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rate Us — Team Excellent Career Institute | JEE & NEET Coaching Patna" },
      { name: "description", content: "Share your experience with Team Excellent Career Institute, Patna. Quick one-tap Google review for JEE and NEET aspirants." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#08090C" },
    ],
  }),
});

function Index() {
  const [category, setCategory] = useState<Category | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [review, setReview] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  function chooseCategory(c: Category) {
    setCategory(c);
    setReview(generateReview(c));
    setCopied(false);
  }

  function regenerate() {
    if (!category) return;
    setIsRegenerating(true);
    setTimeout(() => {
      setReview(generateReview(category));
      setCopied(false);
      setIsRegenerating(false);
      toast.success("Fresh review formulated!", { duration: 1500 });
    }, 400);
  }

  async function handleCopyAndReview() {
    const ok = await copyToClipboard(review);
    setCopied(ok);
    if (ok) {
      toast.success("Formulated review copied! Redirecting...", { duration: 2500 });
    } else {
      toast.error("Couldn't auto-copy — please copy manually on Google Maps.");
    }
    setTimeout(() => {
      window.location.href = getReviewUrl();
    }, 850);
  }

  const activeTheme = category || hoveredCategory;

  // Reactively shift glows based on hovered/selected exam category
  const getBlobStyle = (blobId: 1 | 2 | 3) => {
    if (activeTheme === "JEE") {
      if (blobId === 1) return "bg-[oklch(0.68_0.22_250)] opacity-30 blur-[110px]";
      if (blobId === 2) return "bg-[oklch(0.62_0.26_300)] opacity-20 blur-[130px]";
      return "bg-[oklch(0.55_0.18_240)] opacity-20 blur-[100px]";
    }
    if (activeTheme === "NEET") {
      if (blobId === 1) return "bg-[oklch(0.76_0.18_152)] opacity-30 blur-[110px]";
      if (blobId === 2) return "bg-[oklch(0.65_0.16_168)] opacity-20 blur-[130px]";
      return "bg-[oklch(0.52_0.14_140)] opacity-20 blur-[100px]";
    }
    // Neutral fallback
    if (blobId === 1) return "bg-primary/25 opacity-25 blur-[100px]";
    if (blobId === 2) return "bg-accent/20 opacity-20 blur-[120px]";
    return "bg-primary/10 opacity-15 blur-[100px]";
  };

  return (
    <main className="noise grid-bg relative min-h-[100dvh] w-full overflow-x-hidden bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <Toaster theme="dark" position="top-center" richColors />

      {/* Reactive background light arrays */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div 
          className={`absolute -top-40 -left-28 h-80 w-80 rounded-full transition-all duration-700 ease-out ${getBlobStyle(1)} float-slow`} 
        />
        <div 
          className={`absolute top-1/3 -right-28 h-96 w-96 rounded-full transition-all duration-700 ease-out ${getBlobStyle(2)} float-slow`} 
          style={{ animationDelay: "2.5s" }} 
        />
        <div 
          className={`absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full transition-all duration-700 ease-out ${getBlobStyle(3)} float-slow`} 
          style={{ animationDelay: "5s" }} 
        />
        
        {/* Futuristic glowing vector line */}
        <div 
          className={`absolute inset-x-0 top-0 h-[2px] transition-all duration-700 bg-gradient-to-r from-transparent ${
            activeTheme === "JEE" 
              ? "via-[oklch(0.68_0.22_250)]" 
              : activeTheme === "NEET" 
              ? "via-[oklch(0.76_0.18_152)]" 
              : "via-primary/50"
          } to-transparent`} 
        />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] z-10">
        
        {/* Dynamic Minimal Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 shadow-lg">
              <img src={logoUrl} alt="Team Excellent" className="h-10 w-10 object-contain" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[16px] font-black tracking-tight uppercase font-display text-white">Team Excellent</span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Career Institute
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.04] px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">Active</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!category ? (
            <motion.section
              key="select"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-1 flex-col justify-center py-6"
            >
              <div className="mt-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-primary"
                >
                  <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                  <span>Rapid 30S Review System</span>
                </motion.div>
                
                <h1 className="mt-5 text-[46px] font-black leading-[0.9] tracking-[-0.04em] font-display">
                  What are you
                  <br />
                  <span className={`transition-all duration-500 ${
                    hoveredCategory === "JEE" 
                      ? "text-gradient-jee" 
                      : hoveredCategory === "NEET" 
                      ? "text-gradient-neet" 
                      : "text-gradient-primary"
                  }`}>
                    preparing for?
                  </span>
                </h1>
                
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                  Tap your competitive exam target. We will formulate an authentic review instantly and open up Google Maps.
                </p>
              </div>

              {/* High-Contrast Interactive Cards */}
              <div className="mt-8 grid gap-4">
                <CategoryCard
                  label="NEET"
                  sub="Medical Aspirants"
                  icon={<Stethoscope className="h-7 w-7 text-[oklch(0.76_0.18_152)]" />}
                  hoverTheme="NEET"
                  onClick={() => chooseCategory("NEET")}
                  onHoverStart={() => setHoveredCategory("NEET")}
                  onHoverEnd={() => setHoveredCategory(null)}
                  delay={0.15}
                />
                
                <CategoryCard
                  label="JEE"
                  sub="IIT Engineering Aspirants"
                  icon={<Atom className="h-7 w-7 text-[oklch(0.68_0.22_250)]" />}
                  hoverTheme="JEE"
                  onClick={() => chooseCategory("JEE")}
                  onHoverStart={() => setHoveredCategory("JEE")}
                  onHoverEnd={() => setHoveredCategory(null)}
                  delay={0.22}
                />
              </div>

              {/* Dynamic Bold Social Proof Block */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-10 flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-[12px] text-muted-foreground backdrop-blur-sm"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[oklch(0.82_0.18_75)] text-[oklch(0.82_0.18_75)]" />
                    ))}
                    <span className="ml-1 font-black text-white">4.9/5.0</span>
                  </div>
                  <span className="font-medium text-[10px] uppercase tracking-wider text-muted-foreground/80">Student Satisfaction Rating</span>
                </div>
                
                <div className="text-right border-l border-white/10 pl-4">
                  <div className="font-black text-white text-[15px]">2,400+</div>
                  <span className="font-medium text-[10px] uppercase tracking-wider text-muted-foreground/80">Reviews on Google</span>
                </div>
              </motion.div>
            </motion.section>
          ) : (
            <motion.section
              key="review"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-1 flex-col py-6"
            >
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    category === "JEE" 
                      ? "border-[oklch(0.68_0.22_250_/_30%)] bg-[oklch(0.68_0.22_250_/_8%)] text-[oklch(0.68_0.22_250)]" 
                      : "border-[oklch(0.76_0.18_152_/_30%)] bg-[oklch(0.76_0.18_152_/_8%)] text-[oklch(0.76_0.18_152)]"
                  }`}>
                    <span className={`h-2 w-2 rounded-full animate-pulse ${
                      category === "JEE" ? "bg-[oklch(0.68_0.22_250)]" : "bg-[oklch(0.76_0.18_152)]"
                    }`} />
                    {category} Target Formulated
                  </span>
                  
                  <button
                    onClick={regenerate}
                    disabled={isRegenerating}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm transition active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isRegenerating ? "animate-spin text-primary" : ""}`} />
                    Regenerate
                  </button>
                </div>
                
                <h2 className="mt-5 text-[40px] font-black leading-[0.95] tracking-[-0.03em] font-display">
                  Your customized
                  <br />
                  <span className={category === "JEE" ? "text-gradient-jee" : "text-gradient-neet"}>
                    review is ready.
                  </span>
                </h2>
              </div>

              {/* Glassmorphic Cyber Review Console */}
              <motion.div
                key={review}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative mt-6 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl"
              >
                {/* Console header bar */}
                <div className="absolute inset-x-0 top-0 h-8 bg-white/[0.02] border-b border-white/[0.06] px-4 flex items-center justify-between text-[9px] font-mono tracking-wider text-muted-foreground/60">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3 w-3 text-white/40" />
                    <span>CONSTRUCT_ENGINE_V2.0</span>
                  </div>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    STATUS_STABLE
                  </span>
                </div>

                <Quote className="absolute right-4 bottom-4 h-12 w-12 text-white/[0.02] pointer-events-none" />

                <div className="mt-6 mb-3.5 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.08 + i * 0.04, type: "spring", stiffness: 220, damping: 14 }}
                    >
                      <Star className="h-[20px] w-[20px] fill-[oklch(0.82_0.18_75)] text-[oklch(0.82_0.18_75)] drop-shadow-[0_0_8px_oklch(0.82_0.18_75_/_0.3)]" />
                    </motion.div>
                  ))}
                </div>

                <p className="whitespace-pre-line text-[15px] font-medium leading-[1.65] text-white/90 pr-2">
                  {review}
                </p>

                {/* Console footer tags */}
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2 text-[10px] font-mono tracking-tight text-muted-foreground/75">
                  <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">CHARS: {review.length}</span>
                  <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">READ_TIME: ~4s</span>
                  <span className="bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">DEST: GOOGLE_MAPS</span>
                </div>
              </motion.div>

              {/* Action and Navigation button block */}
              <div className="mt-auto pt-8">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleCopyAndReview}
                  className="shimmer group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-[22px] px-6 py-[20px] text-[15px] font-extrabold tracking-tight text-black transition-all cursor-pointer"
                  style={{
                    background: category === "JEE" ? "var(--gradient-jee)" : "var(--gradient-neet)",
                    boxShadow: "var(--shadow-3d-btn)",
                  }}
                >
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[40%] rounded-t-[22px] bg-gradient-to-b from-white/35 to-transparent" />
                  
                  <span className="relative z-10 flex items-center gap-2.5">
                    {copied ? (
                      <>
                        <Check className="h-[19px] w-[19px] stroke-[3]" />
                        <span>COPIED — LAUNCHING MAPS</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-[19px] w-[19px] stroke-[2.5]" />
                        <span>COPY & POST ON GOOGLE</span>
                        <ArrowUpRight className="h-[19px] w-[19px] stroke-[2.5] transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </span>
                </motion.button>
                
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500/80" />
                  Long-press to paste into the Google review box.
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

interface CategoryCardProps {
  label: string;
  sub: string;
  icon: React.ReactNode;
  hoverTheme: Category;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  delay?: number;
}

function CategoryCard({
  label,
  sub,
  icon,
  hoverTheme,
  onClick,
  onHoverStart,
  onHoverEnd,
  delay = 0,
}: CategoryCardProps) {
  const isJee = hoverTheme === "JEE";

  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className={`group relative flex items-center justify-between overflow-hidden rounded-[26px] border bg-white/[0.03] p-[20px] text-left transition-all duration-300 backdrop-blur-md cursor-pointer ${
        isJee 
          ? "border-white/[0.08] hover:border-[oklch(0.68_0.22_250_/_40%)] hover:bg-[oklch(0.68_0.22_250_/_4%)]" 
          : "border-white/[0.08] hover:border-[oklch(0.76_0.18_152_/_40%)] hover:bg-[oklch(0.76_0.18_152_/_4%)]"
      }`}
      style={{ 
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Decorative top-highlight line */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-px left-8 right-8 h-[1px] opacity-40 transition-all duration-300"
        style={{ 
          background: isJee 
            ? "linear-gradient(90deg, transparent, oklch(0.68 0.22 250), transparent)" 
            : "linear-gradient(90deg, transparent, oklch(0.76 0.18 152), transparent)" 
        }}
      />

      <div className="flex items-center gap-5">
        <div
          className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-[20px] transition-all duration-300"
          style={{ 
            background: "white/[0.04]", 
            boxShadow: "var(--shadow-icon-3d)",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          {icon}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
        </div>
        
        <div>
          <div className="text-[28px] font-black leading-none tracking-[-0.03em] font-display text-white">{label}</div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80 group-hover:text-white/60 transition-colors">
            {sub}
          </div>
        </div>
      </div>

      <div
        className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
          isJee 
            ? "border-white/10 bg-white/[0.02] text-white group-hover:bg-[oklch(0.68_0.22_250)] group-hover:border-[oklch(0.68_0.22_250)] group-hover:text-black group-hover:scale-105" 
            : "border-white/10 bg-white/[0.02] text-white group-hover:bg-[oklch(0.76_0.18_152)] group-hover:border-[oklch(0.76_0.18_152)] group-hover:text-black group-hover:scale-105"
        }`}
      >
        <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </motion.button>
  );
}
