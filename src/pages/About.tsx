import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Heart, Eye, Target, Sparkles, Award, Building2 } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

const About = () => {
  return (
    <Layout>
      <PageHeader
        eyebrow="About Us"
        title="Trusted healthcare in Jhansi since 1998"
        subtitle="Kamla Hospital Jhansi provides multi-specialty consultation, 24x7 emergency care, diagnostics, ICU/NICU/ICCU support and patient-first treatment guidance."
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
              Kamla Hospital brings experienced doctors, emergency support, modern diagnostics and multi-specialty facilities together to serve patients in Jhansi with reliable, ethical and compassionate care.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our OPD timing is 10:00 AM to 7:00 PM and emergency service is available 24x7. Diagnostic services include X-Ray, MRI, CT Scan, Lab Tests and other diagnostic services.
            </p>
          </div>
        </div>
      </section>



      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Leadership</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Guided by experienced leadership</h2>
            <p className="text-muted-foreground leading-relaxed">
              Kamla Hospital is strengthened by a committed leadership team focused on ethical healthcare, patient comfort and continuous improvement in hospital services.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-card border border-border shadow-soft animate-fade-in-up">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Founder & Chairman</p>
              <h3 className="font-display font-bold text-2xl mb-2">Dr. Vinod Misuriya</h3>
              <p className="text-muted-foreground leading-relaxed">
                Founder and Chairman of Kamla Hospital, providing experienced clinical vision and patient-first guidance.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-card border border-border shadow-soft animate-fade-in-up" style={{ animationDelay: "80ms" }}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Managing Director</p>
              <h3 className="font-display font-bold text-2xl mb-2">Rajat Misuriya</h3>
              <p className="text-muted-foreground leading-relaxed">
                Managing Director, contributing to hospital operations, service quality and patient support systems.
              </p>
            </div>
            <div className="p-7 rounded-2xl bg-card border border-border shadow-soft animate-fade-in-up" style={{ animationDelay: "160ms" }}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Managing Director</p>
              <h3 className="font-display font-bold text-2xl mb-2">Archna Misuriya</h3>
              <p className="text-muted-foreground leading-relaxed">
                Managing Director, supporting compassionate care standards and smooth patient experience across hospital services.
              </p>
            </div>
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
              <img key={i} src={img} alt={`Kamla Hospital facility image ${i + 1}`} loading="lazy" className="h-64 w-full object-cover rounded-2xl shadow-soft border border-border" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
