import { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import {
  Send, CheckCircle, AlertCircle, Ruler, Paintbrush, Type, Package, ChevronDown,
  Clock, MapPin, CreditCard, ShieldAlert, Info,
} from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

// ─── Form Types ───────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  productType: string;
  quantity: string;
  dimensions: string;
  finish: string;
  engraving: string;
  engravingText: string;
  timeline: string;
  budget: string;
  details: string;
}

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  productType: '',
  quantity: '1',
  dimensions: '',
  finish: '',
  engraving: '',
  engravingText: '',
  timeline: '',
  budget: '',
  details: '',
};

// ─── How It Works Steps ───────────────────────────────────────────────────────

const steps = [
  {
    icon: Package,
    title: 'Submit Your Inquiry',
    body: 'Fill out the form with your product type, sizing, finish preferences, and any engraving or personalization details.',
  },
  {
    icon: Ruler,
    title: 'We Send a Quote',
    body: "Within 1\u20132 business days we'll follow up with a detailed quote, timeline, and any clarifying questions.",
  },
  {
    icon: Paintbrush,
    title: 'We Build It',
    body: "Once you approve the quote, we get to work. Every piece is hand-finished and built to order.",
  },
  {
    icon: Type,
    title: 'Ready for Pickup',
    body: "Your finished piece is available for free local pickup in Wildwood. We'll reach out when it's ready.",
  },
];

// ─── What counts as custom ────────────────────────────────────────────────────

