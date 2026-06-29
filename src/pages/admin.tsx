import { useState, useRef } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Lock, LogOut, Save, Download, ChevronDown, ChevronUp, Package, Scissors, Circle, Image, Type, Plus, Trash2, AlertCircle, CheckCircle, Upload, Tag, Sparkles, LayoutGrid } from 'lucide-react';
import { galleryItems as initialGallery, type GalleryItem } from '../data/galleryItems';

// ─── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialPlanters = [
  { id: 'box-a', name: 'Box A', price: 40, dimensions: '16"W × 16"L × 16"H', image: '/assets/Box A w dimensions.png', description: 'A compact square planter with a classic profile. Every surface is hand-sanded for a smooth, splinter-free finish — perfect for a single statement plant on a porch step, deck corner, or entryway.', finishUpcharges: { blo: 10, tung: 10, stain: 10, waterseal: 10 }, visible: true },
  { id: 'box-c', name: 'Box C', price: 60, dimensions: '16"W × 16"L × 25"H', image: '/assets/Box C.png', description: 'Same footprint as Box A but taller — hand-sanded smooth on every face. Great for trailing plants, tall grasses, or adding visual height to a garden arrangement.', finishUpcharges: { blo: 10, tung: 10, stain: 10, waterseal: 10 }, visible: true },
  { id: 'box-abc', name: 'Box ABC Set', price: 110, dimensions: 'Box A + Box C + Box B (10"W × 10"L × 13"H)', image: '/assets/Boxes ABC w dimensions.png', description: 'Three graduated planters sold as a set. Arrange them on stairs, a deck, or an entryway for a layered, designer look.', finishUpcharges: { blo: 10, tung: 15, stain: 10, waterseal: 15 }, visible: true },
  { id: 'box-g', name: 'Box G', price: 130, dimensions: '16"W × 48"L × 16"H', image: '/assets/Box G.png', description: 'A long, low planter built for railings, walkways, and wide deck edges. The extended length makes it ideal for herb gardens, mixed plantings, or a bold horizontal statement.', finishUpcharges: { blo: 10, tung: 15, stain: 10, waterseal: 10 }, visible: true },
  { id: 'box-h', name: 'Box H', price: 160, dimensions: '16"W × 48"L × 32"H', image: '/assets/Box H.png', description: 'Our tallest long-format planter. Built for privacy screens, tall ornamental grasses, or dramatic entrances.', finishUpcharges: { blo: 15, tung: 15, stain: 10, waterseal: 15 }, visible: true },
  { id: 'box-m', name: 'Box M', price: 50, dimensions: '16"W × 12"L × 13"H', image: '/assets/Box M w dimensions.png', description: 'A compact rectangular planter with a low profile. Perfect for windowsills, tabletops, or tight deck spaces.', finishUpcharges: { blo: 10, tung: 10, stain: 10, waterseal: 10 }, visible: true },
  { id: 'box-q', name: 'Box Q', price: 20, dimensions: '9"W × 9"L × 8"H', image: '/assets/Box Q.png', description: 'Our smallest planter — a perfect tabletop accent or gift. Hand-sanded to the same standard as every other box we make.', finishUpcharges: { blo: 10, tung: 10, stain: 10, waterseal: 10 }, visible: true },
];

const initialCutouts = [
  { id: 'single-letter', name: 'Single Letter', smallPrice: 15, mediumPrice: 22, largePrice: 30, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'A single cedar letter, hand-cut and planed smooth. Perfect as a standalone accent or the start of a custom display.', visible: true },
  { id: 'two-letter', name: '2-Letter Set', smallPrice: 24, mediumPrice: 35, largePrice: 48, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'Two cedar letters cut as a matched set — ideal for town abbreviations, initials, or a coastal home display.', visible: true },
  { id: 'three-letter', name: '3-Letter Set', smallPrice: 30, mediumPrice: 44, largePrice: 60, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'Three cedar letters as a matched set. Our SIC set is a local favorite — a perfect coastal keepsake or housewarming gift.', visible: true },
  { id: 'nautical-motif', name: 'Nautical & Beach Motif', smallPrice: 15, mediumPrice: 22, largePrice: 30, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'Hand-cut cedar shapes inspired by the coast. Anchors, crabs, lighthouses, waves — each one planed smooth and ready to display or mount.', visible: true },
  { id: 'letter-motif-combo', name: 'Letter + Motif Combo', smallPrice: 25, mediumPrice: 38, largePrice: 52, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'A cedar letter paired with a nautical or beach motif — a great combination for a personalized coastal display or gift set.', visible: true },
  { id: 'custom-name', name: 'Custom Name / Word', smallPrice: 0, mediumPrice: 40, largePrice: 55, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'A full name, word, or short phrase engraved into cedar. Perfect for house signs, welcome boards, or personalized gifts.', visible: true },
];

const initialBalls = [
  { id: 'unpainted', name: 'Solid Cement Ball — Unpainted', price: 45 as number | null, image: '/assets/BB-16Inch.png', description: 'A 16" diameter solid cement ball in its natural finish. Clean, minimal, and surprisingly striking as a garden accent or coastal yard feature.', badge: '', details: ['16" diameter', 'Natural cement finish', 'Solid cast construction', 'Weather-resistant'], visible: true },
  { id: 'classic-stripe', name: 'Classic 6-Stripe Beach Ball', price: 85 as number | null, image: '/assets/BB-16Inch.png', description: 'The iconic beach ball pattern, rendered in durable exterior paint on a solid 16" cement ball. Finished with a protective clear coat for lasting color and weather resistance.', badge: 'Most Popular', details: ['16" diameter', 'Classic 6-stripe pattern', 'Exterior-grade paint', 'Protective clear coat included'], visible: true },
  { id: 'custom-color', name: 'Custom Color Scheme', price: null as number | null, image: '/assets/BB-16Inch.png', description: "Want a specific color combination? We love a challenge — reach out through our custom order form and we'll let you know if we can accommodate and share pricing with you personally.", badge: '', details: ['16" diameter', 'Any color combination', 'Exterior-grade paint', 'Protective clear coat included'], visible: true },
];

