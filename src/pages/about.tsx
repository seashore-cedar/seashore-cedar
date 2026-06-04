import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Package, Dog } from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
} as const;

// ─── Quick-facts data ─────────────────────────────────────────────────────────

const facts = [
  {
    icon: MapPin,
    label: 'Where we are',
    value: '320 W Pine Ave\nWildwood, NJ',
  },
  {
    icon: Package,
    label: 'Free local pickup',
    value: 'Available by appointment\nat our Wildwood workshop',
  },
  {
    icon: Clock,
    label: 'Order lead time',
    value: 'Please allow 4–5 business\ndays for all orders',
  },
  {
    icon: Dog,
    label: 'Who we are',
    value: 'Harry & Melissa\n+ Mick & Penelope',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — Seashore Cedar</title>
        <meta
          name="description"
          content="Two Philly kids who found their home at the shore. Harry and Melissa make handcrafted cedar goods in Wildwood, NJ — and yes, the dogs are always on site."
        />
        <meta property="og:title" content="About — Seashore Cedar" />
        <meta
          property="og:description"
          content="Two Philly kids who found their home at the shore. Handcrafted cedar goods made in Wildwood, NJ."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ height: '360px' }}>
        <div className="absolute inset-0">
          <img
            src="/assets/background-header_WW.png"
            alt="The Wildwoods boardwalk sign with beach balls"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center center' }}
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
              About Us
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl md:text-6xl text-white mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Two Philly kids who found<br className="hidden sm:block" /> their home at the shore.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base">
              Wildwood, New Jersey &nbsp;&middot;&nbsp; Est. 2024
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-px bg-primary" />
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Where It Started</p>
                </div>
                <h2
                  className="font-heading text-4xl md:text-5xl text-foreground mb-2"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Built for the Coast
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Harry is from Overbrook in West Philadelphia. Melissa is from Port Richmond. If you know Philly, you know those are two very different neighborhoods — but they share the same DNA: hardworking, unpretentious, community-first. The kind of places where people take pride in their homes, look out for their neighbors, and aren't afraid to get their hands dirty.
              </motion.p>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Like a lot of Philly families, the Jersey Shore was always part of life — summer weekends, long weekends, the occasional stolen Tuesday. Wildwood in particular had a pull that was hard to explain and impossible to ignore. The boardwalk, the bungalows, the way the whole town feels like it exists slightly outside of ordinary time. After years of visits, we stopped making the drive back north.
              </motion.p>

              {/* Pullquote */}
              <motion.blockquote
                variants={fadeUp}
                className="border-l-4 border-primary pl-5 py-1"
                style={{ borderColor: 'hsl(var(--primary))' }}
              >
                <p className="font-heading text-lg text-foreground italic leading-snug" style={{ letterSpacing: '-0.01em' }}>
                  "We didn't just want to live here — we wanted to be part of what makes this town worth living in."
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-semibold tracking-wide uppercase">
                  — On moving to Wildwood, 2024
                </p>
              </motion.blockquote>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                So in 2024, we packed up, landed at <strong className="text-foreground font-semibold">320 W Pine Ave</strong>, and got to work. Literally. We'd always loved building and making things — there's something deeply satisfying about starting with raw wood and ending with something that belongs on someone's porch. We started making cedar planter boxes, trellis panels, and hand-painted cement beach balls, and before long we were laser-cutting town letters and nautical motifs out of cedar scraps from our own builds.
              </motion.p>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Everything we make is built right here in Wildwood, by hand, with materials we'd put in front of our own home. We're not a warehouse. We're not a dropshipper. We're your neighbors on Pine Ave, and every piece we make carries a little bit of the care and pride we brought down the AC Expressway from Philly.
              </motion.p>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Our goal is simple: help make the homes and yards of the Wildwoods — and all the shore towns we love — a little more beautiful, a little more personal, and a little more alive. Because beautiful communities start at the front porch, and we've got the tools to prove it.
              </motion.p>
            </motion.div>

            {/* Photo collage */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded overflow-hidden">
                  <img
                    src="/assets/pic for site Melissa and Me EAGLES.jpg"
                    alt="Harry and Melissa at an Eagles game"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded overflow-hidden">
                  <img
                    src="/assets/pic for site Melissa and Me Phillies.jpg"
                    alt="Harry and Melissa at a Phillies game"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="aspect-video rounded overflow-hidden">
                <img
                  src="/assets/pic for site Melissa and Me.jpg"
                  alt="Harry and Melissa at the shore"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
              <motion.p variants={fadeUp} className="text-xs text-muted-foreground text-center italic">
                Harry &amp; Melissa — Overbrook &amp; Port Richmond, by way of Wildwood
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Quick Facts ── */}
      <section
        className="py-14 border-t border-b border-border"
        style={{ background: 'hsl(25, 30%, 94%)' }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded overflow-hidden border border-border"
          >
            {facts.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  variants={fadeUp}
                  className="flex flex-col gap-2 p-6"
                  style={{ background: 'hsl(25, 30%, 94%)' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon size={14} className="text-primary shrink-0" />
                    <p className="text-xs font-bold tracking-[0.15em] uppercase text-primary">{f.label}</p>
                  </div>
                  <p className="font-heading text-sm text-foreground leading-snug whitespace-pre-line" style={{ letterSpacing: '-0.01em' }}>
                    {f.value}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Meet the Dogs ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Dog photos */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-4"
            >
              <motion.div variants={fadeUp} className="aspect-[4/3] rounded overflow-hidden">
                <img
                  src="/assets/Penelope and Mick Bday.jpg"
                  alt="Mick and Penelope in birthday hats"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div variants={fadeUp} className="aspect-[4/3] rounded overflow-hidden">
                <img
                  src="/assets/Penelope and Mick sleeping.jpg"
                  alt="Mick and Penelope napping together"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            {/* Dog copy */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-7 h-px bg-primary" />
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">The Full Team</p>
                </div>
                <h2
                  className="font-heading text-4xl md:text-5xl text-foreground"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Meet Mick &amp; Penelope
                </h2>
              </motion.div>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                Our workshop is a full family operation, which means <strong className="text-foreground font-semibold">Mick and Penelope</strong> — our two very opinionated dogs — are almost always on site. They're friendly, they're loud about it, and they consider greeting every visitor a core part of their job description.
              </motion.p>

              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed">
                If you come by for a local pickup, expect a proper welcome committee. You've been warned, and you're very welcome.
              </motion.p>

              {/* Dark callout box */}
              <motion.div
                variants={fadeUp}
                className="rounded p-5 flex items-start gap-4"
                style={{ background: 'hsl(var(--primary) / 0.08)', borderLeft: '3px solid hsl(var(--primary))' }}
              >
                <span className="text-2xl shrink-0" role="img" aria-label="dog">🐾</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-semibold">A note about pickup:</strong> Mick and Penelope consider greeting every visitor a core part of their job description. They're friendly, enthusiastic, and completely unaware of personal space. Fair warning — and fair welcome.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Closing Quote ── */}
      <section
        className="py-16 border-t border-border"
        style={{ background: 'hsl(25, 30%, 94%)' }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.p
              variants={fadeUp}
              className="font-heading text-2xl md:text-3xl text-foreground italic leading-snug mb-4"
              style={{ letterSpacing: '-0.01em' }}
            >
              "Built by neighbors, for the neighborhood — because beautiful towns start at the front porch."
            </motion.p>
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-10">
              — Harry &amp; Melissa &nbsp;&middot;&nbsp; Overbrook &amp; Port Richmond, by way of Wildwood
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Shop the Collection
              </Link>
              <Link
                to="/custom-orders"
                className="inline-flex items-center justify-center px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:bg-muted transition-colors"
              >
                Request a Custom Order
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
