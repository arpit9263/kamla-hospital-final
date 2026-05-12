import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import {
  Heart, Eye, Target, Sparkles, Award, Building2, Shield, Stethoscope, Activity,
  Users, Ambulance, Baby, BadgeCheck, Phone, ArrowRight, Quote, Star, MapPin, Clock, HeartPulse,
} from "lucide-react";
import { hospitalInfo, testimonials } from "@/data/hospital";
import certNabh from "@/assets/cert-nabh.svg";
import certJci from "@/assets/cert-jci.svg";
import certIso from "@/assets/cert-iso.svg";
import certPmjay from "@/assets/cert-pmjay.svg";
import certGreenot from "@/assets/cert-greenot.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
};

/* ---------------- Counter ---------------- */
const Counter = ({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(end * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(end);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);
  return <span ref={ref}>{val.toLocaleString("en-IN")}{suffix}</span>;
};

/* ---------------- Leadership ---------------- */
const leaders = [
  {
    name: "Dr. Vinod Misuriya",
    role: "Founder & Chairman",
    qualification: "MBBS, MS — ENT Specialist",
    short: "Founder of Kamla Hospital Jhansi with 40+ years of clinical leadership and patient-first vision.",
    long: "Dr. Vinod Misuriya founded Kamla Hospital with a mission to bring trustworthy, ethical multi-specialty care to Jhansi. As a senior ENT specialist, he continues to guide the hospital's clinical standards, surgical excellence and a culture of compassion.",
    initials: "VM",
  },
  {
    name: "Rajat Misuriya",
    role: "Managing Director",
    qualification: "BDS, MDS — Oral & Maxillofacial Surgeon",
    short: "Operational leader driving hospital quality, patient experience and modern infrastructure.",
    long: "Rajat Misuriya leads day-to-day operations, service quality and patient support systems at Kamla Hospital. He focuses on modern infrastructure, smooth admissions, and a warm, accessible patient experience for every family in Jhansi.",
    initials: "RM",
  },
  {
    name: "Archna Misuriya",
    role: "Managing Director",
    qualification: "Hospital Administration",
    short: "Champions compassionate care, nursing standards and patient-family communication.",
    long: "Archna Misuriya supports compassionate care standards across the hospital — from nursing and ward services to patient counselling — making sure every patient and family receives clear, empathetic communication throughout their treatment.",
    initials: "AM",
  },
];

const LeaderCard = ({ l, i }: { l: typeof leaders[number]; i: number }) => (
  <motion.div
    custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}
    className="group relative"
  >
    <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/40 via-primary-glow/30 to-[hsl(var(--gold))]/30 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
    <div className="relative h-full rounded-3xl bg-card border border-border p-7 shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-primary/10 to-[hsl(var(--gold))]/10 blur-2xl" />
      <div className="relative flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-hero text-primary-foreground flex items-center justify-center font-display font-extrabold text-xl shadow-medium">
          {l.initials}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{l.role}</p>
          <h3 className="font-display font-extrabold text-xl leading-tight">{l.name}</h3>
        </div>
      </div>
      <p className="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-1.5">
        <BadgeCheck className="w-3.5 h-3.5 text-primary" /> {l.qualification}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{l.short}</p>
      <Dialog>
        <DialogTrigger asChild>
          <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
            View profile <ArrowRight className="w-4 h-4" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{l.role}</p>
            <DialogTitle className="font-display text-2xl">{l.name}</DialogTitle>
            <DialogDescription className="text-sm">{l.qualification}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground leading-relaxed">{l.long}</p>
        </DialogContent>
      </Dialog>
    </div>
  </motion.div>
);

/* ---------------- Mission / Vision / Values ---------------- */
const mvv = [
  { icon: Target, title: "Our Mission", text: "To deliver compassionate, accessible and innovative healthcare to every family in Jhansi — combining experienced specialists, modern diagnostics and 24x7 emergency support under one roof.", color: "from-primary to-primary-glow" },
  { icon: Eye, title: "Our Vision", text: "To be the most trusted multi-specialty hospital in the Bundelkhand region, setting benchmarks for clinical excellence, patient experience and ethical healthcare practice.", color: "from-primary-glow to-[hsl(258_65%_45%)]" },
  { icon: Heart, title: "Our Values", text: "Empathy, integrity, transparency and excellence guide every consultation, surgery and conversation we have with our patients and their families.", color: "from-[hsl(var(--gold))] to-[hsl(38_88%_60%)]" },
];

