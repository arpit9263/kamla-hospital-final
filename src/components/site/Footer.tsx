import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Shield, CheckCircle2, Clock, Heart } from "lucide-react";
import { hospitalInfo, departments } from "@/data/hospital";

const Footer = () => {
  return (
    <footer className="bg-[hsl(248_70%_10%)] text-white mt-20">
      {/* Ayushman Bharat Trust Bar */}
      <div className="border-b border-white/10 bg-emerald-950">
        <div className="container-tight py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-800 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-white">Ayushman Bharat Empaneled Hospital</p>
              <p className="text-xs text-white/50 mt-0.5">Registered under Pradhan Mantri Jan Arogya Yojana (PM-JAY)</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs text-white/55">
            {["Cashless Treatment", "₹5 Lakh Coverage", "All Govt. Schemes Accepted"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-white/50 flex items-center gap-2 shrink-0">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ayushman Helpline: <strong className="text-white">14555</strong></span>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-tight py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-5">
            <div className="bg-white rounded-xl p-2 inline-block">
              <img src={hospitalInfo.logo} alt={hospitalInfo.name + " logo"} className="w-28 h-auto" />
            </div>
          </Link>
          <p className="text-sm text-white/60 leading-relaxed mb-5">
            A multi-specialty hospital providing OPD, emergency care, diagnostics, surgery and specialist consultation with compassion.
          </p>
          {/* Hours */}
          <div className="space-y-2 text-xs text-white/55 mb-5">
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
              <a key={i} href="#"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-primary flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-bold mb-5 text-white">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
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
                <Link to={l.to} className="hover:text-white transition-colors hover:translate-x-1 inline-block transition-transform">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/ayushman-bharat" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-400" /> Ayushman Bharat
              </Link>
            </li>
          </ul>
        </div>

        {/* Specialties */}
        <div>
          <h4 className="font-display font-bold mb-5 text-white">Specialties</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            {departments.slice(0, 6).map((d) => (
              <li key={d.id}>
                <Link to={`/departments#${d.id}`} className="hover:text-white transition-colors">{d.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-bold mb-5 text-white">Contact Us</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
              <span>{hospitalInfo.address}</span>
            </li>
            <li>
              <a href={`tel:${hospitalInfo.phone.reception}`} className="flex gap-3 hover:text-white transition-colors">
                <Phone className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
                <span>{hospitalInfo.phone.reception}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${hospitalInfo.email}`} className="flex gap-3 hover:text-white transition-colors">
                <Mail className="w-4 h-4 mt-0.5 text-primary-glow shrink-0" />
                <span>{hospitalInfo.email}</span>
              </a>
            </li>
            {/* Emergency */}
            <li className="pt-3 mt-1 border-t border-white/10">
              <a href={`tel:${hospitalInfo.phone.emergency}`}
                className="flex items-center gap-2 bg-red-500/15 border border-red-500/25 text-red-400 rounded-xl px-4 py-3 hover:bg-red-500/25 transition-colors"
              >
                <Phone className="w-4 h-4 animate-pulse" />
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider">Emergency 24/7</p>
                  <p className="font-bold">{hospitalInfo.phone.emergency}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-tight py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} {hospitalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for better healthcare in Jhansi
          </p>
          <p className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-emerald-400" />
            PM-JAY Empaneled
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
