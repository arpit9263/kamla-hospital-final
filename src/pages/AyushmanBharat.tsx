import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { hospitalInfo } from "@/data/hospital";
import { ArrowRight, CheckCircle2, ClipboardList, FileText, HeartHandshake, Hospital, IndianRupee, Shield, Users } from "lucide-react";

const benefits = [
  { icon: IndianRupee, title: "Cashless Benefits", desc: "Eligible beneficiaries can receive cashless treatment for approved packages under PM-JAY rules." },
  { icon: Hospital, title: "Hospital Support", desc: "Our team guides patients through verification, documentation and scheme approval steps." },
  { icon: HeartHandshake, title: "Treatment Coverage", desc: "Coverage may include approved procedures, diagnostics, medicines and hospitalization as per package." },
  { icon: Users, title: "Family Coverage", desc: "Benefits apply to eligible families listed under Ayushman Bharat / PM-JAY criteria." },
];

const docs = ["Ayushman Card / PM-JAY ID", "Aadhaar Card", "Ration Card or Family ID if required", "Mobile number linked for OTP", "Doctor consultation/admission advice", "Previous reports, prescriptions and test records"];
const terms = ["Cashless treatment is subject to PM-JAY eligibility, package availability and approval.", "Patient identity and beneficiary details must match official records.", "Only approved treatment packages and medical indications are processed under the scheme.", "Consumables or services outside approved package rules may be payable by the patient as per hospital policy.", "Emergency cases are supported as per medical priority and scheme verification requirements."];
const steps = ["Visit Kamla Hospital help desk or OPD", "Share Ayushman card and identity documents", "Doctor consultation and clinical assessment", "Package eligibility and approval request", "Admission / treatment after approval", "Discharge summary and follow-up guidance"];

const AyushmanBharat = () => (
  <Layout>
    <PageHeader eyebrow="Ayushman Bharat / PM-JAY" title="Cashless treatment support for eligible families" subtitle="Structured guidance, document verification and treatment process support at Kamla Hospital." />

    <section className="section-padding">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Overview</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-4">Ayushman Bharat Available</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is a government health protection scheme for eligible families. Kamla Hospital assists patients with eligibility checks, document verification and treatment processing according to scheme guidelines.
            </p>
            <Button asChild variant="hero" size="lg"><a href={`tel:${hospitalInfo.phone.reception}`}>Call Reception: {hospitalInfo.phone.reception}</a></Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b) => <div key={b.title} className="rounded-2xl bg-card border border-border p-6 shadow-soft hover:shadow-medium transition-smooth"><b.icon className="w-8 h-8 text-primary mb-4" /><h3 className="font-display font-bold text-lg mb-2">{b.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p></div>)}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <Panel icon={Shield} title="Eligibility Criteria" items={["Beneficiary must be listed under PM-JAY / eligible state scheme records", "Valid Ayushman card or verified beneficiary ID", "Treatment must be medically advised and package-approved", "Identity verification must be completed at hospital desk"]} />
          <Panel icon={FileText} title="Required Documents" items={docs} />
          <Panel icon={ClipboardList} title="Hospital Terms" items={terms} />
        </div>

        <div className="rounded-[2rem] bg-gradient-soft border border-border p-8 md:p-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Treatment Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold">Step-by-step patient flow</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step, i) => <div key={step} className="rounded-2xl bg-card border border-border p-6 shadow-soft"><span className="w-10 h-10 rounded-full bg-gradient-hero text-primary-foreground flex items-center justify-center font-bold mb-4">{String(i + 1).padStart(2, "0")}</span><p className="font-semibold text-foreground">{step}</p></div>)}
          </div>
          <div className="text-center mt-10"><Button asChild variant="outline" size="lg"><a href="https://beneficiary.nha.gov.in/" target="_blank" rel="noopener noreferrer">Check Eligibility Online <ArrowRight className="w-4 h-4" /></a></Button></div>
        </div>
      </div>
    </section>
  </Layout>
);

const Panel = ({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) => <div className="rounded-[2rem] bg-card border border-border p-7 shadow-soft"><Icon className="w-8 h-8 text-primary mb-4" /><h3 className="font-display text-xl font-bold mb-5">{title}</h3><ul className="space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{item}</li>)}</ul></div>;

export default AyushmanBharat;
