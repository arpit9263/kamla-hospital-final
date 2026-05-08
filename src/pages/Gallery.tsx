import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryItems, hospitalInfo } from "@/data/hospital";
import virtualTourVideo from "@/assets/videos/virtualtour.mp4";

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
        title="Kamla Hospital Jhansi facilities & moments"
        subtitle="Explore Kamla Hospital Jhansi infrastructure, diagnostics, wards, ICU/NICU support areas, operation theatre, patient care spaces and hospital moments."
      />

      {/* Featured Video */}
      <section className="pt-16 md:pt-20">
        <div className="container-tight">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
            {/* Video player */}
            <div className="lg:col-span-3 relative group rounded-[2rem] overflow-hidden shadow-strong">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 via-yellow-300/20 to-primary-glow/30 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity rounded-[2rem]" />
              <div className="relative aspect-video bg-primary/10 rounded-[2rem] overflow-hidden">
                <video
                  aria-label="Kamla Hospital Jhansi virtual tour video"
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  poster={hospitalInfo.images.exteriorWide}
                  className="w-full h-full object-cover"
                >
                  <source src={virtualTourVideo} type="video/mp4" />
                </video>
                <img
                  src={hospitalInfo.images.exteriorWide}
                  alt="Kamla Hospital virtual tour"
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                  loading="lazy"
                />
                {/* Live badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/55 backdrop-blur-sm rounded-full pl-2 pr-3 py-1.5 text-white pointer-events-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Tour</span>
                </div>
              </div>
            </div>

            {/* Side info card */}
            <div className="lg:col-span-2 relative rounded-[2rem] bg-gradient-to-br from-primary to-primary-glow text-white p-7 md:p-9 shadow-strong overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-yellow-300/15 blur-2xl" />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.25em] text-yellow-300 font-bold mb-3">★ Featured Tour</p>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                  Take a virtual walk through <span className="text-yellow-300">Kamla Hospital</span>
                </h2>
                <p className="text-white/85 text-sm leading-relaxed">
                  Step inside our modern facilities — from advanced diagnostics and operation theatres to
                  comfortable wards and compassionate patient care.
                </p>
              </div>
              <div className="relative grid grid-cols-2 gap-3 mt-6">
                {[
                  { k: "120", v: "Hospital Beds" },
                  { k: "10+", v: "Specialists" },
                  { k: "24×7", v: "Emergency" },
                  { k: "40+", v: "Years of Trust" },
                ].map((s) => (
                  <div key={s.v} className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2.5">
                    <p className="font-display font-extrabold text-lg leading-none">{s.k}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/70 mt-1">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          {/* Category filters */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-hide">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Show ${c} gallery items`}
                onClick={() => setCat(c)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Open gallery image: ${item.title}`}
                onClick={() => setActiveIndex(i)}
                className="group relative w-full overflow-hidden rounded-2xl border border-border shadow-soft hover:shadow-strong transition-all duration-300 text-left animate-fade-in-up"
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
            type="button"
            aria-label="Close gallery lightbox"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={() => setActiveIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            type="button"
            aria-label="Show previous gallery image"
            className="absolute left-4 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Show next gallery image"
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
