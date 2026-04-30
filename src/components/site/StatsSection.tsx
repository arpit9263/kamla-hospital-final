import { useEffect, useRef, useState } from "react";
import { Users, Activity, Award, Ambulance, BedDouble, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Stat = {
  icon: typeof Users;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  accent: string; // tailwind text color class
};

const stats: Stat[] = [
  { icon: Award,       value: 98,  suffix: "%",  label: "Patient Satisfaction", sub: "Trusted by families", accent: "text-emerald-600" },
  { icon: Activity,    value: 5000, suffix: "+", label: "Successful Surgeries", sub: "Knee, ortho & general", accent: "text-primary" },
  { icon: Users,       value: 40,  suffix: "+ Yrs", label: "Years of Experience", sub: "Senior consultants", accent: "text-indigo-600" },
  { icon: Ambulance,   value: 24,  suffix: "×7", label: "Emergency Support",    sub: "Always available",     accent: "text-red-600" },
  { icon: BedDouble,   value: 120, suffix: "",   label: "Hospital Beds",        sub: "ICU · NICU · ICCU",    accent: "text-primary" },
  { icon: ShieldCheck, value: 5,   suffix: "+",  label: "Insurance Partners",   sub: "Cashless facilities",  accent: "text-amber-600" },
];

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

const StatCard = ({ stat, active, index }: { stat: Stat; active: boolean; index: number }) => {
  const display = useCountUp(stat.value, active);
  const Icon = stat.icon;
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-7",
        "shadow-soft hover:shadow-strong hover:-translate-y-1 hover:border-primary/30",
        "transition-all duration-500"
      )}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-start justify-between mb-5">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center bg-primary/8 group-hover:scale-110 transition-transform",
          stat.accent
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Kamla
        </span>
      </div>

      <div className="relative">
        <p className="font-display text-4xl md:text-5xl font-extrabold text-foreground leading-none tabular-nums">
          {stat.prefix}
          <span>{display.toLocaleString()}</span>
          <span className={cn("ml-0.5", stat.accent)}>{stat.suffix}</span>
        </p>
        <p className="mt-3 font-display font-bold text-base text-foreground">{stat.label}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{stat.sub}</p>
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
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(true));
      },
      { threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-padding bg-gradient-soft relative overflow-hidden">
      {/* Background ornaments */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="container-tight relative">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">By the Numbers</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
            Care backed by <span className="text-gradient">proven results</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Decades of trusted service with measurable outcomes — from emergency response to long-term recovery.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.slice(0, 4).map((s, i) => (
            <StatCard key={s.label} stat={s} active={active} index={i} />
          ))}
        </div>

        {/* Secondary row: facilities + insurance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mt-5 md:mt-6">
          {stats.slice(4).map((s, i) => (
            <StatCard key={s.label} stat={s} active={active} index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
