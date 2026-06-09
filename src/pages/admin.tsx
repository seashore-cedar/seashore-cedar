import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Lock, LogOut, Save, Download, ChevronDown, ChevronUp, Package, Scissors, Circle, Image, Type, Plus, Trash2, AlertCircle, CheckCircle } from 'lucide-react';

// ─── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

// ─── Data ─────────────────────────────────────────────────────────────────────

const initialPlanters = [
  { id: 'box-a', name: 'Box A', price: 40, dimensions: '16"W × 16"L × 16"H', image: '/assets/Box A w dimensions.png', description: 'A compact square planter with a classic profile. Every surface is hand-sanded for a smooth, splinter-free finish — perfect for a single statement plant on a porch step, deck corner, or entryway.', visible: true },
  { id: 'box-c', name: 'Box C', price: 60, dimensions: '16"W × 16"L × 25"H', image: '/assets/Box C.png', description: 'Same footprint as Box A but taller — hand-sanded smooth on every face. Great for trailing plants, tall grasses, or adding visual height to a garden arrangement.', visible: true },
  { id: 'box-abc', name: 'Box ABC Set', price: 110, dimensions: 'Box A + Box C + Box B (10"W × 10"L × 13"H)', image: '/assets/Boxes ABC w dimensions.png', description: 'Three graduated planters sold as a set. Arrange them on stairs, a deck, or an entryway for a layered, designer look. Each box is hand-sanded and built to the same standard as our individual planters.', visible: true },
  { id: 'box-g', name: 'Box G', price: 130, dimensions: '16"W × 48"L × 16"H', image: '/assets/Box G.png', description: 'A long, low planter built for railings, walkways, and wide deck edges. The extended length makes it ideal for herb gardens, mixed plantings, or a bold horizontal statement.', visible: true },
  { id: 'box-h', name: 'Box H', price: 160, dimensions: '16"W × 48"L × 32"H', image: '/assets/Box H.png', description: 'Our tallest long-format planter. Built for privacy screens, tall ornamental grasses, or dramatic entrances. Substantial presence without the bulk.', visible: true },
  { id: 'box-m', name: 'Box M', price: 50, dimensions: '16"W × 12"L × 13"H', image: '/assets/Box M w dimensions.png', description: 'A compact rectangular planter with a low profile. Perfect for windowsills, tabletops, or tight deck spaces where a square box would be too wide.', visible: true },
  { id: 'box-q', name: 'Box Q', price: 20, dimensions: '9"W × 9"L × 8"H', image: '/assets/Box Q.png', description: 'Our smallest planter — a perfect tabletop accent or gift. Hand-sanded to the same standard as every other box we make, just in a more compact form.', visible: true },
];

const initialCutouts = [
  { id: 'single-letter', name: 'Single Letter', smallPrice: 14, mediumPrice: 24, largePrice: 34, description: 'A single cedar letter, hand-cut and planed smooth.', visible: true },
  { id: 'two-letter', name: '2-Letter Set', smallPrice: 24, mediumPrice: 39, largePrice: 54, description: 'Two cedar letters cut as a matched set.', visible: true },
  { id: 'three-letter', name: '3-Letter Set', smallPrice: 29, mediumPrice: 49, largePrice: 69, description: 'Three cedar letters as a matched set.', visible: true },
  { id: 'nautical-motif', name: 'Nautical & Beach Motif', smallPrice: 19, mediumPrice: 34, largePrice: 49, description: 'Hand-cut cedar shapes inspired by the coast.', visible: true },
];

const initialBalls = [
  { id: 'unpainted', name: 'Unpainted', price: 45, visible: true },
  { id: 'classic-stripe', name: 'Classic 6-Stripe', price: 85, visible: true },
  { id: 'custom-color', name: 'Custom Color', price: null as number | null, visible: true },
];

