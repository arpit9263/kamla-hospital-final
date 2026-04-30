import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Hero from "@/components/site/Hero";
import DepartmentsGrid from "@/components/site/DepartmentsGrid";
import DoctorCard from "@/components/site/DoctorCard";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import AyushmanSection from "@/components/site/AyushmanSection";
import AboutSection from "@/components/site/AboutSection";
import StatsSection from "@/components/site/StatsSection";
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


const Index = () => {
  return (
    <Layout>
      <Hero />

      {/* Emergency + Ayushman cards strip */}
      <section className="relative mt-6 md:mt-10 z-20">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
            {/* Emergency Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-600 to-orange-600 text-white p-6 md:p-7 shadow-strong hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute top-1/2 -right-20 w-48 h-48 rounded-full bg-white/5" />
              <div className="absolute inset-0 overflow-hidden">
                <span className="shine-el absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
              <div className="relative flex items-center gap-4">
                <div className="shrink-0 relative">
                  <span className="absolute inset-0 rounded-2xl bg-white/30 animate-ping" />
                  <div className="relative w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/30">
                    <Ambulance className="w-7 h-7" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 mb-1">Medical Emergency 24×7</p>
                  <p className="font-display text-lg md:text-xl font-extrabold leading-tight">Need urgent care? Call us now</p>
                  <p className="text-white/80 text-xs mt-1">Trained ambulance & critical care team on standby</p>
                </div>
                <a href={`tel:${hospitalInfo.phone.emergency}`}
                  className="shrink-0 hidden sm:flex items-center gap-2 bg-white text-red-600 font-extrabold rounded-full px-5 py-2.5 text-sm hover:bg-red-50 transition-colors shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  {hospitalInfo.phone.emergency}
                </a>
              </div>
              <a href={`tel:${hospitalInfo.phone.emergency}`} className="sm:hidden mt-4 flex items-center justify-center gap-2 bg-white text-red-600 font-extrabold rounded-full py-2.5 text-sm relative">
                <Phone className="w-4 h-4" /> {hospitalInfo.phone.emergency}
              </a>
            </div>

            {/* Ayushman Card */}
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-700 to-teal-700 text-white p-6 md:p-7 shadow-strong hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute -top-8 right-1/3 w-32 h-32 rounded-full bg-yellow-300/10" />
              <div className="absolute inset-0 overflow-hidden">
                <span className="shine-el absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
              <div className="relative flex items-center gap-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center ring-1 ring-yellow-300/40">
                  <Shield className="w-7 h-7 text-yellow-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-300/90 mb-1">PM-JAY Empaneled</p>
                  <p className="font-display text-lg md:text-xl font-extrabold leading-tight">Ayushman Bharat — ₹5 Lakh Cover</p>
                  <p className="text-white/80 text-xs mt-1">Cashless treatment for eligible beneficiaries</p>
                </div>
                <Button asChild className="hidden sm:inline-flex bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold rounded-full px-5 border-0 shadow-lg shrink-0">
                  <Link to="/ayushman-bharat">Check Eligibility <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
                </Button>
              </div>
              <Button asChild className="sm:hidden mt-4 w-full bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-bold rounded-full">
                <Link to="/ayushman-bharat">Check Eligibility <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium KPI / Stats Section */}
      <StatsSection />

      {/* Insurance & Cashless Partners */}
      <section className="py-10 border-y border-border bg-card">
        <div className="container-tight">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Cashless & Insurance Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {hospitalInfo.insurancePartners.map((p) => (
              <span
                key={p}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground/80 hover:border-primary/40 hover:text-primary hover:shadow-soft transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {p}
              </span>
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

      {/* About Kamla */}
      <AboutSection />

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

      {/* Gallery Preview — masonry-style mosaic with rich hover */}
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
          <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 md:gap-4 h-[440px] md:h-[480px]">
            {galleryItems.slice(0, 5).map((item, i) => {
              const spans = [
                "col-span-2 row-span-2",     // big left
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
                "col-span-1 row-span-1",
              ];
              return (
                <Link
                  key={item.id}
                  to="/gallery"
                  className={`group relative overflow-hidden rounded-2xl border border-border shadow-soft animate-fade-in-up ${spans[i]}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110 group-hover:rotate-1"
                    loading="lazy"
                  />
                  {/* Always-on subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
                  {/* Hover overlay deepens */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Shine sweep */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <span className="shine-el absolute inset-y-0 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                  {/* Caption */}
                  <div className="absolute left-4 right-4 bottom-4 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] uppercase tracking-widest text-white/80">{item.category}</p>
                    <h3 className="font-display font-bold text-sm md:text-base leading-tight">{item.title}</h3>
                  </div>
                  {/* Plus badge on hover */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 -rotate-45" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video / Virtual Tour section */}
      <section className="section-padding relative overflow-hidden bg-foreground">
        <img
          src={hospitalInfo.images.exteriorWide}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 animate-ken-burns"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-foreground/90" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-glow/30 blur-3xl animate-blob" />

        <div className="container-tight relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300 mb-3">★ Virtual Tour</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
              Step inside <span className="text-yellow-300">Kamla Hospital</span>
            </h2>
            <p className="text-white/80 leading-relaxed mb-7">
              From our welcoming reception to advanced diagnostics, modern operation theatres and comfortable wards — see the care, technology and compassion that defines Kamla.
            </p>
            <div className="flex flex-wrap gap-3 mb-7">
              {["NABH Standards", "Advanced Diagnostics", "24×7 ICU", "PM-JAY"].map((tag) => (
                <span key={tag} className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-300 text-primary font-bold rounded-full">
              <Link to="/gallery">Explore Gallery <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>

          {/* Video player */}
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-tr from-yellow-300/40 to-primary-glow/40 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity rounded-[2rem]" />
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-strong ring-1 ring-white/20">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={hospitalInfo.images.exteriorWide}
                className="w-full h-full object-cover"
              >
                <source src="https://cdn.coverr.co/videos/coverr-doctors-walking-in-hospital-hallway-7251/1080p.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white pointer-events-none">
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-widest text-white/70">Featured</p>
                  <p className="font-display font-bold text-sm">Inside Kamla Hospital</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Quick Contact — Redesigned */}
      <section className="section-padding bg-gradient-soft relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-yellow-400/8 blur-3xl" />

        <div className="container-tight relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">★ Get In Touch</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold">We're here to help</h2>
            <p className="text-muted-foreground mt-3">Reach us for appointments, queries or emergency support — anytime, any day.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {[
              {
                icon: Phone,
                label: "Reception",
                value: hospitalInfo.phone.reception,
                sub: "Appointments & helpdesk",
                href: `tel:${hospitalInfo.phone.reception}`,
                gradient: "from-primary to-primary-glow",
                cta: "Call now",
              },
              {
                icon: Ambulance,
                label: "Emergency 24/7",
                value: hospitalInfo.phone.emergency,
                sub: "Round-the-clock critical care",
                href: `tel:${hospitalInfo.phone.emergency}`,
                gradient: "from-red-600 to-orange-500",
                cta: "Call emergency",
                accent: true,
              },
              {
                icon: MapPin,
                label: "Visit Us",
                value: "Jhansi, Uttar Pradesh",
                sub: hospitalInfo.address,
                href: `https://maps.google.com/?q=${encodeURIComponent(hospitalInfo.mapQuery)}`,
                gradient: "from-emerald-600 to-teal-600",
                cta: "Get directions",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`group relative overflow-hidden rounded-3xl bg-card border border-border lift-on-hover p-7 ${c.accent ? "ring-2 ring-red-400/30" : ""}`}
              >
                {/* Decorative gradient blob */}
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${c.gradient} opacity-10 group-hover:opacity-25 group-hover:scale-125 transition-all duration-500`} />

                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} text-white flex items-center justify-center mb-5 shadow-soft group-hover:shadow-medium group-hover:-rotate-6 transition-all`}>
                  <c.icon className="w-6 h-6" />
                </div>
                <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1.5">{c.label}</p>
                <p className="relative font-display font-extrabold text-xl text-foreground mb-2">{c.value}</p>
                <p className="relative text-sm text-muted-foreground mb-5">{c.sub}</p>
                <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  {c.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>

          {/* Mini Bar */}
          <div className="max-w-6xl mx-auto mt-6 grid sm:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
              <Clock className="w-5 h-5 text-primary shrink-0" />
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">OPD Timing</p>
                <p className="font-semibold">{hospitalInfo.workingHours.opd}</p>
              </div>
            </div>
            <a href={`mailto:${hospitalInfo.email}`} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="text-base">@</span>
              </div>
              <div className="leading-tight min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Email</p>
                <p className="font-semibold truncate">{hospitalInfo.email}</p>
              </div>
            </a>
            <Link to="/appointment" className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
              <Calendar className="w-4 h-4" /> Book an Appointment
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
    </Layout>
  );
};

export default Index;