const initialYardSale: Array<{ id: string; name: string; price: number; image: string; description: string; visible: boolean }> = [
  {
    id: 'item-1782656159664',
    name: 'Stand-Tall Nautical Planter — One of a Kind Folk Art Original',
    price: 85,
    image: '/assets/tall boy 28in front.jpg',
    description: 'At nearly 2½ feet tall with a generous ~14in square top, this statement planter commands attention the moment it hits your porch, deck, or garden. Three hand-cut coastal motifs tell the story — a seahorse on the front greets every visitor, a starfish watches the left, and a scallop shell faces right — each one stained in rich nautical blue and built right into the cedar panels.\n\nThe trim carries that same deep blue, while the interior panels are finished in a soft nautical off-white that makes the whole piece pop. And here\'s the practical magic: with 12in of usable planter depth, you\'re not filling a 28in box — your soil sits right where it needs to be, and your plants sit up at the perfect show height.\n\nBuilt from naturally rot-resistant western red cedar with exterior-grade stains throughout, this planter is already ready to go — no finishing needed, no waiting. Just drop it in place, add your favorite plants, and let it do the talking.\n\nThis one won\'t be reproduced. It\'s a true folk art original, finished and ready for its forever home. See more angles in our gallery: https://seashorecedar.com/gallery',
    visible: true,
  },
  {
    id: 'item-1782656220054',
    name: 'Anglesea, North Wildwood, Wildwood & the Crest - Cutting Boards',
    price: 45,
    image: '/assets/Seaturtle_on_cutting_board.png',
    description: 'One-of-a-Kind Engraved Bamboo Cutting Boards — Sold as a Pair for $45 or individually at $30 & $20 (see image).\n\nTwo boards, two coastal stories — and once they\'re gone, they\'re gone for good. The larger board features a custom-engraved sea turtle alongside North Wildwood & Anglesea, while its companion celebrates Wildwood & The Crest with its own matching turtle design. Each one is laser-engraved into Vietnamese bamboo and finished with food-safe cutting board wax — ready to display, ready to use, and built to last.\n\nWhether they hang on a kitchen wall, anchor a charcuterie spread, or become the centerpiece of a beach house kitchen, these boards carry a little piece of the Five Mile Beach wherever they go. Truly one of a kind. Not reproducible. Yours if you move fast. See back side in our gallery: https://seashorecedar.com/gallery',
    visible: true,
  },
  {
    id: 'item-1782656283179',
    name: 'Limited Edition Patriotic Cedar Planter — 16in × 16in',
    price: 45,
    image: '/assets/GBA 2.png',
    description: 'America turns 250 this year, and we think that deserves more than a bumper sticker.\n\nThis 16in × 16in western red cedar planter is engraved with a bold American Flag and God Bless America — a one-of-a-kind piece made right here on the Jersey Shore to mark a once-in-a-lifetime milestone. Naturally rot-resistant cedar means it\'ll still be on your porch long after the fireworks fade.\n\nPlant it up in red, white, and blue for the Fourth, or let it stand on its own as a lasting tribute to the 250th Anniversary. Either way, it\'s a conversation starter from July 4th straight through to next summer. Treated with natural Tung Oil.\n\nLimited availability — made to celebrate, not to mass produce.',
    visible: true,
  },
  {
    id: 'item-1782656331345',
    name: 'Patriotic Cedar Planter — 16in × 16in | Artisan Second',
    price: 40,
    image: '/assets/GBA 1.png',
    description: 'Same bold American Flag and God Bless America laser engraving. Same naturally rot-resistant western red cedar. Same Jersey Shore craftsmanship — with one small story to tell.\n\nDuring engraving, the cedar did what cedar sometimes does — showed its character. A hairline grain split in the word America has been hand-stabilized with wood glue and sealed with tung oil to stop it in its tracks. You\'d have to know to look for it.\n\nWe could have quietly tossed it. Instead we\'re offering it at a discount because the piece is genuinely beautiful and a tiny natural quirk in the wood shouldn\'t keep it from finding a home.\n\nThis is a one-time deal on a one-of-a-kind piece. If you love the look but love a bargain more, this one\'s for you.',
    visible: true,
  },
];

const initialEpoxy: Array<{ id: string; name: string; price: number; image: string; description: string; visible: boolean }> = [];

// Finish labels for display
const finishLabels: Record<string, string> = { blo: 'Boiled Linseed Oil', tung: 'Tung Oil', stain: 'Exterior Stain', waterseal: "Thompson's WaterSeal" };

type Tab = 'planters' | 'cutouts' | 'balls' | 'yardsale' | 'epoxy' | 'gallery' | 'images';

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const correct = ADMIN_PASSWORD || 'seashore2024';
    if (pw === correct) { onLogin(); }
    else { setError(true); setPw(''); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'hsl(var(--background))' }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock size={24} className="text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-2xl text-foreground" style={{ letterSpacing: '-0.02em' }}>Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">Seashore Cedar</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }}
            placeholder="Password" autoFocus
            className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors" />
          {error && <p className="text-xs text-destructive flex items-center gap-1.5"><AlertCircle size={12} /> Incorrect password.</p>}
          <button type="submit" className="px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">Sign In</button>
        </form>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded border border-border overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 bg-muted/40 hover:bg-muted/60 transition-colors text-left">
        <span className="font-semibold text-sm text-foreground">{title}</span>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-3 py-2 rounded border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function downloadImage(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement('a');
  a.href = url; a.download = file.name; a.click();
  URL.revokeObjectURL(url);
}

function esc(str: string) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// ─── Generic Product Tab (for Yard Sale & Epoxy) ──────────────────────────────

type SimpleProduct = { id: string; name: string; price: number; image: string; description: string; visible: boolean };

