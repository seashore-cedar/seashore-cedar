import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Check, ImageIcon, Plus } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BallProduct {
  id: string;
  name: string;
  description: string;
  priceRange: [number, number];
  badge?: string;
  details: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ballProducts: BallProduct[] = [
  {
    id: 'unpainted',
    name: 'Solid Cement Ball — Unpainted',
    description:
      'A 16" diameter solid cement ball in its natural finish. Clean, minimal, and surprisingly striking as a garden accent or coastal yard feature.',
    priceRange: [35, 45],
    details: ['16" diameter', 'Natural cement finish', 'Solid cast construction', 'Weather-resistant'],
  },
  {
    id: 'classic-stripe',
    name: 'Classic 6-Stripe Beach Ball',
    description:
      'The iconic beach ball pattern, rendered in durable exterior paint on a solid 16" cement ball. A playful, eye-catching piece for any coastal garden or patio.',
    priceRange: [55, 75],
    badge: 'Most Popular',
    details: ['16" diameter', 'Classic 6-stripe pattern', 'Exterior-grade paint', 'UV-resistant colors'],
  },
  {
    id: 'custom-color',
    name: 'Custom Color Scheme',
    description:
      'Your choice of colors — match your home, garden, or personal style. We\'ll paint your 16" cement ball in any color combination you like.',
    priceRange: [65, 85],
    details: ['16" diameter', 'Any color combination', 'Exterior-grade paint', 'Consultation included'],
  },
];

const epoxyAddon = {
  name: 'Epoxy Gloss Topcoat',
  description: 'A high-gloss epoxy topcoat applied over any painted ball. Adds a deep, wet-look shine and extra protection against weathering and UV fading.',
  priceRange: [10, 15] as [number, number],
  details: ['High-gloss finish', 'UV protection', 'Weatherproof seal', 'Applied over any painted ball'],
};

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

// ─── Image Placeholder ────────────────────────────────────────────────────────

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed border-border bg-muted"
      style={{ aspectRatio: '4/3' }}
    >
      <ImageIcon size={32} className="text-muted-foreground/40" />
      <p className="text-xs text-muted-foreground/60 text-center px-4">
        Photo coming soon<br />
        <span className="font-medium">{label}</span>
      </p>
    </div>
  );
}

// ─── Ball Card ────────────────────────────────────────────────────────────────

