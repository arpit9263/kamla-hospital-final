import { Link, useParams } from "react-router-dom";
import Layout from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { doctors, hospitalInfo, galleryItems, departments } from "@/data/hospital";
import { ArrowLeft, Award, Briefcase, Calendar, GraduationCap, Phone, Stethoscope, Star, CheckCircle2, ArrowRight } from "lucide-react";
import NotFound from "./NotFound";

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) return <NotFound />;

  const dept = departments.find((d) => d.id === doctor.departmentId);
  const workImages = galleryItems.filter((g) => g.category === "Facilities").slice(0, 3);
  const otherDoctors = doctors.filter((d) => d.id !== doctor.id && d.departmentId === doctor.departmentId).slice(0, 2);
  const relatedDoctors = otherDoctors.length > 0 ? otherDoctors : doctors.filter((d) => d.id !== doctor.id).slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(248_70%_40%),_transparent_60%)]" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-white/5" />
        <div className="container-tight relative z-10 pt-28 pb-10">
          <Button asChild variant="ghost" className="mb-6 text-white/70 hover:text-white hover:bg-white/10 rounded-full">
            <Link to="/doctors"><ArrowLeft className="w-4 h-4" /> Back to Doctors</Link>
          </Button>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="relative shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-white/20 shadow-strong">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Available
              </div>
            </div>
            {/* Info */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold mb-4">
                <Stethoscope className="w-3.5 h-3.5" />
                {dept?.name || doctor.specialty}
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-extrabold mb-2 leading-tight">{doctor.name}</h1>
              <p className="text-white/80 text-xl font-medium mb-6">{doctor.specialty}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                  <GraduationCap className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">{doctor.qualifications}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                  <Briefcase className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">{doctor.experience} exp.</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                  <Calendar className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm font-semibold">{doctor.availability}</span>
                </div>
              </div>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <span className="text-white/70 text-sm">Highly Rated · Verified Doctor</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-white text-primary font-bold hover:bg-white/95 rounded-full px-8">
                  <Link to={`/appointment?doctor=${doctor.id}`}>
                    <Calendar className="w-4 h-4 mr-2" /> Book Appointment
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/10 hover:bg-white/20 rounded-full px-6">
                  <a href={`tel:${hospitalInfo.phone.reception}`}>
                    <Phone className="w-4 h-4 mr-2" /> Call Reception
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gradient-soft">
        <div className="container-tight">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: About + Highlights */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-card border border-border rounded-2xl p-7 shadow-soft">
                <h2 className="font-display text-2xl font-extrabold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-primary rounded-full" />
                  About Dr. {doctor.name.replace("Dr. ", "")}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">{doctor.bio}</p>
              </div>

              {/* Career Highlights */}
              <div className="bg-card border border-border rounded-2xl p-7 shadow-soft">
                <h2 className="font-display text-2xl font-extrabold mb-5 flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary" />
                  Career Highlights
                </h2>
                <ul className="space-y-3">
                  {(doctor.highlights || []).map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Work Gallery */}
              <div className="bg-card border border-border rounded-2xl p-7 shadow-soft">
                <h2 className="font-display text-2xl font-extrabold mb-5">Work Gallery</h2>
                <div className="grid grid-cols-3 gap-3">
                  {workImages.map((item) => (
                    <div key={item.id} className="relative overflow-hidden rounded-xl aspect-square">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Quick Info Card */}
            <div className="space-y-5">
              {/* Qualifications */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                <h3 className="font-display font-bold text-lg mb-4">Qualifications</h3>
                <div className="space-y-3">
                  <InfoRow icon={GraduationCap} label="Degree" value={doctor.qualifications} />
                  <InfoRow icon={Briefcase} label="Experience" value={doctor.experience} />
                  <InfoRow icon={Stethoscope} label="Specialty" value={doctor.specialty} />
                  <InfoRow icon={Calendar} label="OPD Hours" value={doctor.availability} />
                </div>
              </div>

              {/* Book Card */}
              <div className="bg-primary rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                <div className="relative">
                  <p className="font-bold text-white/80 text-xs uppercase tracking-widest mb-2">Ready to consult?</p>
                  <h3 className="font-display font-extrabold text-xl mb-1">Book an Appointment</h3>
                  <p className="text-white/70 text-sm mb-5">OPD hours: {hospitalInfo.workingHours.opd}</p>
                  <Button asChild className="w-full bg-white text-primary font-bold hover:bg-white/90 rounded-xl">
                    <Link to={`/appointment?doctor=${doctor.id}`}>Book Now <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>
              </div>

              {/* Department info */}
              {dept && (
                <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
                  <h3 className="font-display font-bold text-lg mb-3">Department</h3>
                  <p className="font-semibold text-primary mb-2">{dept.name}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{dept.description}</p>
                  <Link to={`/departments#${dept.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-primary mt-3 hover:underline">
                    View Department <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Related Doctors */}
          {relatedDoctors.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-2xl font-extrabold mb-6">Other Specialists</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedDoctors.map((d) => (
                  <Link key={d.id} to={`/doctors/${d.id}`}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/25 hover:shadow-soft transition-all group"
                  >
                    <img src={d.image} alt={d.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="font-display font-bold text-sm group-hover:text-primary transition-colors truncate">{d.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{d.specialty}</p>
                      <p className="text-xs text-primary font-semibold mt-1">{d.experience}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors ml-auto" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="font-semibold text-sm text-foreground mt-0.5">{value}</p>
    </div>
  </div>
);

export default DoctorProfile;
