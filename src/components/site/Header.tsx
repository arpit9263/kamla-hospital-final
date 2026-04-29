import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, Phone, ChevronDown,
  Ambulance, FlaskConical, Bed, Pill, Microscope, Scan, Syringe, Stethoscope,
  Heart, Eye, Bone, Brain, Baby, Activity, Smile, PhoneCall,
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
  visible: { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.2, ease: "easeOut" } },
  exit:    { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.15, ease: "easeIn" } },
};

const ServicesDropdown = () => (
  <motion.div
    variants={dropdownVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] rounded-2xl bg-card border border-border shadow-[0_20px_60px_-10px_hsl(248_60%_20%/0.20)] overflow-hidden z-50"
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
    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-card border border-border shadow-[0_20px_60px_-10px_hsl(248_60%_20%/0.20)] overflow-hidden z-50"
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

type DropdownItemProps = { to: string; label: string; dropdown?: React.ReactNode; scrolled: boolean; };

const NavItemWithDropdown = ({ to, label, dropdown, scrolled }: DropdownItemProps) => {
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
  const activeClass = scrolled
    ? "bg-primary/10 text-primary"
    : "bg-white/15 text-white";
  const inactiveClass = scrolled
    ? "text-foreground/75 hover:text-primary hover:bg-primary/8"
    : "text-white/85 hover:text-white hover:bg-white/12";

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
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_30px_-8px_hsl(248_60%_20%/0.18)] border-b border-border/60"
          : "bg-transparent"
      )}
    >
      {/* Top bar — only shown when not scrolled on desktop */}
      <div className={cn(
        "hidden md:block transition-all duration-300 overflow-hidden",
        scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
      )}>
        <div className="bg-primary/90 backdrop-blur-sm border-b border-white/10">
          <div className="container-tight flex items-center justify-between h-9 text-xs text-white/80">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Emergency 24×7: <a href={`tel:${hospitalInfo.phone.emergency}`} className="font-bold text-white ml-1 hover:text-gold transition-colors">{hospitalInfo.phone.emergency}</a>
              </span>
              <span className="hidden lg:flex items-center gap-1.5">OPD: 10:00 AM – 7:00 PM</span>
            </div>
            <div className="flex items-center gap-4">
              <a href={`mailto:${hospitalInfo.email}`} className="hover:text-white transition-colors">{hospitalInfo.email}</a>
              <Link to="/ayushman-bharat" className="flex items-center gap-1 font-semibold text-yellow-300 hover:text-yellow-200 transition-colors">
                ✦ Ayushman Bharat Available
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-tight flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={cn(
            "rounded-xl overflow-hidden transition-all duration-300",
            scrolled ? "bg-transparent p-0" : "bg-white/10 backdrop-blur-sm p-1"
          )}>
            <img src={hospitalInfo.logo} alt={hospitalInfo.name + " logo"} className="w-28 h-auto object-contain" />
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <NavItemWithDropdown to="/" label="Home" scrolled={scrolled} />
          <NavItemWithDropdown to="/about" label="About" scrolled={scrolled} />
          <NavItemWithDropdown to="/departments" label="Departments" dropdown={<DepartmentsDropdown />} scrolled={scrolled} />
          <NavItemWithDropdown to="/doctors" label="Doctors" scrolled={scrolled} />
          <NavItemWithDropdown to="/services" label="Services" dropdown={<ServicesDropdown />} scrolled={scrolled} />
          <NavItemWithDropdown to="/gallery" label="Gallery" scrolled={scrolled} />
          <NavItemWithDropdown to="/ayushman-bharat" label="Ayushman" scrolled={scrolled} />
          <NavItemWithDropdown to="/contact" label="Contact" scrolled={scrolled} />
        </nav>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${hospitalInfo.phone.reception}`}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-smooth",
              scrolled ? "text-foreground/80 hover:text-primary" : "text-white/85 hover:text-white"
            )}
          >
            <Phone className="w-4 h-4" /> {hospitalInfo.phone.reception}
          </a>
          <Button asChild size="sm"
            className={cn(
              "rounded-full font-semibold transition-all",
              scrolled
                ? "bg-primary text-white hover:bg-primary/90 shadow-soft"
                : "bg-white text-primary hover:bg-white/90 shadow-medium"
            )}
          >
            <Link to="/appointment">Book Appointment</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "lg:hidden p-2 rounded-lg transition-smooth",
            scrolled ? "hover:bg-accent text-foreground" : "hover:bg-white/15 text-white"
          )}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