/* ---------------- Hospital Journey ---------------- */
const journey = [
  { year: "1998", title: "Foundation Stone", text: "Dr. Vinod Misuriya founded Kamla Hospital in Jhansi with a vision of accessible, ethical multi-specialty care." },
  { year: "2005", title: "Multi-Specialty Expansion", text: "Added Orthopedic, Cardiology, Gynecology and Surgery departments with experienced specialists." },
  { year: "2012", title: "Critical Care Block", text: "Launched dedicated ICU, NICU and ICCU units with modern monitoring equipment." },
  { year: "2018", title: "Diagnostics Upgrade", text: "Expanded in-house X-Ray, Ultrasound, CT Scan, MRI and pathology under one roof." },
  { year: "2020", title: "Ayushman Bharat Empanelled", text: "Joined PM-JAY to support eligible families with cashless treatment in Jhansi." },
  { year: "2024", title: "120-Bed Modern Facility", text: "Operating today as a 120-bed multi-specialty hospital with 10+ specialists and 24x7 emergency." },
];

/* ---------------- Why Choose ---------------- */
const whyChoose = [
  { icon: Stethoscope, title: "10+ Experienced Specialists", text: "Senior consultants across ENT, Ortho, Cardio, Gastro, Gynae, Neuro and more — under one roof in Jhansi." },
  { icon: Ambulance, title: "24x7 Emergency & Trauma", text: "Round-the-clock emergency response with fast triage, ICU support and ambulance service." },
  { icon: Activity, title: "Advanced Diagnostics", text: "X-Ray, Ultrasound, CT Scan, MRI and full pathology lab — quick reports, accurate guidance." },
  { icon: Shield, title: "Ayushman Bharat Approved", text: "Empanelled for PM-JAY cashless treatment for eligible beneficiaries." },
  { icon: Heart, title: "Patient-First Care", text: "Transparent counselling, clear pricing, and warm support staff at every touchpoint." },
  { icon: BadgeCheck, title: "25+ Years of Trust", text: "Trusted by thousands of families across Jhansi and the Bundelkhand region since 1998." },
];

/* ---------------- Critical Care ---------------- */
const criticalCare = [
  { icon: HeartPulse, title: "Adult ICU", text: "Dedicated intensive care for critically ill adult patients with 24x7 intensivist coverage and modern monitoring." },
  { icon: Baby, title: "NICU", text: "Neonatal Intensive Care Unit for newborns needing close observation, warmers and respiratory support." },
  { icon: Heart, title: "ICCU", text: "Intensive Cardiac Care Unit equipped for cardiac emergencies, monitoring and post-procedure recovery." },
];

/* ---------------- Accreditations ---------------- */
const accreditations = [
  { src: certNabh, label: "NABH Standards" },
  { src: certJci, label: "JCI Aligned" },
  { src: certIso, label: "ISO 9001:2015" },
  { src: certPmjay, label: "Ayushman Bharat" },
  { src: certGreenot, label: "Green OT" },
];

/* ---------------- Initiatives ---------------- */
const initiatives = [
  { icon: Users, title: "Free Health Camps", text: "Periodic community health and screening camps for diabetes, BP, eye and orthopedic checkups across Jhansi." },
  { icon: Heart, title: "Awareness Drives", text: "Patient education on cardiac health, women's wellness and child immunisation." },
  { icon: HeartPulse, title: "Affordable Care", text: "Discounted consultation and Ayushman Bharat support for economically weaker families." },
];

