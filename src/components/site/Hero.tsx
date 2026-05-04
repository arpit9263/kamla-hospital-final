import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Pause, Play, Shield, Award, Clock, BedDouble, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCurtainStage from "@/components/site/hero/HeroCurtainStage";
import { slides, stats } from "@/components/site/hero/data";

const AUTO_ADVANCE_MS = 6500;

const formatSlideNumber = (value: number) => value.toString().padStart(2, "0");

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  const changeSlide = useCallback((next: number) => {
    setIndex((current) => {
      const target = ((next % slides.length) + slides.length) % slides.length;
      if (target === current) return current;
      setPreviousIndex(current);
      setCycleKey((v) => v + 1);
      return target;
    });
  }, []);

  const next = useCallback(() => changeSlide(index + 1), [changeSlide, index]);
  const prev = useCallback(() => changeSlide(index - 1), [changeSlide, index]);

  useEffect(() => {
    if (previousIndex === null) return;
    const t = window.setTimeout(() => setPreviousIndex((v) => (v === previousIndex ? null : v)), 650);
    return () => window.clearTimeout(t);
  }, [previousIndex]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setTimeout(() => changeSlide(index + 1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [changeSlide, cycleKey, index, isPlaying]);

  useEffect(() => {
    slides.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") { e.preventDefault(); setIsPlaying((v) => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const slide = slides[index];
  const previousSlide = previousIndex === null ? null : slides[previousIndex];
  const Icon = slide.icon;

  return (
    <section
      className="relative w-full overflow-hidden bg-foreground min-h-[560px] h-[100svh] max-h-[880px] sm:min-h-[620px]"
      aria-roledescription="carousel"
      aria-label="Kamla Hospital highlights"
    >
      <HeroCurtainStage
        currentSlide={slide}
        previousSlide={previousSlide}
        transitionId={cycleKey}
        reduceMotion={Boolean(reduceMotion)}
      />

      {/* Softer overlays — text-side darker, image-side clearer */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/25 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/55 via-foreground/10 to-transparent pointer-events-none" />
      {/* Light brand wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent mix-blend-multiply pointer-events-none" />
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-grid-soft opacity-15 pointer-events-none" />
      {/* Vignette top */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-foreground/35 to-transparent pointer-events-none" />
      {/* Animated accent blobs — subtle */}
      <div className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-primary/10 blur-[100px] pointer-events-none animate-blob" />
      <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-primary-glow/10 blur-[120px] pointer-events-none animate-blob" style={{ animationDelay: "6s" }} />
      <div className="absolute top-10 right-1/3 h-[280px] w-[280px] rounded-full bg-yellow-400/8 blur-[80px] pointer-events-none" />

      <div className="relative z-10 h-full container-tight flex flex-col">

        {/* Top bar */}
        <div className="pt-20 sm:pt-24 md:pt-28 flex items-center justify-between gap-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`tag-${slide.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground animate-pulse" />
              {slide.tag}
            </motion.div>
          </AnimatePresence>

          {/* Ayushman pill — top right */}
          <motion.a
            href="https://beneficiary.nha.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-[#1a6b3a]/80 backdrop-blur-sm border border-green-400/30 px-3.5 py-1.5 text-xs font-bold text-white shadow-lg hover:bg-[#1a6b3a] transition-colors"
          >
            <Shield className="h-3.5 w-3.5 text-yellow-300" />
            Ayushman Bharat Accepted
          </motion.a>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center py-5 sm:py-8">
          <div className="w-full max-w-3xl text-primary-foreground">
            <div className="relative min-h-[355px] min-[380px]:min-h-[340px] sm:min-h-[330px] md:min-h-[340px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`content-${slide.id}`}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Eyebrow */}
                  <div className="mb-4 inline-flex items-center gap-2 text-primary-foreground/80">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-semibold tracking-wide uppercase">{slide.eyebrow}</span>
                  </div>

                  {/* Headline */}
                  <h1
                    className="mb-4 sm:mb-5 font-display text-[2.15rem] font-extrabold leading-[1.05] tracking-tight min-[380px]:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl"
                    style={{ textShadow: "0 4px 32px hsl(0 0% 0% / 0.6)" }}
                  >
                    {slide.titleStart}{" "}
                    <em className="not-italic bg-gradient-to-r from-yellow-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)]">{slide.titleAccent}</em>
                    {slide.titleEnd}
                  </h1>

                  {/* Description */}
                  <p
                    className="mb-5 sm:mb-8 max-w-xl text-sm leading-relaxed text-primary-foreground/90 min-[380px]:text-base md:text-lg"
                    style={{ textShadow: "0 1px 8px hsl(0 0% 0% / 0.4)" }}
                  >
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2.5 min-[420px]:flex-row min-[420px]:flex-wrap sm:gap-3">
                    <Button
                      asChild
                      size="xl"
                      className="w-full min-[420px]:w-auto justify-center bg-primary text-primary-foreground shadow-strong hover:bg-primary/90 group"
                    >
                      {slide.ctaPrimary.to.startsWith("tel:") ? (
                        <a href={slide.ctaPrimary.to}>
                          {slide.ctaPrimary.label}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ) : (
                        <Link to={slide.ctaPrimary.to}>
                          {slide.ctaPrimary.label}
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      )}
                    </Button>

                    <Button
                      asChild
                      size="xl"
                      variant="outline"
                      className="w-full min-[420px]:w-auto justify-center border-white/30 bg-white/10 backdrop-blur-sm text-primary-foreground hover:bg-white/20 hover:border-white/50 hover:text-primary-foreground"
                    >
                      <Link to={slide.ctaSecondary.to}>
                        {slide.ctaSecondary.label}
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Premium command rail — single floating panel housing nav + progress + stats */}
        <div className="pb-10 sm:pb-14 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/12 bg-foreground/45 backdrop-blur-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            {/* Gold accent inlay top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-stretch divide-y lg:divide-y-0 lg:divide-x divide-white/10">

              {/* ── Zone 1: Carousel controls ── */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center gap-3 lg:gap-4">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 hover:border-white/40"
                  >
                    <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((v) => !v)}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-300/40 bg-yellow-300/10 text-yellow-200 transition-all hover:bg-yellow-300/20"
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next slide"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all hover:bg-white/15 hover:border-white/40"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="pl-2 lg:pl-3 border-l border-white/10 leading-none">
                  <p className="font-display text-xl font-extrabold text-white tabular-nums tracking-tight">
                    {formatSlideNumber(index + 1)}
                    <span className="text-white/35 text-sm font-normal mx-1">/</span>
                    <span className="text-white/50 text-sm font-medium">{formatSlideNumber(slides.length)}</span>
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-yellow-200/70 font-semibold">{slide.tag}</p>
                </div>
              </div>

              {/* ── Zone 2: Progress + trust labels ── */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 flex flex-col justify-center gap-3 min-w-0">
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero carousel slides">
                  {slides.map((item, i) => {
                    const isActive = i === index;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => changeSlide(i)}
                        aria-label={`Go to slide ${i + 1}: ${item.tag}`}
                        aria-current={isActive ? "true" : undefined}
                        role="tab"
                        aria-selected={isActive}
                        className={`group relative h-1 cursor-pointer overflow-hidden rounded-full transition-all duration-300 ${
                          isActive ? "flex-[1.8] bg-white/30" : "flex-1 bg-white/15 hover:bg-white/25"
                        }`}
                      >
                        <span className="sr-only">{item.tag}</span>
                        {isActive && (
                          <span
                            key={`progress-${cycleKey}-${i}`}
                            className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-yellow-300 to-amber-200 will-change-transform shadow-[0_0_10px_rgba(253,224,71,0.5)]"
                            style={{
                              animation: reduceMotion ? "none" : `hero-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                              transform: reduceMotion ? "scaleX(1)" : "scaleX(0.04)",
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] text-white/65">
                  {[
                    { Icon: ShieldCheck, label: "NABH Aligned" },
                    { Icon: Award, label: "40+ Years" },
                    { Icon: BedDouble, label: "120 Beds" },
                    { Icon: Clock, label: "OPD 10–7" },
                  ].map(({ Icon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5">
                      <Icon className="h-3 w-3 text-yellow-300/90" />
                      <span>{label}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Zone 3: Stats ── */}
              <div className="hidden lg:grid grid-cols-4 divide-x divide-white/10">
                {stats.map((item) => (
                  <div key={item.label} className="px-5 py-5 flex flex-col justify-center min-w-[110px] group">
                    <div className="flex items-center gap-2 mb-1.5">
                      <item.icon className="h-3 w-3 text-yellow-300/80" />
                      <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">{item.label}</span>
                    </div>
                    <p className="font-display text-2xl font-extrabold text-white tabular-nums leading-none tracking-tight group-hover:text-yellow-200 transition-colors">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile/tablet stats */}
              <div className="lg:hidden grid grid-cols-4 divide-x divide-white/10">
                {stats.map((item) => (
                  <div key={item.label} className="px-3 py-3 flex flex-col items-center text-center">
                    <p className="font-display text-sm font-extrabold text-white tabular-nums leading-tight">{item.value}</p>
                    <p className="mt-0.5 text-[8px] uppercase tracking-[0.15em] text-white/50 font-semibold leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes hero-progress {
          from { transform: scaleX(0.12); }
          to { transform: scaleX(1); }
        }
        @keyframes hero-pulse-line {
          from { stroke-dashoffset: 1200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes hero-scroll-cue {
          0%, 100% { transform: translateY(0); opacity: 0.65; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>



      {/* Scroll cue */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 z-[7] pointer-events-none hidden sm:flex flex-col items-center gap-1 text-white/70">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div
          className="h-7 w-[18px] rounded-full border border-white/40 flex items-start justify-center pt-1.5"
          style={{ animation: "hero-scroll-cue 1.8s ease-in-out infinite" }}
        >
          <span className="block h-1.5 w-0.5 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Decorative bottom curve divider */}
      <div className="absolute inset-x-0 bottom-0 z-[5] pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-background">
          <path d="M0,80 C240,20 480,0 720,20 C960,40 1200,70 1440,30 L1440,80 Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
