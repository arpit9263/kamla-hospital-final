import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import DepartmentsGrid from "@/components/site/DepartmentsGrid";
import DoctorCard from "@/components/site/DoctorCard";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import AyushmanSection from "@/components/site/AyushmanSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Ambulance,
  Activity,
  Users,
  Award,
  ShieldCheck,
  HeartHandshake,
  Shield,
  Clock,
  CheckCircle2,
  Phone,
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Stethoscope,
  FlaskConical,
  Bed,
  Heart,
} from "lucide-react";
import { doctors, hospitalInfo, galleryItems } from "@/data/hospital";

const whyUs = [
  {
    icon: Ambulance,
    title: "24/7 Emergency",
    desc: "Round-the-clock emergency care with trained medical staff and critical care facilities.",
    stat: "24×7",
  },
  {
    icon: Activity,
    title: "Advanced Diagnostics",
    desc: "X-Ray, MRI, CT Scan, Lab Tests and comprehensive diagnostic services under one roof.",
    stat: "10+",
  },
  {
    icon: Users,
    title: "Expert Specialists",
    desc: "10 experienced specialist doctors across cardiology, orthopedics, neurosurgery and more.",
    stat: "10",
  },
  {
    icon: HeartHandshake,
    title: "Patient-First Care",
    desc: "Personalized treatment plans with compassion, dignity and transparent communication.",
    stat: "100%",
  },
];

const facilities = [
  { icon: Stethoscope, name: "OPD & Consultation", desc: "10 AM – 7 PM daily" },
  { icon: FlaskConical, name: "Pathology Lab", desc: "Accurate, fast reports" },
  { icon: Bed, name: "ICU & Wards", desc: "24×7 monitoring" },
  { icon: Activity, name: "Operation Theatre", desc: "Advanced surgical setup" },
  { icon: Heart, name: "Cardiology", desc: "ECG & cardiac care" },
  { icon: Shield, name: "Ayushman Bharat", desc: "PM-JAY empaneled" },
];

const quickStats = [
  { label: "Specialist Doctors", value: "10+", icon: Users },
  { label: "Years of Service", value: "40+", icon: Clock },
  { label: "Departments", value: "10+", icon: Award },
  { label: "Emergency", value: "24×7", icon: Ambulance },
];

