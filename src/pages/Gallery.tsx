import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryItems } from "@/data/hospital";

const cats = ["All", "Hospital", "Doctors", "Facilities", "Events"] as const;

const Gallery = () => {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = cat === "All" ? galleryItems : galleryItems.filter((g) => g.category === cat);
  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const prev = () => setActiveIndex((i) => (i !== null ? (i - 1 + items.length) % items.length : 0));
  const next = () => setActiveIndex((i) => (i !== null ? (i + 1) % items.length : 0));

  return (
    <Layout>
      <PageHeader
        eyebrow="Gallery"
        title="Kamla Hospital moments & facilities"
        subtitle="Explore our hospital building, diagnostic services, wards, operation theatre and patient care spaces."
      />

      {/* Featured Video */}
      <section className="pt-16 md:pt-20">
        <div className="container-tight">
          <div className="relative group rounded-[2rem] overflow-hidden shadow-strong">
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/40 via-yellow-300/30 to-primary-glow/40 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity rounded-[2rem]" />
            <div className="relative aspect-video">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="https://cdn.coverr.co/videos/coverr-doctors-walking-in-hospital-hallway-7251/1080p.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent pointer-events-none" />
              <div className="absolute left-6 right-6 bottom-6 md:left-10 md:bottom-10 text-white pointer-events-none">
                <p className="text-[10px] uppercase tracking-[0.25em] text-yellow-300 font-bold mb-2">★ Featured Tour</p>
                <h2 className="font-display text-2xl md:text-4xl font-extrabold mb-2 max-w-xl">Take a virtual walk through Kamla Hospital</h2>
                <p className="text-white/85 text-sm max-w-lg">Modern facilities, compassionate care and advanced diagnostics — all under one roof.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  cat === c
                    ? "bg-primary text-white shadow-soft"
                    : "bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(i)}
                className="group relative w-full break-inside-avoid overflow-hidden rounded-2xl border border-border shadow-soft hover:shadow-strong transition-all duration-300 text-left animate-fade-in-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute left-4 right-4 bottom-0 translate-y-4 group-hover:translate-y-0 pb-4 transition-transform duration-300 opacity-0 group-hover:opacity-100 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/70">{item.category}</p>
                  <h3 className="font-display font-bold text-base">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setActiveIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
            <div className="mt-4 text-center text-white">
              <p className="text-xs uppercase tracking-widest text-white/50 mb-1">{activeItem.category}</p>
              <h3 className="font-display font-bold text-xl">{activeItem.title}</h3>
            </div>
            <p className="text-center text-white/40 text-xs mt-3">
              {activeIndex !== null ? activeIndex + 1 : 0} / {items.length}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
