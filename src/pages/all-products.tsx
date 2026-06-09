import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

const categories = [
  {
    title: 'Cedar Planter Boxes',
    description: 'Handcrafted western red cedar planter boxes in a variety of sizes. Hand-sanded, built to last, and available with a range of finish options.',
    image: '/assets/boxes1.png',
    href: '/products',
    label: 'Shop Planter Boxes',
  },
  {
    title: 'Cedar Cutouts',
    description: 'Laser-cut cedar town letters, nautical motifs, and custom designs. Perfect for coastal home décor, gifts, and personalized signs.',
    image: '/assets/customengraved2.png',
    href: '/cedar-cutouts',
    label: 'Shop Cedar Cutouts',
  },
  {
    title: 'Cement Beach Balls',
    description: 'Solid 16" cast cement beach balls — unpainted or classic 6-stripe. A playful coastal accent for gardens, patios, and porches.',
    image: '/assets/BB-16Inch.png',
    href: '/cement-beach-balls',
    label: 'Shop Cement Beach Balls',
  },
  {
    title: 'Custom Orders',
    description: 'Have something specific in mind? We love a challenge. Submit a custom order request and we\'ll work with you to bring your idea to life — from custom dimensions to personalized engravings.',
    image: '/assets/customengraved.png',
    href: '/custom-orders',
    label: 'Request a Custom Order',
  },
  {
    title: 'Artisan Epoxy',
    description: 'Coming soon — unique epoxy resin creations with a coastal twist. Stay tuned for new additions to our collection.',
    image: '/assets/background-header_WW.png',
    href: '/artisan-epoxy',
    label: 'Learn More',
    comingSoon: true,
  },
  {
    title: 'Yard Sale',
    description: 'Discounted items, seconds, and one-of-a-kind pieces at reduced prices. Check back often — inventory changes regularly!',
    image: '/assets/Glued_Joints.png',
    href: '/yard-sale',
    label: 'Browse Yard Sale',
    comingSoon: true,
  },
];

export default function AllProductsPage() {
  return (
    <>
      <Helmet>
        <title>All Products — Seashore Cedar</title>
        <meta
          name="description"
          content="Shop all Seashore Cedar products — cedar planter boxes, cedar cutouts, cement beach balls, artisan epoxy, and more. Handcrafted in Wildwood, NJ."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/hero1.png"
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
              All Products
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              Handcrafted in Wildwood, NJ — browse our full collection below.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {categories.map(cat => (
              <motion.div
                key={cat.href}
                variants={fadeUp}
                className="flex flex-col rounded border border-border overflow-hidden"
                style={{ background: 'hsl(var(--background))' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                  {cat.comingSoon && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h2 className="font-heading text-xl text-foreground mb-2" style={{ letterSpacing: '-0.01em' }}>
                    {cat.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {cat.description}
                  </p>
                  <Link
                    to={cat.href}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    {cat.label} <ArrowRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