const Index = () => {
  return (
    <Layout>
      <Hero />

      {/* Emergency CTA Strip */}
      <div className="bg-red-600 text-white py-4">
        <div className="container-tight">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Ambulance className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base">Medical Emergency? Call us immediately</p>
                <p className="text-red-100 text-xs">Available 24 hours, 7 days a week</p>
              </div>
            </div>
            <a
              href={`tel:${hospitalInfo.phone.emergency}`}
              className="flex items-center gap-2 bg-white text-red-600 font-bold rounded-full px-5 py-2 text-sm hover:bg-red-50 transition-colors shrink-0 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              {hospitalInfo.phone.emergency}
            </a>
          </div>
        </div>
      </div>

      {/* Ayushman Bharat Highlight */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white py-5">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-yellow-300" />
              </div>
              <div>
                <p className="font-display text-lg md:text-xl font-extrabold">Ayushman Bharat PM-JAY Available</p>
                <p className="text-white/70 text-xs mt-0.5">Cashless treatment for eligible PM-JAY beneficiaries · ₹5 Lakh coverage</p>
              </div>
            </div>
            <Button asChild className="bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold rounded-full px-5 border-0 shadow-lg">
              <Link to="/ayushman-bharat">Check Eligibility <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <section className="py-8 border-b border-border bg-card">
        <div className="container-tight">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickStats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display font-extrabold text-xl text-primary">{s.value}</p>
                  <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Appointment CTA Banner */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-8 md:p-12">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white/5" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-white/70 font-semibold text-sm uppercase tracking-wider mb-2">Book Your Visit</p>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-3">
                  Schedule an Appointment Today
                </h2>
                <p className="text-white/80 text-base leading-relaxed">
                  Consult with our specialist doctors during OPD hours (10:00 AM – 7:00 PM) or reach out for emergency care any time.
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  {["Same Day Appointments", "Specialist Consultation", "No Long Waits"].map((f) => (
                    <span key={f} className="flex items-center gap-1.5 text-xs text-white/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <Button asChild size="lg" className="bg-white text-primary font-bold hover:bg-white/95 rounded-full px-8 shadow-strong">
                  <Link to="/appointment">
                    <Calendar className="w-4 h-4 mr-2" /> Book Appointment
                  </Link>
                </Button>
                <a href={`tel:${hospitalInfo.phone.reception}`}
                  className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" /> Or call {hospitalInfo.phone.reception}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Why Choose Kamla</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">
              Healthcare you can truly rely on
            </h2>
            <p className="text-muted-foreground text-base">
              A modern hospital built around your wellbeing — clinical excellence with a human touch and decades of trusted care.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((f, i) => (
              <div
                key={f.title}
                className="group relative p-7 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium hover:border-primary/20 transition-all duration-300 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-primary/5 -translate-y-8 translate-x-8 group-hover:bg-primary/10 transition-colors" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-soft">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-display font-extrabold text-primary mb-1 opacity-20 absolute top-0 right-0">{f.stat}</div>
                  <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Specialties</p>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold">Our centers of excellence</h2>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Departments with <span className="font-bold text-emerald-700 mx-0.5">Ayushman</span> badge are covered under PM-JAY.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white transition-all">
              <Link to="/departments">View all departments <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <DepartmentsGrid limit={8} />
        </div>
      </section>

      {/* Our Facilities */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Our Facilities</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold">
              Everything under one roof
            </h2>
            <p className="text-muted-foreground mt-3">Modern infrastructure for complete medical care — from OPD to ICU.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((f, i) => (
              <div key={f.name}
                className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/25 hover:shadow-soft transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm">{f.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ayushman Bharat Short Section */}
      <AyushmanSection />

      {/* Doctors */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Our Team</p>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold">Meet our specialists</h2>
              <p className="text-muted-foreground mt-2">Experienced, qualified and compassionate doctors dedicated to your wellbeing.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white transition-all">
              <Link to="/doctors">View All Doctors <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {doctors.slice(0, 4).map((d, i) => (
              <DoctorCard key={d.id} doctor={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-border bg-card">
        <div className="container-tight">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">Accreditations & Certifications</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center text-center">
            {[
              { icon: ShieldCheck, label: "NABH Accredited", color: "text-primary" },
              { icon: Award, label: "JCI Certified", color: "text-primary" },
              { icon: Activity, label: "ISO 9001:2015", color: "text-primary" },
              { icon: HeartHandshake, label: "Green OT Certified", color: "text-primary" },
              { icon: Shield, label: "PM-JAY Empaneled", color: "text-emerald-600" },
            ].map((b, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className={`w-12 h-12 rounded-full bg-primary/8 flex items-center justify-center ${b.color}`}>
                  <b.icon className="w-6 h-6" />
                </div>
                <p className={`text-sm font-semibold ${b.color}`}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Gallery</p>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold">Inside Kamla Hospital</h2>
              <p className="text-muted-foreground mt-3">A look at our facilities, patient areas and diagnostic setup.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-white transition-all">
              <Link to="/gallery">View Gallery <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {galleryItems.slice(0, 4).map((item, i) => (
              <Link key={item.id} to="/gallery"
                className="group relative overflow-hidden rounded-2xl border border-border shadow-soft h-64 animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/70">{item.category}</p>
                  <h3 className="font-display font-bold text-base leading-tight">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Quick Contact */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Get In Touch</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">Quick Contact</h2>
            <p className="text-muted-foreground mt-3">Reach us for appointments, queries or emergency support.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { icon: Phone, label: "Reception", value: hospitalInfo.phone.reception, href: `tel:${hospitalInfo.phone.reception}`, color: "bg-primary/10 text-primary" },
              { icon: Ambulance, label: "Emergency 24/7", value: hospitalInfo.phone.emergency, href: `tel:${hospitalInfo.phone.emergency}`, color: "bg-red-50 text-red-600" },
              { icon: MapPin, label: "Location", value: "Jhansi, Uttar Pradesh", href: `https://maps.google.com/?q=${hospitalInfo.mapQuery}`, color: "bg-primary/10 text-primary" },
            ].map((c) => (
              <a key={c.label} href={c.href}
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/25 hover:shadow-medium transition-all duration-200"
              >
                <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <c.icon className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{c.label}</p>
                <p className="font-display font-bold text-foreground">{c.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </Layout>
  );
};

export default Index;
