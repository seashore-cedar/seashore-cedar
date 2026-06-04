import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Check, ChevronDown, Leaf, Droplets, Sun, Shield } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FinishKey = 'none' | 'blo' | 'tung' | 'stain' | 'waterseal';

interface FinishColorOption {
  label: string;
  hint: string;
}

interface Finish {
  key: FinishKey;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  colorOptions?: FinishColorOption[];
}

interface Product {
  id: string;
  name: string;
  dimensions: string;
  sqft: number;
  description: string;
  bestFor: string[];
  image: string;
  imageAlt: string;
  finishUpcharges: Record<FinishKey, number>;
}

// ─── Finish Data ──────────────────────────────────────────────────────────────

const finishes: Finish[] = [
  {
    key: 'none',
    name: 'No Finish',
    shortName: 'None',
    tagline: 'Raw cedar, naturally beautiful',
    description:
      'Western red cedar is naturally rot-resistant and weathers gracefully on its own. Choose this if you love the raw look or plan to apply your own finish later.',
    icon: <Sun size={16} />,
  },
  {
    key: 'blo',
    name: 'Boiled Linseed Oil',
    shortName: 'Linseed Oil',
    tagline: 'Classic protection, warm tone',
    description:
      'A traditional wood finish that deepens the cedar grain and provides basic moisture resistance. Great for covered porches and sheltered outdoor spots.',
    icon: <Droplets size={16} />,
  },
  {
    key: 'tung',
    name: 'Food-Safe Natural Oil',
    shortName: 'Natural Oil',
    tagline: 'Premium · 100% food-safe · Best for edibles',
    description:
      'Our top pick. Pure tung oil penetrates deep into the wood, enhancing the grain with a warm, natural glow. 100% food-safe — the ideal choice if you\'re growing herbs, vegetables, or anything you\'ll eat. No harsh chemicals, ever.',
    badge: 'Best Choice',
    icon: <Leaf size={16} />,
  },
  {
    key: 'stain',
    name: 'Exterior Stain',
    shortName: 'Ext. Stain',
    tagline: 'Rich color, solid UV protection',
    description:
      'A penetrating exterior stain that adds rich, consistent color while protecting against UV fading and moisture. Perfect for matching a deck, fence, or patio aesthetic. Choose your color below.',
    icon: <Sun size={16} />,
    colorOptions: [
      { label: 'Natural Cedar', hint: 'Warm honey tone, enhances the wood\'s natural grain' },
      { label: 'Driftwood Gray', hint: 'Cool weathered gray, coastal and modern' },
      { label: 'Weathered Brown', hint: 'Deep earthy brown, classic and rustic' },
      { label: 'Bleached / Whitewashed', hint: 'Light, airy, beachy' },
    ],
  },
  {
    key: 'waterseal',
    name: "Thompson's WaterSeal",
    shortName: 'WaterSeal',
    tagline: 'Maximum weather protection',
    description:
      'A clear waterproofing sealer that locks out rain, humidity, and freeze-thaw cycles. Best for fully exposed locations — docks, open patios, coastal yards.',
    icon: <Shield size={16} />,
  },
];

// ─── Product Data ─────────────────────────────────────────────────────────────

