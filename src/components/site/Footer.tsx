import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield, CheckCircle2, Clock, Heart, ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { hospitalInfo, departments } from "@/data/hospital";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Subscribed! We'll keep you posted on health tips & updates.");
    setEmail("");
  };

  return (
    <footer className="relative mt-20 text-white overflow-hidden">
      {/* Top curved divider */}
      <div className="absolute inset-x-0 -top-px z-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-10 md:h-14 fill-background">
          <path d="M0,80 C240,20 480,0 720,20 C960,40 1200,70 1440,30 L1440,80 Z" />
        </svg>
      </div>

      {/* Rich layered background */}
      <div className="absolute inset-0 bg-animated-hero" aria-hidden="true" />

      {/* Parallax drifting radial glows */}
      <div
        className="absolute -top-32 -left-32 w-[55%] h-[60%] rounded-full animate-drift-slow will-change-transform"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, hsl(248 85% 45% / 0.55), transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-24 w-[55%] h-[65%] rounded-full animate-drift-reverse will-change-transform"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, hsl(258 75% 40% / 0.5), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40%] h-[40%] rounded-full animate-glow-pulse will-change-[opacity,filter]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, hsl(42 95% 55% / 0.18), transparent 70%)",
        }}
      />

      {/* Grid texture with parallax drift */}
      <div className="absolute inset-0 bg-grid-soft opacity-[0.14] animate-parallax-y" aria-hidden="true" />

      {/* Decorative concentric rings (slow float) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.05] animate-float" aria-hidden="true" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] rounded-full border border-white/[0.07]" aria-hidden="true" />

      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-25"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Readability veil — keeps text crisp over animated layers */}
      <div className="absolute inset-0 bg-[hsl(248_75%_8%)]/35" aria-hidden="true" />

      <div className="relative z-10">
        {/* Ayushman Bharat Trust Card */}
        <div className="container-tight pt-14 md:pt-16">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[hsl(var(--primary-foreground)/0.14)] bg-[hsl(var(--primary)/0.34)] shadow-glow backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.9)] to-transparent" aria-hidden="true" />
            <div className="absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[hsl(var(--gold)/0.14)] blur-3xl animate-glow-pulse" aria-hidden="true" />
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[hsl(var(--primary-glow)/0.28)] blur-3xl animate-drift-reverse" aria-hidden="true" />
            <div className="relative grid gap-5 p-5 md:grid-cols-[1.35fr_1.7fr_auto] md:items-center md:p-6 lg:p-7">
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold shadow-medium ring-1 ring-[hsl(var(--primary-foreground)/0.25)]">
                  <span className="absolute inset-0 rounded-2xl bg-[hsl(var(--primary-foreground)/0.18)] animate-pulse" aria-hidden="true" />
                  <Shield className="relative h-6 w-6 text-gold-foreground" />
                </div>
                <div>
                  <p className="font-display text-base font-extrabold text-[hsl(var(--primary-foreground))] md:text-lg">Ayushman Bharat Empaneled</p>
                  <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--primary-foreground)/0.66)]">PM-JAY support for eligible patients at Kamla Hospital.</p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {["Cashless treatment", "₹5 lakh coverage", "Govt. schemes accepted"].map((item) => (
                  <div key={item} className="flex min-h-11 items-center gap-2 rounded-2xl border border-[hsl(var(--primary-foreground)/0.12)] bg-[hsl(var(--primary-foreground)/0.07)] px-3 py-2 text-xs font-semibold text-[hsl(var(--primary-foreground)/0.82)]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/ayushman-bharat" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[hsl(var(--primary-foreground))] px-5 text-sm font-bold text-primary shadow-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-gold-foreground">
                <Phone className="h-4 w-4" />
                Helpline 14555
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter band */}
        <div className="border-b border-white/10">
          <div className="container-tight py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                Stay healthy, <span className="text-yellow-300">stay informed</span>
              </h3>
              <p className="text-white/65 text-sm mt-2">
                Subscribe for occasional health tips, OPD updates and special camp announcements.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto items-center gap-2 bg-white/8 backdrop-blur-sm rounded-full p-1.5 border border-white/15 hover:border-white/30 transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 lg:w-72 bg-transparent text-sm text-white placeholder-white/40 px-4 py-2 outline-none"
              />
              <button type="submit" aria-label="Subscribe to health updates" className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-primary text-sm font-bold rounded-full px-4 py-2 transition-colors">
                Subscribe <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Main footer content */}
        <div className="container-tight py-16 grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="bg-white rounded-xl p-1.5 inline-block shadow-medium ring-1 ring-white/30 group-hover:scale-105 transition-transform">
                <img src={hospitalInfo.logo} alt={hospitalInfo.name + " logo"} className="w-48 h-20 object-contain rounded-lg" />
              </div>
            </Link>
            <p className="text-sm text-white/65 leading-relaxed mb-5">
              A multi-specialty hospital providing OPD, emergency care, diagnostics, surgery and specialist consultation with compassion.
            </p>
            <div className="space-y-2 text-xs text-white/60 mb-5">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary-glow shrink-0" />
                <span>OPD: {hospitalInfo.workingHours.opd}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>Emergency: {hospitalInfo.workingHours.emergency}</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="/contact"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-6"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold mb-5 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-yellow-300 rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              {[
                { to: "/about", label: "About Us" },
                { to: "/departments", label: "Departments" },
                { to: "/doctors", label: "Find a Doctor" },
                { to: "/services", label: "Services" },
                { to: "/gallery", label: "Gallery" },
                { to: "/appointment", label: "Book Appointment" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-yellow-300 transition-all flex items-center gap-1.5 group">
                    <ArrowRight className="w-3 h-3 -ml-4 opacity-0 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/ayushman-bharat" className="hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-emerald-400" /> Ayushman Bharat
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4 className="font-display font-bold mb-5 text-white relative inline-block">
              Specialties
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-yellow-300 rounded-full" />
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              {departments.slice(0, 7).map((d) => (
                <li key={d.id}>
                  <Link to={`/departments?department=${d.id}`} className="hover:text-yellow-300 transition-colors">{d.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold mb-5 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1.5 left-0 w-10 h-0.5 bg-yellow-300 rounded-full" />
            </h4>
            <ul className="space-y-4 text-sm text-white/65">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
                <span>{hospitalInfo.address}</span>
              </li>
              <li>
                <a href={`tel:${hospitalInfo.phone.reception}`} className="flex gap-3 hover:text-yellow-300 transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
                  <span>{hospitalInfo.phone.reception}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${hospitalInfo.email}`} className="flex gap-3 hover:text-yellow-300 transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
                  <span>{hospitalInfo.email}</span>
                </a>
              </li>
              <li className="pt-3 mt-1 border-t border-white/10">
                <a href={`tel:${hospitalInfo.phone.emergency}`}
                  className="flex items-center gap-2 bg-red-500/15 border border-red-500/25 text-red-300 rounded-xl px-4 py-3 hover:bg-red-500/25 hover:border-red-400/50 transition-all"
                >
                  <Phone className="w-4 h-4 animate-pulse" />
                  <div>
                    <p className="font-bold text-xs uppercase tracking-wider">Emergency 24/7</p>
                    <p className="font-bold text-white">{hospitalInfo.phone.emergency}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="container-tight py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/50">
            <p>© {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              Designed & Devloped by{" "}
              <a
                href="https://rewantechsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition"
              >
                Rewan Tech Solutions
              </a>
            </p>
            <p className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-emerald-400" />
              PM-JAY Empaneled
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
