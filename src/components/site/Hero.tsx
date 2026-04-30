import { useCallback, useEffect, useRef, useState } from "react";
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
  const [progress, setProgress] = useState(0);
  const indexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const autoplayStartedAtRef = useRef(0);
  const remainingMsRef = useRef(AUTO_ADVANCE_MS);
  indexRef.current = index;

  const clearAutoplayTimers = useCallback(() => {
    if (timeoutRef.current) { window.clearTimeout(timeoutRef.current); timeoutRef.current = null; }
    if (progressIntervalRef.current) { window.clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
  }, []);

  const changeSlide = useCallback((next: number) => {
    const current = indexRef.current;
    const target = ((next % slides.length) + slides.length) % slides.length;
    if (target === current) return;
    setPreviousIndex(current);
    setIndex(target);
    setCycleKey((v) => v + 1);
    remainingMsRef.current = AUTO_ADVANCE_MS;
    autoplayStartedAtRef.current = 0;
    setProgress(0);
  }, []);

  const next = useCallback(() => changeSlide(indexRef.current + 1), [changeSlide]);
  const prev = useCallback(() => changeSlide(indexRef.current - 1), [changeSlide]);

  useEffect(() => {
    if (previousIndex === null) return;
    const t = window.setTimeout(() => setPreviousIndex((v) => (v === previousIndex ? null : v)), 1200);
    return () => window.clearTimeout(t);
  }, [previousIndex]);

  useEffect(() => {
    clearAutoplayTimers();
    if (!isPlaying) {
      if (autoplayStartedAtRef.current) {
        const elapsed = Date.now() - autoplayStartedAtRef.current;
        remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
      }
      autoplayStartedAtRef.current = 0;
      return;
    }
    autoplayStartedAtRef.current = Date.now();
    const initialProgress = 1 - remainingMsRef.current / AUTO_ADVANCE_MS;
    setProgress(initialProgress);
    progressIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - autoplayStartedAtRef.current;
      setProgress(Math.min(1, initialProgress + elapsed / AUTO_ADVANCE_MS));
    }, 50);
    timeoutRef.current = window.setTimeout(() => changeSlide(indexRef.current + 1), remainingMsRef.current);
    return clearAutoplayTimers;
  }, [changeSlide, clearAutoplayTimers, cycleKey, isPlaying]);

  useEffect(() => { return clearAutoplayTimers; }, [clearAutoplayTimers]);

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
      className="relative w-full overflow-hidden bg-foreground"
      style={{ height: "min(92vh, 880px)", minHeight: "640px" }}
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
        <div className="pt-24 md:pt-28 flex items-center justify-between gap-4">
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
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-3xl text-primary-foreground">
            <div className="relative min-h-[300px] md:min-h-[340px]">
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
                    className="mb-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                    style={{ textShadow: "0 4px 32px hsl(0 0% 0% / 0.6)" }}
                  >
                    {slide.titleStart}{" "}
                    <em className="not-italic bg-gradient-to-r from-yellow-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(250,204,21,0.4)]">{slide.titleAccent}</em>
                    {slide.titleEnd}
                  </h1>

                  {/* Description */}
                  <p
                    className="mb-8 max-w-xl text-base leading-relaxed text-primary-foreground/90 md:text-lg"
                    style={{ textShadow: "0 1px 8px hsl(0 0% 0% / 0.4)" }}
                  >
                    {slide.description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      size="xl"
                      className="bg-primary text-primary-foreground shadow-strong hover:bg-primary/90 group"
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
                      className="border-white/30 bg-white/10 backdrop-blur-sm text-primary-foreground hover:bg-white/20 hover:border-white/50 hover:text-primary-foreground"
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
        <div className="pb-16 md:pb-24">
          {/* Progress bars */}
          <div className="mb-5 flex items-center gap-1.5">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeSlide(i)}
                aria-label={`Go to slide ${i + 1}: ${item.tag}`}
                aria-current={i === index}
                className="group relative h-[3px] flex-1 cursor-pointer"
              >
                <span className="absolute inset-0 rounded-full bg-white/20 transition-colors group-hover:bg-white/35" />
                {i < index && <span className="absolute inset-y-0 left-0 w-full rounded-full bg-white/80" />}
                {i === index && (
                  <span
                    className="absolute inset-y-0 left-0 origin-left rounded-full bg-white will-change-transform"
                    style={{ transform: `scaleX(${reduceMotion ? 1 : progress})` }}
                  />
                )}
              </button>
            ))}
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
