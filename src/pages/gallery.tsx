import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { X, ZoomIn, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { galleryItems, type GalleryItem, type GalleryCategory } from '../data/galleryItems';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'All' | GalleryCategory;

// ─── Gallery Data ─────────────────────────────────────────────────────────────
// Source data lives in src/data/galleryItems.ts (shared with the admin panel).
// Only items with visible !== false are shown here.

const items: GalleryItem[] = galleryItems.filter((item) => item.visible !== false);

const categories: Category[] = ['All', 'Planter Boxes', 'Cedar Cutouts', 'Cement Beach Balls', 'Details'];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } }
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
} as const;

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ item, onClose }: {item: GalleryItem;onClose: () => void;}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        style={{ background: 'rgba(20,12,6,0.92)' }}
        onClick={onClose}>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25, ease: 'easeOut' as const }}
          className="relative max-w-4xl w-full rounded overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}>
          
          <img
            src={item.slot}
            alt={item.alt}
            className="w-full max-h-[75vh] object-contain bg-stone-950" />
          
          <div className="bg-stone-900 px-6 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-white text-sm font-medium">{item.caption}</p>
              <p className="text-white/50 text-xs mt-0.5">{item.category}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {item.link &&
              <Link
                to={item.link}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                
                  <LinkIcon size={12} />
                  {item.linkLabel}
                </Link>
              }
              <button
                onClick={onClose}
                aria-label="Close lightbox"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white">
                
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}

// ─── Gallery Card ─────────────────────────────────────────────────────────────

function GalleryCard({ item, onClick }: {item: GalleryItem;onClick: () => void;}) {
  return (
    <motion.div
      variants={fadeUp}
      className={`group relative overflow-hidden rounded cursor-pointer bg-muted ${
      item.span === 'wide' ? 'md:col-span-2' : item.span === 'tall' ? 'md:row-span-2' : ''}`
      }
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}>
      
      <div className={`w-full overflow-hidden ${item.span === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
        <img
          src={item.slot}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy" />
        
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white text-sm font-medium leading-snug">{item.caption}</p>
        <p className="text-white/60 text-xs mt-1">{item.category}</p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow">
        <ZoomIn size={14} className="text-stone-800" />
      </div>

      {/* Category badge */}
      <div className="absolute top-3 left-3">
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-background/90 text-foreground">
          {item.category}
        </span>
      </div>
    </motion.div>);

}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filtered = activeCategory === 'All' ?
  items :
  items.filter((item) => item.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Gallery — Seashore Cedar</title>
        <meta name="description" content="Browse photos of handcrafted cedar planter boxes, coastal cutouts, cement beach balls, and custom pieces made by Seashore Cedar." />
        <meta property="og:title" content="Gallery — Seashore Cedar" />
        <meta property="og:description" content="Photos of handcrafted cedar planter boxes, coastal cutouts, and cement beach balls made on the Jersey Shore." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/background-header_WW.png"
            alt="Seashore Cedar craftsmanship"
            className="w-full h-full object-cover" />
          
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/65 via-stone-900/50 to-stone-900/65" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>
              Made on the Shore
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Our Work - Under Construction COMING SOON

            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-base md:text-lg max-w-xl mx-auto">
              Every piece is handcrafted with care — browse completed projects, customer installs, and a few behind-the-scenes details.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section className="sticky top-[80px] md:top-[96px] z-30 border-b border-border" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            {categories.map((cat) =>
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat ?
              'bg-primary text-primary-foreground' :
              'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'}`
              }>
              
                {cat}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-12 md:py-16" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={stagger}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
              
              {filtered.map((item) =>
              <GalleryCard
                key={item.id}
                item={item}
                onClick={() => setLightboxItem(item)} />

              )}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 &&
          <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">No photos in this category yet.</p>
              <p className="text-sm mt-1">Check back soon — more pieces are on the way.</p>
            </div>
          }
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 border-t border-border" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
              Want Something Like This?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8">
              Every piece is made to order. Reach out with your idea and we'll make it happen.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/custom-orders"
                className="inline-flex items-center justify-center px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                
                Start a Custom Order
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:bg-muted transition-colors">
                
                Shop Ready-Made
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxItem &&
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      }
    </>);

}