function BallCard({
  product,
  epoxySelected,
  onEpoxyToggle,
}: {
  product: BallProduct;
  epoxySelected: boolean;
  onEpoxyToggle: () => void;
}) {
  const isUnpainted = product.id === 'unpainted';

  const orderParams = new URLSearchParams({
    product: product.name,
    priceRange: `$${product.priceRange[0]}–$${product.priceRange[1]}`,
    ...(epoxySelected && !isUnpainted ? { addon: 'Epoxy Gloss Topcoat' } : {}),
  });

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col bg-card rounded-sm border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="p-4 pb-0">
        <ImagePlaceholder label={product.name} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Badge */}
        {product.badge && (
          <span className="self-start text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground mb-3">
            {product.badge}
          </span>
        )}

        <h3 className="font-heading text-xl text-foreground mb-2" style={{ letterSpacing: '-0.01em' }}>
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{product.description}</p>

        {/* Details */}
        <ul className="mb-5 flex flex-col gap-1.5">
          {product.details.map(detail => (
            <li key={detail} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check size={12} className="text-primary shrink-0" />
              {detail}
            </li>
          ))}
        </ul>

        {/* Epoxy add-on (only for painted balls) */}
        {!isUnpainted && (
          <button
            onClick={onEpoxyToggle}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded border-2 text-left transition-all duration-200 mb-5 ${
              epoxySelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
            }`}
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
              epoxySelected ? 'border-primary bg-primary' : 'border-border'
            }`}>
              {epoxySelected ? <Check size={11} className="text-primary-foreground" /> : <Plus size={11} className="text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Add Epoxy Gloss Topcoat</p>
              <p className="text-xs text-muted-foreground mt-0.5">High-gloss shine + extra UV protection</p>
            </div>
            <span className="text-sm font-semibold text-primary shrink-0">
              +${epoxyAddon.priceRange[0]}–${epoxyAddon.priceRange[1]}
            </span>
          </button>
        )}

        {/* Price */}
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-5">
          <span className="text-sm text-muted-foreground">
            {epoxySelected && !isUnpainted ? 'With epoxy topcoat' : 'Base price'}
          </span>
          <span className="text-lg font-bold text-foreground">
            ${epoxySelected && !isUnpainted
              ? `${product.priceRange[0] + epoxyAddon.priceRange[0]}–${product.priceRange[1] + epoxyAddon.priceRange[1]}`
              : `${product.priceRange[0]}–${product.priceRange[1]}`}
          </span>
        </div>

        {/* CTA */}
        <Link
          to={`/custom-orders?${orderParams.toString()}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Order This Ball <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CementBeachBallsPage() {
  const [epoxySelected, setEpoxySelected] = useState<Record<string, boolean>>({});

  const toggleEpoxy = (id: string) =>
    setEpoxySelected(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <Helmet>
        <title>Cement Beach Balls — Seashore Cedar</title>
        <meta
          name="description"
          content='16" solid cement beach balls — unpainted, classic 6-stripe, or custom color. A playful coastal accent for any garden or patio. Optional epoxy gloss topcoat available.'
        />
        <meta property="og:title" content="Cement Beach Balls — Seashore Cedar" />
        <meta property="og:description" content='16" solid cement beach balls in classic stripe or custom colors. A playful coastal garden accent.' />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/background-header_WW.png"
            alt="Wildwoods beach scene"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/55 to-stone-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>
              Coastal Garden Accents
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Cement Beach Balls
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-base md:text-lg max-w-xl mx-auto">
              16" solid cast cement balls — unpainted, classic stripe, or custom colors. A playful, durable accent for any coastal garden or patio.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Info banner ── */}
      <div className="border-b border-border" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6 py-4 flex flex-wrap gap-6 items-center text-sm">
          <span className="font-semibold text-foreground">All Balls:</span>
          <span className="text-muted-foreground"><strong className="text-foreground">16"</strong> diameter</span>
          <span className="text-muted-foreground"><strong className="text-foreground">Solid cast</strong> cement construction</span>
          <span className="text-muted-foreground"><strong className="text-foreground">Weather-resistant</strong> exterior paint</span>
          <span className="text-muted-foreground ml-auto text-xs italic">Prices shown are estimated ranges for 2026.</span>
        </div>
      </div>

      {/* ── Products ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
              Choose Your Ball
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl leading-relaxed">
              Painted balls can be upgraded with an epoxy gloss topcoat for extra shine and weather protection. Prices are estimated ranges — final price confirmed at order.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {ballProducts.map(product => (
              <BallCard
                key={product.id}
                product={product}
                epoxySelected={!!epoxySelected[product.id]}
                onEpoxyToggle={() => toggleEpoxy(product.id)}
              />
            ))}
          </motion.div>

          {/* Epoxy add-on callout */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 rounded-sm border border-border p-6 md:p-8"
            style={{ background: 'hsl(25, 30%, 94%)' }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Optional Add-On</p>
                <h3 className="font-heading text-2xl text-foreground mb-2" style={{ letterSpacing: '-0.01em' }}>
                  Epoxy Gloss Topcoat
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{epoxyAddon.description}</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1">
                  {epoxyAddon.details.map(d => (
                    <li key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check size={11} className="text-primary shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
                <span className="text-2xl font-bold text-foreground">+${epoxyAddon.priceRange[0]}–${epoxyAddon.priceRange[1]}</span>
                <span className="text-xs text-muted-foreground">Added to any painted ball</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 border-t border-border" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">Want Something Specific?</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>Custom Colors Available</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Have a specific color scheme in mind? We can match your home, garden, or any palette you like. Reach out and we'll make it happen.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/custom-orders"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Start a Custom Order <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
