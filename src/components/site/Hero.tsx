import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, Pause, Play, Shield } from "lucide-react";
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

        {/* Bottom controls */}
        <div className="pb-12 sm:pb-16 md:pb-24">
          {/* Progress bars */}
          <div className="mb-4 sm:mb-5 flex items-center gap-1.5" role="tablist" aria-label="Hero carousel slides">
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
                    isActive ? "flex-[1.8] bg-white/55 shadow-[0_0_14px_rgba(255,255,255,0.35)]" : "flex-1 bg-white/20 hover:bg-white/35"
                  }`}
                >
                  <span className="sr-only">{item.tag}</span>
                  {isActive && (
                    <span
                      key={`progress-${cycleKey}-${i}`}
                      className="absolute inset-y-0 left-0 origin-left rounded-full bg-white will-change-transform"
                      style={{
                        animation: reduceMotion ? "none" : `hero-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                        transform: reduceMotion ? "scaleX(1)" : "scaleX(0.12)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Nav controls */}
            <div className="flex items-center gap-2 text-primary-foreground">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/8 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
              >
                <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying((v) => !v)}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/8 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/8 backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/50"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <p className="ml-2 font-mono text-xs text-white/60">
                <span className="font-bold text-white">{formatSlideNumber(index + 1)}</span>
                <span> / {formatSlideNumber(slides.length)}</span>
              </p>
            </div>

            {/* Stats — desktop */}
            <div className="hidden lg:flex items-center gap-6 text-primary-foreground">
              {stats.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-primary-glow" />
                  </div>
                  <div className="leading-tight">
                    <p className="font-display text-base font-extrabold">{item.value}</p>
                    <p className="text-[10px] uppercase tracking-widest opacity-60">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-progress {
          from { transform: scaleX(0.12); }
          to { transform: scaleX(1); }
        }
      `}</style>

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
