import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Check } from "lucide-react";
import { departments, doctors } from "@/data/hospital";
import { iconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";

const Departments = () => {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDepartment = searchParams.get("department") || "all";

  useEffect(() => {
    const hashDepartment = window.location.hash.replace("#", "");
    if (hashDepartment && departments.some((d) => d.id === hashDepartment)) {
      setSearchParams({ department: hashDepartment }, { replace: true });
    }
  }, [setSearchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedDepartment]);

  const selectedDepartmentName =
    selectedDepartment === "all"
      ? "All Departments"
      : departments.find((d) => d.id === selectedDepartment)?.name || "All Departments";

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return departments.filter((d) => {
      const matchesDepartment = selectedDepartment === "all" || d.id === selectedDepartment;
      const matchesSearch =
        !text ||
        d.name.toLowerCase().includes(text) ||
        d.description.toLowerCase().includes(text) ||
        d.treatments.some((t) => t.toLowerCase().includes(text));
      return matchesDepartment && matchesSearch;
    });
  }, [query, selectedDepartment]);

  const handleFilterClick = (departmentId: string) => {
    setQuery("");
    setSearchParams({ department: departmentId });
  };

  return (
    <Layout>
      <PageHeader eyebrow="Departments" title="Specialized departments for complete care" subtitle="Explore Kamla Hospital Jhansi departments for Cardiology, Cardio Thoracic Surgery, General Surgery, General Medicine, Pulmonary Medicine, ENT, Orthopedics & Paediatrics, Dental & Maxillofacial, Gastro & Liver, Ophthalmology, Gynecology and Neurosurgery.">
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search departments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-full bg-card shadow-soft"
          />
        </div>
      </PageHeader>

      <section className="section-padding">
        <div className="container-tight space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Showing</p>
              <h2 className="font-display text-xl font-extrabold text-foreground">{selectedDepartmentName}</h2>
            </div>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:justify-end md:overflow-visible md:px-0 md:pb-0">
              <button
                type="button"
                aria-label="Show all departments"
                onClick={() => handleFilterClick("all")}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-smooth",
                  selectedDepartment === "all" ? "border-primary bg-primary text-white shadow-soft" : "border-border bg-background text-foreground hover:border-primary/40 hover:text-primary"
                )}
              >
                All Departments
              </button>
              {departments.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-label={`Show ${d.name} department`}
                  onClick={() => handleFilterClick(d.id)}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-smooth",
                    selectedDepartment === d.id ? "border-primary bg-primary text-white shadow-soft" : "border-border bg-background text-foreground hover:border-primary/40 hover:text-primary"
                  )}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {filtered.map((d, i) => {
            const Icon = iconMap[d.icon];
            const deptDoctors = doctors.filter((doc) => doc.departmentId === d.id);
            return (
              <article
                key={d.id}
                id={d.id}
                className="grid lg:grid-cols-3 gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-smooth scroll-mt-28 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-hero text-primary-foreground flex items-center justify-center mb-4 shadow-medium">
                    {Icon && <Icon className="w-7 h-7" />}
                  </div>
                  <h2 className="font-display text-2xl font-extrabold mb-2">{d.name}</h2>
                  <p className="text-muted-foreground leading-relaxed">{d.description}</p>
                </div>
                <div>
                  <h3 className="font-display font-bold mb-3 text-sm uppercase tracking-wider text-primary">Treatments offered</h3>
                  <ul className="space-y-2">
                    {d.treatments.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display font-bold mb-3 text-sm uppercase tracking-wider text-primary">Specialists</h3>
                  {deptDoctors.length > 0 ? (
                    <ul className="space-y-3">
                      {deptDoctors.map((doc) => (
                        <li key={doc.id} className="flex items-center gap-3">
                          <img src={doc.image} alt={doc.name} loading="lazy" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Specialists available on request</p>
                  )}
                  <Button asChild variant="hero" size="sm" className="mt-5 w-full">
                    <Link to="/appointment">Book consultation <ArrowRight className="w-4 h-4" /></Link>
                  </Button>
                </div>
              </article>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No departments match your search.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Departments;
