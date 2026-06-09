import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

export default function ArtisanEpoxyPage() {
  return (
    <>
      <Helmet>
        <title>Artisan Epoxy — Seashore Cedar</title>
        <meta
          name="description"
          content="Artisan epoxy resin creations coming soon from Seashore Cedar in Wildwood, NJ."
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
              Artisan Epoxy
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base">
              Something new is in the works
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 md:py-36" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6 max-w-xl text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <span className="text-3xl">🌊</span>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-3xl text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>
                Coming Soon
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                We're working on a new line of artisan epoxy resin creations with a coastal twist — think river tables, serving boards, decorative pieces, and more.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Check back soon or reach out if you have something specific in mind — we love a custom challenge.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                to="/custom-orders"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Request a Custom Piece <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:bg-muted transition-colors"
              >
                <Mail size={15} /> Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
