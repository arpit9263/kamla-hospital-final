import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Ambulance, Clock } from "lucide-react";
import { toast } from "sonner";
import { hospitalInfo } from "@/data/hospital";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete the form");
      return;
    }
    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <PageHeader eyebrow="Contact" title="Get in touch" subtitle="We're here to help. Reach out for appointments, queries or feedback." />

      <section className="section-padding">
        <div className="container-tight grid lg:grid-cols-3 gap-6">
          {[
            { icon: MapPin, title: "Visit us", text: hospitalInfo.address, note: "Open 24/7" },
            { icon: Phone, title: "Reception", text: hospitalInfo.phone.reception, note: "Appointments & helpdesk" },
            { icon: Mail, title: "Email us", text: hospitalInfo.email, note: "We reply within 24 hours" },
            { icon: Ambulance, title: "Emergency", text: hospitalInfo.phone.emergency, note: hospitalInfo.workingHours.emergency },
            { icon: Clock, title: "OPD Timing", text: hospitalInfo.workingHours.opd, note: `Emergency: ${hospitalInfo.workingHours.emergency}` },
            { icon: MapPin, title: "Diagnostics", text: hospitalInfo.diagnosticServices.join(", "), note: "X-Ray, MRI, CT Scan, Lab Tests" },
          ].map((c) => (
            <div key={c.title} className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-smooth">
              <div className="w-12 h-12 rounded-xl bg-accent text-primary flex items-center justify-center mb-3">
                <c.icon className="w-6 h-6" />
              </div>
              <p className="font-display font-bold">{c.title}</p>
              <p className="font-semibold mt-1">{c.text}</p>
              <p className="text-xs text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding bg-gradient-soft">
        <div className="container-tight grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden shadow-medium border border-border h-[500px] bg-muted">
            <iframe
              title="Kamla Hospital location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(hospitalInfo.mapQuery)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="p-8 rounded-3xl bg-card border border-border shadow-medium">
            <h2 className="font-display text-2xl font-extrabold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="cname" className="mb-1.5">Name</Label>
                <Input id="cname" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="cemail" className="mb-1.5">Email</Label>
                <Input id="cemail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="csubject" className="mb-1.5">Subject</Label>
                <Input id="csubject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="cmessage" className="mb-1.5">Message</Label>
                <Textarea id="cmessage" rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">Send message</Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
