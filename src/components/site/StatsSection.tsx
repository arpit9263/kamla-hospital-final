import { useEffect, useRef, useState } from "react";
import {
  Users,
  Activity,
  Award,
  Ambulance,
  BedDouble,
  ShieldCheck,
  Bone,
  Stethoscope,
  HeartPulse,
  Microscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Stat = {
  icon: typeof Users;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
};

// Headline KPIs — large, bold
const headline: Stat[] = [
  { icon: Award,     value: 98,   suffix: "%",   label: "Patient Satisfaction", sub: "Verified feedback over the last year" },
  { icon: Activity,  value: 12000, suffix: "+",  label: "Successful Surgeries", sub: "Across all specialties since inception" },
  { icon: Bone,      value: 3500,  suffix: "+",  label: "Knee Replacements",    sub: "Advanced orthopedic procedures" },
  { icon: Users,     value: 40,    suffix: "+",  label: "Years of Experience",  sub: "Senior consultants & surgeons" },
];

// Secondary KPIs — supporting metrics
const secondary: Stat[] = [
  { icon: Ambulance,   value: 24,    suffix: "×7",  label: "Emergency Support",   sub: "Always available" },
  { icon: BedDouble,   value: 120,   suffix: "",    label: "Hospital Beds",       sub: "ICU · NICU · ICCU" },
  { icon: Stethoscope, value: 10,    suffix: "+",   label: "Specialist Doctors",  sub: "Across 10 departments" },
  { icon: HeartPulse,  value: 200000, suffix: "+",  label: "Patients Treated",    sub: "Trusted by families in Jhansi" },
  { icon: Microscope,  value: 50000, suffix: "+",   label: "Diagnostic Tests",    sub: "X-Ray, MRI, CT, Lab" },
  { icon: ShieldCheck, value: 5,     suffix: "+",   label: "Insurance Partners",  sub: "Cashless facilities" },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

const HeadlineCard = ({ stat, active, index }: { stat: Stat; active: boolean; index: number }) => {
  const display = useCountUp(stat.value, active);
  const Icon = stat.icon;
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border",
        "p-7 md:p-8 hover:border-primary/40 hover:shadow-strong transition-all duration-500",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {stat.label.split(" ")[0]}
        </span>
      </div>

      <p className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-none tabular-nums tracking-tight">
        {stat.prefix}
        <span>{display.toLocaleString()}</span>
        <span className="text-primary">{stat.suffix}</span>
      </p>
      <p className="mt-4 font-display font-bold text-base text-foreground">{stat.label}</p>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{stat.sub}</p>
    </div>
  );
};

const SecondaryItem = ({ stat, active, index }: { stat: Stat; active: boolean; index: number }) => {
  const display = useCountUp(stat.value, active);
  const Icon = stat.icon;
  return (
    <div
      className="group flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/8 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="font-display text-xl font-extrabold text-foreground leading-none tabular-nums">
          {display.toLocaleString()}
          <span className="text-primary">{stat.suffix}</span>
        </p>
        <p className="text-sm font-semibold text-foreground mt-1 truncate">{stat.label}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{stat.sub}</p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding bg-gradient-soft relative overflow-hidden">
      {/* Subtle background ornaments */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-200/15 blur-3xl" />

      <div className="container-tight relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">
            By the Numbers
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Care backed by <span className="text-gradient">proven results</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Four decades of trusted service with measurable outcomes — from emergency response to long-term recovery.
          </p>
        </div>

        {/* Headline 4 KPIs */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-6 md:mb-8">
          {headline.map((s, i) => (
            <HeadlineCard key={s.label} stat={s} active={active} index={i} />
          ))}
        </div>

        {/* Secondary KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {secondary.map((s, i) => (
            <SecondaryItem key={s.label} stat={s} active={active} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