const customTable = [
  {
    item: 'Town letter cutouts (W, A, SH, NW, WC, SIC)',
    type: 'standard',
    payment: 'Pay at pickup — standard catalog items we can resell.',
  },
  {
    item: 'Nautical & beach motifs',
    type: 'standard',
    payment: 'Pay at pickup — standard designs from our catalog.',
  },
  {
    item: 'Planter boxes & accessories',
    type: 'standard',
    payment: 'Pay at pickup — standard builds.',
  },
  {
    item: 'Custom name or word engraved',
    type: 'custom',
    payment: 'Your family name, street name, house name, any specific word or phrase.',
  },
  {
    item: 'Non-catalog design or motif',
    type: 'custom',
    payment: 'Any design not in our standard library, including logos or supplied artwork.',
  },
  {
    item: 'Custom size outside standard tiers',
    type: 'custom',
    payment: 'Sizes outside our S/M/L tiers, or pieces sized to fit a specific space.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CustomOrdersPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [policyAgreed, setPolicyAgreed] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!policyAgreed) return;
    setStatus('submitting');
    setErrorMsg('');

    const subject = `Custom Order Inquiry — ${form.productType || 'General'} from ${form.name}`;
    const message = [
      `Product Type: ${form.productType || 'Not specified'}`,
      `Quantity: ${form.quantity}`,
      form.dimensions ? `Dimensions / Size: ${form.dimensions}` : '',
      form.finish ? `Finish: ${form.finish}` : '',
      form.engraving ? `Engraving / Personalization: ${form.engraving}` : '',
      form.engravingText ? `Engraving Text / Details: ${form.engravingText}` : '',
      form.timeline ? `Timeline: ${form.timeline}` : '',
      form.budget ? `Budget Range: ${form.budget}` : '',
      '',
      'Additional Details:',
      form.details || '(none provided)',
      '',
      'Customer confirmed they have read and agree to the custom order policy.',
    ].filter(l => l !== '').join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject,
          message,
        }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Something went wrong. Please try again.');
      setStatus('success');
      setForm(emptyForm);
      setPolicyAgreed(false);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <Helmet>
        <title>Custom Orders — Seashore Cedar</title>
        <meta name="description" content="Request a custom cedar planter box, cutout, or coastal piece. Tell us your size, finish, and engraving needs and we'll send a quote within 1–2 business days." />
        <meta property="og:title" content="Custom Orders — Seashore Cedar" />
        <meta property="og:description" content="Custom cedar planter boxes, cutouts, and coastal pieces made to your exact specs. Request a quote today." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/background-header_WW.png"
            alt="Craftsman finishing cedar by hand"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/55 to-stone-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>
              Made to Your Specs
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Custom Orders
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-base md:text-lg max-w-xl mx-auto">
              Need a specific size, a custom engraving, or something you don't see in the shop? We love a good challenge — tell us what you have in mind.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-14 md:py-20 border-b border-border" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-foreground text-center mb-12" style={{ letterSpacing: '-0.02em' }}>
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div key={step.title} variants={fadeUp} className="flex flex-col items-start gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <span className="text-xs font-bold text-primary/60 tracking-widest uppercase">Step {i + 1}</span>
                    </div>
                    <h3 className="font-heading text-lg text-foreground" style={{ letterSpacing: '-0.01em' }}>{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Order & Payment Policy ── */}
      <section className="py-14 md:py-20 border-b border-border" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            <motion.div variants={fadeUp} className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-7 h-px bg-primary" />
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">Before You Order</p>
                <div className="w-7 h-px bg-primary" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground" style={{ letterSpacing: '-0.02em' }}>
                Order &amp; Payment Policy
              </h2>
            </motion.div>

            {/* Key policy cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                {
                  icon: Clock,
                  label: 'Lead Time',
                  value: '4\u20135 business days',
                  sub: 'All orders. Stain finish may require 1 additional day to cure.',
                },
                {
                  icon: MapPin,
                  label: 'Local Pickup',
                  value: 'Free \u2014 by appointment',
                  sub: '320 W Pine Ave, Wildwood, NJ. We\'ll contact you when your order is ready.',
                },
                {
                  icon: CreditCard,
                  label: 'Standard Items',
                  value: 'Pay at pickup',
                  sub: 'Planter boxes, standard cutouts, standard finish options.',
                },
                {
                  icon: ShieldAlert,
                  label: 'Custom Orders',
                  value: '100% upfront required',
                  sub: 'All custom designs, names, words, or non-standard requests. All custom sales are final.',
                  highlight: true,
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className={`rounded border p-5 flex flex-col gap-2 ${card.highlight ? 'border-primary/40 bg-primary/5' : 'border-border bg-card'}`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={card.highlight ? 'text-primary' : 'text-muted-foreground'} />
                      <p className={`text-xs font-bold tracking-[0.15em] uppercase ${card.highlight ? 'text-primary' : 'text-muted-foreground'}`}>{card.label}</p>
                    </div>
                    <p className="font-heading text-base text-foreground leading-snug" style={{ letterSpacing: '-0.01em' }}>{card.value}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.sub}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Payment policy detail */}
            <motion.div variants={fadeUp} className="rounded border border-border overflow-hidden mb-10">
              <div className="px-5 py-3 border-b border-border" style={{ background: 'hsl(25, 30%, 91%)' }}>
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-foreground">Custom Order Payment Policy</p>
              </div>
              <div className="divide-y divide-border">
                {[
                  {
                    badge: 'Standard items',
                    badgeStyle: 'bg-accent/10 text-accent border border-accent/20',
                    text: 'Planter boxes, trellis, stands, and our regular cutout designs (town letters, nautical motifs) in standard sizes — pay at pickup or online checkout. No deposit needed.',
                  },
                  {
                    badge: 'Custom orders',
                    badgeStyle: 'bg-primary/10 text-primary border border-primary/20',
                    text: 'Full payment required at time of order. This includes any custom name, word, phrase, or non-standard design laser-cut to your specification. Because custom pieces are made exclusively for you, they cannot be resold if an order is cancelled.',
                  },
                  {
                    badge: 'All custom sales final',
                    badgeStyle: 'bg-primary/10 text-primary border border-primary/20',
                    text: "Once your custom order is confirmed and payment received, we begin production. Custom orders cannot be cancelled, refunded, or exchanged. We'll send you a proof or confirmation before cutting — please review carefully.",
                  },
                ].map((row) => (
                  <div key={row.badge} className="flex items-start gap-4 px-5 py-4 bg-card">
                    <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap mt-0.5 ${row.badgeStyle}`}>
                      {row.badge}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{row.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* What counts as custom table */}
            <motion.div variants={fadeUp}>
              <h3 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: '-0.01em' }}>
                What Counts as Custom?
              </h3>
              <div className="rounded border border-border overflow-hidden">
                <div className="grid grid-cols-12 px-4 py-2.5 border-b border-border" style={{ background: 'hsl(25, 30%, 91%)' }}>
                  <p className="col-span-5 text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">Item</p>
                  <p className="col-span-3 text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">Type</p>
                  <p className="col-span-4 text-xs font-bold tracking-[0.1em] uppercase text-muted-foreground">Payment</p>
                </div>
                <div className="divide-y divide-border">
                  {customTable.map((row) => (
                    <div key={row.item} className="grid grid-cols-12 px-4 py-3 bg-card items-start gap-2">
                      <p className="col-span-5 text-sm text-foreground font-medium leading-snug">{row.item}</p>
                      <div className="col-span-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          row.type === 'standard'
                            ? 'bg-accent/10 text-accent border border-accent/20'
                            : 'bg-primary/10 text-primary border border-primary/20'
                        }`}>
                          {row.type === 'standard' ? 'Standard' : 'Custom — 100% upfront'}
                        </span>
                      </div>
                      <p className="col-span-4 text-xs text-muted-foreground leading-relaxed">{row.payment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* General policies */}
            <motion.div variants={fadeUp} className="mt-10">
              <h3 className="font-heading text-xl text-foreground mb-4" style={{ letterSpacing: '-0.01em' }}>
                General Order Policies
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: Clock,
                    title: 'Lead time',
                    body: 'Please allow 4\u20135 business days for all orders. We build everything to order \u2014 nothing sits in a warehouse. Orders with a stain finish may require one additional day to cure fully before pickup.',
                  },
                  {
                    icon: MapPin,
                    title: 'Free local pickup',
                    body: "All orders are available for free pickup at 320 W Pine Ave, Wildwood, NJ. We'll reach out by email or phone when your order is ready to arrange a convenient time.",
                  },
                  {
                    icon: Info,
                    title: 'Order confirmation',
                    body: "You'll receive an email confirmation when we receive your order and again when it's ready for pickup. For custom orders, we'll send a proof or description confirmation before cutting — please review and approve promptly to avoid delays.",
                  },
                  {
                    icon: ShieldAlert,
                    title: 'Standard order cancellations',
                    body: 'Standard (non-custom) orders may be cancelled within 24 hours of placement for a full refund. After 24 hours, production may have begun and cancellations cannot be guaranteed.',
                  },
                  {
                    icon: Package,
                    title: 'All items are handmade',
                    body: "Natural cedar has variation in grain, tone, and texture \u2014 no two pieces are identical. This is part of the character of handcrafted work, not a defect. If you have questions about what to expect, just ask before ordering.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-4 px-5 py-4 rounded border border-border bg-card">
                      <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={13} className="text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground font-semibold">{item.title}: </strong>
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ── Sidebar ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-8"
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-heading text-3xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                  What We Can Make
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  If it's cedar, we can probably build it. Here are the most common custom requests we handle.
                </p>
              </motion.div>

              {[
                {
                  title: 'Custom-Sized Planter Boxes',
                  body: 'Need a non-standard length, width, or height? We build to any dimension. Great for fitting specific deck or patio spaces.',
                },
                {
                  title: 'Engraved Town Letters & Signs',
                  body: 'Custom text, town names, house numbers, or family names. Any font style, any size tier.',
                },
                {
                  title: 'Nautical & Coastal Motifs',
                  body: 'Anchors, starfish, waves, lighthouses — or bring your own design. We cut and finish to order.',
                },
                {
                  title: 'Painted or Stained Cement Beach Balls',
                  body: 'Custom color combinations, stripe patterns, or epoxy topcoat for extra durability.',
                },
                {
                  title: 'Bulk & Gift Orders',
                  body: 'Ordering multiple pieces for a wedding, event, or gift? Ask about quantity pricing.',
                },
              ].map(item => (
                <motion.div key={item.title} variants={fadeUp} className="border-l-2 border-primary/30 pl-4">
                  <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.body}</p>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="rounded border border-border p-5 bg-card">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Response Time</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We respond to all custom inquiries within 1\u20132 business days with a quote and any follow-up questions. The more detail you provide, the faster we can turn around a quote.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="text-xs text-muted-foreground">
                  Prefer to reach out directly?{' '}
                  <Link to="/contact" className="text-primary font-medium hover:opacity-75 transition-opacity underline underline-offset-2">
                    Use the contact form
                  </Link>{' '}
                  or email{' '}
                  <a href="mailto:seashorecedar@usa.com" className="text-primary font-medium hover:opacity-75 transition-opacity underline underline-offset-2">
                    seashorecedar@usa.com
                  </a>
                </p>
              </motion.div>
            </motion.div>

            {/* ── Form ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded border border-border p-8 md:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center py-10 gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle size={28} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl text-foreground" style={{ letterSpacing: '-0.01em' }}>Inquiry Sent!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                      Thanks for reaching out. We'll review your request and get back to you with a quote within 1\u20132 business days.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-sm font-semibold text-primary hover:opacity-75 transition-opacity underline underline-offset-2"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div>
                      <h2 className="font-heading text-2xl text-foreground mb-1" style={{ letterSpacing: '-0.01em' }}>Request a Custom Quote</h2>
                      <p className="text-sm text-muted-foreground">Fill in as much detail as you can — it helps us give you an accurate quote faster.</p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Name" required>
                        <input id="name" name="name" type="text" required autoComplete="name"
                          value={form.name} onChange={handleChange} placeholder="Your name" />
                      </Field>
                      <Field label="Email" required>
                        <input id="email" name="email" type="email" required autoComplete="email"
                          value={form.email} onChange={handleChange} placeholder="your@email.com" />
                      </Field>
                    </div>

                    {/* Phone + Product Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Phone" hint="optional">
                        <input id="phone" name="phone" type="tel" autoComplete="tel"
                          value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                      </Field>
                      <Field label="Product Type" required>
                        <div className="relative">
                          <select id="productType" name="productType" required
                            value={form.productType} onChange={handleChange}
                            className="appearance-none w-full">
                            <option value="">Select a product...</option>
                            <option value="Cedar Planter Box">Cedar Planter Box</option>
                            <option value="Cedar Cutout — Town Letters">Cedar Cutout — Town Letters</option>
                            <option value="Cedar Cutout — Nautical Motif">Cedar Cutout — Nautical Motif</option>
                            <option value="Cedar Cutout — Combo">Cedar Cutout — Combo</option>
                            <option value="Cement Beach Ball">Cement Beach Ball</option>
                            <option value="Multiple Items">Multiple Items</option>
                            <option value="Something Else">Something Else</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </Field>
                    </div>

                    {/* Quantity + Dimensions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Quantity">
                        <input id="quantity" name="quantity" type="number" min="1"
                          value={form.quantity} onChange={handleChange} placeholder="1" />
                      </Field>
                      <Field label="Dimensions / Size" hint="e.g. 16x48x16 inches">
                        <input id="dimensions" name="dimensions" type="text"
                          value={form.dimensions} onChange={handleChange} placeholder="e.g. 16x48x16 inches" />
                      </Field>
                    </div>

                    {/* Finish */}
                    <Field label="Preferred Finish">
                      <div className="relative">
                        <select id="finish" name="finish" value={form.finish} onChange={handleChange} className="appearance-none w-full">
                          <option value="">Not sure / open to suggestions</option>
                          <option value="Raw / Unfinished">Raw / Unfinished</option>
                          <option value="BLO (Boiled Linseed Oil)">BLO (Boiled Linseed Oil)</option>
                          <option value="Food-Safe Natural Oil / Tung Oil">Food-Safe Natural Oil / Tung Oil</option>
                          <option value="Exterior Stain — Natural Cedar">Exterior Stain — Natural Cedar</option>
                          <option value="Exterior Stain — Driftwood Gray">Exterior Stain — Driftwood Gray</option>
                          <option value="Exterior Stain — Weathered Brown">Exterior Stain — Weathered Brown</option>
                          <option value="Exterior Stain — Bleached / Whitewashed">Exterior Stain — Bleached / Whitewashed</option>
                          <option value="WaterSeal">WaterSeal</option>
                          <option value="Painted">Painted</option>
                          <option value="Epoxy Topcoat">Epoxy Topcoat</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </Field>

                    {/* Engraving */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Engraving / Personalization">
                        <div className="relative">
                          <select id="engraving" name="engraving" value={form.engraving} onChange={handleChange} className="appearance-none w-full">
                            <option value="">None needed</option>
                            <option value="Town / City Name">Town / City Name</option>
                            <option value="Family Name">Family Name</option>
                            <option value="House Number">House Number</option>
                            <option value="Custom Text">Custom Text</option>
                            <option value="Logo or Design">Logo or Design</option>
                            <option value="Not sure yet">Not sure yet</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </Field>
                      <Field label="Engraving Text" hint="if applicable">
                        <input id="engravingText" name="engravingText" type="text"
                          value={form.engravingText} onChange={handleChange} placeholder="e.g. OCEAN CITY or 42" />
                      </Field>
                    </div>

                    {/* Timeline + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Timeline / Needed By">
                        <div className="relative">
                          <select id="timeline" name="timeline" value={form.timeline} onChange={handleChange} className="appearance-none w-full">
                            <option value="">No rush / flexible</option>
                            <option value="ASAP (rush order)">ASAP (rush order)</option>
                            <option value="Within 2 weeks">Within 2 weeks</option>
                            <option value="Within a month">Within a month</option>
                            <option value="1-3 months">1-3 months</option>
                            <option value="Just exploring">Just exploring</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </Field>
                      <Field label="Budget Range" hint="optional">
                        <div className="relative">
                          <select id="budget" name="budget" value={form.budget} onChange={handleChange} className="appearance-none w-full">
                            <option value="">Prefer not to say</option>
                            <option value="Under $50">Under $50</option>
                            <option value="$50-$100">$50-$100</option>
                            <option value="$100-$200">$100-$200</option>
                            <option value="$200-$500">$200-$500</option>
                            <option value="$500+">$500+</option>
                          </select>
                          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                        </div>
                      </Field>
                    </div>

                    {/* Additional Details */}
                    <Field label="Additional Details" hint="the more the better">
                      <textarea id="details" name="details" rows={5}
                        value={form.details} onChange={handleChange}
                        placeholder="Describe your project — inspiration, intended use, color preferences, reference photos you can share later, anything that helps us understand what you're envisioning..."
                        className="resize-none leading-relaxed" />
                    </Field>

                    {/* Policy acknowledgment */}
                    <div className={`flex items-start gap-3 p-4 rounded border ${policyAgreed ? 'border-primary/30 bg-primary/5' : 'border-border bg-muted/40'}`}>
                      <input
                        id="policyAgreed"
                        type="checkbox"
                        checked={policyAgreed}
                        onChange={e => setPolicyAgreed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 shrink-0 accent-primary cursor-pointer"
                      />
                      <label htmlFor="policyAgreed" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                        I have read and agree to the{' '}
                        <strong className="text-foreground font-semibold">custom order policy</strong>{' '}
                        above. I understand that custom orders (names, words, non-catalog designs, or non-standard sizes) require{' '}
                        <strong className="text-foreground font-semibold">full payment upfront</strong>{' '}
                        and that{' '}
                        <strong className="text-foreground font-semibold">all custom sales are final</strong>.
                      </label>
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <div className="flex items-start gap-3 px-4 py-3 rounded border border-destructive/30 bg-destructive/5">
                        <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting' || !policyAgreed}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Custom Order Inquiry
                        </>
                      )}
                    </button>

                    {!policyAgreed && (
                      <p className="text-xs text-muted-foreground text-center">
                        Please read and agree to the order policy above to submit.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Field Helper ─────────────────────────────────────────────────────────────

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
        {hint && <span className="font-normal normal-case text-muted-foreground/50 ml-1">({hint})</span>}
      </label>
      <div className="[&_input]:w-full [&_input]:px-4 [&_input]:py-3 [&_input]:rounded [&_input]:border [&_input]:border-border [&_input]:bg-background [&_input]:text-sm [&_input]:text-foreground [&_input]:placeholder:text-muted-foreground/60 [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-primary/30 [&_input]:focus:border-primary [&_input]:transition-colors [&_select]:w-full [&_select]:px-4 [&_select]:py-3 [&_select]:rounded [&_select]:border [&_select]:border-border [&_select]:bg-background [&_select]:text-sm [&_select]:text-foreground [&_select]:focus:outline-none [&_select]:focus:ring-2 [&_select]:focus:ring-primary/30 [&_select]:focus:border-primary [&_select]:transition-colors [&_textarea]:w-full [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:rounded [&_textarea]:border [&_textarea]:border-border [&_textarea]:bg-background [&_textarea]:text-sm [&_textarea]:text-foreground [&_textarea]:placeholder:text-muted-foreground/60 [&_textarea]:focus:outline-none [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-primary/30 [&_textarea]:focus:border-primary [&_textarea]:transition-colors">
        {children}
      </div>
    </div>
  );
}
