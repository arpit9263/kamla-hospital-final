import { motion } from "framer-motion";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { hospitalInfo } from "@/data/hospital";
import {
  ArrowRight, CheckCircle2, ClipboardList, FileText, HeartHandshake, Hospital,
  IndianRupee, Shield, Users, Phone, Ambulance, BadgeCheck, Stethoscope, CalendarCheck,
  UserCheck, Activity, Sparkles, ScrollText,
} from "lucide-react";
import certPmjay from "@/assets/cert-pmjay.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] } }),
};

const benefits = [
  { icon: IndianRupee, title: "Cashless Treatment", desc: "Eligible PM-JAY beneficiaries can receive cashless treatment for approved packages — no upfront payment for covered procedures." },
  { icon: Hospital, title: "Empanelled Hospital", desc: "Kamla Hospital Jhansi is empanelled under Ayushman Bharat to deliver quality multi-specialty care to scheme beneficiaries." },
  { icon: HeartHandshake, title: "Wide Treatment Coverage", desc: "Covers approved surgeries, ICU care, diagnostics, medicines and hospitalisation as per the PM-JAY package list." },
  { icon: Users, title: "Family Coverage", desc: "Cover up to ₹5 lakh per family per year for eligible families listed under PM-JAY." },
];

const docs = [
  "Ayushman Card / PM-JAY beneficiary ID",
  "Aadhaar Card of the patient",
  "Ration Card or Family ID (if requested)",
  "Mobile number linked for OTP verification",
  "Doctor consultation / admission advice",
  "Previous reports, prescriptions and test records",
];

const terms = [
  "Cashless treatment is subject to PM-JAY eligibility, package availability and approval.",
  "Patient identity and beneficiary details must match official PM-JAY records.",
  "Only approved treatment packages and medical indications are processed under the scheme.",
  "Items or services outside approved package rules may be payable as per hospital policy.",
  "Emergency cases are supported as per medical priority and scheme verification rules.",
];

const steps = [
  { icon: UserCheck, title: "Visit Help Desk", text: "Visit Kamla Hospital reception or Ayushman help desk in Jhansi." },
  { icon: FileText, title: "Document Verification", text: "Share your Ayushman card, Aadhaar and identity documents for verification." },
  { icon: Stethoscope, title: "Doctor Consultation", text: "Specialist doctor evaluates your condition and advises treatment." },
  { icon: ClipboardList, title: "Package Approval", text: "Hospital team raises the eligible package request as per PM-JAY rules." },
  { icon: Hospital, title: "Cashless Admission", text: "On approval, admission and treatment proceeds without upfront payment for covered services." },
  { icon: CalendarCheck, title: "Discharge & Follow-up", text: "Discharge summary, prescriptions and follow-up guidance shared with the patient." },
];

const coverage = [
  { icon: Activity, title: "ICU & Critical Care", text: "Covered for adult ICU, NICU and ICCU support under approved packages." },
  { icon: Hospital, title: "Surgical Procedures", text: "Eligible surgeries across Ortho, ENT, General Surgery, Gynae, Neuro and more." },
  { icon: Sparkles, title: "Diagnostics", text: "Pre and post-operative diagnostics included where part of the approved package." },
  { icon: Stethoscope, title: "Medical Management", text: "Hospitalisation, medicines and consumables as per scheme package rules." },
];

const eligibility = [
  "Beneficiary listed under PM-JAY / SECC database",
  "Valid Ayushman card or verified beneficiary ID",
  "Treatment must be medically advised and package-approved",
  "Identity verification completed at the hospital desk",
];

const faqs = [
  { q: "Is Kamla Hospital Jhansi empanelled under Ayushman Bharat (PM-JAY)?", a: "Yes. Kamla Hospital Jhansi supports eligible Ayushman Bharat beneficiaries with cashless treatment for approved packages as per PM-JAY rules." },
  { q: "How do I check if I am eligible for PM-JAY?", a: "You can check eligibility on the official PM-JAY beneficiary portal or visit our help desk at Kamla Hospital Jhansi with your Aadhaar — our team will assist you." },
  { q: "What documents do I need to bring?", a: "Your Ayushman card / PM-JAY ID, Aadhaar card, mobile number for OTP and any previous medical reports or admission advice from your doctor." },
  { q: "Is emergency treatment covered under Ayushman Bharat?", a: `Emergencies are handled on medical priority. Call ${hospitalInfo.phone.emergency} immediately — our team will guide PM-JAY processing in parallel.` },
  { q: "How much treatment cost is covered?", a: "PM-JAY provides up to ₹5 lakh per family per year for approved treatment packages, subject to scheme rules and package availability." },
  { q: "Are diagnostics and medicines included?", a: "Diagnostics, medicines and consumables that are part of the approved PM-JAY package are included. Items outside the package may be payable as per hospital policy." },
];

