import { ReactNode } from "react";

const PageHeader = ({ eyebrow, title, subtitle, children }: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) => {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(248_70%_40%),_transparent_60%)]" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-white/5" />

      <div className="container-tight relative z-10 py-20 md:py-28 text-center text-white">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60 mb-4">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">{title}</h1>
        {subtitle && (
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
