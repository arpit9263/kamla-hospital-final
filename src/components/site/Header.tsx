import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, Phone, ChevronDown, Mail, Clock, Shield,
  Ambulance, FlaskConical, Bed, Pill, Microscope, Scan, Syringe, Stethoscope,
  Heart, Eye, Bone, Brain, Activity, Smile, PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hospitalInfo } from "@/data/hospital";

const servicesMenu = [
  { icon: Ambulance,    label: "Emergency & Trauma",  desc: "Emergency available 24x7", to: "/services" },
  { icon: Scan,         label: "Diagnostic Services", desc: "X-Ray, MRI, CT Scan", to: "/services" },
  { icon: FlaskConical, label: "Lab Tests",            desc: "Pathology and lab support", to: "/services" },
  { icon: Bed,          label: "Inpatient Care",       desc: "Patient beds and wards", to: "/services" },
  { icon: Pill,         label: "Pharmacy",             desc: "Medicine support", to: "/services" },
  { icon: Microscope,   label: "Health Check-ups",     desc: "OPD and diagnostics", to: "/services" },
  { icon: Stethoscope,  label: "OPD Consultation",     desc: "10:00 AM to 7:00 PM", to: "/appointment" },
  { icon: Syringe,      label: "Surgical Care",        desc: "OT and surgical support", to: "/services" },
];

const departmentsMenu = [
  { icon: Stethoscope,  label: "ENT",                  to: "/departments#ent" },
  { icon: Activity,     label: "Gastro & Liver",       to: "/departments#gastro-liver" },
  { icon: Bone,         label: "Orthopedic",           to: "/departments#orthopedics" },
  { icon: Heart,        label: "Cardiology",           to: "/departments#cardiology" },
  { icon: Eye,          label: "Ophthalmology",        to: "/departments#ophthalmology" },
  { icon: Stethoscope,  label: "General & Pulmonary",  to: "/departments#general-pulmonary" },
  { icon: Smile,        label: "Dental & Maxillofacial", to: "/departments#dental" },
  { icon: Brain,        label: "Neurosurgery",         to: "/departments#neurosurgery" },
];

const dropdownVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } },
} as const;

