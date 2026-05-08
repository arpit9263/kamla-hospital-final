import { useMemo, useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import DoctorCard from "@/components/site/DoctorCard";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { departments, doctors } from "@/data/hospital";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState<string>("all");

  const filtered = useMemo(
    () =>
      doctors.filter((d) => {
        const matchQ = d.name.toLowerCase().includes(query.toLowerCase()) || d.specialty.toLowerCase().includes(query.toLowerCase());
        const matchD = dept === "all" || d.departmentId === dept;
        return matchQ && matchD;
      }),
    [query, dept]
  );

  return (
    <Layout>
      <PageHeader
        eyebrow="Our Doctors"
        title="Meet Kamla Hospital specialists"
        subtitle="Consult experienced doctors and specialists in Jhansi for ENT, Gastro & Liver, Orthopedic, Cardiology, Ophthalmology, Gynecology, General Surgery and emergency care."
      >
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            placeholder="Search doctors or specialties..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-full bg-white/15 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/40"
          />
        </div>
      </PageHeader>

      <section className="section-padding">
        <div className="container-tight">
          {/* Department filters */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide">
            <button
              type="button"
              aria-label="Show all doctors"
              onClick={() => setDept("all")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                dept === "all"
                  ? "bg-primary text-white shadow-soft"
                  : "bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/30"
              }`}
            >
              All Doctors
            </button>
            {departments.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-label={`Show ${d.name} doctors`}
                onClick={() => setDept(d.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  dept === d.id
                    ? "bg-primary text-white shadow-soft"
                    : "bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/30"
                }`}
              >
                {d.name}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found</span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-5">
              {filtered.map((d, i) => <DoctorCard key={d.id} doctor={d} index={i} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-primary" />
              </div>
              <p className="font-display font-bold text-xl mb-2">No doctors found</p>
              <p className="text-muted-foreground text-sm">Try a different search or department filter.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Doctors;
