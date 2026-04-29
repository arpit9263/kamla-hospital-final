import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Ambulance, FlaskConical, Bed, Pill, Microscope, Scan, HeartPulse, Syringe, Stethoscope, ArrowRight } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

const services = [
  {
    icon: Ambulance,
    title: "Emergency & Trauma",
    desc: "24/7 emergency response with trained medical staff, ambulance coordination, and Level-1 trauma care for critical cases.",
    highlight: "24×7 Available",
    color: "bg-red-50 text-red-600 border-red-100",
    iconBg: "bg-red-100 text-red-600",
  },
  {
    icon: Scan,
    title: "Imaging & Radiology",
    desc: "Comprehensive imaging services including X-Ray, MRI, CT Scan, C-Arm, and other diagnostic radiology.",
    highlight: "Modern Equipment",
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: FlaskConical,
    title: "Pathology Lab",
    desc: "Accurate and timely lab tests including blood work, urine analysis, cultures, and specialized diagnostics.",
    highlight: "Fast Reports",
    color: "bg-purple-50 text-purple-700 border-purple-100",
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    icon: HeartPulse,
    title: "ICU & Critical Care",
    desc: "Intensive Care Unit with 24×7 monitoring, ventilator support, and specialist oversight for critical patients.",
    highlight: "24×7 Monitoring",
    color: "bg-red-50 text-red-600 border-red-100",
    iconBg: "bg-red-100 text-red-600",
  },
  {
    icon: Bed,
    title: "Inpatient Care",
    desc: "Comfortable patient rooms, general wards, and semi-private beds with attentive nursing and round-the-clock care.",
    highlight: "Comfortable Wards",
    color: "bg-green-50 text-green-700 border-green-100",
    iconBg: "bg-green-100 text-green-600",
  },
  {
    icon: Pill,
    title: "In-House Pharmacy",
    desc: "Fully stocked pharmacy with prescription medicines, OTC drugs, and healthcare products available round the clock.",
    highlight: "24×7 Pharmacy",
    color: "bg-orange-50 text-orange-700 border-orange-100",
    iconBg: "bg-orange-100 text-orange-600",
  },
  {
    icon: Microscope,
    title: "Health Check-up Packages",
    desc: "Preventive health check-up packages for individuals and families covering blood tests, imaging, and specialist consultation.",
    highlight: "Preventive Care",
    color: "bg-teal-50 text-teal-700 border-teal-100",
    iconBg: "bg-teal-100 text-teal-600",
  },
  {
    icon: Syringe,
    title: "Surgical Care",
    desc: "Modern Operation Theatre with experienced surgeons performing general, orthopedic, ENT, and specialized surgeries.",
    highlight: "Expert Surgeons",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    iconBg: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: Stethoscope,
    title: "OPD Consultation",
    desc: "Out-patient department with 10 specialist doctors available for consultation from 10:00 AM to 7:00 PM daily.",
    highlight: "10 AM – 7 PM",
    color: "bg-primary/5 text-primary border-primary/15",
    iconBg: "bg-primary/10 text-primary",
  },
];

const Services = () => {
  return (
    <Layout>
      <PageHeader
        eyebrow="Services"
        title="Comprehensive healthcare services"
        subtitle="From emergency to wellness, every service you need under one roof — with specialist care and modern facilities."
      />

      <section className="section-padding">
        <div className="container-tight">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="group p-7 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-primary/4 group-hover:bg-primary/8 transition-colors" />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <s.icon className="w-7 h-7" />
                  </div>
                  <div className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3 ${s.color}`}>
                    {s.highlight}
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container-tight">
          <div className="rounded-[2rem] bg-primary p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(248_70%_40%),_transparent_60%)]" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4">Need medical assistance?</h2>
              <p className="text-white/80 mb-8">Our specialists are available for consultation during OPD hours. Emergency care is available 24×7.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" className="bg-white text-primary font-bold hover:bg-white/95 rounded-full px-8">
                  <Link to="/appointment">Book Appointment <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-full">
                  <a href={`tel:${hospitalInfo.phone.emergency}`}>Emergency: {hospitalInfo.phone.emergency}</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