const products: Product[] = [
  {
    id: 'box-a',
    price: 40,
    name: 'Box A',
    dimensions: '16"W × 16"L × 16"H',
    sqft: 8.9,
    description:
      'A compact square planter with a classic profile. Every surface is hand-sanded for a smooth, splinter-free finish — perfect for a single statement plant on a porch step, deck corner, or entryway.',
    bestFor: ['Porch steps', 'Deck corners', 'Entryways', 'Ornamental plants'],
    image: '/assets/Box A w dimensions.png',
    imageAlt: 'Box A cedar planter — 16" wide, 16" long, 16" tall',
    finishUpcharges: { none: 0, blo: 10, tung: 10, stain: 10, waterseal: 10 },
  },
  {
    id: 'box-c',
    price: 60,
    name: 'Box C',
    dimensions: '16"W × 16"L × 25"H',
    sqft: 12.9,
    description:
      'Same footprint as Box A but taller — hand-sanded smooth on every face. Great for trailing plants, tall grasses, or adding visual height to a garden arrangement.',
    bestFor: ['Trailing plants', 'Tall ornamentals', 'Flanking doorways', 'Patio accents'],
    image: '/assets/Box C.png',
    imageAlt: 'Box C cedar planter — 16" wide, 16" long, 25" tall',
    finishUpcharges: { none: 0, blo: 10, tung: 10, stain: 10, waterseal: 10 },
  },
  {
    id: 'box-abc',
    price: 110,
    name: 'Box ABC Set',
    dimensions: 'Box A + Box C + Box B (10"W × 10"L × 13"H)',
    sqft: 26.1,
    description:
      'Three hand-sanded planters in graduated sizes — designed to be grouped together for a layered, tiered garden display. Every board is sanded smooth so the set looks polished from every angle. Ships as a matched trio.',
    bestFor: ['Tiered displays', 'Porch groupings', 'Gift sets', 'Garden focal points'],
    image: '/assets/Boxes ABC w dimensions.png',
    imageAlt: 'Box ABC set — three cedar planters in graduated sizes',
    finishUpcharges: { none: 0, blo: 10, tung: 15, stain: 10, waterseal: 15 },
  },
  {
    id: 'box-g',
    price: 130,
    name: 'Box G',
    dimensions: '16"W × 48"L × 16"H',
    sqft: 19.6,
    description:
      'A long, low trough planter with hand-sanded sides that feel as good as they look. Ideal for lining a fence, railing, or garden border with herbs, flowers, or mixed plantings.',
    bestFor: ['Fence lines', 'Railing borders', 'Herb gardens', 'Mixed flower rows'],
    image: '/assets/Box G.png',
    imageAlt: 'Box G cedar planter — 16" wide, 48" long, 16" tall',
    finishUpcharges: { none: 0, blo: 10, tung: 15, stain: 10, waterseal: 10 },
  },
  {
    id: 'box-h',
    price: 160,
    name: 'Box H',
    dimensions: '16"W × 48"L × 32"H',
    sqft: 33.8,
    description:
      'Our tallest trough — raised to a comfortable standing height with every board hand-sanded smooth. No bending, no splinters. Perfect for serious gardeners who want easy access to herbs and vegetables.',
    bestFor: ['Raised herb gardens', 'Easy-access gardening', 'Deck centerpieces', 'Vegetables'],
    image: '/assets/Box H.png',
    imageAlt: 'Box H cedar raised planter — 16" wide, 48" long, 32" tall',
    finishUpcharges: { none: 0, blo: 15, tung: 15, stain: 10, waterseal: 15 },
  },
  {
    id: 'box-m',
    price: 50,
    name: 'Box M',
    dimensions: '16"W × 12"L × 13"H',
    sqft: 6.4,
    description:
      'A compact rectangular planter with hand-sanded surfaces that feel silky smooth. Small enough for a windowsill or tabletop, sturdy enough for outdoor use year-round.',
    bestFor: ['Windowsills', 'Tabletops', 'Small patios', 'Succulents & herbs'],
    image: '/assets/Box M w dimensions.png',
    imageAlt: 'Box M cedar planter — 16" wide, 12" long, 13" tall',
    finishUpcharges: { none: 0, blo: 10, tung: 10, stain: 10, waterseal: 10 },
  },
  {
    id: 'box-q',
    price: 20,
    name: 'Box Q',
    dimensions: '9"W × 9"L × 8"H',
    sqft: 2.6,
    description:
      'Our smallest planter — hand-sanded to a smooth, splinter-free finish. A charming little square perfect for a single herb, succulent, or seasonal flower. Great as a gift or accent piece.',
    bestFor: ['Single herbs', 'Succulents', 'Gifts', 'Windowsill accents'],
    image: '/assets/Box Q.png',
    imageAlt: 'Box Q small cedar planter — 9" wide, 9" long, 8" tall',
    finishUpcharges: { none: 0, blo: 10, tung: 10, stain: 10, waterseal: 10 },
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

// ─── Box Selector Thumbnails ──────────────────────────────────────────────────

function BoxSelector({
  selected,
  onSelect,
}: {
  selected: Product;
  onSelect: (p: Product) => void;
}) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
      {products.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p)}
          className={`relative flex flex-col items-center gap-1.5 p-2 rounded border-2 transition-all duration-200 group ${
            selected.id === p.id
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50 bg-background'
          }`}
          aria-label={`Select ${p.name}`}
        >
          <div className="w-full aspect-square overflow-hidden rounded-sm bg-muted flex items-center justify-center">
            <img
              src={p.image}
              alt={p.imageAlt}
              className="w-full h-full object-contain p-1"
            />
          </div>
          <span className={`text-[11px] font-semibold leading-tight text-center ${
            selected.id === p.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
          }`}>
            {p.name}
          </span>
          {selected.id === p.id && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <Check size={9} className="text-primary-foreground" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Finish Option Button ─────────────────────────────────────────────────────

function FinishOption({
  finish,
  upcharge,
  selected,
  onSelect,
  selectedColor,
  onColorSelect,
}: {
  finish: Finish;
  upcharge: number;
  selected: boolean;
  onSelect: () => void;
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded border-2 transition-all duration-200 overflow-hidden ${
        selected ? 'border-primary' : 'border-border hover:border-primary/40'
      }`}
    >
      {/* Main row — click to select */}
      <button
        onClick={onSelect}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        {/* Radio circle */}
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          selected ? 'border-primary bg-primary' : 'border-border'
        }`}>
          {selected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
        </div>

        {/* Icon + name */}
        <span className={`shrink-0 ${selected ? 'text-primary' : 'text-muted-foreground'}`}>
          {finish.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">{finish.name}</span>
            {finish.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                {finish.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{finish.tagline}</p>
        </div>

        {/* Upcharge */}
        <div className="shrink-0 text-right">
          {upcharge > 0 ? (
            <span className="text-sm font-semibold text-primary">+${upcharge}</span>
          ) : (
            <span className="text-xs text-muted-foreground">Included</span>
          )}
        </div>
      </button>

      {/* Color options — shown when selected and colorOptions exist */}
      <AnimatePresence>
        {selected && finish.colorOptions && finish.colorOptions.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-1 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Choose a color</p>
              <div className="flex flex-col gap-1.5">
                {finish.colorOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => onColorSelect?.(opt.label)}
                    className={`flex items-start gap-3 px-3 py-2 rounded text-left transition-colors ${
                      selectedColor === opt.label
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-muted/50 border border-transparent hover:border-primary/20'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      selectedColor === opt.label ? 'border-primary bg-primary' : 'border-border'
                    }`}>
                      {selectedColor === opt.label && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-tight">{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{opt.hint}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-1 px-4 pb-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronDown size={12} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        {expanded ? 'Less info' : 'Why choose this?'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3 mt-1">
              {finish.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Product Configurator ────────────────────────────────────────────────

function ProductConfigurator() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedFinish, setSelectedFinish] = useState<FinishKey>('none');
  const [selectedStainColor, setSelectedStainColor] = useState<string>('');

  const upcharge = selectedProduct.finishUpcharges[selectedFinish];
  const finishName = finishes.find((f) => f.key === selectedFinish)?.name ?? 'No Finish';
  const finishLabel = selectedFinish === 'stain' && selectedStainColor
    ? `${finishName} — ${selectedStainColor}`
    : finishName;

  const orderParams = new URLSearchParams({
    product: selectedProduct.name,
    dimensions: selectedProduct.dimensions,
    finish: finishLabel,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

      {/* ── Left: Product image + box selector ── */}
      <div className="flex flex-col gap-5">
        {/* Main image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="w-full rounded-sm overflow-hidden border border-border bg-muted flex items-center justify-center"
            style={{ aspectRatio: '4/3' }}
          >
            <img
              src={selectedProduct.image}
              alt={selectedProduct.imageAlt}
              className="w-full h-full object-contain p-6"
            />
          </motion.div>
        </AnimatePresence>

        {/* Thumbnail strip */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Select a Box
          </p>
          <BoxSelector selected={selectedProduct} onSelect={(p) => { setSelectedProduct(p); setSelectedFinish('none'); }} />
        </div>
      </div>

      {/* ── Right: Details + finish selector ── */}
      <div className="flex flex-col gap-6">
        {/* Product info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedProduct.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-1">
              Cedar Planter Box
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>
              {selectedProduct.name}
            </h2>
            <p className="font-mono text-sm text-primary mb-4">{selectedProduct.dimensions}</p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-foreground">${selectedProduct.price + upcharge}</span>
              {upcharge > 0 && (
                <span className="text-sm text-muted-foreground">includes {finishes.find(f => f.key === selectedFinish)?.shortName} finish</span>
              )}
            </div>

            {/* Hand-sanded callout */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 mb-4" style={{ background: 'hsl(var(--primary) / 0.07)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0"><path d="M3 17l4-8 4 4 4-6 4 10"/><path d="M3 21h18"/></svg>
              <span className="text-xs font-semibold text-primary">Hand-sanded · Smooth, splinter-free finish</span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-5">{selectedProduct.description}</p>

            {/* Best for tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedProduct.bestFor.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground bg-background"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Finish selector */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Choose a Finish</p>
          <p className="text-xs text-muted-foreground mb-4">
            All finishes are applied by hand before shipping. Expand any option to learn more.
          </p>
          <div className="flex flex-col gap-2">
            {finishes.map((finish) => (
              <FinishOption
                key={finish.key}
                finish={finish}
                upcharge={selectedProduct.finishUpcharges[finish.key]}
                selected={selectedFinish === finish.key}
                onSelect={() => { setSelectedFinish(finish.key); if (finish.key !== 'stain') setSelectedStainColor(''); }}
                selectedColor={finish.key === 'stain' ? selectedStainColor : undefined}
                onColorSelect={finish.key === 'stain' ? setSelectedStainColor : undefined}
              />
            ))}
          </div>
        </div>

        {/* Upcharge summary */}
        {upcharge > 0 && (
          <p className="text-xs text-muted-foreground bg-muted rounded px-3 py-2">
            The <strong>{finishLabel}</strong> finish adds <strong>+${upcharge}</strong> to the base price of {selectedProduct.name}.
          </p>
        )}

        {/* CTA */}
        <Link
          to={`/order?${orderParams.toString()}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Order {selectedProduct.name}
          {upcharge > 0 ? ` with ${finishes.find(f => f.key === selectedFinish)?.shortName}` : ''} <ArrowRight size={16} />
        </Link>

        <p className="text-xs text-muted-foreground text-center">
          Not sure? <Link to="/contact" className="underline hover:text-foreground transition-colors">Send us a message</Link> — we're happy to help you choose.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Cedar Planter Boxes — Seashore Cedar</title>
        <meta
          name="description"
          content="Handmade cedar planter boxes in 7 sizes — from compact porch planters to raised garden beds. Choose your box, pick a finish, and order direct from the maker."
        />
        <meta property="og:title" content="Cedar Planter Boxes — Seashore Cedar" />
        <meta property="og:description" content="Handmade cedar planter boxes in 7 sizes. Choose your finish and order direct from the maker." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Page Header ── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/background-header_WW.png"
            alt="Cedar planter boxes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>
              Handmade in Small Batches
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Cedar Planter Boxes
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-base md:text-lg max-w-xl mx-auto">
              Seven sizes. Five finish options. Hand-planed smooth and built from Western red cedar to last outdoors.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Configurator ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProductConfigurator />
          </motion.div>
        </div>
      </section>

      {/* ── All boxes at a glance ── */}
      <section className="py-16 md:py-20 border-t border-border" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>
              All Boxes at a Glance
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-sm">
              Every box is built from the same quality Western red cedar. Dimensions are finished size.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
          >
            {products.map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className="flex flex-col items-center gap-3 bg-background rounded-sm border border-border p-4 text-center"
              >
                <div className="w-full aspect-square bg-muted rounded-sm overflow-hidden flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.imageAlt}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div>
                  <p className="font-heading text-base text-foreground">{p.name}</p>
                  <p className="text-[11px] font-mono text-primary mt-0.5 leading-snug">{p.dimensions}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Custom Engraving CTA ── */}
      <section className="py-16 md:py-20" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">Make It Personal</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                Add Custom Engraving
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Any box can be personalized with names, dates, coordinates, or artwork. Just mention it when you place your order.
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
        </div>
      </section>
    </>
  );
}
