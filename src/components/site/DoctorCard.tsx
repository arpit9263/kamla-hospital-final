import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, Calendar, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/data/hospital";

const DoctorCard = ({ doctor, index = 0 }: { doctor: Doctor; index?: number }) => {
  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-strong hover:border-primary/20 transition-all duration-300 animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link to={`/doctors/${doctor.id}`} className="block relative">
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 relative">
          <img
            src={doctor.image}
            alt={doctor.name}
            loading="lazy"
            width={600}
            height={800}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent" />
          {/* Specialty badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full">
              {doctor.specialty}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <Link to={`/doctors/${doctor.id}`}>
          <h3 className="font-display font-bold text-lg group-hover:text-primary transition-colors leading-tight mb-3">
            {doctor.name}
          </h3>
        </Link>

        <div className="space-y-2 text-xs text-muted-foreground flex-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{doctor.qualifications}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{doctor.experience} experience</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{doctor.availability}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 my-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">Verified</span>
        </div>

        <div className="flex gap-2 mt-auto">
          <Button asChild size="sm" className="flex-1 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-semibold transition-all border border-primary/20">
            <Link to={`/doctors/${doctor.id}`}>
              View Profile
            </Link>
          </Button>
          <Button asChild size="sm" className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-xl text-xs font-semibold">
            <Link to={`/appointment?doctor=${doctor.id}`}>
              Book
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
