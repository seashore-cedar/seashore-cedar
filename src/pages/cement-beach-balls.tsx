import { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

interface BallProduct {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string;
  badge?: string;
  details: string[];
}

const ballProducts: BallProduct[] = [
  {
    id: 'unpainted',
    name: 'Solid Cement Ball — Unpainted',
    description: 'A 16" diameter solid cement ball in its natural finish. Clean, minimal, and surprisingly striking as a garden accent or coastal yard feature.',
    price: 45,
    image: '/assets/BB-16Inch.png',
    details: ['16" diameter', 'Natural cement finish', 'Solid cast construction', 'Weather-resistant'],
  },
  {
    id: 'classic-stripe',
    name: 'Classic 6-Stripe Beach Ball',
    description: 'The iconic beach ball pattern, rendered in durable exterior paint on a solid 16" cement ball. Finished with a protective clear coat for lasting color and weather resistance.',
    price: 85,
    image: '/assets/BB-16Inch.png',
    badge: 'Most Popular',
    details: ['16" diameter', 'Classic 6-stripe pattern', 'Exterior-grade paint', 'Protective clear coat included'],
  },
  {
    id: 'custom-color',
    name: 'Custom Color Scheme',
    description: "Want a specific color combination? We love a challenge — reach out through our custom order form and we'll let you know if we can accommodate and share pricing with you personally.",
    price: null,
    image: '/assets/BB-16Inch.png',
    details: ['16" diameter', 'Any color combination', 'Exterior-grade paint', 'Protective clear coat included'],
  },
];

function BallProductCard({ product }: { product: BallProduct }) {
  const orderParams = new URLSearchParams({
    product: product.name,
    dimensions: '16" diameter',
    finish: 'Painted with clear coat',
  });

  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col rounded border border-border overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
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

        {/* Price */}
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-5">
          <span className="text-sm text-muted-foreground">Price</span>
          {product.price !== null ? (
            <span className="text-lg font-bold text-foreground">${product.price}</span>
          ) : (
            <span className="text-sm text-muted-foreground italic">Contact us for pricing</span>
          )}
        </div>

        {/* CTA */}
        <Link
          to={product.id === 'custom-color'
            ? `/custom-orders?product=${encodeURIComponent(product.name)}`
            : `/order?${orderParams.toString()}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {product.id === 'custom-color' ? 'Request Custom Order' : `Order — $${product.price}`}
          <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function CementBeachBallsPage() {
  return (
    <>
      <Helmet>
        <title>Cement Beach Balls — Seashore Cedar</title>
        <meta
          name="description"
          content='16" solid cement beach balls — unpainted or classic 6-stripe. A playful coastal accent for any garden or patio. Made in Wildwood, NJ.'
        />
      </Helmet>

      {/* Hero */}
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/background-header_WW.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: 'hsl(var(--primary) / 0.9)' }}
            >
              Seashore Cedar
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              Cement Beach Balls
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              Solid 16" cast cement beach balls — a playful coastal accent for gardens, patios, and porches.
              All painted balls include a protective clear coat.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {ballProducts.map(product => (
              <BallProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs text-muted-foreground mt-8"
          >
            Free local pickup · Wildwood, NJ · Allow 4–5 business days
          </motion.p>
        </div>
      </section>
    </>
  );
}
