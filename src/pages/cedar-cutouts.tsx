import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, ChevronDown, Leaf, Droplets, Sun, Shield, ImageIcon } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FinishKey = 'none' | 'blo' | 'tung' | 'stain' | 'waterseal';
type SizeTier = 'small' | 'medium' | 'large';

interface Finish {
  key: FinishKey;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
}

interface SizeOption {
  tier: SizeTier;
  label: string;
  description: string;
  basePrice: number;
  finishUpcharges: Record<FinishKey, number>;
  finishIncluded?: boolean; // large tier — finish included in base
}

interface CutoutProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  examples?: string;
  sizes: SizeOption[];
}

// ─── Finish Data ──────────────────────────────────────────────────────────────

const finishes: Finish[] = [
  {
    key: 'none',
    name: 'No Finish',
    shortName: 'None',
    tagline: 'Raw cedar, naturally beautiful',
    description: 'Western red cedar is naturally beautiful unfinished. Choose this if you prefer the raw look or want to apply your own finish.',
    icon: <Sun size={15} />,
  },
  {
    key: 'blo',
    name: 'Boiled Linseed Oil',
    shortName: 'Linseed Oil',
    tagline: 'Classic warm tone, basic protection',
    description: 'A traditional finish that deepens the cedar grain and adds basic moisture resistance. Great for indoor display or covered outdoor spots.',
    icon: <Droplets size={15} />,
  },
  {
    key: 'tung',
    name: 'Food-Safe Natural Oil',
    shortName: 'Natural Oil',
    tagline: 'Premium · 100% food-safe · Best choice',
    description: 'Pure tung oil penetrates deep into the wood for a warm, natural glow. 100% food-safe with no harsh chemicals — our top recommendation.',
    badge: 'Best Choice',
    icon: <Leaf size={15} />,
  },
  {
    key: 'stain',
    name: 'Exterior Stain',
    shortName: 'Ext. Stain',
    tagline: 'Rich color, UV protection',
    description: 'A penetrating exterior stain that adds consistent color and protects against UV fading and moisture. Perfect for outdoor display.',
    icon: <Sun size={15} />,
  },
  {
    key: 'waterseal',
    name: "Thompson's WaterSeal",
    shortName: 'WaterSeal',
    tagline: 'Maximum weather protection',
    description: 'A clear waterproofing sealer that locks out rain and humidity. Best for fully exposed outdoor locations.',
    icon: <Shield size={15} />,
  },
];

// ─── Product Data ─────────────────────────────────────────────────────────────

