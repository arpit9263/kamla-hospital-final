import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Heart, Eye, Target, Sparkles, Award, Building2 } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

const About = () => {
  return (
    <Layout>
      <PageHeader
        eyebrow="About Us"
        title="A legacy of healing since 1998"
        subtitle="Kamla Hospital provides specialist consultation, emergency care and diagnostic services with a patient-first approach."
      />

      <section className="section-padding">
        <div className="container-tight grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={hospitalInfo.images.exterior} alt="Kamla Hospital building" loading="lazy" width={1400} height={900} className="rounded-[2rem] shadow-strong w-full h-auto" />
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-medium hidden md:block">
              <p className="font-display font-extrabold text-3xl text-gradient">25+</p>
              <p className="text-xs text-muted-foreground">Years of trusted service</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Our Story</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-6">Built on care, powered by innovation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kamla Hospital brings experienced doctors, emergency support and diagnostic facilities together to serve patients with reliable and compassionate care.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our OPD timing is 10:00 AM to 7:00 PM and emergency service is available 24x7. Diagnostic services include X-Ray, MRI, CT Scan, Lab Tests and other diagnostic services.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-soft">
        <div className="container-tight grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Our Mission", text: "To deliver compassionate, accessible and innovative healthcare that improves lives and inspires trust." },
            { icon: Eye, title: "Our Vision", text: "To be the most trusted multi-specialty hospital, setting global benchmarks for clinical care and patient experience." },
            { icon: Heart, title: "Our Values", text: "Empathy, integrity, excellence, and innovation — guiding every interaction we have." },
          ].map((c, i) => (
            <div key={c.title} className="p-7 rounded-2xl bg-card border border-border shadow-soft animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-12 h-12 rounded-xl bg-gradient-hero text-primary-foreground flex items-center justify-center mb-4">
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Infrastructure</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">World-class facilities</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Building2, title: "Patient Wards", desc: "Comfortable patient care areas and support facilities." },
              { icon: Sparkles, title: "Operation Theatre", desc: "Well-equipped operation theatre and surgical support." },
              { icon: Award, title: "Critical Care", desc: "Emergency and critical care support available 24x7." },
              { icon: Heart, title: "Diagnostics", desc: "X-Ray, MRI, CT Scan, Lab Tests and more." },
            ].map((f, i) => (
              <div key={f.title} className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-smooth animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <f.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Hospital Gallery</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Facilities at Kamla Hospital</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              hospitalInfo.images.ultrasound,
              hospitalInfo.images.xray,
              hospitalInfo.images.lab,
              hospitalInfo.images.icu,
              hospitalInfo.images.ot,
              hospitalInfo.images.pharmacy,
            ].map((img, i) => (
              <img key={i} src={img} alt={`Kamla Hospital facility `} loading="lazy" className="h-64 w-full object-cover rounded-2xl shadow-soft border border-border" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
