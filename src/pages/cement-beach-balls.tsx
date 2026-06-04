import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BallProduct {
  id: string;
  name: string;
  description: string;
  price: number | null;
  image: string;
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
    price: 45,
    image: '/assets/BB-16Inch.png',
    details: ['16" diameter', 'Natural cement finish', 'Solid cast construction', 'Weather-resistant'],
  },
  {
    id: 'classic-stripe',
    name: 'Classic 6-Stripe Beach Ball',
    description:
      'The iconic beach ball pattern, rendered in durable exterior paint on a solid 16" cement ball. Finished with a protective clear coat for lasting color and weather resistance.',
    price: 85,
    image: '/assets/BB-16Inch.png',
    badge: 'Most Popular',
    details: ['16" diameter', 'Classic 6-stripe pattern', 'Exterior-grade paint', 'Protective clear coat included'],
  },
  {
    id: 'custom-color',
    name: 'Custom Color Scheme',
    description:
      'Want a specific color combination? We love a challenge — reach out through our custom order form and we\'ll let you know if we can accommodate and share pricing with you personally.',
    price: null,
    details: ['16" diameter', 'Any color combination', 'Exterior-grade paint', 'Protective clear coat included'],
  },
];

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
}: {
  product: BallProduct;
}) {
  const isUnpainted = product.id === 'unpainted';

  const orderParams = new URLSearchParams({
    product: product.name,
    priceRange: `$${product.priceRange[0]}–$${product.priceRange[1]}`,
    
  });

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col bg-card rounded-sm border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="p-4 pb-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
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

        {/* Price */}
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-5">
          <span className="text-sm text-muted-foreground">Price</span>
          {product.price !== null ? (
            <span className="text-lg font-bold text-foreground">${product.price}</span>
          ) : (
            <span className="text-sm text-muted-foreground italic">Contact us for pricing</span>
          )}
        </div>