const cutoutProducts: CutoutProduct[] = [
  {
    id: 'single-letter',
    name: 'Single Letter',
    subtitle: 'Town Letters — W, A',
    description: 'A single cedar letter, hand-cut and planed smooth. Perfect as a standalone accent or the start of a custom display.',
    examples: 'W · A · any single character',
    sizes: [
      {
        tier: 'small',
        label: 'Small',
        description: '4"–5" tall',
        basePrice: 15,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'medium',
        label: 'Medium',
        description: '6"–8" tall',
        basePrice: 22,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'large',
        label: 'Large',
        description: 'Up to 8" tall — finish included',
        basePrice: 30,
        finishUpcharges: { none: 0, blo: 0, tung: 0, stain: 0, waterseal: 0 },
        finishIncluded: true,
      },
    ],
  },
  {
    id: 'two-letter',
    name: '2-Letter Set',
    subtitle: 'Town Letters — SH, NW, WC',
    description: 'Two cedar letters cut as a matched set — ideal for town abbreviations, initials, or a coastal home display.',
    examples: 'SH · NW · WC · any 2-letter combo',
    sizes: [
      {
        tier: 'small',
        label: 'Small',
        description: '4"–5" tall',
        basePrice: 24,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'medium',
        label: 'Medium',
        description: '6"–8" tall',
        basePrice: 35,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'large',
        label: 'Large',
        description: 'Up to 8" tall — finish included',
        basePrice: 48,
        finishUpcharges: { none: 0, blo: 0, tung: 0, stain: 0, waterseal: 0 },
        finishIncluded: true,
      },
    ],
  },
  {
    id: 'three-letter',
    name: '3-Letter Set',
    subtitle: 'Town Letters — SIC (Sea Isle City)',
    description: 'Three cedar letters as a matched set. Our SIC set is a local favorite — a perfect coastal keepsake or housewarming gift.',
    examples: 'SIC · any 3-letter combo',
    sizes: [
      {
        tier: 'small',
        label: 'Small',
        description: '4"–5" tall',
        basePrice: 30,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'medium',
        label: 'Medium',
        description: '6"–8" tall',
        basePrice: 44,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'large',
        label: 'Large',
        description: 'Up to 8" tall (max 8") — finish included',
        basePrice: 60,
        finishUpcharges: { none: 0, blo: 0, tung: 0, stain: 0, waterseal: 0 },
        finishIncluded: true,
      },
    ],
  },
  {
    id: 'nautical-motif',
    name: 'Nautical & Beach Motif',
    subtitle: 'Anchor · Crab · Lighthouse · Wave · and more',
    description: 'Hand-cut cedar shapes inspired by the coast. Anchors, crabs, lighthouses, waves — each one planed smooth and ready to display or mount.',
    examples: 'Anchor · Crab · Lighthouse · Wave · Starfish · Shell',
    sizes: [
      {
        tier: 'small',
        label: 'Small',
        description: '4"–6"',
        basePrice: 15,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'medium',
        label: 'Medium',
        description: '6"–9"',
        basePrice: 22,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'large',
        label: 'Large',
        description: '10"–14" — finish included',
        basePrice: 30,
        finishUpcharges: { none: 0, blo: 0, tung: 0, stain: 0, waterseal: 0 },
        finishIncluded: true,
      },
    ],
  },
  {
    id: 'letter-motif-combo',
    name: 'Letter + Motif Combo',
    subtitle: 'Combos & Custom Engraving',
    description: 'A cedar letter paired with a nautical or beach motif — a great combination for a personalized coastal display or gift set.',
    examples: 'Letter + anchor · Initial + crab · Any letter + any motif',
    sizes: [
      {
        tier: 'small',
        label: 'Small',
        description: '4"–5" letter + small motif',
        basePrice: 25,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'medium',
        label: 'Medium',
        description: '6"–8" letter + medium motif',
        basePrice: 38,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'large',
        label: 'Large',
        description: 'Large letter + large motif — finish included',
        basePrice: 52,
        finishUpcharges: { none: 0, blo: 0, tung: 0, stain: 0, waterseal: 0 },
        finishIncluded: true,
      },
    ],
  },
  {
    id: 'custom-name',
    name: 'Custom Name / Word',
    subtitle: 'Combos & Custom Engraving',
    description: 'A full name, word, or short phrase engraved into cedar. Perfect for house signs, welcome boards, or personalized gifts.',
    examples: 'Family name · House name · "Welcome" · Short phrase',
    sizes: [
      {
        tier: 'medium',
        label: 'Medium',
        description: 'Standard engraved name',
        basePrice: 40,
        finishUpcharges: { none: 0, blo: 3, tung: 4, stain: 5, waterseal: 3 },
      },
      {
        tier: 'large',
        label: 'Large',
        description: 'Large engraved name — finish included',
        basePrice: 55,
        finishUpcharges: { none: 0, blo: 0, tung: 0, stain: 0, waterseal: 0 },
        finishIncluded: true,
      },
    ],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
} as const;

// ─── Image Placeholder ────────────────────────────────────────────────────────

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 rounded-sm border-2 border-dashed border-border bg-muted" style={{ aspectRatio: '4/3' }}>
      <ImageIcon size={32} className="text-muted-foreground/40" />
      <p className="text-xs text-muted-foreground/60 text-center px-4">Photo coming soon<br /><span className="font-medium">{label}</span></p>
    </div>
  );
}

// ─── Finish Option ────────────────────────────────────────────────────────────

