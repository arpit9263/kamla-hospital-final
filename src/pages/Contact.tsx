import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin, Phone, Mail, Ambulance, Clock, Send, MessageCircle,
  Facebook, Instagram, Twitter, Linkedin, ShieldCheck, Calendar, Building2, Stethoscope, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { hospitalInfo } from "@/data/hospital";
import { submitToFormspree } from "@/lib/formspree";

const CONTACT_FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_CONTACT_ENDPOINT || "https://formspree.io/f/mvzlbyvn";

const contactBlocks = [
  {
    icon: MapPin, title: "Visit Us",
    primary: hospitalInfo.address,
    secondary: "Open 24/7 for emergencies",
    href: `https://maps.google.com/?q=${encodeURIComponent(hospitalInfo.mapQuery)}`,
    gradient: "from-primary to-primary-glow",
    cta: "Get directions",
  },
  {
    icon: Phone, title: "Reception",
    primary: hospitalInfo.phone.reception,
    secondary: "Appointments & helpdesk",
    href: `tel:${hospitalInfo.phone.reception}`,
    gradient: "from-blue-600 to-indigo-600",
    cta: "Call now",
  },
  {
    icon: Ambulance, title: "Emergency 24/7",
    primary: hospitalInfo.phone.emergency,
    secondary: hospitalInfo.workingHours.emergency,
    href: `tel:${hospitalInfo.phone.emergency}`,
    gradient: "from-red-600 to-orange-500",
    cta: "Call emergency",
    accent: true,
  },
  {
    icon: Mail, title: "Email Us",
    primary: hospitalInfo.email,
    secondary: "We reply within 24 hours",
    href: `mailto:${hospitalInfo.email}`,
    gradient: "from-emerald-600 to-teal-600",
    cta: "Send email",
  },
  {
    icon: MessageCircle, title: "WhatsApp",
    primary: "+91 " + hospitalInfo.phone.emergency,
    secondary: "Quick chat & queries",
    href: `https://wa.me/91${hospitalInfo.phone.emergency}`,
    gradient: "from-green-500 to-emerald-500",
    cta: "Chat on WhatsApp",
  },
  {
    icon: Clock, title: "OPD Timing",
    primary: hospitalInfo.workingHours.opd,
    secondary: "Mon – Sun, all departments",
    href: "/appointment",
    gradient: "from-amber-500 to-orange-500",
    cta: "Book a slot",
  },
];

const departmentsContact = [
  { icon: Stethoscope, name: "OPD Consultation", info: hospitalInfo.workingHours.opd },
  { icon: Ambulance, name: "Emergency & Trauma", info: "Available 24×7" },
  { icon: Building2, name: "Admissions / Wards", info: "24×7 helpdesk" },
  { icon: ShieldCheck, name: "Ayushman Help Desk", info: "10 AM – 7 PM · PM-JAY" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    const phoneOk = !form.phone.trim() || /^[6-9]\d{9}$/.test(form.phone.trim());

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please complete the required fields");
      return;
    }
    if (!emailOk) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!phoneOk) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setIsSubmitting(true);
    const result = await submitToFormspree(CONTACT_FORMSPREE_ENDPOINT, {
      formType: "Contact Message",
      name: form.name,
      phone: form.phone || "Not provided",
      email: form.email,
      subject: form.subject || "Website enquiry",
      message: form.message,
      page: window.location.href,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      toast.error(result.message);
      return;
    }

    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Contact Us"
        title="Contact Kamla Hospital Jhansi"
        subtitle="Reach out for appointments, emergency support, OPD queries, diagnostics, directions or patient assistance — our team responds quickly."
      />

      {/* Quick contact cards */}
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contactBlocks.map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`group relative overflow-hidden rounded-3xl bg-card border border-border lift-on-hover p-7 ${c.accent ? "ring-2 ring-red-400/30" : ""}`}
              >
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${c.gradient} opacity-10 group-hover:opacity-25 group-hover:scale-125 transition-all duration-500`} />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} text-white flex items-center justify-center mb-5 shadow-soft group-hover:-rotate-6 transition-all`}>
                  <c.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1.5">{c.title}</p>
                <p className="font-display font-extrabold text-lg text-foreground mb-1.5 break-words">{c.primary}</p>
                <p className="text-sm text-muted-foreground mb-5">{c.secondary}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  {c.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight grid lg:grid-cols-2 gap-8">
          {/* Left: Map + dept */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-medium border border-border h-[440px] bg-muted">
              <iframe
                title="Kamla Hospital location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(hospitalInfo.mapQuery)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-medium pointer-events-none">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm truncate">{hospitalInfo.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{hospitalInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department contacts */}
            <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
              <h3 className="font-display text-lg font-extrabold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" /> Department Helpdesks
              </h3>
              <div className="space-y-3">
                {departmentsContact.map((d) => (
                  <div key={d.name} className="flex items-center gap-3 p-3 rounded-2xl bg-accent/40 hover:bg-accent transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <d.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="rounded-3xl bg-card border border-border p-6 shadow-soft">
              <h3 className="font-display text-lg font-extrabold mb-4">Connect with us</h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { Icon: Facebook, label: "Facebook", href: "/contact" },
                  { Icon: Instagram, label: "Instagram", href: "/contact" },
                  { Icon: Twitter, label: "Twitter", href: "/contact" },
                  { Icon: Linkedin, label: "LinkedIn", href: "/contact" },
                ].map(({ Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-foreground hover:bg-primary hover:text-white transition-all hover:-translate-y-0.5 text-sm font-semibold"
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-yellow-400/20 blur-2xl" />
            <div className="relative p-8 md:p-10 rounded-3xl bg-card border border-border shadow-medium">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-2">Send a message</p>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold mb-2">Tell us how we can help</h2>
              <p className="text-sm text-muted-foreground mb-6">We typically reply within one business day.</p>

              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Contact message form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cname" className="mb-1.5">Name *</Label>
                    <Input id="cname" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="cphone" className="mb-1.5">Phone</Label>
                    <Input id="cphone" type="tel" inputMode="numeric" placeholder="10-digit mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cemail" className="mb-1.5">Email *</Label>
                  <Input id="cemail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="csubject" className="mb-1.5">Subject</Label>
                  <Input id="csubject" placeholder="Appointment / Query / Feedback" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="cmessage" className="mb-1.5">Message *</Label>
                  <Textarea id="cmessage" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" aria-label="Submit contact message" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-1" /> {isSubmitting ? "Sending..." : "Send message"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  For medical emergencies, please call <a href={`tel:${hospitalInfo.phone.emergency}`} className="font-bold text-red-600 hover:underline">{hospitalInfo.phone.emergency}</a>
                </p>
              </form>
            </div>

            {/* CTA below form */}
            <div className="mt-5 p-5 rounded-3xl bg-primary text-white flex items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold">Prefer a quick visit?</p>
                <p className="text-xs text-white/70">Book a slot online — no waiting required.</p>
              </div>
              <Button asChild className="bg-yellow-400 hover:bg-yellow-300 text-primary font-bold rounded-full">
                <Link to="/appointment"><Calendar className="w-4 h-4 mr-1" /> Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
