import { useState, useRef } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Lock, LogOut, Save, Download, ChevronDown, ChevronUp, Package, Scissors, Circle, Image, Type, Plus, Trash2, AlertCircle, CheckCircle, Upload, Tag, Sparkles } from 'lucide-react';

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
  { id: 'single-letter', name: 'Single Letter', smallPrice: 14, mediumPrice: 24, largePrice: 34, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'A single cedar letter, hand-cut and planed smooth.', visible: true },
  { id: 'two-letter', name: '2-Letter Set', smallPrice: 24, mediumPrice: 39, largePrice: 54, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'Two cedar letters cut as a matched set.', visible: true },
  { id: 'three-letter', name: '3-Letter Set', smallPrice: 29, mediumPrice: 49, largePrice: 69, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'Three cedar letters as a matched set.', visible: true },
  { id: 'nautical-motif', name: 'Nautical & Beach Motif', smallPrice: 19, mediumPrice: 34, largePrice: 49, smallFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, mediumFinish: { blo: 3, tung: 4, stain: 5, waterseal: 3 }, image: '/assets/customengraved2.png', description: 'Hand-cut cedar shapes inspired by the coast.', visible: true },
];

const initialBalls = [
  { id: 'unpainted', name: 'Unpainted', price: 45 as number | null, image: '/assets/BB-16Inch.png', description: 'A 16" diameter solid cement ball in its natural finish. Clean, minimal, and surprisingly striking as a garden accent or coastal yard feature.', visible: true },
  { id: 'classic-stripe', name: 'Classic 6-Stripe', price: 85 as number | null, image: '/assets/BB-16Inch.png', description: 'The iconic beach ball pattern on a solid 16" cement ball. Finished with a protective clear coat for lasting color and weather resistance.', visible: true },
  { id: 'custom-color', name: 'Custom Color', price: null as number | null, image: '/assets/BB-16Inch.png', description: 'Want a specific color combination? Reach out through our custom order form and we\'ll let you know if we can accommodate and share pricing personally.', visible: true },
];

const initialYardSale: Array<{ id: string; name: string; price: number; image: string; description: string; visible: boolean }> = [];

const initialEpoxy: Array<{ id: string; name: string; price: number; image: string; description: string; visible: boolean }> = [];

// Finish labels for display
const finishLabels: Record<string, string> = { blo: 'Boiled Linseed Oil', tung: 'Tung Oil', stain: 'Exterior Stain', waterseal: "Thompson's WaterSeal" };

type Tab = 'planters' | 'cutouts' | 'balls' | 'yardsale' | 'epoxy' | 'images';

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
    setPlanters([...planters, { id: `box-${Date.now()}`, name: 'New Box', price: 0, dimensions: '', image: '', description: '', visible: true }] as typeof initialPlanters);
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
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={c.visible} onChange={e => update(c.id, 'visible', e.target.checked)} className="w-4 h-4 accent-primary" />
              Show on site
            </label>
          </div>
        </Section>
      ))}
    </div>
  );
}

// ─── Balls Tab ────────────────────────────────────────────────────────────────

function BallsTab({ balls, setBalls }: { balls: typeof initialBalls; setBalls: (b: typeof initialBalls) => void }) {
  function update(id: string, field: string, value: string | number | boolean | null) {
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
            <Field label="Image Path"><input className={inputClass} value={(b as any).image || ''} onChange={e => update(b.id, 'image', e.target.value)} placeholder="/assets/your-image.png" /></Field>
          </div>
          <Field label="Description">
            <textarea className={inputClass + ' resize-none'} rows={3} value={(b as any).description || ''} onChange={e => update(b.id, 'description', e.target.value)} />
          </Field>
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={b.visible} onChange={e => update(b.id, 'visible', e.target.checked)} className="w-4 h-4 accent-primary" />
              Show on site
            </label>
          </div>
        </Section>
      ))}
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

// ─── Code Generators ──────────────────────────────────────────────────────────

function generateProductsCode(planters: typeof initialPlanters) {
  const arr = planters.filter(p => p.visible).map(p => `  {
    id: '${p.id}',
    price: ${p.price},
    name: '${p.name}',
    dimensions: '${p.dimensions}',
    sqft: 0,
    description: '${p.description.replace(/'/g, "\\'")}',
    bestFor: [],
    image: '${p.image}',
    imageAlt: '${p.name} cedar planter',
    finishUpcharges: { none: 0, ${Object.entries(p.finishUpcharges || {blo:10,tung:10,stain:10,waterseal:10}).map(([k,v]) => `${k}: ${v}`).join(', ')} },
  }`).join(',\n');
  return `// ADMIN EXPORT — replace products array in src/pages/products.tsx\nexport const GENERATED_PRODUCTS = [\n${arr}\n];`;
}