function FinishOption({
  finish,
  upcharge,
  included,
  selected,
  onSelect,
}: {
  finish: Finish;
  upcharge: number;
  included: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`rounded border-2 transition-all duration-200 overflow-hidden ${selected ? 'border-primary' : 'border-border hover:border-primary/40'}`}>
      <button onClick={onSelect} className="w-full flex items-center gap-3 px-4 py-3 text-left">
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-primary bg-primary' : 'border-border'}`}>
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
        </div>
        <span className={`shrink-0 ${selected ? 'text-primary' : 'text-muted-foreground'}`}>{finish.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">{finish.name}</span>
            {finish.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">{finish.badge}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{finish.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          {included ? (
            <span className="text-xs font-medium text-primary">Included</span>
          ) : upcharge > 0 ? (
            <span className="text-sm font-semibold text-primary">+${upcharge}</span>
          ) : (
            <span className="text-xs text-muted-foreground">Included</span>
          )}
        </div>
      </button>
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-1 px-4 pb-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ChevronDown size={11} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        {expanded ? 'Less info' : 'Why choose this?'}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">{finish.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function CutoutCard({ product }: { product: CutoutProduct }) {
  const defaultTier = product.sizes[0].tier;
  const [selectedTier, setSelectedTier] = useState<SizeTier>(defaultTier);
  const [selectedFinish, setSelectedFinish] = useState<FinishKey>('none');

  const sizeOption = product.sizes.find(s => s.tier === selectedTier) ?? product.sizes[0];
  const upcharge = sizeOption.finishIncluded ? 0 : sizeOption.finishUpcharges[selectedFinish];
  const totalPrice = sizeOption.basePrice + upcharge;
  const finishName = finishes.find(f => f.key === selectedFinish)?.name ?? 'No Finish';

  const orderParams = new URLSearchParams({
    product: product.name,
    size: sizeOption.label,
    finish: finishName,
    price: `$${totalPrice}`,
  });

  return (
    <motion.div variants={fadeUp} className="flex flex-col bg-card rounded-sm border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image placeholder */}
      <div className="p-4 pb-0">
        <ImagePlaceholder label={product.name} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">{product.subtitle}</p>
        <h3 className="font-heading text-2xl text-foreground mb-1" style={{ letterSpacing: '-0.01em' }}>{product.name}</h3>
        {product.examples && (
          <p className="text-xs font-mono text-muted-foreground mb-3">{product.examples}</p>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{product.description}</p>

        {/* Size selector */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Size</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map(size => (
              <button
                key={size.tier}
                onClick={() => { setSelectedTier(size.tier); setSelectedFinish('none'); }}
                className={`flex flex-col items-start px-3 py-2 rounded border-2 text-left transition-all duration-200 ${
                  selectedTier === size.tier ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                }`}
              >
                <span className={`text-sm font-semibold ${selectedTier === size.tier ? 'text-primary' : 'text-foreground'}`}>{size.label}</span>
                <span className="text-xs text-muted-foreground">{size.description}</span>
                <span className={`text-xs font-bold mt-0.5 ${selectedTier === size.tier ? 'text-primary' : 'text-foreground'}`}>${size.basePrice}</span>
              </button>
            ))}
          </div>
          {sizeOption.finishIncluded && (
            <p className="mt-2 text-xs text-primary font-medium">✓ Finish is included in the base price for this size.</p>
          )}
        </div>

        {/* Finish selector */}
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Finish</p>
          <div className="flex flex-col gap-1.5">
            {finishes.map(finish => (
              <FinishOption
                key={finish.key}
                finish={finish}
                upcharge={sizeOption.finishUpcharges[finish.key]}
                included={!!sizeOption.finishIncluded}
                selected={selectedFinish === finish.key}
                onSelect={() => setSelectedFinish(finish.key)}
              />
            ))}
          </div>
        </div>

        {/* Price summary */}
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-5">
          <span className="text-sm text-muted-foreground">
            {sizeOption.label} · {sizeOption.finishIncluded ? 'Finish included' : finishName}
          </span>
          <span className="text-lg font-bold text-foreground">${totalPrice}</span>
        </div>

        {/* CTA */}
        <Link
          to={`/custom-orders?${orderParams.toString()}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Order This Cutout <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CedarCutoutsPage() {
  return (
    <>
      <Helmet>
        <title>Cedar Cutouts — Seashore Cedar</title>
        <meta name="description" content="Hand-cut cedar letters, nautical motifs, and custom engraved pieces. Town letters, beach shapes, and personalized combos — all hand-finished and built to order." />
        <meta property="og:title" content="Cedar Cutouts — Seashore Cedar" />
        <meta property="og:description" content="Hand-cut cedar letters, nautical motifs, and custom engraved pieces." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/background-header_WW.png" alt="Cedar cutouts and engraving" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/55 to-stone-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>
              Hand-Cut · Hand-Finished
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Cedar Cutouts
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-base md:text-lg max-w-xl mx-auto">
              Letters, nautical motifs, and custom engraved pieces — all cut from Western red cedar, planed smooth, and finished to order.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Size guide banner ── */}
      <div className="border-b border-border" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6 py-4 flex flex-wrap gap-6 items-center text-sm">
          <span className="font-semibold text-foreground">Size Guide:</span>
          <span className="text-muted-foreground"><strong className="text-foreground">Small</strong> = 4"–5" tall</span>
          <span className="text-muted-foreground"><strong className="text-foreground">Medium</strong> = 6"–8" tall</span>
          <span className="text-muted-foreground"><strong className="text-foreground">Large</strong> = 10"–12" tall (SIC max 8")</span>
          <span className="text-muted-foreground ml-auto text-xs italic">Large size includes finish at no extra charge.</span>
        </div>
      </div>

      {/* ── Products grid ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
              Choose Your Cutout
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl leading-relaxed">
              Select a size, pick a finish, and place your order. Custom orders allow 3–5 business days. Not sure what you want? <Link to="/contact" className="text-primary underline hover:opacity-80 transition-opacity">Send us a message.</Link>
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {cutoutProducts.map(product => (
              <CutoutCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 border-t border-border" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">Something Different in Mind?</p>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>Custom Orders Welcome</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Don't see exactly what you're looking for? We can cut any letter, shape, or design. Reach out and we'll work out the details together.
            </p>
          </div>
          <div className="shrink-0">
            <Link to="/custom-orders" className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Start a Custom Order <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
