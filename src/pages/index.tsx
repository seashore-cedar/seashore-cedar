import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, ChevronRight } from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' as const } }
} as const;

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' as const } }
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
} as const;

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero1.png"
          alt="Cedar planter box in a coastal garden setting"
          className="w-full h-full object-cover"
          fetchPriority="high" />
        
        {/* Warm gradient overlay — heavier at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
        {/* Subtle warm wood-tone tint */}
        <div className="absolute inset-0" style={{ background: 'rgba(80, 40, 10, 0.18)' }} />
      </div>

      {/* Content — anchored bottom-left, editorial feel */}
      <div className="relative z-10 container mx-auto px-6 pb-20 md:pb-28">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-2xl">
          
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "#f5efe5" }}>crafted down the shore


          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}>Handcrafted<br /><span style={{ color: 'hsl(var(--primary) / 0.9)' }}>for the Coast</span>




          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-lg">Cedar planter boxes, coastal home goods, and custom engraving — each piece shaped by hand and finished with the unhurried care of beach life.


          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              
              Shop Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/custom-orders"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-colors">
              
              Request Custom Order
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}

// ─── Section: Featured Products (Editorial Alternating) ───────────────────────

const products = [
{
  id: 'planters',
  label: '01 — Planter Boxes',
  title: 'Built to Weather the Shore',
  body: 'Our cedar planter boxes are crafted for outdoor life — naturally rot-resistant, beautifully grained, and sized to fit any garden, porch, or patio. Each box is hand-assembled and finished to let the wood breathe and age gracefully.',
  cta: { label: 'Shop Planter Boxes', href: '/products#planters' },
  image: '/assets/built_to_last.png',
  imageAlt: 'Handmade cedar planter boxes in an outdoor garden',
  reverse: false
},
{
  id: 'cedar-goods',
  label: '02 — Cedar Home Goods',
  title: 'Warm Wood for Every Room',
  body: 'From serving boards to wall art, our cedar home goods bring the warmth of natural wood into your living spaces. Every piece is sanded smooth, finished by hand, and made to last a lifetime.',
  cta: { label: 'Explore Cedar Goods', href: '/products#cedar-goods' },
  image: '/assets/boxes1.png',
  imageAlt: 'Handmade cedar wood home goods and artisan crafts',
  reverse: true
},
{
  id: 'engraving',
  label: '03 — Custom Engraving',
  title: 'Make It Yours',
  body: 'Names, coordinates, quotes, logos — we engrave them all. Custom engraving transforms any cedar piece into a one-of-a-kind gift or keepsake. Perfect for weddings, housewarmings, and anyone who deserves something truly personal.',
  cta: { label: 'Request Custom Engraving', href: '/custom-orders' },
  image: '/assets/customengraved.png',
  imageAlt: 'Custom laser engraving on cedar wood close-up',
  reverse: false
}];


function FeaturedProductsSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 md:mb-20">
          
          <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">
            What We Make
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-foreground" style={{ letterSpacing: '-0.02em' }}>
            Crafted with Purpose
          </motion.h2>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-32">
          {products.map((product) =>
          <motion.div
            key={product.id}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${product.reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
            
              {/* Image */}
              <motion.div
              variants={fadeIn}
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: '4/3' }}>
              
                <img
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              
              </motion.div>

              {/* Text */}
              <motion.div variants={stagger} className="flex flex-col justify-center">
                <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                  {product.label}
                </motion.p>
                <motion.h3 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-foreground mb-5" style={{ letterSpacing: '-0.02em' }}>
                  {product.title}
                </motion.h3>
                <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8 text-base">
                  {product.body}
                </motion.p>
                <motion.div variants={fadeUp}>
                  <Link
                  to={product.cta.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200">
                  
                    {product.cta.label} <ChevronRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}

// ─── Section: Craftsmanship Story ─────────────────────────────────────────────

function CraftsmanshipSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: 'hsl(25, 30%, 94%)' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative overflow-hidden rounded-sm"
            style={{ aspectRatio: '4/3' }}>
            
            <img
              src="/assets/Glued_Joints.png"
              alt="Craftsman hands working cedar wood"
              className="w-full h-full object-cover" />
            
          </motion.div>

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}>
            
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              Made by Hand
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
              Every Piece Tells a Story
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-5">We work with Western red cedar — a wood that's been trusted by coastal builders for generations. It's naturally resistant to rot, beautifully aromatic, and gets better with age. Every board is hand-selected, cut, and finished in our small workshop just blocks from the beach.

            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-8">
              No assembly lines. No shortcuts. Just honest craftsmanship and the kind of unhurried attention that only comes from making things by hand.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-200">
                
                Our Story <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);

}

// ─── Section: Custom Engraving Callout ────────────────────────────────────────

function EngravingCalloutSection() {
  return (
    <section className="py-24 md:py-32" style={{ background: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Text — wider column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="md:col-span-3">
            
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              Personalized & Giftable
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
              Something Made
              <br />
              Just for Them
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-5 max-w-lg">
              Custom engraving turns any cedar piece into a gift that lasts. Names, dates, coordinates, a favorite quote — we work with you to get every detail right. Whether it's a wedding gift, a housewarming, or just because — personalized cedar is always the right call.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Tell us what you're imagining. We'll handle the rest.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link
                to="/custom-orders"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                
                Start Your Custom Order <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image — narrower, offset */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="md:col-span-2 relative">
            
            <div
              className="absolute -top-6 -left-6 w-full h-full rounded-sm"
              style={{ background: 'hsl(var(--primary) / 0.08)', zIndex: 0 }} />
            
            <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '3/4', zIndex: 1 }}>
              <img
                src="/assets/customengraved2.png"
                alt="Custom engraving on cedar wood close-up"
                className="w-full h-full object-cover" />
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}

// ─── Section: CTA ─────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Wood texture background */}
      <div className="absolute inset-0">
        <img
          src="/assets/customengraved2.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0" style={{ background: 'rgba(40, 20, 5, 0.72)' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-2xl">
          
          <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: 'hsl(var(--primary) / 0.85)' }}>
            Ready to Order?
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-6xl text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Let's Build Something Beautiful Together
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 leading-relaxed mb-10 text-base md:text-lg max-w-lg">
            Browse our ready-made cedar pieces or reach out to start a custom order. We'd love to hear what you have in mind.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              
              Shop Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/custom-orders"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-colors">
              
              Request Custom Order
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Seashore Cedar — Handcrafted Cedar Planter Boxes & Custom Engraving</title>
        <meta
          name="description"
          content="Handmade cedar planter boxes, coastal home goods, and custom wood engraving. Crafted by hand with coastal soul. Shop or request a custom order." />
        
        <meta property="og:title" content="Seashore Cedar — Handcrafted Cedar Planter Boxes & Custom Engraving" />
        <meta property="og:description" content="Handmade cedar planter boxes, coastal home goods, and custom wood engraving. Crafted by hand with coastal soul." />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection />
      <FeaturedProductsSection />
      <CraftsmanshipSection />
      <EngravingCalloutSection />
      <CTASection />
    </>);

}