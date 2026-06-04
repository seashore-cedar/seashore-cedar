import { useState } from 'react';
import { useReCaptcha } from '../components/ReCaptcha';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowLeft, Send, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  notes: string;
}

const emptyForm: FormData = {
  name: '',
  email: '',
  phone: '',
  quantity: '1',
  notes: '',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { captchaVerified, ReCaptchaWidget, resetCaptcha } = useReCaptcha();

  // Pre-filled from the product configurator
  const product = searchParams.get('product') ?? '';
  const dimensions = searchParams.get('dimensions') ?? '';
  const finish = searchParams.get('finish') ?? '';

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const subject = `Standard Order — ${product || 'Cedar Planter'} from ${form.name}`;
    const message = [
      `=== ORDER DETAILS ===`,
      `Product: ${product || 'Not specified'}`,
      dimensions ? `Dimensions: ${dimensions}` : '',
      finish ? `Finish: ${finish}` : '',
      `Quantity: ${form.quantity}`,
      '',
      `=== CUSTOMER INFO ===`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      '',
      form.notes ? `Notes:\n${form.notes}` : '',
    ]
      .filter(line => line !== undefined && line !== '')
      .join('\n');

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
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? 'Something went wrong. Please try again.');
      }
      setStatus('success');
      resetCaptcha();
      setForm(emptyForm);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  // ── Success state ──
  if (status === 'success') {
    return (
      <>
        <Helmet>
          <title>Order Received — Seashore Cedar</title>
        </Helmet>
        <section className="py-24 md:py-36" style={{ background: 'hsl(var(--background))' }}>
          <div className="container mx-auto px-6 max-w-lg text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle size={32} className="text-primary" />
              </div>
              <div>
                <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                  Order Received!
                </h1>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  Thanks for your order. We'll reach out within 1–2 business days to confirm
                  details and arrange pickup.
                </p>
                <p className="text-muted-foreground text-sm">
                  Questions in the meantime?{' '}
                  <Link to="/contact" className="text-primary underline hover:no-underline">
                    Send us a message.
                  </Link>
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity mt-2"
              >
                <ArrowLeft size={15} /> Back to Products
              </Link>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Place Your Order — Seashore Cedar</title>
        <meta
          name="description"
          content="Place your order for handmade cedar planter boxes from Seashore Cedar in Wildwood, NJ. Free local pickup."
        />
      </Helmet>

      {/* ── Page Header ── */}
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
              Place Your Order
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base">
              Free local pickup · Wildwood, NJ · Allow 4–5 business days
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6 max-w-2xl">

          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft size={14} /> Back to Products
          </Link>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >

            {/* ── Order summary card ── */}
            {product && (
              <motion.div
                variants={fadeUp}
                className="rounded border border-primary/30 p-5"
                style={{ background: 'hsl(var(--primary) / 0.06)' }}
              >
                <div className="flex items-start gap-3">
                  <ShoppingBag size={18} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                      Your Selection
                    </p>
                    <p className="font-heading text-xl text-foreground">{product}</p>
                    {dimensions && (
                      <p className="font-mono text-xs text-primary mt-0.5">{dimensions}</p>
                    )}
                    {finish && (
                      <p className="text-sm text-muted-foreground mt-1">Finish: {finish}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 pl-7">
                  Need to change your selection?{' '}
                  <Link to="/products" className="text-primary underline hover:no-underline">
                    Go back to products.
                  </Link>
                </p>
              </motion.div>
            )}

            {/* ── Form ── */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Harry & Melissa"
                    className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Phone + Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                    Phone <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(609) 555-0100"
                    className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="quantity" className="text-sm font-semibold text-foreground">
                    Quantity <span className="text-primary">*</span>
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    required
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={String(n)}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="notes" className="text-sm font-semibold text-foreground">
                  Notes <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special requests, delivery notes, or questions..."
                  className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Pickup note */}
              <div className="rounded border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Free local pickup</strong> — We'll reach out within 1–2 business days to confirm your order and schedule pickup from our Wildwood, NJ workshop. Please allow 4–5 business days for your order to be ready.
              </div>

              {/* Error message */}
              {status === 'error' && (
                <div className="flex items-start gap-3 rounded border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {errorMsg || 'Something went wrong. Please try again.'}
                </div>
              )}

              {/* reCAPTCHA */}
              <ReCaptchaWidget />

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting' || !captchaVerified}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} /> Place Order
                  </>
                )}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                Not a standard order?{' '}
                <Link to="/custom-orders" className="text-primary underline hover:no-underline">
                  Submit a custom order request instead.
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