const Ayushman = () => (
  <Layout>
    <PageHeader
      eyebrow="Ayushman Bharat / PM-JAY"
      title="Ayushman Bharat hospital in Jhansi — cashless treatment at Kamla Hospital"
      subtitle="Kamla Hospital Jhansi is empanelled under Ayushman Bharat (PM-JAY). Get eligibility guidance, document verification and cashless treatment support for approved packages — quickly and transparently."
    />

    {/* ---- Hero stat strip ---- */}
    <section className="py-10">
      <div className="container-tight">
        <div className="rounded-[2rem] bg-gradient-hero text-primary-foreground p-8 md:p-10 shadow-strong relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-soft opacity-30" />
          <div className="relative grid md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <img src={certPmjay} alt="Ayushman Bharat PM-JAY" className="w-12 h-12 bg-white rounded-xl p-1.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--gold))]">PM-JAY Empanelled</p>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold">Ayushman Bharat treatment in Jhansi</h2>
                </div>
              </div>
              <p className="text-white/85 text-sm md:text-base leading-relaxed">Up to ₹5 lakh per family per year cashless cover for eligible beneficiaries — supported by our specialists and dedicated help desk.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              {[
                { v: "₹5L", l: "Annual Cover" },
                { v: "10+", l: "Specialties" },
                { v: "24x7", l: "Emergency" },
                { v: "120", l: "Beds" },
              ].map(s => (
                <div key={s.l} className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="font-display font-extrabold text-2xl md:text-3xl">{s.v}</p>
                  <p className="text-[11px] uppercase tracking-wider text-white/75 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ---- Benefits ---- */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Key Benefits</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Why choose Kamla Hospital for Ayushman Bharat in Jhansi</h2>
          <p className="text-muted-foreground">Patient-first guidance, transparent communication and end-to-end PM-JAY processing under one roof.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <motion.div key={b.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-strong hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 blur-2xl transition-colors" />
              <div className="relative w-12 h-12 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center mb-4 shadow-medium">
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="relative font-display font-bold text-lg mb-2">{b.title}</h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ---- Eligibility + Documents ---- */}
    <section className="section-padding bg-gradient-soft">
      <div className="container-tight grid lg:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center"><Shield className="w-6 h-6" /></div>
            <h3 className="font-display text-2xl font-extrabold">Eligibility Criteria</h3>
          </div>
          <ul className="space-y-3">
            {eligibility.map(e => (
              <li key={e} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> {e}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-6">
            <a href="https://beneficiary.nha.gov.in/" target="_blank" rel="noopener noreferrer">Check Eligibility Online <ArrowRight className="w-4 h-4" /></a>
          </Button>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center"><FileText className="w-6 h-6" /></div>
            <h3 className="font-display text-2xl font-extrabold">Required Documents</h3>
          </div>
          <ul className="space-y-3">
            {docs.map(d => (
              <li key={d} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <BadgeCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" /> {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>

    {/* ---- Treatment Coverage ---- */}
    <section className="section-padding">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Treatment Coverage</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">What's covered under PM-JAY</h2>
          <p className="text-muted-foreground">Approved treatment packages, surgeries and critical care across multiple specialties at Kamla Hospital Jhansi.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coverage.map((c, i) => (
            <motion.div key={c.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all">
              <c.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ---- Cashless Process Timeline ---- */}
    <section className="section-padding bg-gradient-soft">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Cashless Process</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Step-by-step patient journey</h2>
          <p className="text-muted-foreground">A simple, transparent flow — from help desk to discharge.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <motion.div key={s.title} custom={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="relative p-7 rounded-3xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all">
              <div className="absolute top-5 right-5 font-display font-extrabold text-4xl text-primary/10">{String(i + 1).padStart(2, "0")}</div>
              <div className="w-12 h-12 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center mb-4 shadow-medium">
                <s.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ---- Emergency support ---- */}
    <section className="py-10">
      <div className="container-tight">
        <div className="rounded-[2rem] bg-gradient-emergency text-emergency-foreground p-8 md:p-10 shadow-strong flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <Ambulance className="w-12 h-12 shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-85 mb-1">Emergency Support</p>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-1">Need urgent care? Call us first.</h3>
              <p className="text-white/85 text-sm">Our 24x7 team will start medical treatment and guide PM-JAY processing in parallel.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-emergency hover:bg-white/90">
              <a href={`tel:${hospitalInfo.phone.emergency}`}><Phone className="w-4 h-4" /> {hospitalInfo.phone.emergency}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
              <a href={`tel:${hospitalInfo.phone.reception}`}>Reception: {hospitalInfo.phone.reception}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* ---- FAQ ---- */}
    <section className="section-padding">
      <div className="container-tight max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">FAQ</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Ayushman Bharat — questions answered</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-5 bg-card shadow-soft data-[state=open]:shadow-medium">
              <AccordionTrigger className="text-left font-display font-semibold text-base hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* ---- Terms ---- */}
    <section className="section-padding bg-gradient-soft">
      <div className="container-tight max-w-4xl">
        <div className="rounded-3xl bg-card border border-border p-8 shadow-soft">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center"><ScrollText className="w-6 h-6" /></div>
            <h3 className="font-display text-2xl font-extrabold">Terms & Conditions</h3>
          </div>
          <ul className="space-y-3">
            {terms.map(t => (
              <li key={t} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" /> {t}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-6">PM-JAY rules, packages and approvals are governed by the National Health Authority. Hospital follows scheme guidelines for all eligible beneficiaries.</p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Ayushman;
