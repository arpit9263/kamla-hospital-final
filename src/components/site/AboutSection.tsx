import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitalInfo } from "@/data/hospital";

const highlights = [
  { k: "40+", v: "Years of trust" },
  { k: "10+", v: "Specialists" },
  { k: "120", v: "Hospital beds" },
  { k: "24×7", v: "Emergency care" },
];

const AboutSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-background">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-yellow-200/10 blur-3xl" />
      </div>

      <div className="container-tight relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-strong group">
              <img
                src={hospitalInfo.images.exteriorWide}
                alt="Kamla Hospital exterior"
                className="w-full h-[420px] md:h-[520px] object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

              {/* Single elegant CTA pill */}
              <Link
                to="/gallery"
                className="absolute bottom-5 left-5 inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full pl-2 pr-5 py-2 shadow-medium hover:bg-white transition-colors group/play"
              >
                <span className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center group-hover/play:scale-110 transition-transform">
                  <PlayCircle className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-foreground">Take a virtual tour</span>
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary mb-5">
              <span className="w-8 h-px bg-primary" /> About Kamla Hospital
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              Compassion-led healthcare for the people of{" "}
              <span className="text-gradient-gold">Jhansi</span>.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5">
              For over four decades, Kamla Hospital has been a trusted name in multi-specialty
              healthcare — bringing together experienced specialists, modern diagnostics and a
              patient-first culture under one roof.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              As an Ayushman Bharat (PM-JAY) empaneled hospital, we proudly serve eligible
              beneficiaries with cashless treatment up to ₹5 Lakh per family per year.
            </p>

            {/* Clean stat strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-8">
              {highlights.map((h) => (
                <div key={h.v} className="bg-card px-4 py-5 text-center">
                  <p className="font-display text-2xl md:text-3xl font-extrabold text-primary leading-none">
                    {h.k}
                  </p>
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-2 font-semibold">
                    {h.v}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-primary text-white rounded-full shadow-medium hover:bg-primary/90 px-7">
                <Link to="/about">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Link
                to="/ayushman-bharat"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" /> PM-JAY empaneled hospital
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
