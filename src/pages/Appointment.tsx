import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import AppointmentForm from "@/components/site/AppointmentForm";
import { Phone, Clock, ShieldCheck } from "lucide-react";
import { hospitalInfo } from "@/data/hospital";

const Appointment = () => {
  return (
    <Layout>
      <PageHeader eyebrow="Book Appointment" title="Book OPD & specialist appointment" subtitle="Fill in the form below for OPD consultation, specialist appointment, diagnostics or patient support at Kamla Hospital Jhansi." />

      <section className="section-padding">
        <div className="container-tight grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-6 md:p-10 rounded-3xl bg-card border border-border shadow-medium">
            <AppointmentForm />
          </div>
          <aside className="space-y-4">
            {[
              { icon: Phone, title: "Reception", text: hospitalInfo.phone.reception, note: "Appointments & helpdesk" },
              { icon: Clock, title: "OPD Timing", text: hospitalInfo.workingHours.opd, note: `Emergency: ${hospitalInfo.workingHours.emergency}` },
              { icon: ShieldCheck, title: "Insurance", text: "All major providers", note: "Cashless treatment available" },
            ].map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-gradient-card border border-border shadow-soft">
                <c.icon className="w-6 h-6 text-primary mb-3" />
                <p className="font-display font-bold">{c.title}</p>
                <p className="font-semibold mt-1">{c.text}</p>
                <p className="text-xs text-muted-foreground">{c.note}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export default Appointment;
