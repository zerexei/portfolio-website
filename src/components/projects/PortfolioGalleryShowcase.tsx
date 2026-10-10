import React, { useState, useEffect } from "react";
import { ProductGallery, GalleryItem, productGalleries } from "../../data/galleries";
import { Tag } from "../common/Tag";
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Sparkles,
  Github
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PortfolioGalleryShowcase: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>("centro");
  const [activeItem, setActiveItem] = useState<{ gallery: ProductGallery; item: GalleryItem; index: number } | null>(null);

  const activeProduct = productGalleries.find((p) => p.id === selectedProductId) || productGalleries[0];

  // Close modal on Escape, arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeItem) return;
      if (e.key === "Escape") setActiveItem(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItem]);

  const handleNext = () => {
    if (!activeItem) return;
    const items = activeItem.gallery.items;
    const nextIndex = (activeItem.index + 1) % items.length;
    setActiveItem({
      gallery: activeItem.gallery,
      item: items[nextIndex],
      index: nextIndex,
    });
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const items = activeItem.gallery.items;
    const prevIndex = (activeItem.index - 1 + items.length) % items.length;
    setActiveItem({
      gallery: activeItem.gallery,
      item: items[prevIndex],
      index: prevIndex,
    });
  };

  return (
    <div className="space-y-6">
      {/* ─── Compact Product Switcher ─── */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-card-nested border border-border rounded-xl">
        {productGalleries.map((prod) => {
          const isSelected = selectedProductId === prod.id;
          return (
            <button
              key={prod.id}
              onClick={() => setSelectedProductId(prod.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-card text-foreground shadow-xs border border-border"
                  : "text-neutral-foreground hover:text-foreground hover:bg-neutral"
              }`}
            >
              <span>{prod.name}</span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                  isSelected
                    ? "bg-primary-tint text-primary border border-primary-border"
                    : "bg-neutral text-neutral-foreground"
                }`}
              >
                {prod.items.length} views
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── Product Card Header Summary ─── */}
      <div className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge badge-mono text-primary bg-primary-tint border border-primary-border">
              {activeProduct.badge}
            </span>
            <h3 className="text-lg font-bold text-foreground">
              {activeProduct.name}
            </h3>
          </div>
          <p className="text-xs text-neutral-foreground">
            {activeProduct.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {activeProduct.tech.map((t) => (
              <Tag key={t} className="text-[9px] px-1.5 py-0.5">{t}</Tag>
            ))}
          </div>
        </div>

        {/* External links if available */}
        <div className="flex items-center gap-2 shrink-0">
          {activeProduct.demoUrl && (
            <a
              href={activeProduct.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary button-sm text-xs gap-1"
            >
              <ExternalLink size={12} /> Live Site
            </a>
          )}
          {activeProduct.githubUrl && (
            <a
              href={activeProduct.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-secondary button-sm text-xs gap-1"
            >
              <Github size={12} /> Repo
            </a>
          )}
        </div>
      </div>

      {/* ─── Compact Grid of Previews for the Selected Product ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeProduct.items.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setActiveItem({ gallery: activeProduct, item, index: idx })}
            className="group card p-2.5 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-200 hover:border-primary/50 hover:shadow-sm"
          >
            <div className="relative aspect-16/10 rounded-lg overflow-hidden bg-neutral/40 border border-border">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <span className="button button-primary button-sm text-xs gap-1 shadow-sm">
                  <Maximize2 size={12} /> Preview
                </span>
              </div>
            </div>

            <div className="pt-2.5 pb-1 px-1 space-y-1">
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-foreground line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── High-Resolution Preview Modal ─── */}
      <AnimatePresence>
        {activeItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-card border border-border rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-border bg-card-nested shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="badge badge-mono text-primary bg-primary-tint border border-primary-border">
                    {activeItem.gallery.name}
                  </span>
                  <span className="text-xs text-foreground font-semibold truncate max-w-[280px] sm:max-w-md">
                    {activeItem.item.title}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-foreground hidden sm:inline">
                    ({activeItem.index + 1} of {activeItem.gallery.items.length})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activeItem.item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-ghost button-sm text-xs gap-1 hidden sm:inline-flex"
                  >
                    Full Resolution <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => setActiveItem(null)}
                    className="p-1.5 rounded-lg text-neutral-foreground hover:text-foreground hover:bg-neutral transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Image Viewport with carousel arrows */}
              <div className="relative flex-1 bg-neutral/30 flex items-center justify-center p-4 overflow-auto min-h-[300px]">
                <img
                  src={activeItem.item.image}
                  alt={activeItem.item.title}
                  className="max-h-[64vh] max-w-full w-auto object-contain rounded-lg border border-border shadow-md"
                />

                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/90 hover:bg-card border border-border text-foreground hover:text-primary transition-all shadow-md cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/90 hover:bg-card border border-border text-foreground hover:text-primary transition-all shadow-md cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Modal Caption Footer */}
              <div className="px-6 py-3.5 bg-card border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <p className="text-xs text-neutral-foreground leading-relaxed">
                  {activeItem.item.caption}
                </p>
                <div className="flex items-center gap-1.5 shrink-0">
                  {activeItem.gallery.tech.slice(0, 4).map((t) => (
                    <Tag key={t} className="text-[9px] px-1.5 py-0.5">{t}</Tag>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