const ServicesDropdown = () => (
  <motion.div
    variants={dropdownVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] rounded-2xl bg-card border border-border shadow-strong overflow-hidden z-50"
  >
    <div className="p-2">
      <div className="px-3 py-2 mb-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Our Services</p>
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        {servicesMenu.map((s) => (
          <Link key={s.label} to={s.to}
            className="group flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-accent transition-colors"
          >
            <div className="shrink-0 w-8 h-8 rounded-lg bg-accent group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-all">
              <s.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-tight">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-2 mx-1 mb-1 pt-2 border-t border-border">
        <Link to="/services" className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-primary hover:bg-accent transition-colors">
          View all services →
        </Link>
      </div>
    </div>
  </motion.div>
);

const DepartmentsDropdown = () => (
  <motion.div
    variants={dropdownVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl bg-card border border-border shadow-strong overflow-hidden z-50"
  >
    <div className="p-2">
      <div className="px-3 py-2 mb-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Departments</p>
      </div>
      <div className="space-y-0.5">
        {departmentsMenu.map((d) => (
          <Link key={d.label} to={d.to}
            className="group flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-accent transition-colors"
          >
            <div className="shrink-0 w-7 h-7 rounded-lg bg-accent group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-all">
              <d.icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-medium text-foreground">{d.label}</span>
          </Link>
        ))}
      </div>
      <div className="mt-2 mx-1 mb-1 pt-2 border-t border-border">
        <Link to="/departments" className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-primary hover:bg-accent transition-colors">
          All departments →
        </Link>
      </div>
    </div>
  </motion.div>
);

type DropdownItemProps = { to: string; label: string; dropdown?: React.ReactNode };

const NavItemWithDropdown = ({ to, label, dropdown }: DropdownItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const baseClasses = "px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200";
  const activeClass = "bg-primary/10 text-primary";
  const inactiveClass = "text-foreground/75 hover:text-primary hover:bg-primary/8";

  if (!dropdown) {
    return (
      <NavLink to={to} end={to === "/"}
        className={({ isActive }) => cn(baseClasses, isActive ? activeClass : inactiveClass)}
      >
        {label}
      </NavLink>
    );
  }

  return (
    <div ref={ref} className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button type="button" onClick={() => setOpen((v) => !v)}
        className={cn("flex items-center gap-1", baseClasses, isActive || open ? activeClass : inactiveClass)}
      >
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>{open && dropdown}</AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Slim Top utility bar — always visible (desktop) */}
      <div className={cn(
        "hidden md:block transition-all duration-300 overflow-hidden",
        scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
      )}>
        <div className="bg-animated-hero text-white border-b border-white/10">
          <div className="container-tight flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-6 text-white/85">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Emergency 24×7:
                <a href={`tel:${hospitalInfo.phone.emergency}`} className="font-bold text-white hover:text-yellow-300 transition-colors">
                  {hospitalInfo.phone.emergency}
                </a>
              </span>
              <span className="hidden lg:flex items-center gap-1.5">
                <Clock className="h-3 w-3" /> OPD: {hospitalInfo.workingHours.opd}
              </span>
              <a href={`mailto:${hospitalInfo.email}`} className="hidden xl:flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="h-3 w-3" /> {hospitalInfo.email}
              </a>
            </div>
            <Link to="/ayushman-bharat" className="flex items-center gap-1.5 font-semibold text-yellow-300 hover:text-yellow-200 transition-colors">
              <Shield className="h-3.5 w-3.5" />
              Ayushman Bharat Accepted
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar — always white background for clear visibility */}
      <div
        className={cn(
          "bg-white/95 backdrop-blur-xl transition-all duration-300 border-b",
          scrolled
            ? "shadow-[0_8px_30px_-8px_hsl(248_60%_20%/0.18)] border-border/60"
            : "shadow-soft border-border/40"
        )}
      >
        <div className="container-tight flex items-center justify-between h-20 md:h-[88px] gap-4">
          {/* Logo — prominent presentation */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-hero opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
              <img
                src={hospitalInfo.logo}
                alt={hospitalInfo.name + " logo"}
                className="relative w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="font-display text-lg md:text-xl font-extrabold text-primary tracking-tight">
                {hospitalInfo.name}
              </p>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                {hospitalInfo.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <NavItemWithDropdown to="/" label="Home" />
            <NavItemWithDropdown to="/about" label="About" />
            <NavItemWithDropdown to="/departments" label="Departments" dropdown={<DepartmentsDropdown />} />
            <NavItemWithDropdown to="/doctors" label="Doctors" />
            <NavItemWithDropdown to="/services" label="Services" dropdown={<ServicesDropdown />} />
            <NavItemWithDropdown to="/gallery" label="Gallery" />
            <NavItemWithDropdown to="/ayushman-bharat" label="Ayushman" />
            <NavItemWithDropdown to="/contact" label="Contact" />
          </nav>

          {/* Right CTA cluster */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a href={`tel:${hospitalInfo.phone.reception}`}
              className="hidden xl:flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-all">
                <Phone className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Reception</p>
                <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{hospitalInfo.phone.reception}</p>
              </div>
            </a>
            <Button asChild size="sm"
              className="rounded-full font-semibold bg-primary text-white hover:bg-primary/90 shadow-soft hover:shadow-medium hover:-translate-y-0.5"
            >
              <Link to="/appointment">Book Appointment</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-accent text-foreground transition-smooth"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-border shadow-strong"
          >
            <div className="container-tight py-4 flex flex-col gap-1">
              {/* Emergency strip */}
              <a href={`tel:${hospitalInfo.phone.emergency}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-700 font-semibold text-sm mb-2"
              >
                <PhoneCall className="w-4 h-4 animate-pulse" />
                Emergency 24/7: {hospitalInfo.phone.emergency}
              </a>

              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/doctors", label: "Doctors" },
                { to: "/gallery", label: "Gallery" },
                { to: "/ayushman-bharat", label: "Ayushman Bharat" },
                { to: "/contact", label: "Contact" },
              ].map((item) => (
                <NavLink key={item.to} to={item.to} end={item.to === "/"}
                  className={({ isActive }) =>
                    cn("px-4 py-3 rounded-xl text-sm font-medium transition-smooth", isActive ? "bg-primary/10 text-primary font-semibold" : "hover:bg-accent/60")
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Departments accordion */}
              <div>
                <button type="button"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent/60 transition-smooth"
                  onClick={() => setMobileExpanded(mobileExpanded === "depts" ? null : "depts")}
                >
                  Departments
                  <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === "depts" && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "depts" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      {departmentsMenu.map((d) => (
                        <Link key={d.label} to={d.to}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-primary hover:bg-accent/60 transition-smooth"
                        >
                          <d.icon className="w-4 h-4 text-primary" />
                          {d.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Services accordion */}
              <div>
                <button type="button"
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium hover:bg-accent/60 transition-smooth"
                  onClick={() => setMobileExpanded(mobileExpanded === "services" ? null : "services")}
                >
                  Services
                  <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === "services" && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "services" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden pl-4"
                    >
                      {servicesMenu.map((s) => (
                        <Link key={s.label} to={s.to}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:text-primary hover:bg-accent/60 transition-smooth"
                        >
                          <s.icon className="w-4 h-4 text-primary" />
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button asChild className="mt-3 bg-primary text-white rounded-full font-semibold">
                <Link to="/appointment">Book Appointment</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