const About = () => {
  return (
    <Layout>
      <PageHeader
        eyebrow="About Kamla Hospital Jhansi"
        title="A trusted multi-specialty hospital in Jhansi since 1998"
        subtitle="Kamla Hospital is one of the best multi-specialty hospitals in Jhansi — offering experienced specialists, 24x7 emergency care, ICU/NICU/ICCU support, advanced diagnostics and Ayushman Bharat treatment under one roof."
      />

      {/* ---- Story ---- */}
      <section className="section-padding">
        <div className="container-tight grid lg:grid-cols-2 gap-14 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="relative">
            <img src={hospitalInfo.images.exterior} alt="Kamla Hospital Jhansi exterior view" loading="lazy" width={1400} height={900} className="rounded-[2rem] shadow-strong w-full h-auto" />
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-medium hidden md:block">
              <p className="font-display font-extrabold text-3xl text-gradient">25+</p>
              <p className="text-xs text-muted-foreground">Years serving Jhansi</p>
            </div>
            <div className="absolute -top-6 -left-6 glass rounded-2xl p-4 shadow-medium hidden md:block">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">NABH Standards</p>
              <p className="text-xs text-muted-foreground mt-1">Quality assured care</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Our Story</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-6">Built on care. Powered by trust.</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 1998 by <strong>Dr. Vinod Misuriya</strong>, Kamla Hospital was started with a simple promise — bring honest, multi-specialty healthcare close to every family in Jhansi. Today, that same promise drives a 120-bed hospital with 10+ specialists, modern diagnostics and 24x7 emergency support.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              From OPD consultation to advanced surgery, ICU, NICU, ICCU and Ayushman Bharat cashless treatment — we focus on clear communication, ethical practice and patient-first decisions at every step.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg"><a href="/appointment">Book Appointment</a></Button>
              <Button asChild variant="outline" size="lg"><a href={`tel:${hospitalInfo.phone.emergency}`}><Phone className="w-4 h-4" /> {hospitalInfo.phone.emergency}</a></Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---- Stats Counter ---- */}
      <section className="relative py-16 bg-animated-hero overflow-hidden">
        <div className="absolute inset-0 bg-grid-soft opacity-50" />
        <div className="container-tight relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { end: 25, suffix: "+", label: "Years of Service" },
            { end: 120, suffix: "", label: "Hospital Beds" },
            { end: 50000, suffix: "+", label: "Patients Treated" },
            { end: 10, suffix: "+", label: "Senior Specialists" },
          ].map((s, i) => (
            <motion.div key={s.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="text-center p-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15">
              <p className="font-display font-extrabold text-3xl md:text-5xl text-white mb-1">
                <Counter end={s.end} suffix={s.suffix} />
              </p>
              <p className="text-xs md:text-sm text-white/70 uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- Mission / Vision / Values ---- */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">What drives us</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Mission, Vision & Values</h2>
            <p className="text-muted-foreground">Three principles that shape every clinical decision and every patient conversation at Kamla Hospital Jhansi.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mvv.map((m, i) => (
              <motion.div key={m.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group relative p-8 rounded-3xl bg-card border border-border shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${m.color} opacity-10 blur-3xl group-hover:opacity-25 transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${m.color} text-white flex items-center justify-center mb-5 shadow-medium group-hover:scale-110 transition-transform duration-500`}>
                  <m.icon className="w-7 h-7" />
                </div>
                <h3 className="relative font-display font-extrabold text-2xl mb-3">{m.title}</h3>
                <p className="relative text-muted-foreground leading-relaxed">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Leadership ---- */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Leadership Team</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Guided by experienced leadership</h2>
            <p className="text-muted-foreground leading-relaxed">A founding family of clinicians and administrators committed to ethical healthcare and continuous improvement.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {leaders.map((l, i) => <LeaderCard key={l.name} l={l} i={i} />)}
          </div>
        </div>
      </section>

      {/* ---- Why Choose ---- */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Why Choose Us</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Why families choose Kamla Hospital Jhansi</h2>
            <p className="text-muted-foreground">A complete healthcare ecosystem — specialists, diagnostics, critical care and emergency — under one trusted roof.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChoose.map((w, i) => (
              <motion.div key={w.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-4 group-hover:bg-gradient-hero group-hover:text-primary-foreground transition-all duration-300">
                  <w.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Hospital Journey Timeline ---- */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Our Journey</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">25+ years of growth in Jhansi</h2>
            <p className="text-muted-foreground">From a small clinic to a 120-bed multi-specialty hospital — milestones that shaped our care.</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 md:-translate-x-1/2" />
            <div className="space-y-8">
              {journey.map((j, i) => (
                <motion.div key={j.year} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                  className={`relative flex items-start gap-5 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:items-center`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gradient-hero ring-4 ring-background md:-translate-x-1/2 mt-6" />
                  <div className="md:w-1/2 md:px-10 pl-12 md:pl-0">
                    <div className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
                      <p className="text-sm font-bold text-primary mb-1">{j.year}</p>
                      <h3 className="font-display font-bold text-xl mb-2">{j.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{j.text}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- Critical Care ---- */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Critical Care</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">ICU, NICU & ICCU support 24x7</h2>
            <p className="text-muted-foreground">Round-the-clock intensive care for adults, newborns and cardiac patients — supported by experienced doctors and modern monitoring.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {criticalCare.map((c, i) => (
              <motion.div key={c.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="relative p-7 rounded-3xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-1 group">
                <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-emergency text-white flex items-center justify-center mb-5 shadow-medium">
                  <c.icon className="w-7 h-7" />
                </div>
                <h3 className="relative font-display font-extrabold text-xl mb-2">{c.title}</h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Emergency strip ---- */}
      <section className="py-12">
        <div className="container-tight">
          <div className="rounded-[2rem] bg-gradient-emergency text-emergency-foreground p-8 md:p-10 shadow-strong flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Emergency & Trauma Care</p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold">24x7 emergency support across Jhansi</h3>
              <p className="text-white/85 text-sm mt-2">Fast triage, ICU backup, ambulance dispatch and senior specialist on-call — anytime, day or night.</p>
            </div>
            <Button asChild variant="outline" size="lg" className="bg-white text-emergency border-white hover:bg-white/90">
              <a href={`tel:${hospitalInfo.phone.emergency}`}><Phone className="w-4 h-4" /> Call {hospitalInfo.phone.emergency}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ---- Infrastructure ---- */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Infrastructure</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Modern facilities, designed for healing</h2>
            <p className="text-muted-foreground">Comfortable wards, well-equipped operation theatres and complete diagnostic services in one location.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Building2, title: "120-Bed Capacity", desc: "Comfortable patient wards with attendant support." },
              { icon: Sparkles, title: "Modular OT", desc: "Modern operation theatres for safe surgical procedures." },
              { icon: Award, title: "Critical Care", desc: "ICU, NICU, ICCU with 24x7 specialist support." },
              { icon: Activity, title: "Full Diagnostics", desc: "X-Ray, CT, MRI, Ultrasound and pathology lab." },
            ].map((f, i) => (
              <motion.div key={f.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-all hover:-translate-y-1">
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[hospitalInfo.images.ot, hospitalInfo.images.icu, hospitalInfo.images.lab, hospitalInfo.images.ultrasound, hospitalInfo.images.xray, hospitalInfo.images.pharmacy].map((img, i) => (
              <motion.img key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                src={img} alt={`Kamla Hospital Jhansi facility ${i + 1}`} loading="lazy"
                className="h-56 w-full object-cover rounded-2xl shadow-soft border border-border hover:shadow-medium transition-shadow" />
            ))}
          </div>
        </div>
      </section>

      {/* ---- Accreditations ---- */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Accreditations & Certifications</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Recognised quality standards</h2>
            <p className="text-muted-foreground">Aligned with national and international healthcare quality frameworks.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {accreditations.map((a, i) => (
              <motion.div key={a.label} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="aspect-square p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-3">
                <img src={a.src} alt={`${a.label} certification`} className="h-16 w-auto object-contain" loading="lazy" />
                <p className="text-xs font-semibold text-center text-muted-foreground">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Patient Stories</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Trusted by families across Jhansi</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="p-7 rounded-3xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow relative">
                <Quote className="w-8 h-8 text-primary/30 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="w-4 h-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
                <div className="border-t border-border pt-4">
                  <p className="font-display font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Doctor Excellence CTA ---- */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="rounded-[2.5rem] bg-gradient-hero text-primary-foreground p-10 md:p-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-soft opacity-30" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold))] mb-3">Doctor Excellence</p>
                <h3 className="font-display text-3xl md:text-4xl font-extrabold mb-4">Meet the senior specialists of Kamla Hospital</h3>
                <p className="text-white/85 leading-relaxed mb-6">10+ experienced consultants across ENT, Orthopedic, Cardiology, Gastro, Gynaecology, Neurosurgery and General Surgery — ready to guide your treatment.</p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-[hsl(var(--gold))] text-foreground hover:bg-[hsl(var(--gold))]/90"><a href="/doctors">View Doctors</a></Button>
                  <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10"><a href="/appointment">Book Appointment</a></Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[hospitalInfo.images.icu, hospitalInfo.images.ot, hospitalInfo.images.lab, hospitalInfo.images.ward, hospitalInfo.images.ultrasound, hospitalInfo.images.xray].map((img, i) => (
                  <img key={i} src={img} alt="Hospital facility" className="rounded-xl aspect-square object-cover border border-white/20" loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Community Initiatives ---- */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Community Healthcare</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Care that goes beyond our walls</h2>
            <p className="text-muted-foreground">Free camps, awareness drives and accessible care for the Jhansi community.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {initiatives.map((it, i) => (
              <motion.div key={it.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                className="p-7 rounded-3xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold text-foreground flex items-center justify-center mb-4">
                  <it.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div><p className="font-semibold">Address</p><p className="text-muted-foreground">{hospitalInfo.address}</p></div>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-0.5" />
              <div><p className="font-semibold">OPD Timings</p><p className="text-muted-foreground">{hospitalInfo.workingHours.opd}</p></div>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary mt-0.5" />
              <div><p className="font-semibold">Reception</p><p className="text-muted-foreground">{hospitalInfo.phone.reception}</p></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
