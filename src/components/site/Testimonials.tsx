import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/hospital";

const extendedTestimonials = [
  ...testimonials,
  { name: "Surgery Patient", role: "Orthopedic Surgery", text: "The surgical team at Kamla Hospital was professional and the recovery guidance was exceptional.", rating: 5 },
  { name: "OPD Visit", role: "General Consultation", text: "Quick appointment, minimal waiting time, and the doctor explained the diagnosis very clearly.", rating: 5 },
  { name: "Family Member", role: "Emergency Care", text: "Emergency response was fast and efficient. We are very grateful for the prompt medical attention.", rating: 5 },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

      <div className="container-tight relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60 mb-3">Patient Stories</p>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">
            Trusted by thousands of families
          </h2>
          <p className="text-white/70">Real experiences from real patients who chose Kamla Hospital.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {extendedTestimonials.slice(0, 3).map((t, i) => (
            <div
              key={t.name}
              className="relative p-7 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/15 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="w-8 h-8 text-white/20 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-white/85 mb-6 leading-relaxed text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/15">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-display font-bold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-white/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
