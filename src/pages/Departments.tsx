import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Check } from "lucide-react";
import { departments, doctors } from "@/data/hospital";
import { iconMap } from "@/lib/icons";

const Departments = () => {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => departments.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.description.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <Layout>
      <PageHeader eyebrow="Departments" title="Specialized care, expert teams" subtitle="Explore our centers of excellence — each led by experienced specialists using the latest medical technology.">
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