function generateCutoutsCode(cutouts: typeof initialCutouts) {
  const arr = cutouts.filter(c => c.visible).map(c => `  {
    id: '${c.id}',
    name: '${c.name}',
    description: '${c.description.replace(/'/g, "\\'")}',
    sizes: [
      { key: 'small', label: 'Small', basePrice: ${c.smallPrice}, description: '4"–5" tall' },
      { key: 'medium', label: 'Medium', basePrice: ${c.mediumPrice}, description: '6"–8" tall' },
      { key: 'large', label: 'Large', basePrice: ${c.largePrice}, description: 'Up to 8" tall — finish included' },
    ],
  }`).join(',\n');
  return `// ADMIN EXPORT — replace products array in src/pages/cedar-cutouts.tsx\nexport const GENERATED_CUTOUTS = [\n${arr}\n];`;
}

function generateBallsCode(balls: typeof initialBalls) {
  const arr = balls.filter(b => b.visible).map(b => `  {
    id: '${b.id}',
    name: '${b.name}',
    price: ${b.price === null ? 'null' : b.price},
    image: '/assets/BB-16Inch.png',
    details: ['16" diameter', 'Solid cast construction', 'Weather-resistant'],
  }`).join(',\n');
  return `// ADMIN EXPORT — replace ballProducts array in src/pages/cement-beach-balls.tsx\nexport const GENERATED_BALLS = [\n${arr}\n];`;
}

function generateSimpleCode(products: SimpleProduct[], pageName: string, varName: string) {
  if (products.length === 0) return `// No ${pageName} items yet.`;
  const arr = products.filter(p => p.visible).map(p => `  {
    id: '${p.id}',
    name: '${p.name}',
    price: ${p.price},
    image: '${p.image}',
    description: '${p.description.replace(/'/g, "\\'")}',
  }`).join(',\n');
  return `// ADMIN EXPORT — ${pageName} products\nexport const ${varName} = [\n${arr}\n];`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>('planters');
  const [planters, setPlanters] = useState(initialPlanters);
  const [cutouts, setCutouts] = useState(initialCutouts);
  const [balls, setBalls] = useState(initialBalls);
  const [yardSale, setYardSale] = useState(initialYardSale);
  const [epoxy, setEpoxy] = useState(initialEpoxy);
  const [saved, setSaved] = useState(false);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  function handleSave() {
    const exports: Record<Tab, () => void> = {
      planters: () => downloadFile('ADMIN_products.ts', generateProductsCode(planters)),
      cutouts: () => downloadFile('ADMIN_cutouts.ts', generateCutoutsCode(cutouts)),
      balls: () => downloadFile('ADMIN_balls.ts', generateBallsCode(balls)),
      yardsale: () => downloadFile('ADMIN_yardsale.ts', generateSimpleCode(yardSale, 'Yard Sale', 'GENERATED_YARD_SALE')),
      epoxy: () => downloadFile('ADMIN_epoxy.ts', generateSimpleCode(epoxy, 'Artisan Epoxy', 'GENERATED_EPOXY')),
      images: () => {},
    };
    exports[tab]();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleExportAll() {
    downloadFile('ADMIN_products.ts', generateProductsCode(planters));
    downloadFile('ADMIN_cutouts.ts', generateCutoutsCode(cutouts));
    downloadFile('ADMIN_balls.ts', generateBallsCode(balls));
    if (yardSale.length > 0) downloadFile('ADMIN_yardsale.ts', generateSimpleCode(yardSale, 'Yard Sale', 'GENERATED_YARD_SALE'));
    if (epoxy.length > 0) downloadFile('ADMIN_epoxy.ts', generateSimpleCode(epoxy, 'Artisan Epoxy', 'GENERATED_EPOXY'));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'planters', label: 'Planter Boxes', icon: <Package size={14} /> },
    { key: 'cutouts', label: 'Cedar Cutouts', icon: <Scissors size={14} /> },
    { key: 'balls', label: 'Cement Balls', icon: <Circle size={14} /> },
    { key: 'yardsale', label: 'Yard Sale', icon: <Tag size={14} /> },
    { key: 'epoxy', label: 'Artisan Epoxy', icon: <Sparkles size={14} /> },
    { key: 'images', label: 'Images', icon: <Image size={14} /> },
  ];

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
              {tab !== 'images' && (
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
              <span>Make changes below → <strong className="text-foreground">Save & Download</strong> → drop the file into your GitHub folder → commit & push → Render deploys automatically.</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          {tab === 'planters' && <PlantersTab planters={planters} setPlanters={setPlanters} />}
          {tab === 'cutouts' && <CutoutsTab cutouts={cutouts} setCutouts={setCutouts} />}
          {tab === 'balls' && <BallsTab balls={balls} setBalls={setBalls} />}
          {tab === 'yardsale' && <SimpleProductTab products={yardSale} setProducts={setYardSale} emptyLabel="yard sale" />}
          {tab === 'epoxy' && <SimpleProductTab products={epoxy} setProducts={setEpoxy} emptyLabel="artisan epoxy" />}
          {tab === 'images' && <ImagesTab />}
        </div>
      </div>
    </>
  );
}