function SimpleProductTab({ products, setProducts, emptyLabel }: {
  products: SimpleProduct[];
  setProducts: (p: SimpleProduct[]) => void;
  emptyLabel: string;
}) {
  function update(id: string, field: keyof SimpleProduct, value: string | number | boolean) {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: value } : p));
  }
  function add() {
    setProducts([...products, { id: `item-${Date.now()}`, name: 'New Item', price: 0, image: '', description: '', visible: true }]);
  }
  function remove(id: string) {
    if (confirm('Remove this item?')) setProducts(products.filter(p => p.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      {products.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm border border-dashed border-border rounded">
          No items yet — click below to add your first {emptyLabel} item.
        </div>
      )}
      {products.map(p => (
        <Section key={p.id} title={`${p.name} — $${p.price}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Name"><input className={inputClass} value={p.name} onChange={e => update(p.id, 'name', e.target.value)} /></Field>
            <Field label="Price ($)"><input className={inputClass} type="number" value={p.price} onChange={e => update(p.id, 'price', Number(e.target.value))} /></Field>
            <Field label="Image Path"><input className={inputClass} value={p.image} onChange={e => update(p.id, 'image', e.target.value)} placeholder="/assets/your-image.png" /></Field>
          </div>
          <Field label="Description">
            <textarea className={inputClass + ' resize-none'} rows={4} value={p.description} onChange={e => update(p.id, 'description', e.target.value)} />
          </Field>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={p.visible} onChange={e => update(p.id, 'visible', e.target.checked)} className="w-4 h-4 accent-primary" />
              Show on site
            </label>
            <button onClick={() => remove(p.id)} className="text-xs text-destructive flex items-center gap-1 hover:opacity-75 transition-opacity">
              <Trash2 size={12} /> Remove
            </button>
          </div>
        </Section>
      ))}
      <button onClick={add} className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
        <Plus size={14} /> Add Item
      </button>
    </div>
  );
}

// ─── Planters Tab ─────────────────────────────────────────────────────────────

function PlantersTab({ planters, setPlanters }: { planters: typeof initialPlanters; setPlanters: (p: typeof initialPlanters) => void }) {
  function update(id: string, field: string, value: string | number | boolean) {
    setPlanters(planters.map(p => p.id === id ? { ...p, [field]: value } : p) as typeof initialPlanters);
  }
  function add() {
    setPlanters([...planters, { id: `box-${Date.now()}`, name: 'New Box', price: 0, dimensions: '', image: '', description: '', finishUpcharges: { blo: 10, tung: 10, stain: 10, waterseal: 10 }, visible: true }] as typeof initialPlanters);
  }
  function remove(id: string) {
    if (confirm('Remove this product?')) setPlanters(planters.filter(p => p.id !== id) as typeof initialPlanters);
  }

  return (
    <div className="flex flex-col gap-4">
      {planters.map(p => (
        <Section key={p.id} title={`${p.name} — $${p.price}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Name"><input className={inputClass} value={p.name} onChange={e => update(p.id, 'name', e.target.value)} /></Field>
            <Field label="Price ($)"><input className={inputClass} type="number" value={p.price} onChange={e => update(p.id, 'price', Number(e.target.value))} /></Field>
            <Field label="Dimensions"><input className={inputClass} value={p.dimensions} onChange={e => update(p.id, 'dimensions', e.target.value)} /></Field>
            <Field label="Image Path"><input className={inputClass} value={p.image} onChange={e => update(p.id, 'image', e.target.value)} placeholder="/assets/your-image.png" /></Field>
          </div>
          <Field label="Description">
            <textarea className={inputClass + ' resize-none'} rows={3} value={p.description} onChange={e => update(p.id, 'description', e.target.value)} />
          </Field>
          <div className="mt-4 mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Finish Upcharges (+$)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(finishLabels).map(([key, label]) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">{label}</label>
                  <input className={inputClass} type="number"
                    value={(p as any).finishUpcharges?.[key] ?? 0}
                    onChange={e => {
                      const updated = { ...((p as any).finishUpcharges || {}), [key]: Number(e.target.value) };
                      update(p.id, 'finishUpcharges' as any, updated);
                    }} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={p.visible} onChange={e => update(p.id, 'visible', e.target.checked)} className="w-4 h-4 accent-primary" />
              Show on site
            </label>
            <button onClick={() => remove(p.id)} className="text-xs text-destructive flex items-center gap-1 hover:opacity-75 transition-opacity">
              <Trash2 size={12} /> Remove
            </button>
          </div>
        </Section>
      ))}
      <button onClick={add} className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
        <Plus size={14} /> Add Product
      </button>
    </div>
  );
}

// ─── Cutouts Tab ──────────────────────────────────────────────────────────────

function CutoutsTab({ cutouts, setCutouts }: { cutouts: typeof initialCutouts; setCutouts: (c: typeof initialCutouts) => void }) {
  function update(id: string, field: string, value: string | number | boolean) {
    setCutouts(cutouts.map(c => c.id === id ? { ...c, [field]: value } : c) as typeof initialCutouts);
  }
  return (
    <div className="flex flex-col gap-4">
      {cutouts.map(c => (
        <Section key={c.id} title={c.name}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Name"><input className={inputClass} value={c.name} onChange={e => update(c.id, 'name', e.target.value)} /></Field>
            <Field label="Small Price ($)"><input className={inputClass} type="number" value={c.smallPrice} onChange={e => update(c.id, 'smallPrice', Number(e.target.value))} /></Field>
            <Field label="Medium Price ($)"><input className={inputClass} type="number" value={c.mediumPrice} onChange={e => update(c.id, 'mediumPrice', Number(e.target.value))} /></Field>
            <Field label="Large Price ($)"><input className={inputClass} type="number" value={c.largePrice} onChange={e => update(c.id, 'largePrice', Number(e.target.value))} /></Field>
            <Field label="Image Path"><input className={inputClass} value={(c as any).image || ''} onChange={e => update(c.id, 'image', e.target.value)} placeholder="/assets/your-image.png" /></Field>
          </div>
          <Field label="Description">
            <textarea className={inputClass + ' resize-none'} rows={2} value={c.description} onChange={e => update(c.id, 'description', e.target.value)} />
          </Field>
          <div className="mt-4 mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Finish Upcharges — Small & Medium (+$) <span className="font-normal normal-case">(Large size includes finish in base price)</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
              {Object.entries(finishLabels).map(([key, label]) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">{label}</label>
                  <input className={inputClass} type="number"
                    value={(c as any).smallFinish?.[key] ?? 0}
                    onChange={e => {
                      const upd = { ...((c as any).smallFinish || {}), [key]: Number(e.target.value) };
                      update(c.id, 'smallFinish' as any, upd);
                      update(c.id, 'mediumFinish' as any, upd);
                    }} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={c.visible} onChange={e => update(c.id, 'visible', e.target.checked)} className="w-4 h-4 accent-primary" />
              Show on site
            </label>
            <button onClick={() => { if (confirm('Remove this cutout?')) setCutouts(cutouts.filter(x => x.id !== c.id) as typeof initialCutouts); }}
              className="text-xs text-destructive flex items-center gap-1 hover:opacity-75 transition-opacity">
              <Trash2 size={12} /> Remove
            </button>
          </div>
        </Section>
      ))}
      <button onClick={() => setCutouts([...cutouts, { id: `cutout-${Date.now()}`, name: 'New Cutout', smallPrice: 0, mediumPrice: 0, largePrice: 0, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '', description: '', visible: true }] as typeof initialCutouts)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
        <Plus size={14} /> Add Cutout
      </button>
    </div>
  );
}

// ─── Balls Tab ────────────────────────────────────────────────────────────────

function BallsTab({ balls, setBalls }: { balls: typeof initialBalls; setBalls: (b: typeof initialBalls) => void }) {
  function update(id: string, field: string, value: string | number | boolean | null | string[]) {
    setBalls(balls.map(b => b.id === id ? { ...b, [field]: value } : b) as typeof initialBalls);
  }
  return (
    <div className="flex flex-col gap-4">
      {balls.map(b => (
        <Section key={b.id} title={b.name}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Name"><input className={inputClass} value={b.name} onChange={e => update(b.id, 'name', e.target.value)} /></Field>
            <Field label="Price ($) — 0 = Contact us">
              <input className={inputClass} type="number" value={b.price ?? 0}
                onChange={e => update(b.id, 'price', Number(e.target.value) === 0 ? null : Number(e.target.value))} />
            </Field>
            <Field label="Badge (e.g. Most Popular — leave blank for none)">
              <input className={inputClass} value={(b as any).badge || ''} onChange={e => update(b.id, 'badge', e.target.value)} />
            </Field>
            <Field label="Image Path"><input className={inputClass} value={(b as any).image || ''} onChange={e => update(b.id, 'image', e.target.value)} placeholder="/assets/your-image.png" /></Field>
          </div>
          <Field label="Description">
            <textarea className={inputClass + ' resize-none'} rows={3} value={(b as any).description || ''} onChange={e => update(b.id, 'description', e.target.value)} />
          </Field>
          <div className="mt-4 mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Details (one per line)</p>
            <textarea className={inputClass + ' resize-none'} rows={4}
              value={((b as any).details || []).join('\n')}
              onChange={e => update(b.id, 'details', e.target.value.split('\n').filter(Boolean))} />
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={b.visible} onChange={e => update(b.id, 'visible', e.target.checked)} className="w-4 h-4 accent-primary" />
              Show on site
            </label>
            <button onClick={() => { if (confirm('Remove this ball?')) setBalls(balls.filter(x => x.id !== b.id) as typeof initialBalls); }}
              className="text-xs text-destructive flex items-center gap-1 hover:opacity-75 transition-opacity">
              <Trash2 size={12} /> Remove
            </button>
          </div>
        </Section>
      ))}
      <button onClick={() => setBalls([...balls, { id: `ball-${Date.now()}`, name: 'New Ball', price: 0 as number | null, image: '/assets/BB-16Inch.png', description: '', badge: '', details: ['16" diameter', 'Weather-resistant'], visible: true }] as typeof initialBalls)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
        <Plus size={14} /> Add Ball
      </button>
    </div>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────

function GalleryTab({ gallery, setGallery }: { gallery: GalleryItem[]; setGallery: (g: GalleryItem[]) => void }) {
  function update(id: string, field: keyof GalleryItem, value: string | boolean) {
    setGallery(gallery.map(g => g.id === id ? { ...g, [field]: value } : g));
  }
  function add() {
    setGallery([...gallery, { id: `gallery-${Date.now()}`, slot: '', alt: '', caption: '', category: 'Planter Boxes', visible: true }]);
  }
  function remove(id: string) {
    if (confirm('Remove this gallery item?')) setGallery(gallery.filter(g => g.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">Add, remove, or update captions for gallery photos. Upload images first using the Images tab, then paste the path here.</p>
      {gallery.map((g, i) => (
        <div key={g.id} className="rounded border border-border p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Photo {i + 1}</span>
            <button onClick={() => remove(g.id)} className="text-xs text-destructive flex items-center gap-1 hover:opacity-75 transition-opacity">
              <Trash2 size={12} /> Remove
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Image Path">
              <input className={inputClass} value={g.slot} onChange={e => update(g.id, 'slot', e.target.value)} placeholder="/assets/your-photo.png" />
            </Field>
            <Field label="Caption">
              <input className={inputClass} value={g.caption} onChange={e => update(g.id, 'caption', e.target.value)} placeholder="Description of the photo" />
            </Field>
            <Field label="Category">
              <select className={inputClass} value={g.category || 'Planter Boxes'} onChange={e => update(g.id, 'category' as any, e.target.value as any)}>
                <option value="Planter Boxes">Planter Boxes</option>
                <option value="Cedar Cutouts">Cedar Cutouts</option>
                <option value="Cement Beach Balls">Cement Beach Balls</option>
                <option value="Details">Details</option>
              </select>
            </Field>
          </div>
          {g.slot && (
            <img src={g.slot} alt={g.caption} className="h-24 w-auto object-cover rounded border border-border" onError={e => (e.currentTarget.style.display = 'none')} />
          )}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={g.visible !== false} onChange={e => update(g.id, 'visible', e.target.checked)} className="w-4 h-4 accent-primary" />
            Show in gallery
          </label>
        </div>
      ))}
      <button onClick={add} className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
        <Plus size={14} /> Add Photo
      </button>
    </div>
  );
}

// ─── Images Tab ───────────────────────────────────────────────────────────────

function ImagesTab() {
  const [files, setFiles] = useState<Array<{ file: File; preview: string; path: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(selected: FileList | null) {
    if (!selected) return;
    const newFiles = Array.from(selected).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      path: `/assets/${file.name}`,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }

  function remove(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded border-2 border-dashed border-border p-8 text-center">
        <Upload size={24} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-foreground font-semibold mb-1">Upload product images</p>
        <p className="text-xs text-muted-foreground mb-4">PNG or JPG · Recommended: 1200–1600px wide, under 500KB · Max 10MB · Best ratio for product cards: 4:3 (e.g. 1200×900px) · Files go in <code className="bg-muted px-1 rounded">public/assets/</code></p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={e => handleFiles(e.target.files)} />
        <button onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          <Upload size={14} /> Choose Images
        </button>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-foreground">Ready to download</h3>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded border border-border">
              <img src={f.preview} alt={f.file.name} className="w-16 h-16 object-cover rounded border border-border shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{f.file.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Use this path in the Image Path field:</p>
                <code className="text-xs bg-muted px-2 py-0.5 rounded text-primary mt-1 inline-block">{f.path}</code>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => downloadImage(f.file)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border border-border hover:bg-muted transition-colors">
                  <Download size={12} /> Download
                </button>
                <button onClick={() => remove(i)} className="text-destructive hover:opacity-75 transition-opacity">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          <div className="rounded border border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
            <strong className="text-foreground">Next steps:</strong> Download each image, then go to your GitHub repo → <code>public/assets/</code> → upload the files there. Then use the image path shown above in the product's Image Path field.
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── FULL-FILE CODE GENERATORS ────────────────────────────────────────────────
// Each function returns the COMPLETE source file ready to drop into src/pages/
// ═══════════════════════════════════════════════════════════════════════════════

function generateProductsFile(planters: typeof initialPlanters) {
  const arr = planters.filter(p => p.visible).map(p => `  {
    id: '${p.id}',
    price: ${p.price},
    name: '${esc(p.name)}',
    dimensions: '${esc(p.dimensions)}',
    sqft: 0,
    description: '${esc(p.description)}',
    bestFor: [],
    image: '${p.image}',
    imageAlt: '${esc(p.name)} cedar planter',
    finishUpcharges: { none: 0, ${Object.entries((p as any).finishUpcharges || {blo:10,tung:10,stain:10,waterseal:10}).map(([k,v]) => `${k}: ${v}`).join(', ')} },
  }`).join(',\n');

  return `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Check, ChevronDown, Leaf, Droplets, Sun, Shield } from 'lucide-react';

type FinishKey = 'none' | 'blo' | 'tung' | 'stain' | 'waterseal';

interface FinishColorOption { label: string; hint: string; }

interface Finish {
  key: FinishKey; name: string; shortName: string; tagline: string;
  description: string; badge?: string; icon: React.ReactNode;
  colorOptions?: FinishColorOption[];
}

interface Product {
  id: string; name: string; dimensions: string; sqft: number;
  description: string; bestFor: string[]; image: string; imageAlt: string;
  finishUpcharges: Record<FinishKey, number>;
}

const finishes: Finish[] = [
  { key: 'none', name: 'No Finish', shortName: 'None', tagline: 'Raw cedar, naturally beautiful', description: 'Western red cedar is naturally rot-resistant and weathers gracefully on its own. Choose this if you love the raw look or plan to apply your own finish later.', icon: <Sun size={16} /> },
  { key: 'blo', name: 'Boiled Linseed Oil', shortName: 'Linseed Oil', tagline: 'Classic protection, warm tone', description: 'A traditional wood finish that deepens the cedar grain and provides basic moisture resistance. Great for covered porches and sheltered outdoor spots.', icon: <Droplets size={16} /> },
  { key: 'tung', name: 'Food-Safe Natural Oil', shortName: 'Natural Oil', tagline: 'Premium · 100% food-safe · Best for edibles', description: "Our top pick. Pure tung oil penetrates deep into the wood, enhancing the grain with a warm, natural glow. 100% food-safe — the ideal choice if you're growing herbs, vegetables, or anything you'll eat. No harsh chemicals, ever.", badge: 'Best Choice', icon: <Leaf size={16} /> },
  { key: 'stain', name: 'Exterior Stain', shortName: 'Ext. Stain', tagline: 'Rich color, solid UV protection', description: "A penetrating exterior stain that adds rich, consistent color while protecting against UV fading and moisture. Perfect for matching a deck, fence, or patio aesthetic. Choose your color below.", icon: <Sun size={16} />, colorOptions: [
    { label: 'Natural Cedar', hint: "Warm honey tone, enhances the wood's natural grain" },
    { label: 'Driftwood Gray', hint: 'Cool weathered gray, coastal and modern' },
    { label: 'Weathered Brown', hint: 'Deep earthy brown, classic and rustic' },
    { label: 'Bleached / Whitewashed', hint: 'Light, airy, beachy' },
  ]},
  { key: 'waterseal', name: "Thompson's WaterSeal", shortName: 'WaterSeal', tagline: 'Maximum weather protection', description: 'A clear waterproofing sealer that locks out rain, humidity, and freeze-thaw cycles. Best for fully exposed locations — docks, open patios, coastal yards.', icon: <Shield size={16} /> },
];

const products: Product[] = [
${arr}
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } } } as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } } as const;

function BoxSelector({ selected, onSelect }: { selected: Product; onSelect: (p: Product) => void }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
      {products.map((p) => (
        <button key={p.id} onClick={() => onSelect(p)}
          className={\`relative flex flex-col items-center gap-1.5 p-2 rounded border-2 transition-all duration-200 group \${selected.id === p.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-background'}\`}
          aria-label={\`Select \${p.name}\`}>
          <div className="w-full aspect-square overflow-hidden rounded-sm bg-muted flex items-center justify-center">
            <img src={p.image} alt={p.imageAlt} className="w-full h-full object-contain p-1" />
          </div>
          <span className={\`text-[11px] font-semibold leading-tight text-center \${selected.id === p.id ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}\`}>{p.name}</span>
          {selected.id === p.id && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <Check size={9} className="text-primary-foreground" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function FinishOption({ finish, upcharge, selected, onSelect, selectedColor, onColorSelect }: {
  finish: Finish; upcharge: number; selected: boolean; onSelect: () => void;
  selectedColor?: string; onColorSelect?: (color: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={\`rounded border-2 transition-all duration-200 overflow-hidden \${selected ? 'border-primary' : 'border-border hover:border-primary/40'}\`}>
      <button onClick={onSelect} className="w-full flex items-center gap-3 px-4 py-3 text-left">
        <div className={\`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors \${selected ? 'border-primary bg-primary' : 'border-border'}\`}>
          {selected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
        </div>
        <span className={\`shrink-0 \${selected ? 'text-primary' : 'text-muted-foreground'}\`}>{finish.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">{finish.name}</span>
            {finish.badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">{finish.badge}</span>}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{finish.tagline}</p>
        </div>
        <div className="shrink-0 text-right">
          {upcharge > 0 ? <span className="text-sm font-semibold text-primary">+\${upcharge}</span> : <span className="text-xs text-muted-foreground">Included</span>}
        </div>
      </button>
      <AnimatePresence>
        {selected && finish.colorOptions && finish.colorOptions.length > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-4 pb-3 pt-1 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Choose a color</p>
              <div className="flex flex-col gap-1.5">
                {finish.colorOptions.map((opt) => (
                  <button key={opt.label} onClick={() => onColorSelect?.(opt.label)}
                    className={\`flex items-start gap-3 px-3 py-2 rounded text-left transition-colors \${selectedColor === opt.label ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50 border border-transparent hover:border-primary/20'}\`}>
                    <div className={\`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors \${selectedColor === opt.label ? 'border-primary bg-primary' : 'border-border'}\`}>
                      {selectedColor === opt.label && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-tight">{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{opt.hint}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center gap-1 px-4 pb-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
        <ChevronDown size={12} className={\`transition-transform duration-200 \${expanded ? 'rotate-180' : ''}\`} />
        {expanded ? 'Less info' : 'Why choose this?'}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3 mt-1">{finish.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductConfigurator() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedFinish, setSelectedFinish] = useState<FinishKey>('none');
  const [selectedStainColor, setSelectedStainColor] = useState<string>('');

  const upcharge = selectedProduct.finishUpcharges[selectedFinish];
  const finishName = finishes.find((f) => f.key === selectedFinish)?.name ?? 'No Finish';
  const finishLabel = selectedFinish === 'stain' && selectedStainColor ? \`\${finishName} — \${selectedStainColor}\` : finishName;
  const orderParams = new URLSearchParams({ product: selectedProduct.name, dimensions: selectedProduct.dimensions, finish: finishLabel });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
      <div className="flex flex-col gap-5">
        <AnimatePresence mode="wait">
          <motion.div key={selectedProduct.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}
            className="w-full rounded-sm overflow-hidden border border-border bg-muted flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
            <img src={selectedProduct.image} alt={selectedProduct.imageAlt} className="w-full h-full object-contain p-6" />
          </motion.div>
        </AnimatePresence>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Select a Box</p>
          <BoxSelector selected={selectedProduct} onSelect={(p) => { setSelectedProduct(p); setSelectedFinish('none'); }} />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <AnimatePresence mode="wait">
          <motion.div key={selectedProduct.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-1">Cedar Planter Box</p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>{selectedProduct.name}</h2>
            <p className="font-mono text-sm text-primary mb-4">{selectedProduct.dimensions}</p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-foreground">\${(selectedProduct as any).price + upcharge}</span>
              {upcharge > 0 && <span className="text-sm text-muted-foreground">includes {finishes.find(f => f.key === selectedFinish)?.shortName} finish</span>}
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 mb-4" style={{ background: 'hsl(var(--primary) / 0.07)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-primary shrink-0"><path d="M3 17l4-8 4 4 4-6 4 10"/><path d="M3 21h18"/></svg>
              <span className="text-xs font-semibold text-primary">Hand-sanded · Smooth, splinter-free finish</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-5">{selectedProduct.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedProduct.bestFor.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground bg-background">{tag}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="h-px bg-border" />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Choose a Finish</p>
          <p className="text-xs text-muted-foreground mb-4">All finishes are applied by hand before shipping. Expand any option to learn more.</p>
          <div className="flex flex-col gap-2">
            {finishes.map((finish) => (
              <FinishOption key={finish.key} finish={finish} upcharge={selectedProduct.finishUpcharges[finish.key]}
                selected={selectedFinish === finish.key}
                onSelect={() => { setSelectedFinish(finish.key); if (finish.key !== 'stain') setSelectedStainColor(''); }}
                selectedColor={finish.key === 'stain' ? selectedStainColor : undefined}
                onColorSelect={finish.key === 'stain' ? setSelectedStainColor : undefined} />
            ))}
          </div>
        </div>
        {upcharge > 0 && (
          <p className="text-xs text-muted-foreground bg-muted rounded px-3 py-2">
            The <strong>{finishLabel}</strong> finish adds <strong>+\${upcharge}</strong> to the base price of {selectedProduct.name}.
          </p>
        )}
        <Link to={\`/order?\${orderParams.toString()}\`}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Order {selectedProduct.name}{upcharge > 0 ? \` with \${finishes.find(f => f.key === selectedFinish)?.shortName}\` : ''} <ArrowRight size={16} />
        </Link>
        <p className="text-xs text-muted-foreground text-center">
          Not sure? <Link to="/contact" className="underline hover:text-foreground transition-colors">Send us a message</Link> — we're happy to help you choose.
        </p>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title>Cedar Planter Boxes — Seashore Cedar</title>
        <meta name="description" content="Handmade cedar planter boxes in 7 sizes — from compact porch planters to raised garden beds. Choose your box, pick a finish, and order direct from the maker." />
        <meta property="og:title" content="Cedar Planter Boxes — Seashore Cedar" />
        <meta property="og:description" content="Handmade cedar planter boxes in 7 sizes. Choose your finish and order direct from the maker." />
        <meta property="og:type" content="website" />
      </Helmet>
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/background-header_WW.png" alt="Cedar planter boxes" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/70 via-stone-900/50 to-stone-900/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>Handmade in Small Batches</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-5xl md:text-6xl text-white mb-4" style={{ letterSpacing: '-0.02em' }}>Cedar Planter Boxes</motion.h1>
            <motion.p variants={fadeUp} className="text-white/75 text-base md:text-lg max-w-xl mx-auto">Seven sizes. Five finish options. Hand-planed smooth and built from Western red cedar to last outdoors.</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <ProductConfigurator />
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-20 border-t border-border" style={{ background: 'hsl(25, 30%, 94%)' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl text-foreground mb-2" style={{ letterSpacing: '-0.02em' }}>All Boxes at a Glance</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-sm">Every box is built from the same quality Western red cedar. Dimensions are finished size.</motion.p>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {products.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="flex flex-col items-center gap-3 bg-background rounded-sm border border-border p-4 text-center">
                <div className="w-full aspect-square bg-muted rounded-sm overflow-hidden flex items-center justify-center">
                  <img src={p.image} alt={p.imageAlt} className="w-full h-full object-contain p-2" />
                </div>
                <div>
                  <p className="font-heading text-base text-foreground">{p.name}</p>
                  <p className="text-[11px] font-mono text-primary mt-0.5 leading-snug">{p.dimensions}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-20" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-primary mb-3">Make It Personal</p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-3" style={{ letterSpacing: '-0.02em' }}>Add Custom Engraving</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">Any box can be personalized with names, dates, coordinates, or artwork. Just mention it when you place your order.</p>
            </div>
            <div className="shrink-0">
              <Link to="/custom-orders" className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Start a Custom Order <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}`;
}

function generateBallsFile(balls: typeof initialBalls) {
  const arr = balls.filter(b => b.visible).map(b => `  {
    id: '${b.id}',
    name: '${esc(b.name)}',
    description: '${esc((b as any).description || '')}',
    price: ${b.price === null ? 'null' : b.price},
    image: '${(b as any).image || '/assets/BB-16Inch.png'}',
    badge: '${esc((b as any).badge || '')}',
    details: [${((b as any).details || []).map((d: string) => `'${esc(d)}'`).join(', ')}],
  }`).join(',\n');

  return `import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } } as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } as const;

interface BallProduct { id: string; name: string; description: string; price: number | null; image: string; badge?: string; details: string[]; }

const ballProducts: BallProduct[] = [
${arr}
];

function BallProductCard({ product }: { product: BallProduct }) {
  const orderParams = new URLSearchParams({ product: product.name, dimensions: '16" diameter', finish: 'Painted with clear coat' });
  return (
    <motion.div variants={fadeUp} className="flex flex-col rounded border border-border overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.badge && <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">{product.badge}</span>}
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-xl text-foreground mb-2" style={{ letterSpacing: '-0.01em' }}>{product.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{product.description}</p>
        <ul className="mb-5 flex flex-col gap-1.5">
          {product.details.map(detail => (
            <li key={detail} className="flex items-center gap-2 text-xs text-muted-foreground"><Check size={12} className="text-primary shrink-0" />{detail}</li>
          ))}
        </ul>
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-5">
          <span className="text-sm text-muted-foreground">Price</span>
          {product.price !== null ? <span className="text-lg font-bold text-foreground">\${product.price}</span> : <span className="text-sm text-muted-foreground italic">Contact us for pricing</span>}
        </div>
        <Link to={product.id === 'custom-color' ? \`/custom-orders?product=\${encodeURIComponent(product.name)}\` : \`/order?\${orderParams.toString()}\`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          {product.id === 'custom-color' ? 'Request Custom Order' : \`Order — \$\${product.price}\`}<ArrowRight size={15} />
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
        <meta name="description" content='16" solid cement beach balls — unpainted or classic 6-stripe. A playful coastal accent for any garden or patio. Made in Wildwood, NJ.' />
      </Helmet>
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/background-header_WW.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>Seashore Cedar</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Cement Beach Balls</motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base max-w-xl mx-auto">Solid 16" cast cement beach balls — a playful coastal accent for gardens, patios, and porches. All painted balls include a protective clear coat.</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {ballProducts.map(product => <BallProductCard key={product.id} product={product} />)}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center text-xs text-muted-foreground mt-8">
            Free local pickup · Wildwood, NJ · Allow 4–5 business days
          </motion.p>
        </div>
      </section>
    </>
  );
}`;
}

function generateGalleryDataFile(gallery: GalleryItem[]) {
  const arr = gallery.map(g => `  { id: '${g.id}', slot: '${g.slot}', alt: '${esc(g.alt || g.caption)}', category: '${g.category || 'Planter Boxes'}', caption: '${esc(g.caption)}', visible: ${g.visible !== false}${(g as any).link ? `, link: '${(g as any).link}'` : ''}${(g as any).linkLabel ? `, linkLabel: '${esc((g as any).linkLabel)}'` : ''}${(g as any).span ? `, span: '${(g as any).span}'` : ''} },`).join('\n');
  return `// ─── Gallery Data ─────────────────────────────────────────────────────────────
// Single source of truth for gallery photos.
// Generated by Admin Panel — drop this file into src/data/galleryItems.ts

export type GalleryCategory = 'Planter Boxes' | 'Cedar Cutouts' | 'Cement Beach Balls' | 'Details';

export interface GalleryItem {
  id: string; slot: string; alt: string; category: GalleryCategory;
  caption: string; visible?: boolean; link?: string; linkLabel?: string;
  span?: 'wide' | 'tall' | 'normal';
}

export const galleryItems: GalleryItem[] = [
${arr}
];`;
}

function generateYardSaleFile(products: SimpleProduct[]) {
  const arr = products.filter(p => p.visible).map(p => `  {
    id: '${p.id}',
    name: '${esc(p.name)}',
    price: ${p.price},
    image: '${p.image}',
    description: '${esc(p.description)}',
    visible: true,
  }`).join(',\n');

  return `import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } } as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } as const;

interface YardSaleProduct { id: string; name: string; price: number; image: string; description: string; visible: boolean; }

const products: YardSaleProduct[] = [
${arr}
];

function ProductCard({ product }: { product: YardSaleProduct }) {
  const orderParams = new URLSearchParams({ product: product.name, price: String(product.price) });
  return (
    <motion.div variants={fadeUp} className="flex flex-col rounded border border-border overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">Yard Sale</span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-lg text-foreground mb-3" style={{ letterSpacing: '-0.01em' }}>{product.name}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {product.description.split('\\n\\n').map((para, i) => <p key={i} className={i > 0 ? 'mt-3' : ''}>{para}</p>)}
        </div>
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-4">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-lg font-bold text-foreground">\${product.price}</span>
        </div>
        <Link to={\`/order?\${orderParams.toString()}\`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Order — \${product.price} <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function YardSalePage() {
  return (
    <>
      <Helmet>
        <title>Yard Sale — Seashore Cedar</title>
        <meta name="description" content="Discounted items, seconds, and one-of-a-kind pieces at reduced prices from Seashore Cedar in Wildwood, NJ." />
      </Helmet>
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/background-header_WW.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>Seashore Cedar</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Yard Sale</motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base">Discounted items, seconds &amp; one-of-a-kind pieces — while they last</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.filter(p => p.visible).map(product => <ProductCard key={product.id} product={product} />)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Shop Full Price Items <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:bg-muted transition-colors">
              <Mail size={15} /> Ask About Availability
            </Link>
          </motion.div>
          <p className="text-center text-xs text-muted-foreground mt-6">Free local pickup · Wildwood, NJ · Local delivery Mon–Thu to select areas</p>
        </div>
      </section>
    </>
  );
}`;
}

function generateEpoxyFile(products: SimpleProduct[]) {
  if (products.filter(p => p.visible).length === 0) {
    return `import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } } as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } as const;

export default function ArtisanEpoxyPage() {
  return (
    <>
      <Helmet>
        <title>Artisan Epoxy — Seashore Cedar</title>
        <meta name="description" content="Artisan epoxy resin creations coming soon from Seashore Cedar in Wildwood, NJ." />
      </Helmet>
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/background-header_WW.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>Seashore Cedar</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Artisan Epoxy</motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base">Something new is in the works</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 md:py-36" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6 max-w-xl text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
            <motion.div variants={fadeUp} className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl">🌊</span>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="font-heading text-3xl text-foreground mb-4" style={{ letterSpacing: '-0.02em' }}>Coming Soon</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">We're working on a new line of artisan epoxy resin creations with a coastal twist — think river tables, serving boards, decorative pieces, and more.</p>
              <p className="text-muted-foreground leading-relaxed">Check back soon or reach out if you have something specific in mind — we love a custom challenge.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link to="/custom-orders" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                Request a Custom Piece <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:bg-muted transition-colors">
                <Mail size={15} /> Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}`;
  }

  const arr = products.filter(p => p.visible).map(p => `  {
    id: '${p.id}',
    name: '${esc(p.name)}',
    price: ${p.price},
    image: '${p.image}',
    description: '${esc(p.description)}',
    visible: true,
  }`).join(',\n');

  return `import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } } as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } as const;

interface EpoxyProduct { id: string; name: string; price: number; image: string; description: string; visible: boolean; }

const products: EpoxyProduct[] = [
${arr}
];

function ProductCard({ product }: { product: EpoxyProduct }) {
  const orderParams = new URLSearchParams({ product: product.name, price: String(product.price) });
  return (
    <motion.div variants={fadeUp} className="flex flex-col rounded border border-border overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-lg text-foreground mb-3" style={{ letterSpacing: '-0.01em' }}>{product.name}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {product.description.split('\\n\\n').map((para, i) => <p key={i} className={i > 0 ? 'mt-3' : ''}>{para}</p>)}
        </div>
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-4">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-lg font-bold text-foreground">\${product.price}</span>
        </div>
        <Link to={\`/order?\${orderParams.toString()}\`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Order — \${product.price} <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ArtisanEpoxyPage() {
  return (
    <>
      <Helmet>
        <title>Artisan Epoxy — Seashore Cedar</title>
        <meta name="description" content="Artisan epoxy resin creations from Seashore Cedar in Wildwood, NJ — coastal river tables, serving boards, and decorative pieces." />
      </Helmet>
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/background-header_WW.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>Seashore Cedar</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Artisan Epoxy</motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base">Coastal-inspired epoxy resin creations, handcrafted in Wildwood, NJ</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.filter(p => p.visible).map(product => <ProductCard key={product.id} product={product} />)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/custom-orders" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Request a Custom Piece <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:bg-muted transition-colors">
              <Mail size={15} /> Get in Touch
            </Link>
          </motion.div>
          <p className="text-center text-xs text-muted-foreground mt-6">Free local pickup · Wildwood, NJ · Allow 4–5 business days</p>
        </div>
      </section>
    </>
  );
}`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>('planters');
  const [planters, setPlanters] = useState(initialPlanters);
  const [cutouts, setCutouts] = useState(initialCutouts);
  const [balls, setBalls] = useState(initialBalls);
  const [gallery, setGallery] = useState(initialGallery);
  const [yardSale, setYardSale] = useState(initialYardSale);
  const [epoxy, setEpoxy] = useState(initialEpoxy);
  const [saved, setSaved] = useState(false);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  function handleSave() {
    const exports: Record<Tab, () => void> = {
      planters: () => downloadFile('products.tsx', generateProductsFile(planters)),
      cutouts: () => alert('Cedar Cutouts export coming soon — contact your developer to update cedar-cutouts.tsx'),
      balls: () => downloadFile('cement-beach-balls.tsx', generateBallsFile(balls)),
      gallery: () => downloadFile('galleryItems.ts', generateGalleryDataFile(gallery)),
      yardsale: () => downloadFile('yard-sale.tsx', generateYardSaleFile(yardSale)),
      epoxy: () => downloadFile('artisan-epoxy.tsx', generateEpoxyFile(epoxy)),
      images: () => {},
    };
    exports[tab]();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleExportAll() {
    downloadFile('products.tsx', generateProductsFile(planters));
    downloadFile('cement-beach-balls.tsx', generateBallsFile(balls));
    downloadFile('galleryItems.ts', generateGalleryDataFile(gallery));
    downloadFile('yard-sale.tsx', generateYardSaleFile(yardSale));
    downloadFile('artisan-epoxy.tsx', generateEpoxyFile(epoxy));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'planters', label: 'Planter Boxes', icon: <Package size={14} /> },
    { key: 'cutouts', label: 'Cedar Cutouts', icon: <Scissors size={14} /> },
    { key: 'balls', label: 'Cement Balls', icon: <Circle size={14} /> },
    { key: 'yardsale', label: 'Yard Sale', icon: <Tag size={14} /> },
    { key: 'epoxy', label: 'Artisan Epoxy', icon: <Sparkles size={14} /> },
    { key: 'gallery', label: 'Gallery', icon: <LayoutGrid size={14} /> },
    { key: 'images', label: 'Images', icon: <Image size={14} /> },
  ];

  const fileNames: Partial<Record<Tab, string>> = {
    planters: 'products.tsx → src/pages/',
    balls: 'cement-beach-balls.tsx → src/pages/',
    gallery: 'galleryItems.ts → src/data/',
    yardsale: 'yard-sale.tsx → src/pages/',
    epoxy: 'artisan-epoxy.tsx → src/pages/',
  };

  return (
    <>
      <Helmet><title>Admin — Seashore Cedar</title></Helmet>
      <div className="min-h-screen" style={{ background: 'hsl(var(--background))' }}>

        {/* Header */}
        <div className="border-b border-border sticky top-0 z-10" style={{ background: 'hsl(var(--background))' }}>
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="font-heading text-xl text-foreground" style={{ letterSpacing: '-0.02em' }}>Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Seashore Cedar</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleExportAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-xs border border-border text-foreground hover:bg-muted transition-colors">
                <Download size={13} /> Export All
              </button>
              {tab !== 'images' && tab !== 'cutouts' && (
                <button onClick={handleSave}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-xs bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                  {saved ? <><CheckCircle size={13} /> Downloaded!</> : <><Save size={13} /> Save & Download</>}
                </button>
              )}
              <button onClick={() => setAuthed(false)} className="text-muted-foreground hover:text-foreground transition-colors ml-1">
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="container mx-auto px-6 flex gap-0 overflow-x-auto">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  tab === t.key ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        {tab !== 'images' && (
          <div className="border-b border-border bg-muted/30 px-6 py-3">
            <div className="container mx-auto flex items-start gap-2 text-xs text-muted-foreground">
              <Type size={13} className="shrink-0 mt-0.5 text-primary" />
              <span>
                Make changes below → <strong className="text-foreground">Save & Download</strong> → the file downloads as <strong className="text-foreground">{fileNames[tab] ?? 'the correct filename'}</strong> → drop it into that folder in your project → commit &amp; push in GitHub Desktop → Render redeploys automatically → hard refresh <kbd className="bg-muted border border-border rounded px-1">Ctrl+Shift+R</kbd>
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          {tab === 'planters' && <PlantersTab planters={planters} setPlanters={setPlanters} />}
          {tab === 'cutouts' && <CutoutsTab cutouts={cutouts} setCutouts={setCutouts} />}
          {tab === 'balls' && <BallsTab balls={balls} setBalls={setBalls} />}
          {tab === 'gallery' && <GalleryTab gallery={gallery} setGallery={setGallery} />}
          {tab === 'yardsale' && <SimpleProductTab products={yardSale} setProducts={setYardSale} emptyLabel="yard sale" />}
          {tab === 'epoxy' && <SimpleProductTab products={epoxy} setProducts={setEpoxy} emptyLabel="artisan epoxy" />}
          {tab === 'images' && <ImagesTab />}
        </div>
      </div>
    </>
  );
}