const finishUpcharges = [
  { key: 'none', name: 'No Finish', upcharge: 0 },
  { key: 'blo', name: 'Boiled Linseed Oil', upcharge: 10 },
  { key: 'tung', name: 'Tung Oil', upcharge: 10 },
  { key: 'stain', name: 'Exterior Stain', upcharge: 10 },
  { key: 'waterseal', name: "Thompson's WaterSeal", upcharge: 10 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Planter = typeof initialPlanters[0];
type Cutout = typeof initialCutouts[0];
type Ball = typeof initialBalls[0];
type Tab = 'planters' | 'cutouts' | 'balls' | 'finishes';

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const correct = ADMIN_PASSWORD || 'seashore2024';
    if (pw === correct) {
      onLogin();
    } else {
      setError(true);
      setPw('');
    }
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
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors"
          />
          {error && (
            <p className="text-xs text-destructive flex items-center gap-1.5">
              <AlertCircle size={12} /> Incorrect password. Try again.
            </p>
          )}
          <button type="submit" className="px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-muted/40 hover:bg-muted/60 transition-colors text-left"
      >
        <span className="font-semibold text-sm text-foreground">{title}</span>
        {open ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
      </button>
      {open && <div className="p-5">{children}</div>}
    </div>
  );
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full px-3 py-2 rounded border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-colors";

// ─── Planters Tab ─────────────────────────────────────────────────────────────

function PlantersTab({ planters, setPlanters }: { planters: Planter[]; setPlanters: (p: Planter[]) => void }) {
  function update(id: string, field: keyof Planter, value: string | number | boolean) {
    setPlanters(planters.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  function addProduct() {
    const newId = `box-${Date.now()}`;
    setPlanters([...planters, {
      id: newId, name: 'New Product', price: 0,
      dimensions: '', image: '', description: '', visible: true,
    }]);
  }

  function remove(id: string) {
    if (confirm('Remove this product?')) setPlanters(planters.filter(p => p.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      {planters.map(p => (
        <Section key={p.id} title={`${p.name} — $${p.price}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field label="Product Name">
              <input className={inputClass} value={p.name} onChange={e => update(p.id, 'name', e.target.value)} />
            </Field>
            <Field label="Price ($)">
              <input className={inputClass} type="number" value={p.price} onChange={e => update(p.id, 'price', Number(e.target.value))} />
            </Field>
            <Field label="Dimensions">
              <input className={inputClass} value={p.dimensions} onChange={e => update(p.id, 'dimensions', e.target.value)} />
            </Field>
            <Field label="Image Path">
              <input className={inputClass} value={p.image} onChange={e => update(p.id, 'image', e.target.value)} placeholder="/assets/your-image.png" />
            </Field>
          </div>
          <Field label="Description">
            <textarea className={inputClass + ' resize-none'} rows={3} value={p.description} onChange={e => update(p.id, 'description', e.target.value)} />
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
      <button onClick={addProduct} className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-dashed border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary transition-colors">
        <Plus size={14} /> Add Product
      </button>
    </div>
  );
}

// ─── Cutouts Tab ──────────────────────────────────────────────────────────────

function CutoutsTab({ cutouts, setCutouts }: { cutouts: Cutout[]; setCutouts: (c: Cutout[]) => void }) {
  function update(id: string, field: keyof Cutout, value: string | number | boolean) {
    setCutouts(cutouts.map(c => c.id === id ? { ...c, [field]: value } : c));
  }

  return (
    <div className="flex flex-col gap-4">
      {cutouts.map(c => (
        <Section key={c.id} title={c.name}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Field label="Name">
              <input className={inputClass} value={c.name} onChange={e => update(c.id, 'name', e.target.value)} />
            </Field>
            <Field label="Small Price ($)">
              <input className={inputClass} type="number" value={c.smallPrice} onChange={e => update(c.id, 'smallPrice', Number(e.target.value))} />
            </Field>
            <Field label="Medium Price ($)">
              <input className={inputClass} type="number" value={c.mediumPrice} onChange={e => update(c.id, 'mediumPrice', Number(e.target.value))} />
            </Field>
            <Field label="Large Price ($)">
              <input className={inputClass} type="number" value={c.largePrice} onChange={e => update(c.id, 'largePrice', Number(e.target.value))} />
            </Field>
          </div>
          <Field label="Description">
            <textarea className={inputClass + ' resize-none'} rows={2} value={c.description} onChange={e => update(c.id, 'description', e.target.value)} />
          </Field>
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

function BallsTab({ balls, setBalls }: { balls: Ball[]; setBalls: (b: Ball[]) => void }) {
  function update(id: string, field: keyof Ball, value: string | number | boolean | null) {
    setBalls(balls.map(b => b.id === id ? { ...b, [field]: value } : b));
  }

  return (
    <div className="flex flex-col gap-4">
      {balls.map(b => (
        <Section key={b.id} title={b.name}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input className={inputClass} value={b.name} onChange={e => update(b.id, 'name', e.target.value)} />
            </Field>
            <Field label="Price ($) — leave 0 for 'Contact us'">
              <input className={inputClass} type="number" value={b.price ?? 0}
                onChange={e => update(b.id, 'price', Number(e.target.value) === 0 ? null : Number(e.target.value))} />
            </Field>
          </div>
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

// ─── Finishes Tab ─────────────────────────────────────────────────────────────

function FinishesTab({ finishes, setFinishes }: { finishes: typeof finishUpcharges; setFinishes: (f: typeof finishUpcharges) => void }) {
  function update(key: string, upcharge: number) {
    setFinishes(finishes.map(f => f.key === key ? { ...f, upcharge } : f));
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">These upcharges apply to all cedar planter boxes and cutouts.</p>
      {finishes.map(f => (
        <div key={f.key} className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
          <span className="text-sm text-foreground">{f.name}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">+$</span>
            <input
              className="w-20 px-3 py-1.5 rounded border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-right"
              type="number"
              value={f.upcharge}
              onChange={e => update(f.key, Number(e.target.value))}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Code Generator ───────────────────────────────────────────────────────────

function generateProductsCode(planters: Planter[], finishes: typeof finishUpcharges): string {
  const productsArr = planters.filter(p => p.visible).map(p => `  {
    id: '${p.id}',
    price: ${p.price},
    name: '${p.name}',
    dimensions: '${p.dimensions}',
    sqft: 0,
    description:
      '${p.description.replace(/'/g, "\\'")}',
    bestFor: [],
    image: '${p.image}',
    imageAlt: '${p.name} cedar planter',
    finishUpcharges: { ${finishes.map(f => `${f.key}: ${f.upcharge}`).join(', ')} },
  }`).join(',\n');

  return `// AUTO-GENERATED by Seashore Cedar Admin Panel
// Replace the products array and finishUpcharges in src/pages/products.tsx

export const GENERATED_PRODUCTS = [
${productsArr}
];`;
}

function generateCutoutsCode(cutouts: Cutout[]): string {
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

  return `// AUTO-GENERATED by Seashore Cedar Admin Panel
// Replace the products array in src/pages/cedar-cutouts.tsx

export const GENERATED_CUTOUTS = [
${arr}
];`;
}

function generateBallsCode(balls: Ball[]): string {
  const arr = balls.filter(b => b.visible).map(b => `  {
    id: '${b.id}',
    name: '${b.name}',
    price: ${b.price === null ? 'null' : b.price},
    image: '/assets/BB-16Inch.png',
    details: ['16" diameter', 'Solid cast construction', 'Weather-resistant'],
  }`).join(',\n');

  return `// AUTO-GENERATED by Seashore Cedar Admin Panel
// Replace the ballProducts array in src/pages/cement-beach-balls.tsx

export const GENERATED_BALLS = [
${arr}
];`;
}

// ─── Download Helper ──────────────────────────────────────────────────────────

function downloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>('planters');
  const [planters, setPlanters] = useState(initialPlanters);
  const [cutouts, setCutouts] = useState(initialCutouts);
  const [balls, setBalls] = useState(initialBalls);
  const [finishes, setFinishes] = useState(finishUpcharges);
  const [saved, setSaved] = useState(false);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  function handleSave() {
    if (tab === 'planters' || tab === 'finishes') {
      downloadFile('ADMIN_products.ts', generateProductsCode(planters, finishes));
    }
    if (tab === 'cutouts') {
      downloadFile('ADMIN_cutouts.ts', generateCutoutsCode(cutouts));
    }
    if (tab === 'balls') {
      downloadFile('ADMIN_balls.ts', generateBallsCode(balls));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleSaveAll() {
    downloadFile('ADMIN_products.ts', generateProductsCode(planters, finishes));
    downloadFile('ADMIN_cutouts.ts', generateCutoutsCode(cutouts));
    downloadFile('ADMIN_balls.ts', generateBallsCode(balls));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'planters', label: 'Planter Boxes', icon: <Package size={15} /> },
    { key: 'cutouts', label: 'Cedar Cutouts', icon: <Scissors size={15} /> },
    { key: 'balls', label: 'Cement Balls', icon: <Circle size={15} /> },
    { key: 'finishes', label: 'Finish Upcharges', icon: <Image size={15} /> },
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
              <button
                onClick={handleSaveAll}
                className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-xs border border-border text-foreground hover:bg-muted transition-colors"
              >
                <Download size={13} /> Export All
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-4 py-2 rounded font-semibold text-xs bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {saved ? <><CheckCircle size={13} /> Saved!</> : <><Save size={13} /> Save & Download</>}
              </button>
              <button onClick={() => setAuthed(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="container mx-auto px-6 flex gap-1 pb-0">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
                  tab === t.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions banner */}
        <div className="border-b border-border bg-muted/30 px-6 py-3">
          <div className="container mx-auto flex items-start gap-2 text-xs text-muted-foreground">
            <Type size={13} className="shrink-0 mt-0.5 text-primary" />
            <span>
              Make your changes below, then click <strong className="text-foreground">Save & Download</strong> to get the updated file.
              Drop it into your GitHub folder, commit, push, and Render will deploy automatically.
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          {tab === 'planters' && <PlantersTab planters={planters} setPlanters={setPlanters} />}
          {tab === 'cutouts' && <CutoutsTab cutouts={cutouts} setCutouts={setCutouts} />}
          {tab === 'balls' && <BallsTab balls={balls} setBalls={setBalls} />}
          {tab === 'finishes' && <FinishesTab finishes={finishes} setFinishes={setFinishes} />}
        </div>
      </div>
    </>
  );
}
