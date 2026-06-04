import { useState } from 'react';
import { useReCaptcha, ReCaptchaWidget } from '../components/ReCaptcha';
import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Mail, Phone, Instagram, Facebook, Send, CheckCircle, AlertCircle } from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

// ─── Form State ───────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const emptyForm: FormData = { name: '', email: '', phone: '', subject: '', message: '' };

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { captchaVerified, containerRef, resetCaptcha } = useReCaptcha();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

  return (
    <>
      <Helmet>
        <title>Contact — Seashore Cedar</title>
        <meta name="description" content="Get in touch with Seashore Cedar. Questions about orders, custom work, or anything else — we'd love to hear from you." />
        <meta property="og:title" content="Contact — Seashore Cedar" />
        <meta property="og:description" content="Get in touch with Seashore Cedar. Questions, custom orders, or just to say hello." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/pic for site Melissa and Me.jpg"
            alt="Seashore Cedar workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/55 to-stone-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>
              We'd Love to Hear From You
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Get in Touch
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-base md:text-lg max-w-xl mx-auto">
              Questions about an order, custom work, or just want to say hello — send us a message and we'll get back to you promptly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* ── Contact info sidebar ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-8"
            >
              <motion.div variants={fadeUp}>
                <h2 className="font-heading text-3xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>
                  Seashore Cedar
                </h2>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Handcrafted cedar goods made on the Jersey Shore. We take pride in every piece and love working with customers on custom orders.
                </p>
              </motion.div>

              {/* Contact details */}
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <a
                  href="mailto:seashorecedar@usa.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail size={17} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Email</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">seashorecedar@usa.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary/10">
                    <Phone size={17} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">Response Time</p>
                    <p className="text-sm font-medium text-foreground">Usually within 1–2 business days</p>
                  </div>
                </div>
              </motion.div>

              {/* Social */}
              <motion.div variants={fadeUp}>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Follow Along</p>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Seashore Cedar on Instagram"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <Instagram size={17} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Seashore Cedar on Facebook"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  >
                    <Facebook size={17} />
                  </a>
                </div>
              </motion.div>

              {/* What to include callout */}
              <motion.div variants={fadeUp} className="rounded-sm border border-border p-5" style={{ background: 'hsl(25, 30%, 94%)' }}>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">Custom Order Inquiries</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For custom work, it helps to include the product type, approximate size, desired finish, and any engraving or personalization details. The more info, the faster we can get you a quote.
                </p>
              </motion.div>
            </motion.div>

            {/* ── Contact form ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-card rounded-sm border border-border p-8 md:p-10">
                {status === 'success' ? (
                  <div className="flex flex-col items-center text-center py-8 gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle size={28} className="text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl text-foreground" style={{ letterSpacing: '-0.01em' }}>Message Sent!</h3>
                    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                      Thanks for reaching out. We'll get back to you within 1–2 business days.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-sm font-semibold text-primary hover:opacity-75 transition-opacity underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    <div>
                      <h2 className="font-heading text-2xl text-foreground mb-1" style={{ letterSpacing: '-0.01em' }}>Send a Message</h2>
                      <p className="text-sm text-muted-foreground">Fill out the form below and we'll be in touch.</p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Name <span className="text-primary">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Email <span className="text-primary">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Phone <span className="text-muted-foreground/50 font-normal normal-case">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(555) 000-0000"
                          className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        >
                          <option value="">Select a topic…</option>
                          <option value="Planter Box Order">Planter Box Order</option>
                          <option value="Cedar Cutout Order">Cedar Cutout Order</option>
                          <option value="Cement Beach Ball Order">Cement Beach Ball Order</option>
                          <option value="Custom Order Inquiry">Custom Order Inquiry</option>
                          <option value="Order Status">Order Status</option>
                          <option value="General Question">General Question</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us what you're looking for, any custom details, questions about sizing or finishes…"
                        className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none leading-relaxed"
                      />
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                      <div className="flex items-start gap-3 px-4 py-3 rounded border border-destructive/30 bg-destructive/5">
                        <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive">{errorMsg}</p>
                      </div>
                    )}

                    {/* reCAPTCHA */}
              <ReCaptchaWidget containerRef={containerRef} />

              {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'submitting' || !captchaVerified}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
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
