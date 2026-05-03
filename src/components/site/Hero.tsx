import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Pause, Play, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slides } from "@/components/site/hero/data";

const AUTO_ADVANCE_MS = 7000;

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
    setCycleKey((v) => v + 1);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!isPlaying) return;
    const t = window.setTimeout(() => goTo(index + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [goTo, cycleKey, index, isPlaying]);

  useEffect(() => {
    slides.forEach((s) => { const i = new Image(); i.src = s.image; });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = slides[index];
  const Icon = slide.icon;
  const words = `${slide.titleStart} ${slide.titleAccent}${slide.titleEnd ?? ""}`.split(" ");
  const accentStartWord = slide.titleStart.split(" ").length;
  const accentEndWord = accentStartWord + slide.titleAccent.split(" ").length;

  return (
    <section
      className="relative w-full overflow-hidden bg-background pt-20 sm:pt-24 md:pt-28 pb-10 md:pb-16"
      aria-roledescription="carousel"
      aria-label="Kamla Hospital highlights"
    >
      {/* Soft ambient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.10),transparent_55%),radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.06),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-grid-soft opacity-[0.06]" />

      <div className="relative container-tight">
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
            <span className="h-px w-8 bg-primary/60" />
            Kamla Hospital · Jhansi
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="font-bold text-foreground">{String(index + 1).padStart(2, "0")}</span>
            <span className="opacity-50">/ {String(slides.length).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT — content */}
          <div className="lg:col-span-7 relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`eyebrow-${slide.id}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 mb-5 text-primary"
              >
                <Icon className="h-4 w-4" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase">{slide.eyebrow}</span>
              </motion.div>
            </AnimatePresence>

            {/* Word-stagger headline */}
            <h1 className="font-display font-extrabold tracking-tight text-foreground text-[2.4rem] leading-[1.02] sm:text-5xl md:text-6xl lg:text-[4.4rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={`headline-${slide.id}`} className="block">
                  {words.map((w, i) => {
                    const isAccent = i >= accentStartWord && i < accentEndWord;
                    return (
                      <motion.span
                        key={`${slide.id}-${i}`}
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-40%" }}
                        transition={{
                          duration: reduceMotion ? 0.2 : 0.65,
                          delay: reduceMotion ? 0 : i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block overflow-hidden align-baseline mr-[0.25em]"
                      >
                        <span className={isAccent ? "italic text-primary" : ""}>{w}</span>
                      </motion.span>
                    );
                  })}
                </motion.span>
              </AnimatePresence>
            </h1>

            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={`desc-${slide.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
              >
                {slide.description}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Button asChild size="xl" className="group">
                {slide.ctaPrimary.to.startsWith("tel:") ? (
                  <a href={slide.ctaPrimary.to}>
                    {slide.ctaPrimary.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <Link to={slide.ctaPrimary.to}>
                    {slide.ctaPrimary.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </Button>
              <Button asChild size="xl" variant="ghost" className="group text-foreground hover:bg-foreground/5">
                <Link to={slide.ctaSecondary.to}>
                  {slide.ctaSecondary.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
            </motion.div>

            {/* Slim controls */}
            <div className="mt-10 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous slide"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying((v) => !v)}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next slide"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Slide pagination strip */}
              <div className="flex-1 flex items-center gap-2" role="tablist">
                {slides.map((s, i) => {
                  const active = i === index;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to ${s.tag}`}
                      role="tab"
                      aria-selected={active}
                      className={`relative h-[3px] overflow-hidden rounded-full transition-all duration-500 ${
                        active ? "flex-[2] bg-foreground/15" : "flex-1 bg-foreground/10 hover:bg-foreground/20"
                      }`}
                    >
                      {active && (
                        <span
                          key={`bar-${cycleKey}`}
                          className="absolute inset-y-0 left-0 origin-left bg-primary"
                          style={{
                            width: "100%",
                            animation: reduceMotion ? "none" : `hero-bar ${AUTO_ADVANCE_MS}ms linear forwards`,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — image stage */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] w-full max-w-[520px] mx-auto">
              {/* Decorative offset border */}
              <div className="absolute -inset-3 md:-inset-4 rounded-[2rem] border border-primary/30 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4" />

              {/* Image with mask reveal */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-foreground/5 shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.35)]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={`img-${slide.id}`}
                    src={slide.image}
                    alt={slide.tag}
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{
                      clipPath: reduceMotion ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                      scale: reduceMotion ? 1 : 1.1,
                    }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                    exit={{ clipPath: reduceMotion ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                    transition={{ duration: reduceMotion ? 0.2 : 1.0, ease: [0.76, 0, 0.24, 1] }}
                    draggable={false}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

                {/* Tag badge */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`tag-${slide.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground shadow-md"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    {slide.tag}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating emergency card */}
              <motion.a
                href="tel:8303792140"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -bottom-5 -left-3 sm:-left-6 md:-left-10 bg-background border border-border rounded-2xl shadow-xl p-3 pr-4 flex items-center gap-3 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                <span className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">24×7 Emergency</span>
                  <span className="block text-sm font-bold text-foreground">8303 792 140</span>
                </span>
              </motion.a>

              {/* Floating credentials chip */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-foreground text-background rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="text-[10px] uppercase tracking-widest opacity-70">Trusted Care</div>
                <div className="text-lg font-display font-extrabold leading-none mt-1">40+ Years</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-bar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        [role="tab"] > span {
          transform-origin: left;
        }
      `}</style>
    </section>
  );
};

export default Hero;
