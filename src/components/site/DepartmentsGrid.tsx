import { Link } from "react-router-dom";
import { ArrowUpRight, Shield } from "lucide-react";
import { departments } from "@/data/hospital";
import { iconMap } from "@/lib/icons";

const ayushmanEligibleIds = new Set([
  "cardiology", "orthopedics", "neurology", "general-surgery", "obstetrics", "pediatrics",
]);

const DepartmentsGrid = ({ limit }: { limit?: number }) => {
  const list = limit ? departments.slice(0, limit) : departments;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {list.map((d, i) => {
        const Icon = iconMap[d.icon];
        const isAyushman = ayushmanEligibleIds.has(d.id);
        return (
          <Link
            key={d.id}
            to={`/departments#${d.id}`}
            className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in-up overflow-hidden"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            {/* Background decorative circle */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />

            {isAyushman && (
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-600 text-white rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow-sm">
                <Shield className="w-2.5 h-2.5" />
                Ayushman
              </div>
            )}

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-soft">
                {Icon && <Icon className="w-6 h-6" />}
              </div>
              <h3 className="font-display font-bold text-base mb-1.5 group-hover:text-primary transition-colors">{d.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{d.description}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View Details <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default DepartmentsGrid;
