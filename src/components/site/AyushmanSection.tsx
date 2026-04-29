import { Link } from "react-router-dom";
import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const AyushmanSection = () => {
  return (
    <section id="ayushman" className="section-padding bg-gradient-soft relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-64 h-64 rounded-full bg-emerald-100/40 blur-3xl" />

      <div className="container-tight relative z-10">
        <div className="rounded-[2rem] bg-white border border-emerald-100 shadow-medium p-8 md:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
              <Shield className="w-3.5 h-3.5" /> Government Health Scheme
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-3 text-foreground">
              Ayushman Bharat PM-JAY Available
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Kamla Hospital supports eligible PM-JAY beneficiaries with guided documentation, verification and cashless treatment support as per scheme rules. Get up to ₹5 Lakh coverage for approved treatments.
            </p>
            <div className="flex flex-wrap gap-3 mt-5 text-sm text-muted-foreground">
              {["Eligibility Support", "Cashless Process", "Document Guidance", "₹5 Lakh Coverage"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {item}
                </span>
              ))}
            </div>
          </div>
          <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-8 shrink-0 shadow-medium">
            <Link to="/ayushman-bharat">Learn More <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AyushmanSection;
